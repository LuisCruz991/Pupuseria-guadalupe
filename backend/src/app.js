const express = require("express");
const cors = require("cors");

// RUTAS EXISTENTES
const productosRoutes = require("./routes/productosRoutes");
const authRoutes = require("./routes/authRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// RUTA BASE
app.get("/", (req, res) => {
  res.send("API Pupuseria Guadalupe funcionando");
});

// PRODUCTOS
app.use("/api/productos", productosRoutes);

// AUTH (login, registro, recuperar)
app.use("/api", authRoutes);

// PEDIDOS
app.use("/api", pedidosRoutes);

// SERVIDOR
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});