const { Product } = require("../models");
const createResponse = require("../utils/responseHandler");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json(
      createResponse("GET", 200, {
        products: products,
      })
    );
  } catch (err) {
    res.status(400).json(createResponse("GET", 400, {}, err.message));
  }
};
exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find product by ID
      const product = await Product.findByPk(id);
  
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: `Product with ID ${id} not found`,
        });
      }
  
      res.json({
        status: "success",
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  };
  
exports.createProduct = async (req, res) => {
  try {
    const { ProductName, Price, ManufacturingDate } = req.body;
    const product = await Product.create({
      ProductName,
      Price,
      ManufacturingDate,
    });
    return res.json(
        createResponse("POST", 200, {
          Product:product,
        })
      );
  } catch (err) {
    res.status(400).json(createResponse("POST", 400, {}, err.message));
  }
};
exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { ProductName, Price, ManufacturingDate } = req.body;
  
      // Update the product
      await Product.update(
        { ProductName, Price, ManufacturingDate },
        { where: { ProductId: id } }
      );
  
      // Fetch the updated product
      const updatedProduct = await Product.findByPk(id);
  
      if (!updatedProduct) {
        return res
          .status(404)
          .json(createResponse("PUT", 404, {}, "Product not found"));
      }
  
      return res.json(
        createResponse("PUT", 200, {
          Product: updatedProduct,
        })
      );
    } catch (err) {
      return res.status(400).json(createResponse("PUT", 400, {}, err.message));
    }
  };
  

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({ where: { ProductId: id } });
    res.status(200).json(createResponse("DELETE", 200, {message:"Product deleted with id: " + id}));
  } catch (err) {
    res.status(400).json(createResponse("DELETE", 400, {}, err.message));
  }
};
