const Sequelize = require("sequelize");
const { ORDER, USER, PRODUCT, ORDER_ITEM } =
  require("../../lib/constants").MODEL_NAMES;

// https://sequelize.org/docs/v6/core-concepts/model-instances/

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(ORDER, {
    id: {
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

  Model.associate = (models) => {
    // Означает связь One-To-Many когда в модели Order появиться userId
    // означает что заказ может принадлежать только одному User
    Model.belongsTo(models[USER], {
      as: "orderUser",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    // создаст промежуточную таблицу OrderItem по которому у заказа (Order) может быть много Product (книг)
    Model.belongsToMany(models[PRODUCT], { through: ORDER_ITEM });
  };

  return Model;
};
