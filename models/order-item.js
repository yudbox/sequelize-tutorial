// https://sequelize.org/docs/v6/core-concepts/model-instances/
const Sequelize = require("sequelize");

const { sequelize } = require("../utils/database");

const OrderItem = sequelize.define("orderItem", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

module.exports = OrderItem;
