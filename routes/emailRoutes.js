const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     EmailRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The recipient's email address
 *         subject:
 *           type: string
 *           description: The subject of the email
 *         message:
 *           type: string
 *           description: The body of the email
 *       required:
 *         - email
 *         - message
 *       example:
 *         email: "example@example.com"
 *         subject: "Test Email"
 *         message: "This is a test email."
 *     EmailResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           description: Status of the email operation
 *         message:
 *           type: string
 *           description: Message indicating the result of the operation
 *       example:
 *         status: "success"
 *         message: "Email sent to example@example.com"
 */

/**
 * @swagger
 * /email/send:
 *   post:
 *     summary: Send an email to a user
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailRequest'
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmailResponse'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post("/send", emailController.sendEmail);

module.exports = router;
