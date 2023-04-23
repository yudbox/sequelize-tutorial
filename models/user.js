const { USER } = require("./modelNames");
const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const User = sequelize.define(USER, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

module.exports = User;
