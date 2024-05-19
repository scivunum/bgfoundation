const { Payment, validatePaymentData } = require("../models/paymentModel");

class PaymentController {
    async createPayment(req, res) {
        try {
            const { error } = validatePaymentData(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const payment = new Payment(req.body);
            await payment.save();

            return res.status(201).send(payment);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getAllPayments(req, res) {
        try {
            const payments = await Payment.find();
            return res.send(payments);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async getPaymentById(req, res) {
        try {
            const payment = await Payment.findById(req.params.id);
            if (!payment) return res.status(404).send("Payment not found");

            return res.send(payment);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async updatePayment(req, res) {
        const { id } = req.params;
        let paymentData = {};

        if (req.body.user) paymentData.user = req.body.user;
        if (req.body.amount) paymentData.amount = req.body.amount;
        if (req.body.currency) paymentData.currency = req.body.currency;
        if (req.body.method) paymentData.method = req.body.method;
        if (req.body.status) paymentData.status = req.body.status;
        if (req.body.transaction_id) paymentData.transaction_id = req.body.transaction_id;
        if (req.body.payment_date) paymentData.payment_date = req.body.payment_date;
        if (req.body.details) paymentData.details = req.body.details;

        try {
            const { error } = validatePaymentData(paymentData, true);
            if (error) return res.status(400).send(error.details[0].message);

            const payment = await Payment.findByIdAndUpdate(
                id,
                { $set: paymentData },
                { new: true }
            );

            if (!payment) return res.status(404).send("Payment not found");

            return res.send(payment);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async softdeletePayment(req, res) {
        const { id } = req.params;
        try {
            const payment = await Payment.findByIdAndUpdate(
                id,
                {$set: {delete: true}},
                { new: true }
            );

            if (!payment) return res.status(404).send("Message not found");

            return res.send("Message deleted");
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }

    async deletePayment(req, res) {
        try {
            const payment = await Payment.findByIdAndRemove(req.params.id);
            if (!payment) return res.status(404).send("Payment not found");

            return res.send(payment);
        } catch (err) {
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = new PaymentController();
