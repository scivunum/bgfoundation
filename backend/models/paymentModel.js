const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const Joi = require("joi");

// Define the Payment schema
const paymentSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: SchemaTypes.Number,
        required: true,
    },
    currency: {
        type: SchemaTypes.String,
        required: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD'], // Add more currencies as needed
    },
    method: {
        type: SchemaTypes.String,
        required: true,
        enum: ['credit_card', 'crypto_wallet', 'bank_transfer', 'paypal'], // Add more methods as needed
    },
    status: {
        type: SchemaTypes.String,
        required: true,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    event_id: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    payment_date: {
        type: SchemaTypes.Date,
        required: true,
        default: Date.now,
    },
    details: {
        type: SchemaTypes.Mixed,
        required: false, // Optional additional details
    },
    deleted: {
        type: Schema.Types.Boolean,
        default: false
    },
    artwork_id: {
        type: SchemaTypes.String,
        required: true,
    },
}, { timestamps: true });

const validatePaymentData = (paymentObj, isUpdating = false) => {
    let paymentValidationSchema;

    if (isUpdating) {
        paymentValidationSchema = Joi.object({
            user: Joi.string().hex().length(24),
            amount: Joi.number().positive(),
            currency: Joi.string().valid('USD', 'EUR', 'GBP', 'JPY', 'CAD'),
            method: Joi.string().valid('credit_card', 'crypto_wallet', 'bank_transfer', 'paypal'),
            status: Joi.string().valid('pending', 'completed', 'failed', 'refunded'),
            event_id: Joi.string().min(1),
            payment_date: Joi.date(),
            details: Joi.object().optional(),
            artwork_id: Joi.string().hex().length(24),
        });
    } else {
        paymentValidationSchema = Joi.object({
            user: Joi.string().hex().length(24).required(),
            amount: Joi.number().positive().required(),
            currency: Joi.string().valid('USD', 'EUR', 'GBP', 'JPY', 'CAD').required(),
            method: Joi.string().valid('credit_card', 'crypto_wallet', 'bank_transfer', 'paypal').required(),
            status: Joi.string().valid('pending', 'completed', 'failed', 'refunded').default('pending'),
            event_id: Joi.string().min(1).required(),
            payment_date: Joi.date().default(Date.now),
            details: Joi.object().optional(),
            artwork_id: Joi.string().hex().length(24).required(),
        });
    }

    return paymentValidationSchema.validate(paymentObj);
}

// Define the Payment model
const Payment = model('Payment', paymentSchema);
module.exports = {
    Payment,
    validatePaymentData,
};
