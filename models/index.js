const { Sequelize } = require("sequelize");
const sequelize = require("../db");

// Initialize models
const UserModel = require("./User");
const ProductModel = require("./Product");
const ShoppingCartModel = require("./ShoppingCart");

// Create instances of models
const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const ShoppingCart = ShoppingCartModel(sequelize);

// Define Relationships
User.hasMany(ShoppingCart, { foreignKey: "UserId" });
ShoppingCart.belongsTo(User, { foreignKey: "UserId" });

Product.hasMany(ShoppingCart, { foreignKey: "ProductId" });
ShoppingCart.belongsTo(Product, { foreignKey: "ProductId" });

// Export models and sequelize
module.exports = {
  sequelize,
  User,
  Product,
  ShoppingCart,
};
