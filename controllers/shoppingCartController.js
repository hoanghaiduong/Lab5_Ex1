const { ShoppingCart } = require("../models");
const createResponse = require("../utils/responseHandler");

exports.getAllCarts = async (req, res) => {
  try {
    const carts = await ShoppingCart.findAll();
    res.json(carts);
  } catch (err) {
    res.status(400).json(createResponse("GET", 400, {}, err.message));
  }
};

exports.createCart = async (req, res) => {
  try {
    const { UserId, ProductId, Quantity } = req.body;
    const cart = await ShoppingCart.create({ UserId, ProductId, Quantity });
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json(createResponse("POST", 400, {}, err.message));
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { UserId, ProductId, Quantity } = req.body;
    await ShoppingCart.update(
      { UserId, ProductId, Quantity },
      { where: { CartId: id } }
    );
    res.json({ message: "Shopping cart updated successfully" });
  } catch (err) {
    res.status(400).json(createResponse("PUT", 400, {}, err.message));
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await ShoppingCart.destroy({ where: { CartId: id } });
    res.json({ message: "Shopping cart deleted successfully" });
  } catch (err) {
    res.status(400).json(createResponse("DELETE", 400, {}, err.message));
  }
};
