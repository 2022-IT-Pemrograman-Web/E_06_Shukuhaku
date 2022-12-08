const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }

    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

exports.userAuth = (req, res, next) => {
    let token = req.cookies.jwt;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.user = decoded.user;
        next();
    });
};

exports.udminAuth = (req, res, next) => {
    let token = req.cookies.jwt;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, req.app.get('secretKey'), (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        if(decoded.user.role !== 'admin'){
            return res.status(401).send({ message: "Not an Admin! Unauthorized!!!" });
        }
        req.user = decoded.user;
        next();
    });
};