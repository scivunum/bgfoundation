const morgan = require("morgan");
const express = require('express');
const cors = require('cors');

module.exports = (app, allowedOrigins=[]) => {
    // using morgan to log request details
    app.use(morgan('combined'));

    // configuring to parse any incoming json requests
    app.use(express.json({ limit: '10mb' }));

    // configuring cors
    app.use(cors({
        origin: Array.isArray(allowedOrigins) ? allowedOrigins : [],
        credentials: true,
    }));

    // adding all the routes of the application
    require('../routes/index')(app);
};

module.exports.config = {
    PORT: process.env.PORT || 8005,
    IP: process.env.IP || process.env.IPDEV,
    MONGO_DB_URI: process.env.MONGO_DB_URI || process.env.MONGO_DB_URI_DEV
};

