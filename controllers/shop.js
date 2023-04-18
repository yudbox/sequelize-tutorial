const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log("error from getProducts", err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log("error from findByPk", err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log("error from getIndex", err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
        });
      });
    })
    .catch((err) => console.log("getCart err", err));
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity = 1;

  try {
    // находим корзину данного юзера
    const userCart = await req.user.getCart();

    // находим продукт(книгу) по id в данной корзине
    const products = await userCart.getProducts({ where: { id: prodId } });

    // если данный продукт (книга) уже находится в корзине
    // то получаем количество сколько раз он (она - книга) была добавлена в корзину и
    // увеличиваем значение на один
    if (products.length) {
      const oldQuantity = products[0].cartItem.quantity;
      newQuantity = oldQuantity + 1;

      // если данный продукт (книга) не привязан к корзине данного юзера
      // то добавляем его (ее - книгу) и ставим quantity 1 (еденицу)
      userCart.addProduct(products[0], {
        through: { quantity: newQuantity },
      });
      return res.redirect("/cart");
    }

    Product.findByPk(prodId).then((product) => {
      userCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    });
    res.redirect("/cart");
  } catch (error) {
    console.log("getCart err", error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const userCart = await req.user.getCart();
    const products = await userCart.getProducts({ where: { id: prodId } });
    const product = products[0];
    product.cartItem.destroy();
    res.redirect("/cart");
  } catch (error) {
    console.log("postCartDeleteProduct err", error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await order.addProducts(
      products.map((product) => {
        console.log("44444444444444 product", product);
        // {
        //   dataValues: {
        //     id: '404ea463-996b-49f9-8c1b-ad29b139ac17',
        //     title: 'Book 1',
        //     price: 55,
        //     imageUrl: 'https://dictionary.cambridge.org/images/full/book_noun_001_01679.jpg?version=5.0.310',
        //     description: 'sgg g gfd fds dgdsfg',
        //     createdAt: 2023-04-15T20:43:33.790Z,
        //     updatedAt: 2023-04-15T20:43:33.790Z,
        //     userId: 'd563cdb0-176e-4b06-b905-83cb6a0d0d1b',
        //     cartItem: cartItem {
        //       dataValues: [Object],
        //     }
        //   },
        //   cartItem: cartItem {
        //     dataValues: {
        //       id: '772a1dbc-4a31-4357-9f3d-485f99c000c7',
        //       quantity: 3,
        //       createdAt: 2023-04-15T20:43:36.636Z,
        //       updatedAt: 2023-04-15T21:13:14.497Z,
        //       cartId: 'b32ca4b4-e8e6-4bd6-b1c2-c1e9fec2cbae',
        //       productId: '404ea463-996b-49f9-8c1b-ad29b139ac17'
        //     },
        //   }
        // }
        // добавляем в заказ Product (книгу) с количеством которае указано в cartItem модели
        // для этого в orderItem обект который привязан через Order.belongsToMany(Product, { through: OrderItem });
        // добавляем св-во quantity которое равно quantity в cartItem модели
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      })
    );
    // после того как Products (книги) были добавлены в Order
    // обнуляем (удаляем) все Products (книги) из Cart(корзины) модели
    await cart.setProducts(null);
    res.redirect("/orders");
  } catch (error) {
    console.log("postOrder err", error);
  }
};

exports.getOrders = async (req, res, next) => {
  // getOrder работает благодаря ассоциации Order.belongsTo(User);
  // т.к. user имеет ассоциацию с Product Product.belongsTo(User);
  // используем JOIN чтоб включить products в запрос
  // products это как таблица газвана в БД
  const orders = await req.user.getOrders({ include: ["products"] });
  console.log("4444444444444444 orders", orders);
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders,
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
