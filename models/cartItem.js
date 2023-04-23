const { CART_ITEM } = require("./modelNames");

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const CartItem = sequelize.define(CART_ITEM, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
