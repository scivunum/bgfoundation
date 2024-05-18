const { Message, validateMessage } = require("../models/messageModel");

class MessageController {
    async createMessage(req, res) {
        try {
            const { error } = validateMessage(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const message = new Message(req.body);
            await message.save();

            return res.status(201).send(message);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllMessages(req, res) {
        try {
            const messages = await Message.find();
            return res.send(messages);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getMessageById(req, res) {
        try {
            const message = await Message.findById(req.params.id);
            if (!message) return res.status(404).send("Message not found");

            return res.send(message);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateMessage(req, res) {
        try {
            const { error } = validateMessage(req.body, true);
            if (error) return res.status(400).send(error.details[0].message);

            const message = await Message.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!message) return res.status(404).send("Message not found");

            return res.send(message);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deleteMessage(req, res) {
        try {
            const message = await Message.findByIdAndRemove(req.params.id);
            if (!message) return res.status(404).send("Message not found");

            return res.send(message);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new MessageController();
