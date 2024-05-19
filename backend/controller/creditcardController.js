const { CreditCard, validateCreditCardData } = require("../models/creditcardModel");

class CreditCardController {
    async createCreditCard(req, res) {
        try {
            const { error } = validateCreditCardData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const creditCard = new CreditCard(req.body);
            await creditCard.save();

            return res.status(201).send(creditCard);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllCreditCards(req, res) {
        try {
            const creditCards = await CreditCard.find({delete: false});
            return res.send(creditCards);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getCreditCardById(req, res) {
        try {
            const creditCard = await CreditCard.findById(req.params.id);
            if (!creditCard) return res.status(404).send("Credit card not found");

            return res.send(creditCard);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updateCreditCard(req, res) {
        const { id } = req.params;
        let creditcardData = {};

        if (req.body.card_number) creditcardData.card_number = req.body.card_number;
        if (req.body.card_holder_name) creditcardData.card_holder_name = req.body.card_holder_name;
        if (req.body.artist_id) creditcardData.artist_id = req.body.artist_id;
        if (req.body.expiration_date) creditcardData.expiration_date = req.body.expiration_date;
        if (req.body.cvv) creditcardData.cvv = req.body.cvv;
        if (req.body.billing_address) creditcardData.billing_address = req.body.billing_address;

        try {
            const { error } = validateCreditCardData(creditcardData, true);
            if (error) return res.status(400).send(error.details[0].message);

            const creditCard = await CreditCard.findByIdAndUpdate(
                id,
                { $set: creditcardData },
                { new: true }
            );

            if (!creditCard) return res.status(404).send("Credit card not found");

            return res.send(creditCard);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
    async softdeleteCreditCard(req, res) {
        const { id } = req.params;
        try {
            const creditcard = await CreditCard.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!creditcard) return res.status(404).send("CreditCard not found");

            return res.send("CreditCard deleted");
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
    async deleteCreditCard(req, res) {
        try {
            const creditCard = await CreditCard.findByIdAndRemove(req.params.id);
            if (!creditCard) return res.status(404).send("Credit card not found");

            return res.send(creditCard);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new CreditCardController();
