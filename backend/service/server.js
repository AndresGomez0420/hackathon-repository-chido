import express from 'express';


const app = express();
app.listen(5000, () => {
  console.log("🚀 API escuchando en http://localhost:5000");
});