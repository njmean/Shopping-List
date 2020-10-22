const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//if (process.env.NODE_ENV !== 'production') {
//    require('dotenv').config();
//  }

const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model

const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate User
// @access Public

router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Simple Validation

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing User

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            // Validate Password

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'User not known' });

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 7200 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        })

                })
        })
});

// @route get api/auth
// @desc Get User Data
// @access Private

router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
});


module.exports = router;


