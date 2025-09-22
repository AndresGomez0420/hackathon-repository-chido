
const {Client} = require("pg");
// Configuración de la conexión
const client = new Client({
  host: "localhost",   // o la IP de tu contenedor si usas Docker en remoto
  port: 5435,
  user: "admin_hackathon",
  password: "hackathon0420!",
  database: "hackathon",
});
const message= 'Gustavo Cerati';
// Conectar y probar la consulta
async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a PostgreSQL en Docker");

    // const res = await client.query(`INSERT INTO tabla1 (columna_1) VALUES ('${message}')`);
    // console.log(res);
    const res2 = await client.query(`SELECT * FROM tabla1`);
    const jsonString = JSON.stringify(res2.rows);
    const jsonData = JSON.parse(jsonString);
    jsonData.forEach(item => {
    console.log(item.columna_1);
    });

    await client.end();
  } catch (err) {
    console.error("❌ Error al conectar:", err);
  }
}

conectarDB();
