const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models"); // Import from models/index.js
const setupSwagger = require("./utils/swaggerConfig");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const shoppingCartRoutes = require("./routes/shoppingCartRoutes");
const emailRoutes = require("./routes/emailRoutes");
const imageRoutes = require("./routes/imageRoutes");
const externalApiRoutes = require("./routes/externalApiRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample Route to Test CORS
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", shoppingCartRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/external", externalApiRoutes);
// Swagger setup
setupSwagger(app);

sequelize
  .sync({ force: true, alter: true }) // Set force: true to reset the database
  .then(() => {
    console.log("Database tables synced.");
  })
  .catch((err) => {
    console.error("Error syncing tables:", err);
  });

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
