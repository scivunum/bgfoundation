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
router.patch('/:id', MessageController.updateMessage);

// Soft delete an existing message
router.patch('/softdelete/:id', MessageController.softdeleteMessage);

// Delete an existing message
router.delete('/harddelete/:id', MessageController.deleteMessage);

module.exports = router;
