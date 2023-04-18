const errorController = require("../controllers/error");
const adminRouter = require("../routes/admin");
const shopRouter = require("../routes/shop");
const User = require("../models/user");

module.exports = (app) => {
  // добавляею этот мидлвар чтоб в каждом запросе был user
  app.use(async (req, res, next) => {
    let user = await User.findAll();

    req.user = user[0];
    next();
  });
  app.use("/admin", adminRouter);
  app.use("/", shopRouter);
  app.use(errorController.get404);
};
