const pool = require("../config/db");

const crearPedido = async (req, res) => {

  try {

    const { usuario_id, total, productos } = req.body;

    // 1. crear pedido
    const pedido = await pool.query(
      `INSERT INTO pedidos (usuario_id, total)
       VALUES ($1, $2)
       RETURNING id`,
      [usuario_id, total]
    );

    const pedido_id = pedido.rows[0].id;

    // 2. detalle del pedido
    for (let item of productos) {
      await pool.query(
        `INSERT INTO detalle_pedido
         (pedido_id, producto_id, cantidad, subtotal)
         VALUES ($1, $2, $3, $4)`,
        [
          pedido_id,
          item.id,
          item.cantidad,
          item.precio * item.cantidad
        ]
      );
    }

    res.json({
      success: true,
      mensaje: "Pedido creado correctamente"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error al crear pedido"
    });
  }
};

const obtenerPedidosPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  const result = await pool.query(
    "SELECT * FROM pedidos WHERE usuario_id = $1",
    [usuario_id]
  );

  res.json({
    success: true,
    pedidos: result.rows
  });
};

const obtenerDetallePedido = async (req, res) => {

  try {

    const { pedido_id } = req.params;

    const result = await pool.query(
      `
      SELECT 
        dp.cantidad,
        dp.subtotal,
        p.nombre,
        p.precio
      FROM detalle_pedido dp
      JOIN productos p ON dp.producto_id = p.id
      WHERE dp.pedido_id = $1
      `,
      [pedido_id]
    );

    res.json({
      success: true,
      detalle: result.rows
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error al obtener detalle del pedido"
    });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidosPorUsuario,
  obtenerDetallePedido
};