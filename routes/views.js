"use strict"

const express = require("express")
const productCtrl = require("../controllers/product")
const userCtrl = require("../controllers/user")
const auth = require("../middlewares/auth")
const config = require("../config")
const axios = require('axios');
const api = express.Router()


api.get("/login", (req, res) => {
    res.render("login")
})

// api.get("/users", auth, (req, res) => {
api.get("/users", (req, res) => {
    //axios === fetch
    axios.get(`http://localhost:${config.port}/api/user`).then((value) => {
        console.log(" ========================= ");
        console.log("> :", value.data.users);
        console.log(" ========================= ");

        res.render("users", { usersList: value.data.users })
    }).catch((err) => {
        console.log("> err: ", err)
    })
})


module.exports = api
