const { Artwork, validateArtwork } = require("../models/artworkModel");

class ArtworkController {
    async createArtwork(req, res) {
        try {
            const { error } = validateArtwork(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const artwork = new Artwork(req.body);
            await artwork.save();

            return res.status(201).send({'success':true,'data':artwork});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});;
        }
    }

    async getAllArtworks(req, res) {
        let query = req.query;
        query.deleted = false;

        try {
            const artworks = await Artwork.find(query);
            return res.send({'success':true,'data':artworks, 'size':artworks.length});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async getArtworkById(req, res) {
        try {
            const artwork = await Artwork.findById(req.params.id);
            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send({'success':true,'data':artwork});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async updateArtwork(req, res) {
        const { id } = req.params;
        try {
            const artwork = await Artwork.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!artwork) return res.status(404).send("Artwork not found");

            return res.send({'success':true,'data':artwork});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
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
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async deleteArtwork(req, res) {
        try {
            const artwork = await Artwork.findByIdAndDelete(req.params.id);
            if (!artwork) return res.status(404).send("Artwork not found");
            return res.send(artwork);
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }
}

module.exports = new ArtworkController();
