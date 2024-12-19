const axios = require("axios");
const { User } = require("../models");

exports.fetchAndSaveUsers = async (req, res) => {
    try {
        const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");

        const savedUsers = await Promise.all(
            users.map((user) => 
                User.create({
                    FullName: user.name,
                    Address: user.address.street + ", " + user.address.city,
                    RegistrationDate: new Date(),
                })
            )
        );

        res.json({ status: "success", savedUsers });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};
