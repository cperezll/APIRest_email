"use strict"

const express = require("express")
const productCtrl = require("../controllers/product")
const userCtrl = require("../controllers/user")
const auth = require("../middlewares/auth")
const api = express.Router()

// //products
// api.get("/product", auth, productCtrl.getProducts)
// api.get("/product/:productId", productCtrl.getProduct)
// api.post("/product", productCtrl.saveProduct)
// api.put("/product/:productId", productCtrl.updateProduct)
// api.delete("/product/:productId", productCtrl.deleteProduct)

//user
api.get("/user", userCtrl.getUsers)
api.post("/signup", userCtrl.signUp)
api.post("/signin", userCtrl.signIn)
api.post("/signupnewuser", userCtrl.signUpNewUser)
api.delete("/deleteuser/", userCtrl.deleteUser)

api.get("/private", auth, (req, res) => {
    res.status(200).send({message: "Access granted"})
})

module.exports = api
