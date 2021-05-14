"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayMiddleware = void 0;
const config_1 = require("../config");
const jwt = require("jsonwebtoken");
const configService = new config_1.ConfigService('.env');
function gatewayMiddleware(req, res, next) {
    try {
        if (req.headers && req.headers.authorization) {
            const JWT_SECRET_KEY = configService.get("JWT_SECRET_KEY");
            const token = req.headers.authorization.split(' ')[1];
            const tokenData = jwt.verify(token, JWT_SECRET_KEY);
            console.log("tokenData: ", tokenData, "req: ", req);
            const userId = tokenData === null || tokenData === void 0 ? void 0 : tokenData.userId;
            if (req.method == 'GET') {
                req.query.userId = userId;
            }
            else if (['POST', 'PUT'].includes(req.method)) {
                req.body.userId = userId;
            }
            next();
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(401);
    }
}
exports.gatewayMiddleware = gatewayMiddleware;
//# sourceMappingURL=gateway.middleware.js.map