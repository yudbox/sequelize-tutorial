const Sequelize = require("sequelize");
const { CART_ITEM } = require("../../lib/constants").MODEL_NAMES;

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(CART_ITEM, {
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

  return Model;
};
