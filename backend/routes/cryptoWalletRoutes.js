const express = require('express');
const router = express.Router();
const CryptoWalletController = require('../controller/cryptowalletController');

// Create a new crypto wallet
router.post('/', CryptoWalletController.createCryptoWallet);

// Get all crypto wallets
router.get('/', CryptoWalletController.getAllCryptoWallets);

// Get a single crypto wallet by ID
router.get('/:id', CryptoWalletController.getCryptoWalletById);

// Update an existing crypto wallet
router.put('/:id', CryptoWalletController.updateCryptoWallet);

// Delete an existing crypto wallet
router.delete('/:id', CryptoWalletController.deleteCryptoWallet);

module.exports = router;
