const { Artwork, validateArtwork } = require("../models/artworkModel");

class ArtworkController {
    async createArtwork(req, res) {
        try {
            const { error } = validateArtwork(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const artwork = new Artwork(req.body);
            await artwork.save();

            return res.status(201).send(artwork);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllArtworks(req, res) {
        try {
            const artworks = await Artwork.find();
            return res.send(artworks);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getArtworkById(req, res) {
        try {
            const artwork = await Artwork.findById(req.params.id);
            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send(artwork);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateArtwork(req, res) {
        try {
            const { error } = validateArtwork(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const artwork = await Artwork.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send(artwork);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deleteArtwork(req, res) {
        try {
            const artwork = await Artwork.findByIdAndRemove(req.params.id);
            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send(artwork);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new ArtworkController();
