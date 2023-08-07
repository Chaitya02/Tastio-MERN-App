const mongoose = require('mongoose')
require("dotenv").config();

const database = async () => {

    await mongoose.connect(`${process.env.DATABASE}`)
        .then(async (result) => {
            console.log('MongoDB Connected!')

            const item = await mongoose.connection.db.collection('items')
            const items = await item.find({}).toArray()
            global.foodItems = items

            const category = await mongoose.connection.db.collection('categories')
            const categories = await category.find({}).toArray()
            global.categories = categories
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = database
