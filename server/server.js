require('dotenv').config()
const DB_PORT = process.env.DB_PORT
const cors = require('cors')
const express = require('express')
const app = express()

const cookieParser = require('cookie-parser'); // to be able to read cookies

app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors( corsOptions ))
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const connectDB = require('./config/mongoose.config')

connectDB().then (() => {
    const UserRouter = require('./routes/user.routes')
    const MovieRouter = require('./routes/movie.routes')
    

    app.use('/api/user', UserRouter)
    app.use('/api/movie', MovieRouter)

    app.listen(DB_PORT, () => {
        console.log(`Server running on port ${DB_PORT}`)
    })

}).catch((error) => {
    console.log(error)
})



