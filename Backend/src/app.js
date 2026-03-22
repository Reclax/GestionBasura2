const express = require("express");
const wasteRoutes = require("./routes/wasteRoutes");

const app = express();

app.use(express.json());
app.use("/api", wasteRoutes);

app.get("/", (_req, res) => {
  res.send("Servidor API de Gestion Basura activo");
});

app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).json({
    success: false,
    message: error.message || "Error interno del servidor",
  });
});

module.exports = app;
