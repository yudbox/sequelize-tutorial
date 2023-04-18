const bodyParser = require("body-parser");
const cors = require("cors");
// const favicon = require("serve-favicon");
// const logger = require("morgan");
// const cookieParser = require("cookie-parser");

const path = require("path");

// setup global middleware here
module.exports = (app, express) => {
  app.use(cors());
  //   app.use(favicon(path.join(__dirname, "../../src/favicon.ico")));
  app.set("view engine", "ejs");
  app.set("views", "views");
  // app.use(logger("dev"));

  // парсит req.body объект
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "../public")));

  // app.use(cookieParser());
};
