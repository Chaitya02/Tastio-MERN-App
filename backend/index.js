const express = require('express')
const database = require('./db')
const cors = require('cors')
require("dotenv").config()
const PORT = process.env.PORT || 5000

const app = express()

const corsOptions = {
    origin: `${process.env.BASE_URL}`,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", `${process.env.BASE_URL}`);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next()
// })

app.use(express.json());
database()

app.use('/api', require('./routes/createUser'))
app.use('/api', require('./routes/getData'))
app.use('/api', require('./routes/orderData'))

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}.`)
})
