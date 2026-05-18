const pool = require("../config/db");

const obtenerProductos = async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM productos"
        );

        res.json(resultado.rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener productos"
        });
    }
};

module.exports = {
    obtenerProductos
};