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
        const { id } = req.params;
        let messageData = {};

        if (req.body.user_id) messageData.user_id = req.body.user_id;
        if (req.body.user_name) messageData.user_name = req.body.user_name;
        if (req.body.useremail) messageData.useremail = req.body.useremail;
        if (req.body.message) messageData.message = req.body.message;
        if (req.body.deleted !== undefined) messageData.deleted = req.body.deleted;
        if (req.body.editing_allowed !== undefined) messageData.editing_allowed = req.body.editing_allowed;
        if (req.body.image) messageData.image = req.body.image;

        try {
            const { error } = validateMessage(messageData, true);
            if (error) return res.status(400).send(error.details[0].message);

            const message = await Message.findByIdAndUpdate(
                id,
                { $set: messageData },
                { new: true }
            );

            if (!message) return res.status(404).send("Message not found");

            return res.send(message);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async softdeleteMessage(req, res) {
        const { id } = req.params;
        try {
            const message = await Message.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!message) return res.status(404).send("Message not found");

            return res.send("Message deleted");
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
