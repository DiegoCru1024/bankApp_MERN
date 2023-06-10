const router = require('express').Router()
const {studentModel, validarDatos} = require('../models/studentSchema')
const bcrypt = require('bcrypt')

router.post('/', async (req, res) => {
    // Comprobamos si los datos ingresados son correctos
    const {dataError} = validarDatos(req.body);
    if (dataError) {
        return res.status(400).send({message: dataError.details[0].message});
    }

    // Comprobamos si el usuario existe
    studentModel.findOne({email: req.body.email.toString()})
        .then(studentData => {
            if (studentData) {
                return res.status(401).send({message: 'Este correo electrónico ya se encuentra registrado...'});
            }

            // Encriptamos la contraseña y guardamos los datos
            return bcrypt.genSalt(Number(process.env.SALT))
                .then(salt => {
                    bcrypt.hash(req.body.password, salt)
                })
                .then(encryptedPass => {
                    return new studentModel({...req.body, password: encryptedPass}).save();
                })
                .then(() => {
                    res.status(201).send({message: 'Usuario registrado con éxito...'});
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send({message: 'Error interno de servidor...'});
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
})

module.exports = router