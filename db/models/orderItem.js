const Sequelize = require("sequelize");
const { ORDER_ITEM } = require("../../lib/constants").MODEL_NAMES;

// https://sequelize.org/docs/v6/core-concepts/model-instances/

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(ORDER_ITEM, {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
    },
    quantity: dataTypes.INTEGER,
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  return Model;
};
