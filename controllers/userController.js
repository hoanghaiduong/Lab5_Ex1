const { User } = require("../models");
const createResponse = require("../utils/responseHandler");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(
      createResponse("GET", 200, {
        users: users,
      })
    );
  } catch (err) {
    res.status(400).json(createResponse("GET", 400, {}, err.message));
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { FullName, Address, RegistrationDate } = req.body;
    const user = await User.create({ FullName, Address, RegistrationDate });
    res.status(201).json(
      createResponse("POST", 200, {
        User: user,
      })
    );
  } catch (err) {
    res.status(400).json(createResponse("POST", 400, {}, err.message));
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { FullName, Address, RegistrationDate } = req.body;
    const user = await User.update(
      { FullName, Address, RegistrationDate },
      { where: { UserId: id } }
    );
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(400).json(createResponse("PUT", 400, {}, err.message));
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { UserId: id } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json(createResponse("DELETE", 400, {}, err.message));
  }
};
