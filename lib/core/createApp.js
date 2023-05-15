const express = require("express");

const middlaware = require("../middlewares/middleware");
const routes = require("../../routes");

module.exports = () => {
  const app = express();

  middlaware(app, express);
  routes(app);

  return app;
};
