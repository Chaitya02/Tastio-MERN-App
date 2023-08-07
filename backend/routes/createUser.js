const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require('../models/user')
const router = express.Router()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/user', [
    body('email', "Invalid Email Address. Please Enter a Valid Email.").isEmail(),
    body('password', "Password Too Short. Minimum 5 Characters Required.").isLength({ min: 5 })],
    (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    console.log(err)
                } else {
                    User.create({
                        name: req.body.name,
                        location: req.body.location,
                        email: req.body.email,
                        password: hash,
                    })
                }
            });

            res.json({ success: true })

        } catch (err) {
            console.log(err)

            res.json({ success: false })
        }
    })


router.post('/login', (req, res) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(400).json({ errors: "Invaild credentials and Try again!" })
            }

            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const token = jwt.sign({ user: {id: user._id} }, process.env.SECRET);
                    return res.json({ success: true, authToken: token })
                } else {
                    return res.status(400).json({ errors: "Email or Password is incorrect!" })
                }
            });

        })
        .catch((err) => {
            console.log(err)
        })

})

module.exports = router