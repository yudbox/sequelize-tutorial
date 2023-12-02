const Sequelize = require("sequelize");
const { PRODUCT, USER, CART, CART_ITEM } =
  require("../../lib/constants").MODEL_NAMES;

// https://sequelize.org/docs/v6/core-concepts/model-instances/

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(PRODUCT, {
    productId: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
    },
    title: dataTypes.STRING,
    price: {
      type: dataTypes.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    // userId: {
    //   type: dataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  Model.associate = (models) => {
    // https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
    // Означает связь One-To-Many когда в модели Product появиться userId
    Model.belongsTo(models[USER], {
      as: USER,
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    Model.belongsToMany(models[CART], { through: CART_ITEM });
  };

  return Model;
};
