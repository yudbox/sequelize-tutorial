const Sequelize = require("sequelize");

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

module.exports = sequelize;
