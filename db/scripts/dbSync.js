require("../../lib/core/additionalInit");

const { closeConnection } = require("../../db");
const models = require("../models");

models.sequelize
  .sync({ force: true })
  .then(() => console.log("Done!"))
  .catch((ex) => console.error(__line, __filename, "Error:", ex))
  .finally(() => {
    closeConnection();
    process.exit();
  });
