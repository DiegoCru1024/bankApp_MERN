const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

userSchema.methods.generarToken = function () {
    return jwt.sign({_id: this._id}, process.env.PRIVATE_KEY, {expiresIn: '7d'})
}

const userModel = mongoose.model("usuario", userSchema)

const validarDatos = (data) => {
    const Schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    })
    return Schema.validate(data)
}

module.exports = { userModel, validarDatos }