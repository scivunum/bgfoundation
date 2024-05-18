const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;
const Joi = require("joi");

const cryptoWalletSchema = new Schema({
    wallet_address: {
        type: SchemaTypes.String,
        required: true,
        unique: true, // Ensure wallet address is unique
    },
    wallet_name: {
        type: SchemaTypes.String,
        required: true,
    },
    balance: {
        type: SchemaTypes.Number,
        required: true,
        default: 0, // Default balance is 0
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });


const validateCryptoWalletData = (cryptoWalletObj, isUpdating = false) => {
    let cryptoWalletValidationSchema;

    if (isUpdating) {
        cryptoWalletValidationSchema = Joi.object({
            wallet_address: Joi.string()
                .pattern(/^0x[a-fA-F0-9]{40}$/)
                .messages({
                    "string.pattern.base": "Invalid wallet address format"
                }),
            wallet_name: Joi.string()
                .min(3)
                .max(100)
                .messages({
                    "string.min": "Wallet name must be at least 3 characters long",
                    "string.max": "Wallet name must be less than 100 characters long",
                }),
            balance: Joi.number()
                .min(0)
                .messages({
                    "number.min": "Balance cannot be negative",
                }),
            user_id: Joi.string().hex().length(24).messages({
                "string.length": "Invalid user ID format",
            }),
        });
    } else {
        cryptoWalletValidationSchema = Joi.object({
            wallet_address: Joi.string()
                .pattern(/^0x[a-fA-F0-9]{40}$/)
                .required()
                .messages({
                    "string.pattern.base": "Invalid wallet address format",
                    "any.required": "Wallet address is required",
                }),
            wallet_name: Joi.string()
                .min(3)
                .max(100)
                .required()
                .messages({
                    "string.min": "Wallet name must be at least 3 characters long",
                    "string.max": "Wallet name must be less than 100 characters long",
                    "any.required": "Wallet name is required",
                }),
            balance: Joi.number()
                .min(0)
                .required()
                .messages({
                    "number.min": "Balance cannot be negative",
                    "any.required": "Balance is required",
                }),
            user_id: Joi.string().hex().length(24)
                .required()
                .messages({
                    "string.length": "Invalid user ID format",
                    "any.required": "User ID is required",
                }),
        });
    }

    return cryptoWalletValidationSchema.validate(cryptoWalletObj);
}

const CryptoWallet = model("CryptoWallet", cryptoWalletSchema);


module.exports = {
    CryptoWallet,
    validateCryptoWalletData,
};

