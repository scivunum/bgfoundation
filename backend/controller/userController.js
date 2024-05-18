const { User, validateUserData } = require("../models/userModel");

class UserController {
    async createUser(req, res) {
        try {
            const { error } = validateUserData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const user = new User(req.body);
            await user.save();

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return res.send(users);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send("User not found");

            return res.send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateUser(req, res) {
        try {
            const { error } = validateUserData(req.body, true);
            if (error) return res.status(400).send(error.details[0].message);

            const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!user) return res.status(404).send("User not found");

            return res.send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            if (!user) return res.status(404).send("User not found");

            return res.send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new UserController();
