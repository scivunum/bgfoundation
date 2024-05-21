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
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async getAllEvents(req, res) {
        let query = req.query;
        query.deleted = false;
        try {
            const events = await Event.find(query);
            return res.send({'success':true,'data':events, 'size':events.length});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async getEventById(req, res) {
        try {
            const event = await Event.findById(req.params.id);
            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async updateEvent(req, res) {
        const { id } = req.params;
        try {
            const event = await Event.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
            if (!event) return res.status(404).send("Event not found");

            return res.send({'success':true,'data':event});
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
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
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }

    async deleteEvent(req, res) {
        try {
            const event = await Event.findByIdAndDelete(req.params.id);
            if (!event) return res.status(404).send("Event not found");

            return res.send(event);
        } catch (err) {
            return res.status(500).send({'success':false,'error':"Internal Server Error", 'message':err});
        }
    }
}

module.exports = new EventController();
