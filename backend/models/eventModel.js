const Joi = require("joi");
const { Schema, SchemaTypes, model } = require("mongoose");

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
          enum: ['upcoming', 'ongoing', 'endeed']
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
        default: function() {
            return new Date(this.start_date.getTime() - 24 * 60 * 60 * 1000);
        }
    },
}, { timestamps: true });

const validateEvent = (eventData, isExistingData = false) => {
    let eventValidationSchema;

    if (isExistingData) {
        eventValidationSchema = Joi.object({
            name: Joi.string(),
            start_date: Joi.date(),
            close_date: Joi.date(),
            duration_in_hours: Joi.number(),
            status: Joi.string(),
            description: Joi.string(),
            artworks: Joi.array().items(Joi.string()),
            max_artworks: Joi.number(),
            registration_end_date: Joi.date()
        });
    } else {
        eventValidationSchema = Joi.object({
            name: Joi.string().required(),
            start_date: Joi.date().required(),
            close_date: Joi.date().required(),
            duration_in_hours: Joi.number().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            artworks: Joi.array().items(Joi.string()).default([]),
            max_artworks: Joi.number(),
            registration_end_date: Joi.date()
        });
    }

    return eventValidationSchema.validate(eventData);
};

const Event = model("Event", eventSchema);

module.exports = {
    Event,
    validateEvent,
};
