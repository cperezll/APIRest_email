"use strict"

const mongoose = require("mongoose")
const User = require("../models/user")
const bcrypt = require('bcrypt-nodejs');
const tokenServices = require('../services/tokenServices');


function getUsers(req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `Get request error: ${err}`} )
        if (!users) return res.status(404).send({ message: `User not found` })

        res.status(200).send({ users }) // if the var and the key are the same this can be shortened
    })
}

function signUpNewUser(req, res) {

    console.log(" >email ",  req.body.email);
    console.log(" >projectName ",  req.body.projectName);

    const newUser = new User({
        projectName: req.body.projectName,
        email: req.body.email,
        password: req.body.password,
        statusProject: req.body.statusProject
    })

    newUser.save((err) => {
        if (err) return res.status(500).send({message: `Error creating the newUser ${err}`})

        return res.status(200).send({ token: tokenServices.createToken(newUser) })
    })
}

function signUp(req, res) {
    const user = new User({
        email: req.body.email,
        projectName: req.body.projectName,
        password: req.body.password
    })

    user.save((err) => {
        if (err) return res.status(500).send({message: `Error creating the user ${err}`})

        return res.status(200).send({ token: tokenServices.createToken(user) })
    })
}

function signIn(req, res) {
    console.log("> Performing a signIn...");
    console.log("> body", req.body);
    // search for user in DB
    if (req.body.email && req.body.password) {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            // case if there is any problem in search
            if (err) {
                console.log(`> Error: ${err}`)
                return res.status(500).send({
                    message: `Error al iniciar sessión: ${err}`
                })
            }
            // case if user is not found on DB
            if (!user) {
                console.log("> User not found")
                return res.status(401).send({
                    message: 'Incorrect user or password'
                })
            }
            // case if user found
            if (user) {
                console.log("> user: ", user);
                user.checkPassword(req.body.password, (correct) => {
                    if (correct) {
                        // setting loginDate on DB
                        User.loginDate(user.id, function(err, userLoged) {
                            if(err) return console.log(err);
                            console.log(`> ${user.email} Login successful`)
                        });
                        res.status(200).send({
                            message: 'Login successful',
                            token: tokenServices.createToken(user),
                            user: user
                        })
                    } else {
                        //case if password is incorrect
                        console.log("> UNAUTHORIZED. Incorrect password")
                        return res.status(401).send({
                            message: 'Incorrect user or password'
                        })
                    }
                })
            }
        })
    } else {
        console.log("> [WARNING] Some params are missing - This could mean intentional tampering of the headers");
        return res.status(401).send({
            message: 'Incorrect user or password'
        })
    }
}

function deleteUser(req, res) {
    let email = req.body.email

    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) return res.status(500).send({message: `Error retrieving user ${err}`})
            if (!user) return res.status(404).send({message: "User not found"})

            user.remove(err => {
                if (err) return res.status(500).send({message: `Error deleting the user ${err}`})
                res.status(200).send({message: "The user has been deleted"})
            })
            console.log(" >user: ", user)
    })
}

module.exports = {
    signUpNewUser,
    getUsers,
    signUp,
    signIn,
    deleteUser
}
