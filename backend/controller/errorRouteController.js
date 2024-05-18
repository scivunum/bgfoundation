const { ResponseObject } = require("../utils/defaultResponseObject");

// 404 controller handler
exports.handle_404_requests = (req, res, next) => {
    res.status(404).send(ResponseObject({
        "success": false,
        "message": "Requested resource unavailable!"
    }));
}