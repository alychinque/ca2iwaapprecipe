// Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('images'))

// Database connection
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

// Routes
app.use('/api/', require('./routes/routes'))

__dirname = path.resolve()
if(process.env.NODE_ENV === 'production') {
    app.get(express.static(__dirname + '/recipe/dist/'))
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/recipe/dist/index.html')
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))