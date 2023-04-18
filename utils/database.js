const Sequelize = require("sequelize");

exports.models = (sequelize) => {
  const { models } = sequelize;
  console.log(
    "3333333333333333333333333 models",
    "associate" in models["cart"]
  );

  // feathersApp.setup = (...args) => {
  // @ts-ignore
  // const result = oldSetup.apply(this, args);

  // Set up data relationships

  Object.keys(models).forEach((name) => {
    if ("associate" in models[name]) {
      // @ts-ignore Property 'associate' does not exist on type 'ModelCtor<Model<any, any>>'
      models[name].associate(models);
    }
  });
  // return result;
  // };
};

const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  // logging: true,
});

exports.sequelize = sequelize;
