const express = require("express");
const externalApiController = require("../controllers/externalApiController");

const router = express.Router();

router.get("/fetch-users", externalApiController.fetchAndSaveUsers);

module.exports = router;
