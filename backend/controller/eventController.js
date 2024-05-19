const { Event, validateEvent } = require("../models/eventModel");

class EventController {
    async createEvent(req, res) {
        try {
            const { error } = validateEvent(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const event = new Event(req.body);
            await event.save();

            return res.status(201).send(event);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllEvents(req, res) {
        try {
            const events = await Event.find();
            return res.send(events);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getEventById(req, res) {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateEvent(req, res) {
        const { id } = req.params;
        let eventData = {};

        if (req.body.name) eventData.name = req.body.name;
        if (req.body.start_date) eventData.start_date = req.body.start_date;
        if (req.body.close_date) eventData.close_date = req.body.close_date;
        if (req.body.duration_in_hours) eventData.duration_in_hours = req.body.duration_in_hours;
        if (req.body.status) eventData.status = req.body.status;
        if (req.body.description) eventData.description = req.body.description;
        if (req.body.artworks) eventData.artworks = req.body.artworks;
        if (req.body.max_artworks) eventData.max_artworks = req.body.max_artworks;
        if (req.body.started) eventData.started = req.body.started;
        if (req.body.ended) eventData.ended = req.body.ended;
        if (req.body.registration_end_date) eventData.registration_end_date = req.body.registration_end_date;

        try {
            const event = await Event.findByIdAndUpdate(
                id,
                { $set: eventData },
                { new: true }
            );

            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async softdeleteEvent(req, res) {
        const { id } = req.params;
        try {
            const event = await Event.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!event) return res.status(404).send("Event not found");

            return res.send("Event deleted");
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deleteEvent(req, res) {
        try {
            const event = await Event.findByIdAndRemove(req.params.id);
            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new EventController();
