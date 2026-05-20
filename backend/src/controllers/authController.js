const pool = require("../config/db");

const login = async (req, res) => {

  try {

    const { correo, clave } = req.body;

    const consulta = `
      SELECT *
      FROM usuarios
      WHERE correo = $1
      AND clave = $2
    `;

    const resultado = await pool.query(
      consulta,
      [correo, clave]
    );

    if (resultado.rows.length > 0) {

      res.json({
        success: true,
        usuario: resultado.rows[0]
      });

    } else {

      res.json({
        success: false,
        mensaje: "Correo o contraseña incorrectos"
      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error en servidor"
    });
  }
};

const registrarUsuario = async (req, res) => {

  try {

    const {
      nombre,
      correo,
      clave,
      telefono,
      direccion
    } = req.body;

    const verificarCorreo = await pool.query(
      `
      SELECT *
      FROM usuarios
      WHERE correo = $1
      `,
      [correo]
    );

    if (verificarCorreo.rows.length > 0) {

      return res.json({
        success: false,
        mensaje: "El correo ya existe"
      });
    }

    await pool.query(

      `
      INSERT INTO usuarios
      (
        nombre,
        correo,
        clave,
        telefono,
        direccion
      )

      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      `,

      [
        nombre,
        correo,
        clave,
        telefono,
        direccion
      ]
    );

    res.json({
      success: true,
      mensaje: "Usuario registrado correctamente"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error en servidor"
    });
  }
};

const recuperarClave = async (req, res) => {

  try {

    const {
      nombre,
      correo,
      nuevaClave
    } = req.body;

    const usuario = await pool.query(

      `
      SELECT *
      FROM usuarios
      WHERE nombre = $1
      AND correo = $2
      `,

      [nombre, correo]
    );

    if (usuario.rows.length === 0) {

      return res.json({
        success: false,
        mensaje: "Usuario no encontrado"
      });
    }

    await pool.query(

      `
      UPDATE usuarios
      SET clave = $1
      WHERE correo = $2
      `,

      [nuevaClave, correo]
    );

    res.json({
      success: true,
      mensaje: "Contraseña actualizada"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error en servidor"
    });
  }
};

const obtenerPerfil = async (req, res) => {

  try {

    const { id } = req.params;

    const resultado = await pool.query(
      `
      SELECT id, nombre, correo, telefono, direccion
      FROM usuarios
      WHERE id = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.json({
        success: false,
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      success: true,
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error en servidor"
    });
  }
};

const actualizarPerfil = async (req, res) => {

  try {

    const { id } = req.params;
    const {
      nombre,
      correo,
      telefono,
      direccion
    } = req.body;

    await pool.query(
      `
      UPDATE usuarios
      SET nombre = $1,
          correo = $2,
          telefono = $3,
          direccion = $4
      WHERE id = $5
      `,
      [nombre, correo, telefono, direccion, id]
    );

    res.json({
      success: true,
      mensaje: "Perfil actualizado correctamente"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      mensaje: "Error en servidor"
    });
  }
};

module.exports = {
  login,
  registrarUsuario,
  recuperarClave,
  obtenerPerfil,
  actualizarPerfil
};
