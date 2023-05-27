const router = require('express').Router()
const {userModel} = require('../models/userSchema')
const bcrypt = require('bcrypt')
const joi = require('joi')

router.post('/', async (req, res) => {
    try {
        //Comprobamos si los datos ingresados son correctos
        const {dataError} = validarDatos(req.body)
        if (dataError) {
            return res.status(400).send({message: dataError.details[0].message})
        }

        //Comprobamos que el usuario este registrado
        const userData = await userModel.findOne({email: req.body.email})
        if (!userData) {
            return res.status(401).send({message: 'Correo o contraseña inválida...'})
        }

        //Comprobamos las credenciales de acceso
        const validPassword = bcrypt.compare(req.body.password, userData.password)
        if (!validPassword) {
            return res.status(401).send({message: 'Correo o contraseña inválida...'})
        }

        //Generamos el Token de Autenticación
        const token = userModel.generarToken()
        res.status(200).send({data: token, message: 'Inicio de sesión exitoso...'})
    } catch (e) {
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

module.exports = router

const validarDatos = (data) => {
    const Schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().required().label('Password')
    })
    return Schema.validate(data)
}