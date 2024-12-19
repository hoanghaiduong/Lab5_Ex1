const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingCart:
 *       type: object
 *       properties:
 *         CartId:
 *           type: integer
 *           description: The unique ID of the shopping cart
 *         UserId:
 *           type: integer
 *           description: The ID of the user who owns the shopping cart
 *         ProductId:
 *           type: integer
 *           description: The ID of the product in the shopping cart
 *         Quantity:
 *           type: integer
 *           description: The quantity of the product in the shopping cart
 *       required:
 *         - UserId
 *         - ProductId
 *         - Quantity
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all shopping carts
 *     tags: [ShoppingCart]
 *     responses:
 *       200:
 *         description: List of all shopping carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingCart'
 */
router.get("/", shoppingCartController.getAllCarts);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new shopping cart entry
 *     tags: [ShoppingCart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCart'
 *     responses:
 *       201:
 *         description: The created shopping cart entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 */
router.post("/", shoppingCartController.createCart);

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update an existing shopping cart entry
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCart'
 *     responses:
 *       200:
 *         description: The updated shopping cart entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 */
router.put("/:id", shoppingCartController.updateCart);

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete a shopping cart entry
 *     tags: [ShoppingCart]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The cart ID
 *     responses:
 *       200:
 *         description: The deleted shopping cart entry
 */
router.delete("/:id", shoppingCartController.deleteCart);

module.exports = router;
