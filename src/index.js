const express = require("express");
const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
const db = require("./models/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
});
