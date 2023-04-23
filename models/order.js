const { ORDER } = require("./modelNames");

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

// https://sequelize.org/docs/v6/core-concepts/model-instances/

const Order = sequelize.define(ORDER, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

module.exports = Order;
