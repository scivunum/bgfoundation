const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const Joi = require("joi");

// Define the About schema
const aboutSchema = new Schema({
    logo: {
        type: SchemaTypes.String,
        required: true,
    },
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
    },
    phonenumber: {
        type: SchemaTypes.String,
        required: true,
    },
    address: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    how_to_bid: {
        type: SchemaTypes.String,
        required: true,
    },
    how_to_auction: {
        type: SchemaTypes.String,
        required: true,
    },
    how_to_register: {
        type: SchemaTypes.String,
        required: true,
    },
    updated_by: {
        type: SchemaTypes.String,
        required: true,
    },
    last_updated: {
        type: SchemaTypes.Date,
        required: true,
        default: Date.now,
    },
    fb: {
        type: SchemaTypes.String,
        default: null,
    },
    ig: {
        type: SchemaTypes.String,
        default: null,
    },
    twitter: {
        type: SchemaTypes.String,
        default: null,
    },
    linkedin: {
        type: SchemaTypes.String,
        default: null,
    },
    telegram: {
        type: SchemaTypes.String,
        default: null,
    },
    terms_and_conditions: {
        type: SchemaTypes.String,
        required: true,
    },
}, { timestamps: true });



const validateAboutData = (aboutObj, isUpdating = false) => {
    let aboutValidationSchema;

    if (isUpdating) {
        aboutValidationSchema = Joi.object({
            logo: Joi.string().uri(),
            name: Joi.string().min(2),
            email: Joi.string().email({ minDomainSegments: 2 }),
            phonenumber: Joi.string().pattern(/^[0-9]+$/),
            address: Joi.string().min(5),
            description: Joi.string().min(10),
            how_to_bid: Joi.string().min(10),
            how_to_auction: Joi.string().min(10),
            how_to_register: Joi.string().min(10),
            updated_by: Joi.string().min(2),
            last_updated: Joi.date(),
            fb: Joi.string().uri().allow(null),
            ig: Joi.string().uri().allow(null),
            twitter: Joi.string().uri().allow(null),
            linkedin: Joi.string().uri().allow(null),
            telegram: Joi.string().uri().allow(null),
            terms_and_conditions: Joi.string().min(10),
        });
    } else {
        aboutValidationSchema = Joi.object({
            logo: Joi.string().uri().required(),
            name: Joi.string().min(2).required(),
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            phonenumber: Joi.string().pattern(/^[0-9]+$/).required(),
            address: Joi.string().min(5).required(),
            description: Joi.string().min(10).required(),
            how_to_bid: Joi.string().min(10).required(),
            how_to_auction: Joi.string().min(10).required(),
            how_to_register: Joi.string().min(10).required(),
            updated_by: Joi.string().min(2).required(),
            last_updated: Joi.date().default(Date.now),
            fb: Joi.string().uri().allow(null),
            ig: Joi.string().uri().allow(null),
            twitter: Joi.string().uri().allow(null),
            linkedin: Joi.string().uri().allow(null),
            telegram: Joi.string().uri().allow(null),
            terms_and_conditions: Joi.string().min(10).required(),
        });
    }

    return aboutValidationSchema.validate(aboutObj);
}
// Define the About model
const About = model('About', aboutSchema);
module.exports = {
    About,
    validateAboutData,
};