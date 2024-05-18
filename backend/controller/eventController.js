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
        try {
            const { error } = validateEvent(req.body, true);
            if (error) return res.status(400).send(error.details[0].message);

            const event = await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
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
