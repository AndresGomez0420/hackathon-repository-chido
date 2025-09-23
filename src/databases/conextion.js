const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Client} = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const client = new Client({
  host: "localhost",
  port: 5435,
  user: "admin_hackathon",
  password: "hackathon0420!",
  database: "hackathon",
});

async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a PostgreSQL en Docker");
  } catch (err) {
    console.error("❌ Error al conectar a PostgreSQL:", err);
    throw err;
  }
}

// Función para mapear tipos de tienda a IDs
function getStoreTypeId(storeType) {
  const storeTypeMap = {
    'abarrotes': 1,
    'ferreteria': 2,
    'farmacia': 3,
    'papeleria': 4,
    'electronica': 5,
    'otro': 6
  };
  return storeTypeMap[storeType] || 6; // Default a "otro" si no se encuentra
}

// Función para validar tipo de persona
function validatePersonType(person_type) {
  const validTypes = ['cliente', 'proveedor'];
  return validTypes.includes(person_type.toLowerCase());
}

// Registro de usuarios (cliente o proveedor)
app.post('/u/register', async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Debug log
    
    const { 
      name, 
      last_name, 
      name_store,
      street_addres,
      email_address, 
      password_account, 
      num_tel, 
      num_tel_2, 
      store_type,
      opening_hours,
      closing_time,
      person_type,
      wallet_address,
      developer_keys
    } = req.body;

    // Validaciones básicas
    if (!name || !last_name || !email_address || !password_account || person_type === undefined) {
      return res.status(400).json({ 
        error: 'Campos requeridos: name, last_name, email_address, password_account, person_type' 
      });
    }

    // Validar que person_type sea boolean
    if (typeof person_type !== 'boolean') {
      return res.status(400).json({ 
        error: 'person_type debe ser true (cliente) o false (proveedor)' 
      });
    }

    // Validaciones específicas para proveedor
    if (person_type === false && (!name_store || !street_addres || !store_type || !opening_hours || !closing_time)) {
      return res.status(400).json({ 
        error: 'Para proveedores son requeridos: name_store, street_addres, store_type, opening_hours, closing_time' 
      });
    }

    // Validaciones de longitud según el esquema de la base de datos
    if (name.length > 30 || last_name.length > 20 || email_address.length > 100) {
      return res.status(400).json({ error: 'Campos exceden la longitud máxima permitida' });
    }

    // Validación adicional para proveedor
    if (person_type === false && name_store && name_store.length > 20) {
      return res.status(400).json({ error: 'name_store excede la longitud máxima de 20 caracteres' });
    }

    let tableName, insertQuery, insertValues;
    
    if (person_type === true) { // Cliente
      tableName = 't_client';
      // Verificar si el usuario ya existe
      const existeUsuario = await client.query(
        `SELECT id FROM ${tableName} WHERE email_address = $1`,
        [email_address]
      );

      if (existeUsuario.rows.length > 0) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password_account, 10);

      insertQuery = `INSERT INTO ${tableName} 
         (name, last_name, email_address, password_account, num_tel, num_tel_2, person_type, wallet_address, developer_keys, start_date) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`;
      
      insertValues = [
        name?.substring(0, 30), 
        last_name?.substring(0, 20), 
        email_address?.substring(0, 100), 
        hashedPassword,
        num_tel?.substring(0, 20), 
        num_tel_2?.substring(0, 20), 
        person_type,
        wallet_address, 
        developer_keys,
        new Date()
      ];
    } else { // Proveedor
      tableName = 't_store';
      console.log('Tabla seleccionada para proveedor:', tableName);
      
      const existeUsuario = await client.query(
        `SELECT id FROM ${tableName} WHERE email_adrees = $1`,
        [email_address]
      );

      if (existeUsuario.rows.length > 0) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      const hashedPassword = await bcrypt.hash(password_account, 10);
      const storeTypeId = getStoreTypeId(store_type);

      const truncatedValues = {
        name: name?.substring(0, 30) || '',
        lastname: last_name?.substring(0, 20) || '',
        name_store: name_store?.substring(0, 20) || '',
        street_addres: street_addres?.substring(0, 255) || '',
        email_adrees: email_address?.substring(0, 100) || '',
        num_tel: num_tel?.substring(0, 20) || '',
        num_tel_2: num_tel_2?.substring(0, 20) || null,
      };

      insertQuery = `INSERT INTO ${tableName} 
         (name, lastname, name_store, street_addres, email_adrees, password_store, num_tel, num_tel_2, store_type, opening_hours, closing_time, wallet_address, developer_keys, start_date) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         RETURNING *`;
      
      insertValues = [
        truncatedValues.name,
        truncatedValues.lastname,
        truncatedValues.name_store,
        truncatedValues.street_addres,
        truncatedValues.email_adrees,
        hashedPassword,
        truncatedValues.num_tel,
        truncatedValues.num_tel_2,
        storeTypeId,
        opening_hours,
        closing_time,
        wallet_address, 
        developer_keys, 
        new Date()
      ];
    }

    // Insertar en la tabla correspondiente
    console.log('Ejecutando query en tabla:', tableName); // Debug log
    const result = await client.query(insertQuery, insertValues);
    const nuevoUsuario = result.rows[0];

    const token = jwt.sign(
      { 
        id: nuevoUsuario.id, 
        email: person_type === true ? nuevoUsuario.email_address : nuevoUsuario.email_adrees,
        name: nuevoUsuario.name,
        person_type: person_type === true ? 'cliente' : 'proveedor'
      },
      'tu_clave_secreta',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: `${person_type === true ? 'Cliente' : 'Proveedor'} registrado exitosamente`,
      token,
      user: {
        id: nuevoUsuario.id,
        name: nuevoUsuario.name,
        last_name: person_type === true ? nuevoUsuario.last_name : nuevoUsuario.lastname,
        email: person_type === true ? nuevoUsuario.email_address : nuevoUsuario.email_adrees,
        person_type: person_type === true ? 'cliente' : 'proveedor'
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
});

// Login universal (busca en ambas tablas)
app.post('/u/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    let usuario = null;
    let userType = null;

    // Buscar primero en tabla de clientes
    let result = await client.query(
      'SELECT *, \'cliente\' as user_type FROM t_client WHERE email_address = $1',
      [email]
    );

    if (result.rows.length > 0) {
      usuario = result.rows[0];
      userType = 'cliente';
    } else {
      // Si no se encuentra en clientes, buscar en proveedores (nota: email_adrees en t_store)
      result = await client.query(
        'SELECT *, \'proveedor\' as user_type FROM t_store WHERE email_adrees = $1',
        [email]
      );
      
      if (result.rows.length > 0) {
        usuario = result.rows[0];
        userType = 'proveedor';
      }
    }

    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Para t_store la contraseña está en password_store, para t_client en password_account
    const passwordField = userType === 'proveedor' ? usuario.password_store : usuario.password_account;
    const passwordValida = await bcrypt.compare(password, passwordField);
    
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: userType === 'proveedor' ? usuario.email_adrees : usuario.email_address,
        name: usuario.name,
        person_type: userType
      },
      'tu_clave_secreta',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: usuario.id,
        name: usuario.name,
        last_name: userType === 'proveedor' ? usuario.lastname : usuario.last_name,
        email: userType === 'proveedor' ? usuario.email_adrees : usuario.email_address,
        person_type: userType
      }
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

async function iniciarServidor() {
  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
  }
}

iniciarServidor();