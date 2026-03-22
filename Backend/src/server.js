const app = require("./app");
const { PORT } = require("./config/constants");

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
