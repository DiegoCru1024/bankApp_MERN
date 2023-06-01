const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    number: {type: Number, required: true},
    studentCode: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true}
})

studentSchema.methods.generarToken = function () {
    return jwt.sign({_id: this._id}, process.env.PRIVATE_KEY, {expiresIn: '7d'})
}

const studentModel = mongoose.model("alumno", studentSchema)

const validarDatos = (data) => {
    const Schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        number: joi.number().required().label('Number'),
        userCode: joi.number().required().label('Student Code')
    })
    return Schema.validate(data)
}

module.exports = {studentModel, validarDatos}