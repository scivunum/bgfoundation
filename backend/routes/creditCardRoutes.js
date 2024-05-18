const express = require('express');
const router = express.Router();
const CreditCardController = require('../controller/creditcardController');

// Create a new credit card
router.post('/', CreditCardController.createCreditCard);

// Get all credit cards
router.get('/', CreditCardController.getAllCreditCards);

// Get a single credit card by ID
router.get('/:id', CreditCardController.getCreditCardById);

// Update an existing credit card
router.put('/:id', CreditCardController.updateCreditCard);

// Delete an existing credit card
router.delete('/:id', CreditCardController.deleteCreditCard);

module.exports = router;
