// https://sequelize.org/docs/v6/core-concepts/model-instances/
const Sequelize = require("sequelize");

const { sequelize } = require("../utils/database");

const User = require("./user");
const Product = require("./product");
const OrderItem = require("./order-item");
const { USER, PRODUCT, ORDER_ITEM } = require("./modelNames");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

Order.associate = (models) => {
  Order.belongsTo(models[USER], {
    constraints: true,
    onDelete: "CASCADE",
    foreignKey: "userId",
    targetKey: "id",
  });

  Order.belongsToMany(models[PRODUCT], {
    // as: "products123143",
    foreignKey: "productId",
    through: models[ORDER_ITEM],
  });

  // Cart.hasMany(models[CART_ITEM], {
  //   foreignKey: "productId",
  //   as: "cartItems1",
  // });
};

// Означает связь One-To-Many когда в модели Order появиться userId
// означает что заказ может принадлежать только одному User
// Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

// создаст промежуточную таблицу OrderItem по которому у заказа (Order) может быть много Product (книг)
// Order.belongsToMany(Product, { through: OrderItem });

module.exports = Order;
