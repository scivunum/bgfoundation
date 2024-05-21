const Joi = require("joi");
const { Schema, SchemaTypes, model } = require("mongoose");

// Define the User schema
const userSchema = new Schema({
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true, // Ensure email is unique
    },
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
    image: {
        type: SchemaTypes.String,
    },
    role: {
        type: SchemaTypes.String,
        default: 'user',
    },
    status: {
        type: SchemaTypes.String,
        default: 'inactive',
    },
    deleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    events_joined: {
        type: [SchemaTypes.ObjectId],
        ref: 'Event',
        default: [],
    },
    artworks_bought: {
        type: [SchemaTypes.ObjectId],
        ref: 'Artwork',
        default: [],
    },
    address: {
        type: SchemaTypes.String,
        required: true,
    },
    facebook: {
        type: SchemaTypes.String,
        default: null,
    },
    instagram: {
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
    phonenumber: {
        type: SchemaTypes.String,
        required: true,
    },
    telegram: {
        type: SchemaTypes.String,
        default: null,
    },
}, { timestamps: true });

// Validate user data for creation or update
const validateUserData = (userObj, isUpdating = false) => {
    let validUserSchema;

    if (isUpdating) {
        validUserSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }),
            name: Joi.string().min(2),
            password: Joi.string().min(6),
            image: Joi.string().uri().allow(null),
            role: Joi.string().valid('user', 'admin'),
            status: Joi.string().valid('active', 'inactive'),
            deleted: Joi.boolean(),
            events_joined: Joi.array().items(Joi.string().hex().length(24)),
            artworks_bought: Joi.array().items(Joi.string().hex().length(24)),
            address: Joi.string(),
            facebook: Joi.string().uri().allow(null),
            instagram: Joi.string().uri().allow(null),
            twitter: Joi.string().uri().allow(null),
            linkedin: Joi.string().uri().allow(null),
            phonenumber: Joi.string().pattern(/^[0-9]+$/),
            telegram: Joi.string().uri().allow(null),
        });
    } else {
        validUserSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            name: Joi.string().min(2).required(),
            password: Joi.string().min(6).required(),
            image: Joi.string().uri().allow(null),
            role: Joi.string().valid('user', 'admin').default('user'),
            status: Joi.string().valid('active', 'inactive').default('inactive'),
            deleted: Joi.boolean().default(false),
            events_joined: Joi.array().items(Joi.string().hex().length(24)).default([]),
            artworks_bought: Joi.array().items(Joi.string().hex().length(24)).default([]),
            address: Joi.string().required(),
            facebook: Joi.string().uri().allow(null),
            instagram: Joi.string().uri().allow(null),
            twitter: Joi.string().uri().allow(null),
            linkedin: Joi.string().uri().allow(null),
            phonenumber: Joi.string().pattern(/^[0-9]+$/).required(),
            telegram: Joi.string().uri().allow(null),
        });
    }

    return validUserSchema.validate(userObj);
};

// Define the User model
const User = model('User', userSchema);

module.exports = {
    User,
    validateUserData,
};
