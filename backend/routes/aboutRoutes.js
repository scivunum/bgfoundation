const express = require('express');
const router = express.Router();
const AboutController = require('../controller/aboutController');

// Get all about entries
router.get('/', AboutController.getAllAbout);

// Get a single about entry by ID
router.get('/:id', AboutController.getAboutById);

// Create a new about entry
router.post('/', AboutController.createAbout);

// Update an existing about entry
router.patch('/:id', AboutController.updateAbout);

// Delete an existing about entry
router.delete('/:id', AboutController.deleteAbout);

module.exports = router;
