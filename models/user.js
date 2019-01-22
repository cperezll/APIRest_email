"use strict"

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    projectName: String,
    avatar : String,
    password: { type: String, select: false},
    statusProject: String,
    rolAdmin: { type:String, enum:["Admin","User"]},
    signupDate: { type: Date, default: Date.now()},
    lastLogin: Date
})

// the "()=>" arrow functions changes the scope so "this" does not work here unles regular "function()" is used
UserSchema.pre("save", function(next) {
    let user = this
    if (!user.isModified("password")) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next()

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            // if everything correct the clear password is changed by the hashed one before storing the user
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.checkPassword = async function (password, callback) {
    this.model("User").findOne({username: this.username}).select('password').exec(function (err, user) {
        // check if password is OK using is correspofins hash & salt
        if (bcrypt.compareSync(password, user.password)) {
            callback(true)
        } else {
            callback(false)
        }
    })
}

UserSchema.methods.gravatar = function () {
    if (!this.email) return "https://gravatar.com/avatar/?s=200&d=retro"

    const md5 = crypto.createHash("md5").update(this.email).digest("hex")
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

/**
 * Function that set a loginDate to a admin who sign in the web
 *
 */
UserSchema.statics.loginDate = function loginDate(id, callback) {
   return this.findOneAndUpdate(id, { $set : { 'lastLogin' : Date.now() }}, { new : true }, callback);
};

module.exports = mongoose.model("User", UserSchema)
