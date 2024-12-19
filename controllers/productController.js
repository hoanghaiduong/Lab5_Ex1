const { Product } = require("../models");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        res.status(400).json(createResponse("GET", 400, {}, err.message));
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { ProductName, Price, ManufacturingDate } = req.body;
        const product = await Product.create({ ProductName, Price, ManufacturingDate });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json(createResponse("POST", 400, {}, err.message));
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProductName, Price, ManufacturingDate } = req.body;
        await Product.update({ ProductName, Price, ManufacturingDate }, { where: { ProductId: id } });
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(400).json(createResponse("PUT", 400, {}, err.message));
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: { ProductId: id } });
        res.status(400).json(createResponse("DELETE", 400, {}, err.message));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
