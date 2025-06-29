const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    
    const token = req.header("Authorization");

    if (!token) {
        return  res.status(401).json({
            message: "authorization denied"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({
            message: "Token is not valid"
        })
    }
}