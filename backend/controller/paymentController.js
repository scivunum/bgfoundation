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
        let query = req.query;
        query.deleted = false;
        try {
            const payments = await Payment.find(query);
            return res.send({'success':true,'data':payments, 'size':payments.length});
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

        try {
            const payment = await Payment.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );

            if (!payment) return res.status(404).send("Payment not found");

            return res.send({'success':true,'data':payment});
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
