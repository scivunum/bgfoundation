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
        const { id } = req.params;
        let userData = {};

        if (req.body.email) userData.email = req.body.email;
        if (req.body.name) userData.name = req.body.name;
        if (req.body.password) userData.password = req.body.password;
        if (req.body.image) userData.image = req.body.image;
        if (req.body.role) userData.role = req.body.role;
        if (req.body.status) userData.status = req.body.status;
        if (req.body.deleted !== undefined) userData.deleted = req.body.deleted;
        if (req.body.events_joined) userData.events_joined = req.body.events_joined;
        if (req.body.artworks_bought) userData.artworks_bought = req.body.artworks_bought;
        if (req.body.address) userData.address = req.body.address;
        if (req.body.facebook) userData.facebook = req.body.facebook;
        if (req.body.instagram) userData.instagram = req.body.instagram;
        if (req.body.twitter) userData.twitter = req.body.twitter;
        if (req.body.linkedin) userData.linkedin = req.body.linkedin;
        if (req.body.phonenumber) userData.phonenumber = req.body.phonenumber;
        if (req.body.telegram) userData.telegram = req.body.telegram;
        if (req.body.creditcard) userData.creditcard = req.body.creditcard;
        if (req.body.cryptowallet) userData.cryptowallet = req.body.cryptowallet;

        try {
            const user = await User.findByIdAndUpdate(
                id,
                { $set: userData },
                { new: true }
            );

            if (!user) return res.status(404).send("User not found");

            return res.send(user);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async softdeleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!user) return res.status(404).send("User not found");

            return res.send("User deleted");
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
