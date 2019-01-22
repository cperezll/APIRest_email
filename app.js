"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const hbs = require('express-handlebars');
const path = require('path')

// const cors = require('cors')

const app = express()
const api = require("./routes/api")
const views = require("./routes/views")
const flash = require('express-flash')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/views')));


// Configure template engine to display views
app.engine(".hbs", hbs({
    defaultLayout: "default",
    extname: ".hbs",

}))
app.set("view engine", ".hbs")

// All routes with the /api entreypoint will be manager by the api (express router) inside /routes
app.use("/api", api)
app.use("/", views)

app.use(express.static("."));

//Access to part of users
// app.get("/users", (req, res) => {
//     res.render("users")
// })

// /login will render a response in front-end using the login.hbs file and its parent template

// app.get("/login", (req, res) => {
//     res.render("login")
// })




// app.get("/product", (req, res) => {
//     console.log(res);
//     res.render("product")
// })

// app.get('/forgot', function(req, res) {
//   res.render('forgot', {
//     user: req.user
//   });
// });


module.exports = app
