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
            const artworks = await Artwork.find({delete: false});
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
        const { id } = req.params;
        let artworkData = {};
        if (req.body.start_date) {
            artworkData.createdAt = {
                $gte: req.body.start_date
            };
        }
        if (req.body.end_date) {
            artworkData.createdAt = {
                $lte: req.body.end_date
            };
        }

        // Construct the query object dynamically based on the parameters received
        if (req.body.image) artworkData.image = req.body.image;
        if (req.body.name) artworkData.name = req.body.name;
        if (req.body.artist_id) artworkData.artist_id = req.body.artist_id;
        if (req.body.price) artworkData.price = req.body.price;
        if (req.body.current_bid) artworkData.current_bid = req.body.current_bid;
        if (req.body.description) artworkData.description = req.body.description;
        if (req.body.bought) artworkData.bought = req.body.bought;
        if (req.body.event_id) artworkData.event_id = req.body.event_id;
        try {
            const artwork = await Artwork.findByIdAndUpdate(
                id,
                {$set: artworkData},
                { new: true }
            );

            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send(artwork);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
    async softdeleteArtwork(req, res) {
        const { id } = req.params;
        try {
            const artwork = await Artwork.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send("Artwork deleted");
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
