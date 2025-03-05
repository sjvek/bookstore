const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JWT_KEY = process.env.JWT_KEY;

const authenticatToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    jwt.verify(token,  JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: " token is expired. sign in again" });
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticatToken };


