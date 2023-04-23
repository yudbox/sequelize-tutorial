const { CART } = require("./modelNames");

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Cart = sequelize.define(CART, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

module.exports = Cart;
