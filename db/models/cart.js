const Sequelize = require("sequelize");
const { CART, USER, PRODUCT, CART_ITEM } =
  require("../../lib/constants").MODEL_NAMES;

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(CART, {
    cartId: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
  // Cart.belongsTo(User);

  Model.associate = (models) => {
    // Означает связь One-To-One когда в модели Cart появиться userId
    Model.belongsTo(models[USER], {
      as: USER,
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    // Означает связь Many-To-Many когда в Cart(корзине) может быть много продуктов
    // и Product может содержаться в нескольких Cart(корзинах)
    // и эти связи будут содержаться в модели CartItem,
    // в которой к cartId будет привязано несколько productId и наоборот
    // CartItem что-то вроде мидлвара (table in between) которая связывает две таблицы
    Model.belongsToMany(models[PRODUCT], { through: CART_ITEM });
  };

  return Model;
};
