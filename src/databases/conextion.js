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

// Función para validar tipo de persona
function validatePersonType(person_type) {
  const validTypes = ['cliente', 'proveedor'];
  return validTypes.includes(person_type.toLowerCase());
}

// Registro de usuarios (cliente o proveedor)
app.post('/u/register', async (req, res) => {
  try {
    const { 
      name, 
      last_name, 
      email_address, 
      password_account, 
      num_tel, 
      num_tel_2, 
      person_type,
      wallet_address,
      developer_keys,
      num_tarjet
    } = req.body;

    // Validaciones básicas
    if (!name || !last_name || !email_address || !password_account || !person_type) {
      return res.status(400).json({ 
        error: 'Campos requeridos: name, last_name, email_address, password_account, person_type' 
      });
    }

    // Validar tipo de persona
    if (!validatePersonType(person_type)) {
      return res.status(400).json({ 
        error: 'person_type debe ser "cliente" o "proveedor"' 
      });
    }

    if (name.length > 50 || last_name.length > 50 || email_address.length > 100) {
      return res.status(400).json({ error: 'Campos exceden la longitud máxima permitida' });
    }

    let tableName;
    if (person_type.toLowerCase() === 'cliente') {
      tableName = 't_client';
    } else if (person_type.toLowerCase() === 'proveedor') {
      tableName = 't_store';
    }

    // Verificar si el usuario ya existe
    const existeUsuario = await client.query(
      `SELECT id FROM ${tableName} WHERE email_address = $1`,
      [email_address]
    );

    if (existeUsuario.rows.length > 0) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password_account, 10);

    // Insertar en la tabla correspondiente
    const result = await client.query(
      `INSERT INTO ${tableName} 
       (name, last_name, email_address, password_account, num_tel, num_tel_2, person_type, wallet_address, developer_keys, num_tarjet, start_date) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        name?.substring(0, 50), 
        last_name?.substring(0, 50), 
        email_address?.substring(0, 100), 
        hashedPassword, 
        num_tel?.substring(0, 20), 
        num_tel_2?.substring(0, 20), 
        person_type.toLowerCase(),
        wallet_address?.substring(0, 50), 
        developer_keys?.substring(0, 50), 
        num_tarjet?.substring(0, 20), 
        new Date()
      ]
    );

    const nuevoUsuario = result.rows[0];

    const token = jwt.sign(
      { 
        id: nuevoUsuario.id, 
        email: nuevoUsuario.email_address,
        name: nuevoUsuario.name,
        person_type: nuevoUsuario.person_type
      },
      'tu_clave_secreta',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: `${person_type} registrado exitosamente`,
      token,
      user: {
        id: nuevoUsuario.id,
        name: nuevoUsuario.name,
        last_name: nuevoUsuario.last_name,
        email: nuevoUsuario.email_address,
        person_type: nuevoUsuario.person_type
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
      // Si no se encuentra en clientes, buscar en proveedores
      result = await client.query(
        'SELECT *, \'proveedor\' as user_type FROM t_store WHERE email_address = $1',
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

    const passwordValida = await bcrypt.compare(password, usuario.password_account);
    
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { 
        id: usuario.id, 
        email: usuario.email_address,
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
        last_name: usuario.last_name,
        email: usuario.email_address,
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