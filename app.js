require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");

const { models, sequelize } = require("./utils/database");
const seed = require("./models/seeds");
const middlaware = require("./middleware/middleware");

const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const PORT = process.env.PORT || 4000;
const app = express();

middlaware(app, express);

// setup the routes
require("./routes")(app);

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
    console.log("111111111111 mongoose connected ");
  } catch (error) {
    console.log("database error ", error);
  }

  /*
  CONNECTING TO SQL  
  
  */

  try {
    const sequelizeConnection = await sequelize.sync({ force: true });

    await models(sequelizeConnection);

    // .sync();

    // console.log("1111111111111111111 database ", sequelizeConnection);

    // await seed(sequelizeConnection.models).insert();

    console.log(
      "database  connected at port:",
      sequelizeConnection.config.port
    );

    let user = await User.findAll();

    if (!user[0]) {
      console.log("1111111111111111 root user just created");
      user = await User.create({ name: "Alex", email: "alex@gmail.com" });
      console.log("1111111111111111 root user1 = ", user);
      // await user.createCart();
    } else {
      console.log("1111111111111111 root user2 = ", user);
      // await user[0].createCart();
    }
  } catch (error) {
    console.log("database error ", error);
  }

  app.listen(PORT, () =>
    console.log(`11111111111 server started at port: ${PORT}`)
  );
};

start();
