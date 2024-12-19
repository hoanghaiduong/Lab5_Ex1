const { configDotenv } = require("dotenv");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for the API endpoints",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`, // Base URL for your API
        description: "Development Server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            UserId: {
              type: "integer",
              description: "The unique ID of the user",
            },
            FullName: {
              type: "string",
              description: "Full name of the user",
            },
            Address: {
              type: "string",
              description: "Address of the user",
            },
            RegistrationDate: {
              type: "string",
              format: "date-time",
              description: "The date when the user registered",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            ProductId: {
              type: "integer",
              description: "The unique ID of the product",
            },
            ProductName: {
              type: "string",
              description: "Name of the product",
            },
            Price: {
              type: "number",
              format: "double",
              description: "Price of the product",
            },
            ManufacturingDate: {
              type: "string",
              format: "date-time",
              description: "Manufacturing date of the product",
            },
          },
        },
        ShoppingCart: {
          type: "object",
          properties: {
            CartId: {
              type: "integer",
              description: "The unique ID of the shopping cart",
            },
            UserId: {
              type: "integer",
              description: "ID of the user who owns the cart",
            },
            ProductId: {
              type: "integer",
              description: "ID of the product in the cart",
            },
            Quantity: {
              type: "integer",
              description: "Quantity of the product",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your route files with Swagger documentation
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
