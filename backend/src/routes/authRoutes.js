const express = require("express");

const router = express.Router();

const {
  login,
  registrarUsuario,
  recuperarClave,
  obtenerPerfil,
  actualizarPerfil
} = require("../controllers/authController");

router.post("/login", login);

router.post(
  "/registro",
  registrarUsuario
);

router.post(
  "/recuperar",
  recuperarClave
);

router.get(
    "/perfil/:id", 
    obtenerPerfil);

router.put(
    "/perfil/:id",
    actualizarPerfil);

module.exports = router;