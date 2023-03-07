const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = function(req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(403).json({ success: false, msg: 'No Token' });

    try {
        const verifiedUser = jwt.verify(token, process.env.SECRET_TOKEN);
        if(verifiedUser) {
            next();
        }
    } catch (err) {
        res.status(403).json({ success: false, msg: 'Invalid Token' })
    }
}