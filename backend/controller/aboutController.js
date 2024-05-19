const { About, validateAboutData } = require('../models/aboutModel');

class AboutController {
    // Get all about entries
    static async getAllAbout(req, res) {
        try {
            const aboutEntries = await About.find();
            res.json(aboutEntries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get a single about entry by ID
    static async getAboutById(req, res) {
        const { id } = req.params;
        try {
            const aboutEntry = await About.findById(id);
            if (!aboutEntry) {
                return res.status(404).json({ message: "About entry not found" });
            }
            res.json(aboutEntry);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Create a new about entry
    static async createAbout(req, res) {
        const aboutData = req.body;
        const { error } = validateAboutData(aboutData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        try {
            const createdAbout = await About.create(aboutData);
            res.status(201).json(createdAbout);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update an existing about entry
    static async updateAbout(req, res) {
        const { id } = req.params;
        //const aboutData = req.body;
        let aboutData = {};
        if (req.body.start_date) {
            aboutData.createdAt = {
                $gte: req.body.start_date
            };
        }
        if (req.body.end_date) {
            aboutData.createdAt = {
                $lte: req.body.end_date
            };
        }

        // Construct the query object dynamically based on the parameters received
        if (req.body.logo) aboutData.logo = req.body.logo;
        if (req.body.name) aboutData.name = req.body.name;
        if (req.body.email) aboutData.email = req.body.email;
        if (req.body.phonenumber) aboutData.phonenumber = req.body.phonenumber;
        if (req.body.address) aboutData.address = req.body.address;
        if (req.body.description) aboutData.description = req.body.description;
        if (req.body.how_to_bid) aboutData.how_to_bid = req.body.how_to_bid;
        if (req.body.how_to_auction) aboutData.how_to_auction = req.body.how_to_auction;
        if (req.body.how_to_register) aboutData.how_to_register = req.body.how_to_register;
        if (req.body.updated_by) aboutData.updated_by = req.body.updated_by;
        if (req.body.fb) aboutData.fb = req.body.fb;
        if (req.body.ig) aboutData.ig = req.body.ig;
        if (req.body.twitter) aboutData.twitter = req.body.twitter;
        if (req.body.linkedin) aboutData.linkedin = req.body.linkedin;
        if (req.body.telegram) aboutData.telegram = req.body.telegram;
        if (req.body.terms_and_conditions) aboutData.terms_and_conditions = req.body.terms_and_conditions;

        const { error } = validateAboutData(aboutData, true);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        try {
            const updatedAbout = await About.findByIdAndUpdate(id, {$set: aboutData}, { new: true });
            if (!updatedAbout) {
                return res.status(404).json({ message: "About entry not found" });
            }
            res.json(updatedAbout);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete an existing about entry
    static async deleteAbout(req, res) {
        const { id } = req.params;
        try {
            const deletedAbout = await About.findByIdAndDelete(id);
            if (!deletedAbout) {
                return res.status(404).json({ message: "About entry not found" });
            }
            res.json({ message: "About entry deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AboutController;
