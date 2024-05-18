const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema, SchemaTypes, model } = mongoose;

const creditCardSchema = new Schema({
    card_number: {
        type: SchemaTypes.String,
        required: true,
    },
    card_holder_name: {
        type: SchemaTypes.String,
        required: true,
    },
    expiration_date: {
        type: SchemaTypes.String, // Stored in MM/YY format
        required: true,
    },
    cvv: {
        type: SchemaTypes.String,
        required: true,
    },
    billing_address: {
        street: {
            type: SchemaTypes.String,
            required: true,
        },
        city: {
            type: SchemaTypes.String,
            required: true,
        },
        state: {
            type: SchemaTypes.String,
            required: true,
        },
        postal_code: {
            type: SchemaTypes.String,
            required: true,
        },
        country: {
            type: SchemaTypes.String,
            required: true,
        },
    },
}, { timestamps: true });

const CreditCard = model("CreditCard", creditCardSchema);

const validateCreditCardData = (creditCardObj, isUpdating = false) => {
    let creditCardValidationSchema;

    if (isUpdating) {
        creditCardValidationSchema = Joi.object({
            card_number: Joi.string()
                .creditCard()
                .messages({
                    "string.creditCard": "Invalid credit card number"
                }),
            card_holder_name: Joi.string()
                .min(3)
                .max(100)
                .messages({
                    "string.min": "Card holder name must be at least 3 characters long",
                    "string.max": "Card holder name must be less than 100 characters long",
                }),
            expiration_date: Joi.string()
                .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
                .messages({
                    "string.pattern.base": "Expiration date must be in MM/YY format",
                }),
            cvv: Joi.string()
                .pattern(/^[0-9]{3,4}$/)
                .messages({
                    "string.pattern.base": "CVV must be a 3 or 4 digit number",
                }),
            billing_address: Joi.object({
                street: Joi.string().messages({ "any.required": "Street address is required" }),
                city: Joi.string().messages({ "any.required": "City is required" }),
                state: Joi.string().messages({ "any.required": "State is required" }),
                postal_code: Joi.string().messages({ "any.required": "Postal code is required" }),
                country: Joi.string().messages({ "any.required": "Country is required" }),
            }).messages({ "any.required": "Billing address is required" }),
        });
    } else {
        creditCardValidationSchema = Joi.object({
            card_number: Joi.string()
                .creditCard()
                .required()
                .messages({
                    "string.creditCard": "Invalid credit card number",
                    "any.required": "Credit card number is required"
                }),
            card_holder_name: Joi.string()
                .min(3)
                .max(100)
                .required()
                .messages({
                    "string.min": "Card holder name must be at least 3 characters long",
                    "string.max": "Card holder name must be less than 100 characters long",
                    "any.required": "Card holder name is required"
                }),
            expiration_date: Joi.string()
                .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)
                .required()
                .messages({
                    "string.pattern.base": "Expiration date must be in MM/YY format",
                    "any.required": "Expiration date is required"
                }),
            cvv: Joi.string()
                .pattern(/^[0-9]{3,4}$/)
                .required()
                .messages({
                    "string.pattern.base": "CVV must be a 3 or 4 digit number",
                    "any.required": "CVV is required"
                }),
            billing_address: Joi.object({
                street: Joi.string().required().messages({ "any.required": "Street address is required" }),
                city: Joi.string().required().messages({ "any.required": "City is required" }),
                state: Joi.string().required().messages({ "any.required": "State is required" }),
                postal_code: Joi.string().required().messages({ "any.required": "Postal code is required" }),
                country: Joi.string().required().messages({ "any.required": "Country is required" }),
            }).required().messages({ "any.required": "Billing address is required" }),
        });
    }

    return creditCardValidationSchema.validate(creditCardObj);
}

module.exports = {
    CreditCard,
    validateCreditCardData,
};
