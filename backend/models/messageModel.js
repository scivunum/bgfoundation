const Joi = require("joi");
const { Schema, SchemaTypes, model } = require("mongoose");

// Define the Message schema
const messageSchema = new Schema({
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    user_name: {
        type: SchemaTypes.String,
        required: true,
    },
    useremail: {
        type: SchemaTypes.String,
        required: true,
    },
    message: {
        type: SchemaTypes.String,
        required: true,
    },
    deleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    editing_allowed: {
        type: SchemaTypes.Boolean,
        default: true,
    },
    image: {
        type: SchemaTypes.String,
        required: false,
    },
}, { timestamps: true });

// Validate message data for creation or update
const validateMessage = (messageObject, isUpdating = false) => {
    let schema;

    if (isUpdating) {
        schema = Joi.object({
            messageId: Joi.string().hex().length(24).required(),
            message: Joi.string().required(),
        });
    } else {
        schema = Joi.object({
            user_id: Joi.string().hex().length(24).required(),
            user_name: Joi.string().required(),
            useremail: Joi.string().email({ minDomainSegments: 2 }).required(),
            message: Joi.string().required(),
            image: Joi.string().uri().optional(),
        });
    }

    return schema.validate(messageObject);
};

// Define the Message model
const Message = model("Message", messageSchema);

module.exports = { Message, validateMessage };
