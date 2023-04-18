// https://sequelize.org/docs/v6/core-concepts/model-instances/
const Sequelize = require("sequelize");

const { sequelize } = require("../utils/database");

const User = require("./user");
const Product = require("./product");
const CartItem = require("./cart-item");
const { USER, PRODUCT, CART_ITEM } = require("./modelNames");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
});

Cart.associate = (models) => {
  Cart.belongsTo(models[USER], {
    foreignKey: "userId",
    targetKey: "id",
  });

  Cart.belongsToMany(models[PRODUCT], {
    // as: "products123143",
    foreignKey: "productId",
    through: models[CART_ITEM],
  });

  // Cart.hasMany(models[CART_ITEM], {
  //   foreignKey: "productId",
  //   as: "cartItems1",
  // });
};
// Означает связь One-To-One когда в модели Cart появиться userId
// Cart.belongsTo(User);

// Означает связь Many-To-Many когда в Cart(корзине) может быть много продуктов
// и Product может содержаться в нескольких Cart(корзинах)
// и эти связи будут содержаться в модели CartItem,
// в которой к cartId будет привязано несколько productId и наоборот
// CartItem что-то вроде мидлвара (table in between) которая связывает две таблицы
// Cart.belongsToMany(Product, { as: "Stored", through: CartItem });

module.exports = Cart;
