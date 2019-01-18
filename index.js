"use strict"

const mongoose = require("mongoose")
const app = require("./app")
const config = require("./config")


mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        return console.log(`Error connecting to DB: ${err}`);
    }
    console.log("DB conection stablished...");
    
    app.listen(config.port, () => {
        console.log(`> Running Node app on port: ${config.port} !!!...`);
    });
})



//
