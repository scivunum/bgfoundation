const express = require('express');
const router = express.Router();
const MessageController = require('../controller/messageController');

// Create a new message
router.post('/', MessageController.createMessage);

// Get all messages
router.get('/', MessageController.getAllMessages);

// Get a single message by ID
router.get('/:id', MessageController.getMessageById);

// Update an existing message
router.put('/:id', MessageController.updateMessage);

// Delete an existing message
router.delete('/:id', MessageController.deleteMessage);

module.exports = router;
