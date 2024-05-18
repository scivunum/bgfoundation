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
            const creditCards = await CreditCard.find();
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
        try {
            const { error } = validateCreditCardData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const creditCard = await CreditCard.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!creditCard) return res.status(404).send("Credit card not found");

            return res.send(creditCard);
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
