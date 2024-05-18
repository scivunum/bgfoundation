const { CryptoWallet, validateCryptoWalletData } = require("../models/cryptowalletModel");

class CryptoWalletController {
    async createCryptoWallet(req, res) {
        try {
            const { error } = validateCryptoWalletData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const cryptoWallet = new CryptoWallet(req.body);
            await cryptoWallet.save();

            return res.status(201).send(cryptoWallet);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllCryptoWallets(req, res) {
        try {
            const cryptoWallets = await CryptoWallet.find();
            return res.send(cryptoWallets);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getCryptoWalletById(req, res) {
        try {
            const cryptoWallet = await CryptoWallet.findById(req.params.id);
            if (!cryptoWallet) return res.status(404).send("Crypto wallet not found");

            return res.send(cryptoWallet);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateCryptoWallet(req, res) {
        try {
            const { error } = validateCryptoWalletData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const cryptoWallet = await CryptoWallet.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!cryptoWallet) return res.status(404).send("Crypto wallet not found");

            return res.send(cryptoWallet);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deleteCryptoWallet(req, res) {
        try {
            const cryptoWallet = await CryptoWallet.findByIdAndRemove(req.params.id);
            if (!cryptoWallet) return res.status(404).send("Crypto wallet not found");

            return res.send(cryptoWallet);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new CryptoWalletController();
