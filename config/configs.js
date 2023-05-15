const constants = require("../lib/constants");
require("dotenv").config();

const {
  NODE_ENV,
  PORT,
  POSTGRES_DB = "sequel",
  POSTGRES_USER = "root",
  POSTGRES_PASSWORD,
  POSTGRES_HOST = "0.0.0.0",
  POSTGRES_PORT = "5432",
  MONGODB_USER = "ayudbox",
  MONGODB_PASSWORD,
} = process.env;

module.exports = {
  nodeEnv: NODE_ENV,
  isDevelopment: NODE_ENV === constants.ENVIRONMENT.DEVELOPMENT,
  //   showConfigs:
  //     SHOW_CONFIGS.toString() === constants.NEED_TO_SHOW_CONFIGS.YES.toString(),
  service: {
    local: {
      host: "localhost",
      port: PORT,
    },
  },
  db: {
    dbName: POSTGRES_DB,
    dbUser: POSTGRES_USER,
    dbPassword: POSTGRES_PASSWORD,
    dbHost: POSTGRES_HOST,
    dbPort: POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
    timeout: 30 * 1000, // ms
    timezone: "+00:00",
    migrationStorageTableName: "migrations",
    pool: {
      min: 2,
    },
  },
};
