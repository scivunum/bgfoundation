const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');

// Create a new event
router.post('/', EventController.createEvent);

// Get all events
router.get('/', EventController.getAllEvents);

// Get a single event by ID
router.get('/:id', EventController.getEventById);

// Update an existing event
router.put('/:id', EventController.updateEvent);

// Soft delete an existing event
router.patch('/softdelete/:id', EventController.softdeleteEvent);

// Delete an existing event
router.delete('/harddelete/:id', EventController.deleteEvent);

module.exports = router;
