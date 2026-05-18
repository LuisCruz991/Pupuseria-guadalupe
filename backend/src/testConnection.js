const pool = require("./config/db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Error conectando:", err);
  } else {
    console.log("Conexión exitosa");
    console.log(res.rows);
  }

  pool.end();
});