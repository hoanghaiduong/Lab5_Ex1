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
exports.getCartById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find cart by ID
      const cart = await ShoppingCart.findByPk(id);
  
      if (!cart) {
        return res.status(404).json({
          status: "error",
          message: `Shopping cart with ID ${id} not found`,
        });
      }
  
      res.json({
        status: "success",
        data: cart,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
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
  
      // Perform the update
      const [rowsUpdated] = await ShoppingCart.update(
        { UserId, ProductId, Quantity },
        { where: { CartId: id } }
      );
  
      // Check if any rows were updated
      if (rowsUpdated === 0) {
        return res
          .status(404)
          .json(createResponse("PUT", 404, {}, "Shopping cart not found"));
      }
  
      // Fetch the updated cart
      const updatedCart = await ShoppingCart.findByPk(id);
  
      res.json(
        createResponse("PUT", 200, {
          ShoppingCart: updatedCart,
        })
      );
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
