"use strict"

const tokenServices = require("../services/tokenServices")

function isAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: "No authorization"})
    }

    // split "bearer asdasdadasd6da87sd68a7sdexample" in two parts
    const token = req.headers.authorization.split(" ")[1]

    tokenServices.decodeToken(token).then(response => {
        req.user = response
        next()
    }).catch(response => {
        res.status(response.status)
    })

}

// since there is only one exported method, to require this service (like in routes.js) no access to the inner method is needed
// e.g const auth = require(services/tokenServices)
//     auth (OK)
//     auth.isAuth (WRONG)
module.exports = isAuth
