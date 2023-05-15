const errorController = require("../controllers/error");
const adminRouter = require("../routes/admin");
const shopRouter = require("../routes/shop");
const models = require("../db/models");

module.exports = (app) => {
  app.get("/check", (req, res) => res.end("OK"));
  // добавляею этот мидлвар чтоб в каждом запросе был user
  app.use(async (req, res, next) => {
    let user = await models.user.findAll();
    console.log("4444444444444444444444444 user", user);
    req.user = user[0];
    next();
  });
  app.use("/admin", adminRouter);
  app.use("/", shopRouter);
  app.use(errorController.get404);
};
