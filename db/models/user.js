const Sequelize = require("sequelize");
const { PRODUCT, USER, ORDER } = require("../../lib/constants").MODEL_NAMES;

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define(USER, {
    userId: {
      type: dataTypes.UUID,
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
    },
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    createdAt: {
      type: dataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });

  Model.associate = (models) => {
    // комбинирование этих дву параметров создает 3 типа связей, в данном случае One-To-Many
    Model.hasMany(models[PRODUCT], {
      as: USER,
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });

    // но  User может принадлежать много заказов
    Model.hasMany(models[ORDER], {
      as: "orderUser",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };

  return Model;
};

// User.hasMany(Product);
// // взаимозаменяемые записи
// User.hasOne(Cart);

// User.hasMany(Order);
