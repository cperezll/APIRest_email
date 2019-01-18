"use strict"

const jwt = require("jwt-simple")
const moment = require('moment');
const config = require('../config');


function createToken(user) {
    const payload = {
        sub: user._id, // This ID should be different from the DB one for security reasons, but for DEV purposes is the same here
        iat: moment().unix(),
        exp: moment().add(14, "days").unix()
    }
    
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: "The Token has expired"
                })
            }
            
            resolve(payload.sub)            
        } catch (err) {
            reject({
                status: 500,
                message: "Invalid Token"
            })
        }
    })
    
    return decoded
}


module.exports = {
    createToken,
    decodeToken
}
