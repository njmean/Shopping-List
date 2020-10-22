const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check for token

    if (!token) {
        res.status(401).json({ msg: 'No-token, authorisation denied' })
    };


    try {
        // Verify Token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add User from Payload

        req.user = decoded;
        next();

    } catch (e) {

        res.status(400).json({msg: 'Token is not valid'});
    }

}

module.exports = auth;