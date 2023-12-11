const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const session = require('express-session')
const cors = require('cors');

//require('dotenv').config()

const dataRouter = require('./routes/data')

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'

    /*host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME*/
})

con.connect(function (err) {
    if (err) {
        console.log("database connection error")
    } else {
        console.log('database connection success')
    }
})



// connecting route to database
app.use(function (req, res, next) {
    req.con = con
    next()
})
//user session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//connecting frontend
app.use(cors());

// parsing post data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routing
app.use('/', dataRouter)
//app.use(express.static('public'))

app.listen(2000, function () {
    console.log('server listening on port 2000')
})