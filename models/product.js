// https://sequelize.org/docs/v6/core-concepts/model-instances/
const Sequelize = require("sequelize");

const { sequelize } = require("../utils/database");
const User = require("./user");
const Cart = require("./cart");
const CartItem = require("./cart-item");
const { CART, CART_ITEM, USER } = require("./modelNames");

const Product = sequelize.define("product", {
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

Product.associate = (models) => {
  Product.belongsTo(models[USER], {
    foreignKey: "userId",
    targetKey: "id",
  });

  Product.belongsToMany(models[CART], {
    foreignKey: "cartId",
    through: models[CART_ITEM],
  });
};

// https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
// Означает связь One-To-Many когда в модели Product появиться userId
// Product.belongsTo(User, { constraints: false, onDelete: "CASCADE" });

// Product.belongsToMany(Cart, { as: "Storage", through: CartItem });

module.exports = Product;
