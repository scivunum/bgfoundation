const Joi = require("joi");
const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    artist_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    current_bid: {
        type: Schema.Types.Number,
        required: true,
    },
    image: {
        type: Schema.Types.String,
        required: true,
    },
    bought: {
        type: Schema.Types.Boolean,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    deleted: {
        type: Schema.Types.Boolean,
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
