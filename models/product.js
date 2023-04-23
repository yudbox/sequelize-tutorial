const { PRODUCT } = require("./modelNames");

const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

// https://sequelize.org/docs/v6/core-concepts/model-instances/

const Product = sequelize.define(PRODUCT, {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
