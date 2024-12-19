const express = require("express");
const externalApiController = require("../controllers/externalApiController");

const router = express.Router();

/**
 * @swagger
 * /external/fetch-users:
 *   get:
 *     summary: Fetch users from an external API and save them to the database
 *     tags: [External API]
 *     responses:
 *       200:
 *         description: Users fetched and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: success
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: Users fetched and saved successfully
 *                 savedUsers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       UserId:
 *                         type: integer
 *                         description: The unique ID of the user
 *                       FullName:
 *                         type: string
 *                         description: Full name of the user
 *                       Address:
 *                         type: string
 *                         description: Address of the user
 *                       RegistrationDate:
 *                         type: string
 *                         format: date-time
 *                         description: Registration date of the user
 *       500:
 *         description: Error occurred while fetching or saving users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation
 *                   example: error
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: An error occurred while fetching and saving users
 */
router.get("/fetch-users", externalApiController.fetchAndSaveUsers);

module.exports = router;
