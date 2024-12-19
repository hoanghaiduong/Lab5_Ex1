const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require('./models'); // Import from models/index.js


require("dotenv").config();

const app = express();
sequelize
  .sync({ force: true, alter: true }) // Set force: true to reset the database
  .then(() => {
    console.log("Database tables synced.");
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample Route to Test CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
