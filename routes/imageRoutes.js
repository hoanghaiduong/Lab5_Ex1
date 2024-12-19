const express = require("express");
const imageController = require("../controllers/imageController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UploadResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the operation
 *         path:
 *           type: string
 *           description: Path where the image is saved
 *       example:
 *         status: success
 *         path: "uploads/1678901234567-example.jpg"
 */

/**
 * @swagger
 * /images/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: No image uploaded
 */
router.post("/upload", imageController.uploadImage, imageController.saveImage);

/**
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Retrieve a saved image
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file
 *     responses:
 *       200:
 *         description: The requested image
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found
 */
router.get("/:filename", imageController.displayImage);

module.exports = router;
