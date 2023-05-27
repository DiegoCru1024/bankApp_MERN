const router = require('express').Router()
const {userModel, validarDatos} = require('../models/userSchema')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    try {
        //Comprobamos si los datos ingresados son correctos
        const {dataError} = validarDatos(req.body)
        if (dataError) {
            return res.status(400).send({message: dataError.details[0].message})
        }

        //Comprobamos si el usuario existe
        const userData = await userModel.findOne({email: req.body.email})
        if (userData) {
            return res.status(401).send({message: 'Este correo electrónico ya se encuentra registrado...'})
        }

        //Encriptamos la contraseña y guardamos los datos
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const encryptedPass = await bcrypt.hash(req.body.password, salt)

        await new userModel({...req.body, password: encryptedPass}).save()
        res.status(201).send({message: 'Usuario registrado con exito...'})
    } catch (e) {
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

module.exports = router