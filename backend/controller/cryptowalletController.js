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
        const { id } = req.params;
        let walletData = {};

        if (req.body.wallet_address) walletData.wallet_address = req.body.wallet_address;
        if (req.body.wallet_name) walletData.wallet_name = req.body.wallet_name;
        if (req.body.balance) walletData.balance = req.body.balance;
        if (req.body.user_id) walletData.user_id = req.body.user_id;

        try {
            const { error } = validateCryptoWalletData(walletData, true);
            if (error) return res.status(400).send(error.details[0].message);

            const cryptoWallet = await CryptoWallet.findByIdAndUpdate(
                id,
                { $set: walletData },
                { new: true }
            );

            if (!cryptoWallet) return res.status(404).send("Crypto wallet not found");

            return res.send(cryptoWallet);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
    
    async softdeleteCryptoWallet(req, res) {
        const { id } = req.params;
        try {
            const cryptowallet = await CryptoWallet.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!cryptowallet) return res.status(404).send("CryptoWallet not found");

            return res.send("CryptoWallet deleted");
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
