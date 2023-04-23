const _USERS = require("./users.json");
const _BOOKS = require("./books.json");

const User = require("../user");
const Product = require("../product");
const Cart = require("../cart");
const CartItem = require("../cartItem");
const Order = require("../order");
const OrderItem = require("../orderItem");

const modelsList = {
  user: User,
  product: Product,
  cartItem: CartItem,
  cart: Cart,
  orderItem: OrderItem,
  order: Order,
};

// после sync секвалайза запускаем функцию сидов
// в которой мы получаем имена созданных моделей и создаем обект models
// в котором собираются и имена моделей и их реальные модели
// и потом запускаем bulkCreate у каждой модели чтоб заполнить сиды

module.exports = (dbModels) => ({
  insert: () => {
    const models = {};
    Object.keys(dbModels).forEach((modelName) => {
      models[modelName] = modelsList[modelName];
    });

    Object.keys(dbModels).forEach((modelName) => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });

    models.user
      .bulkCreate(_USERS)
      .then(() => {
        models.product.bulkCreate(_BOOKS).then((res) => {});
      })
      .catch((error) => {
        console.log("77777777777777777777777777777 error", error);
      });
  },
});
