const Sequelize = require("sequelize");

const { sequelize } = require("../utils/database");

const Product = require("./product");
const Cart = require("./cart");
const Order = require("./order");
const { PRODUCT, CART, ORDER } = require("./modelNames");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

User.associate = (models) => {
  User.hasMany(models[PRODUCT], {
    foreignKey: "userId",
  });

  User.hasOne(models[CART], {
    foreignKey: "userId",
  });

  User.hasMany(models[ORDER], {
    foreignKey: "userId",
  });
};

// комбинирование этих дву параметров создает 3 типа связей, в данном случае One-To-Many
// User.hasMany(Product);

// взаимозаменяемые записи
// User.hasOne(Cart);

// но  User может принадлежать много заказов
// User.hasMany(Order);

module.exports = User;
