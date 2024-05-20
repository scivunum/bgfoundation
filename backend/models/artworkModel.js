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
        default: 0,
    },
    current_bid: {
        type: Schema.Types.Number,
        required: true,
        default: 0,
    },
    image: {
        type: Schema.Types.String,
        required: true,
    },
    bought: {
        type: Schema.Types.Boolean,
        required: true,
        default: false,
    },
    description: {
        type: Schema.Types.String,
        required: true,
        default:'',
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
        artist_id: Joi.string().required(),
        image: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required(),
    });
    return schema.validate(artwork);
};

const Artwork = model("Artwork", artworkSchema);

module.exports = { Artwork, validateArtwork };
