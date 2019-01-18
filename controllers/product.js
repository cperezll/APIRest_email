"use strict"

const Product = require("../models/product")


function getProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Error retrieving product from the DB ${err}`})
        if (!product) return res.status(404).send({message: `Product not found`})

        // res.status(200).send({ product: product}) // if the var and the key are the same this cann be shortened
        res.status(200).send({ product }) // if the var and the key are the same this can be shortened
    })
}

function getProducts(req,res) {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Get request error: ${err}`})
        if (!products) return res.status(404).send({message: "Products not found"})

        res.status(200).send({products})
    })
}

function saveProduct(req, res) {
    console.log("POST /api/product");
    console.log(req.body);

    let product = new Product()
    product.name = req.body.name
    product.image = req.body.image
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    // La funcion de callback captura si se guarda correctamente (productStored) o si hay un error (err)
    product.save((err, productStored) => {
        if (err) {
            console.log(`error saving product in the DB: ${err}`)
            return res.status(500).send({message: `error saving product in the DB: ${err}`})
        }

        res.status(200).send({product: productStored})
    })
}

function updateProduct(req, res) {
    let productId = req.params.productId
    let update = req.body

    Product.findByIdAndUpdate(productId, update, (err, updatedProduct) => {
        if (err) return res.status(500).send({message: `Error retrieving product ${err}`})
        if (!updatedProduct) return res.status(404).send({message: "Product not found"})

        res.status(200).send({ product: updatedProduct })
    })
}

function deleteProduct(req, res) {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Error retrieving product ${err}`})
        if (!product) return res.status(404).send({message: "Product not found"})

        product.remove(err => {
            if (err) return res.status(500).send({message: `Error deleting the product ${err}`})
            res.status(200).send({message: "The product has been deleted"})
        })

    })
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}



//
