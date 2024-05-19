const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/paymentController');

// Create a new payment
router.post('/', PaymentController.createPayment);

// Get all payments
router.get('/', PaymentController.getAllPayments);

// Get a single payment by ID
router.get('/:id', PaymentController.getPaymentById);

// Update an existing payment
router.patch('/:id', PaymentController.updatePayment);

// Soft delete an existing payment
router.patch('/softdelete/:id', PaymentController.softdeletePayment);

// Delete an existing payment
router.delete('/harddelete/:id', PaymentController.deletePayment);

module.exports = router;
