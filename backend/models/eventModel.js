const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const Joi = require("joi");

const eventSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
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
        type: [{
            type: String,
            enum: ['upcoming', 'ongoing', 'ended']
        }],
        default: ['upcoming']
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    artworks: {
        type: [SchemaTypes.String],
        default: []
    },
    max_artworks: {
        type: SchemaTypes.Number,
    },
    started: {
        type: SchemaTypes.Boolean,
        default: false
    },
    ended: {
        type: SchemaTypes.Boolean,
        default: false
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
    let eventValidationSchema;

    if (isUpdating) {
        eventValidationSchema = Joi.object({
            name: Joi.string().min(3).max(100).messages({
                "string.min": "Name must be at least 3 characters long",
                "string.max": "Name must be less than 100 characters long",
            }),
            start_date: Joi.date().messages({
                "date.base": "Invalid date format",
            }),
            close_date: Joi.date().messages({
                "date.base": "Invalid date format",
            }),
            duration_in_hours: Joi.number().messages({
                "number.base": "Duration in hours must be a number",
            }),
            status: Joi.array().items(Joi.string().valid('upcoming', 'ongoing', 'ended')).messages({
                "any.only": "Status must be one of ['upcoming', 'ongoing', 'ended']",
            }),
            description: Joi.string().min(10).max(1000).messages({
                "string.min": "Description must be at least 10 characters long",
                "string.max": "Description must be less than 1000 characters long",
            }),
            artworks: Joi.array().items(Joi.string()).messages({
                "array.base": "Artworks must be an array of strings",
            }),
            max_artworks: Joi.number().messages({
                "number.base": "Max artworks must be a number",
            }),
            started: Joi.boolean().messages({
                "boolean.base": "Started must be a boolean",
            }),
            ended: Joi.boolean().messages({
                "boolean.base": "Ended must be a boolean",
            }),
            registration_end_date: Joi.date().messages({
                "date.base": "Invalid date format",
            }),
        });
    } else {
        eventValidationSchema = Joi.object({
            name: Joi.string().min(3).max(100).required().messages({
                "string.min": "Name must be at least 3 characters long",
                "string.max": "Name must be less than 100 characters long",
                "any.required": "Name is required",
            }),
            start_date: Joi.date().required().messages({
                "date.base": "Invalid date format",
                "any.required": "Start date is required",
            }),
            close_date: Joi.date().required().messages({
                "date.base": "Invalid date format",
                "any.required": "Close date is required",
            }),
            duration_in_hours: Joi.number().required().messages({
                "number.base": "Duration in hours must be a number",
                "any.required": "Duration in hours is required",
            }),
            status: Joi.array().items(Joi.string().valid('upcoming', 'ongoing', 'ended')).required().messages({
                "any.only": "Status must be one of ['upcoming', 'ongoing', 'ended']",
                "any.required": "Status is required",
            }),
            description: Joi.string().min(10).max(1000).required().messages({
                "string.min": "Description must be at least 10 characters long",
                "string.max": "Description must be less than 1000 characters long",
                "any.required": "Description is required",
            }),
            artworks: Joi.array().items(Joi.string()).required().messages({
                "array.base": "Artworks must be an array of strings",
                "any.required": "Artworks are required",
            }),
            max_artworks: Joi.number().required().messages({
                "number.base": "Max artworks must be a number",
                "any.required": "Max artworks is required",
            }),
            started: Joi.boolean().required().messages({
                "boolean.base": "Started must be a boolean",
                "any.required": "Started is required",
            }),
            ended: Joi.boolean().required().messages({
                "boolean.base": "Ended must be a boolean",
                "any.required": "Ended is required",
            }),
            registration_end_date: Joi.date().required().messages({
                "date.base": "Invalid date format",
                "any.required": "Registration end date is required",
            }),
        });
    }

    return eventValidationSchema.validate(eventObj);
};

module.exports = {
    Event,
    validateEvent,
};
