const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const Joi = require("joi");

const eventSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    start_date: {
        type: SchemaTypes.Date,
        required: true,
    },
    close_date: {
        type: SchemaTypes.Date,
        required: true,
    },
    duration_in_hours: {
        type: SchemaTypes.Number,
        required: true,
    },
    status: {
        type: SchemaTypes.String,
        enum: ['upcoming', 'ongoing', 'ended'],
        default: ['upcoming']
    },
    description: {
        type: SchemaTypes.String,
        required: true,
        minlength: 1,
        maxlength: 1000,
    },
    artworks: {
        type: SchemaTypes.Number,
        default: 0,
    },
    registration_end_date: {
        type: SchemaTypes.Date,
        default: function () {
            return new Date(this.start_date.getTime() - 24 * 60 * 60 * 1000);
        }
    },
}, { timestamps: true });

const Event = model("Event", eventSchema);

const validateEvent = (eventObj, isUpdating = false) => {
    const eventValidationSchema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        start_date: Joi.date().required(),
        close_date: Joi.date().required(),
        duration_in_hours: Joi.number().required(),
        status: Joi.string().valid('upcoming', 'ongoing', 'ended').required(),
        description: Joi.string().min(1).max(1000).required(),
        artworks: Joi.number(),
        registration_end_date: Joi.date(),
    });

    return eventValidationSchema.validate(eventObj);
};

module.exports = {
    Event,
    validateEvent,
};
