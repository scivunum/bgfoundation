const Joi = require("joi");
const { Schema, model } = require("mongoose");
const Event = require("./eventModel");
const participant = require("./userModel")

const artworkSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    artist_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: SchemaTypes.Number,
        required: true,
    },
    current_bid: {
        type: SchemaTypes.Number,
        required: true,
    },
    image: {
        type: SchemaTypes.String,
        required: true,
    },
    bought: {
        type: SchemaTypes.Boolean,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    deleted: {
        type: SchemaTypes.Boolean,
        default: false
    },
    
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: false,
        default: null
    },
}, { timestamps: true });

const validateArtwork = (artwork) => {
    const schema = Joi.object({
        participant_id: Joi.string().required(),
        event_id: Joi.string().required(),
    });
    return schema.validate(artwork);
};

const Artwork = model("Artwork", artworkSchema);

module.exports = { Artwork, validateArtwork };
