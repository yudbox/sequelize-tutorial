const { ORDER_ITEM } = require("./modelNames");

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

// https://sequelize.org/docs/v6/core-concepts/model-instances/

const OrderItem = sequelize.define(ORDER_ITEM, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
