require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");

const sequelize = require("./utils/database");
const seed = require("./models/seeds");
const middlaware = require("./middleware/middleware");

const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");
const CartItem = require("./models/cartItem");

const PORT = process.env.PORT || 4000;
const app = express();

middlaware(app, express);

// setup the routes
require("./routes")(app);

// комбинирование этих дву параметров создает 3 типа связей, в данном случае One-To-Many
User.hasMany(Product);
// взаимозаменяемые записи
User.hasOne(Cart);
// но  User может принадлежать много заказов
User.hasMany(Order);

// https://sequelize.org/docs/v6/core-concepts/assocs/#one-to-many-relationships
// Означает связь One-To-Many когда в модели Product появиться userId
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

Product.belongsToMany(Cart, { through: CartItem });

// Означает связь One-To-One когда в модели Cart появиться userId
Cart.belongsTo(User);

// Означает связь Many-To-Many когда в Cart(корзине) может быть много продуктов
// и Product может содержаться в нескольких Cart(корзинах)
// и эти связи будут содержаться в модели CartItem,
// в которой к cartId будет привязано несколько productId и наоборот
// CartItem что-то вроде мидлвара (table in between) которая связывает две таблицы
Cart.belongsToMany(Product, { through: CartItem });

// Означает связь One-To-Many когда в модели Order появиться userId
// означает что заказ может принадлежать только одному User
Order.belongsTo(User);

// создаст промежуточную таблицу OrderItem по которому у заказа (Order) может быть много Product (книг)
Order.belongsToMany(Product, { through: OrderItem });

console.log(
  "---------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>"
);
const start = async () => {
  const mongoUser = process.env.MONGODB_USER;
  const mongoPassword = process.env.MONGODB_PASSWORD;

  /*
  CONNECTING TO MONGO  
  
  */
  try {
    await mongoose.connect(
      `mongodb+srv://${mongoUser}:${mongoPassword}@sequeldb.rmjnawi.mongodb.net/?retryWrites=true&w=majority`
    );
    // console.log("111111111111 mongoose connected ");
  } catch (error) {
    console.log("database error ", error);
  }

  /*
  CONNECTING TO SQL  
  
  */

  try {
    const sequelizeConnection = await sequelize.sync();
    // .sync({ force: true });

    await seed(sequelizeConnection.models).insert();

    console.log(
      "database  connected at port:",
      sequelizeConnection.config.port
    );

    let user = await User.findAll();

    if (!user[0]) {
      console.log("1111111111111111 root user just created");
      user = await User.create({ name: "Alex", email: "alex@gmail.com" });
      // console.log("1111111111111111 root user1 = ", user);
      await user.createCart();
    } else {
      // console.log("1111111111111111 root user2 = ", user);
      await user[0].createCart();
    }
  } catch (error) {
    console.log("database error ", error);
  }

  app.listen(PORT, () =>
    console.log(`11111111111 server started at port: ${PORT}`)
  );
};

start();
