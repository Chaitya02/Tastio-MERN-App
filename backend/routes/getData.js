const express = require('express')
const router = express.Router()

router.post('/items', (req, res) => {
    res.send([global.foodItems, global.categories])
})

module.exports = router
