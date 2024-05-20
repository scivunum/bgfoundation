const { About, validateAboutData } = require('../models/aboutModel');

class AboutController {
    // Get all about entries
    static async getAllAbout(req, res) {
        try {
            const aboutEntries = await About.find();
            res.json({success:true,data:aboutEntries, size:aboutEntries.length});
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
            res.json({success:true,data:aboutEntry});
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
        const aboutData = req.body;

        const { error } = validateAboutData(aboutData, true);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        try {
            const updatedAbout = await About.findByIdAndUpdate(id, aboutData, { new: true });
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
