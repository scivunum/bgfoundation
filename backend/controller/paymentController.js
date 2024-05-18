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
        try {
            const { error } = validatePaymentData(req.body, true);
            if (error) return res.status(400).send(error.details[0].message);

            const payment = await Payment.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!payment) return res.status(404).send("Payment not found");

            return res.send(payment);
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
