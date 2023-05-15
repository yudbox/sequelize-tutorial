const sequelizeConfig = require("../config/configs").db;

const config = {
  development: {
    username: sequelizeConfig.dbUser,
    password: sequelizeConfig.dbPassword,
    database: sequelizeConfig.dbName,
    host: sequelizeConfig.dbHost,
    dialect: sequelizeConfig.dialect,
  },
};

module.exports = config;
