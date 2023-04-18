// https://sequelize.org/docs/v6/core-concepts/model-instances/
const Sequelize = require("sequelize");
const { sequelize } = require("../utils/database");

const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
