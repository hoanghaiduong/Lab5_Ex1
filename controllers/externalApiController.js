const axios = require("axios");
const { User } = require("../models");

exports.fetchAndSaveUsers = async (req, res) => {
  try {
    // Fetch users from the external API
    const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");

    // Prepare user data for bulk creation
    const userData = users.map((user) => ({
      FullName: user.name,
      Address: `${user.address.street}, ${user.address.city}`,
      RegistrationDate: new Date(),
    }));

    // Save users in bulk
    const savedUsers = await User.bulkCreate(userData, { ignoreDuplicates: true });

    res.json({
      status: "success",
      message: "Users fetched and saved successfully",
      savedUsers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred while fetching and saving users",
    });
  }
};
