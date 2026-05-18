const express = require("express");
const cors = require("cors");

const productosRoutes = require("./routes/productosRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Pupuseria Guadalupe funcionando");
});

app.use("/api/productos", productosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});