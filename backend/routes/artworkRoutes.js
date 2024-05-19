const express = require('express');
const router = express.Router();
const ArtworkController = require('../controller/artworkController');

// Route to create a new artwork
router.post('/', ArtworkController.createArtwork);

// Route to get all artworks
router.get('/', ArtworkController.getAllArtworks);

// Route to get a specific artwork by ID
router.get('/:id', ArtworkController.getArtworkById);

// Route to update an artwork
router.patch('/:id', ArtworkController.updateArtwork);

// Route to soft delete an artwork
router.patch('/softdelete/:id', ArtworkController.softdeleteArtwork);

// Route to delete an artwork
router.delete('/harddelete/:id', ArtworkController.deleteArtwork);

module.exports = router;
