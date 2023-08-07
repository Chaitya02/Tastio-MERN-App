const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const Order = require('../models/order')

router.post('/orderData', [
    body('email').isEmail().withMessage('Invalid email format')
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    let eId = await Order.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.status("Server Error").send(error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.status("Server Error").send(error.message)
        }
    }
})

router.post('/orders/myOrder', async (req, res) => {
    let myData = await Order.findOne({ 'email': req.body.email })
    res.json({ orderData: myData })
})

module.exports = router