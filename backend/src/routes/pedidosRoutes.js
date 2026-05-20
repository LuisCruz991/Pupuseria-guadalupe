const express = require("express");
const router = express.Router();

const {
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerDetallePedido
} = require("../controllers/pedidosController");

// crear pedido
router.post("/pedido", crearPedido);

// obtener pedidos por usuario
router.get("/pedidos/:usuario_id", obtenerPedidosPorUsuario);

// obtener detalle de pedidos por usuario
router.get("/pedido/:pedido_id", obtenerDetallePedido);

module.exports = router;