const Sequelize = require("sequelize");
const { db } = require("../config/configs");

let connection;

const getConnection = () => {
  if (!connection) {
    try {
      connection = new Sequelize(db.dbName, db.dbUser, db.dbPassword, db);
    } catch (ex) {
      console.error(__filename, "Error:", ex);
      process.exit(1);
    }
  }

  return connection;
};

const closeConnection = () => {
  if (connection && typeof connection.close === "function") {
    try {
      connection.close();
      connection = null;
    } catch (ex) {
      console.error(__filename, "Error:", ex);
    }
  }
};

const describeSeeder = (tableName, data = []) => {
  return {
    up: (queryInterface) => queryInterface.bulkInsert(tableName, data, {}),
    down: (queryInterface) => queryInterface.bulkDelete(tableName, null),
  };
};

const checkDbConnection = async () => {
  try {
    const dbConnection = await getConnection();

    await dbConnection.authenticate();
  } catch (ex) {
    console.error(__filename, "Error:", ex);
    return false;
  }

  return true;
};

module.exports = {
  getConnection,
  closeConnection,
  describeSeeder,
  checkDbConnection,
};
