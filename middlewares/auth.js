const jwt = require("jsonwebtoken");
const cors = require('cors');



function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Access token expired");
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
