const { User } = require("../models");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { FullName, Address, RegistrationDate } = req.body;
    const user = await User.create({ FullName, Address, RegistrationDate });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { UserId: id } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
