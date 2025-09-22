// backend/server.js
import express from 'express';

import cors from 'cors';

const app = express();

// Si quieres permitir solo React en 3000:
app.use(cors({
  origin: "http://localhost:3000"
}));


app.use(express.json());

app.post("/u/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "xaquelas@gmail.com" && password === "1234") {
    res.json({ token: "abc123" });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});


app.listen(5000, () => {
  console.log("🚀 API escuchando en http://localhost:5000");
});
