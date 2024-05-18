const { handle_404_requests } = require("../controller/errorRouteController");
const statusRoutes = require("./statusRoutes");
const aboutRoutes = require("./aboutRoutes");
const eventRoutes = require("./eventRoutes");
const paymentRoutes = require("./paymentRoutes");
const creditCardRoutes = require("./creditCardRoutes")
const userRoutes = require("./userRoutes")
const messageRoutes = require("./messageRoutes")
const cryptoWalletRoutes = require("./cryptoWalletRoutes");


module.exports = (app) => {
    // declaring all the different parent paths to be used in the api
    app.use("/api/v1/status", statusRoutes);
    app.use("/api/v1/about", aboutRoutes);
    app.use("/api/v1/events", eventRoutes);
    app.use("/api/v1/creditcards", creditCardRoutes);
    app.use("/api/v1/payments", paymentRoutes);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/messages", messageRoutes);
    app.use("/api/v1/cryptowallets", cryptoWalletRoutes);
    
    
    // handle unknown routes
    app.use(handle_404_requests);
}
