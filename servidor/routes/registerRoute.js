const router = require('express').Router();
const {studentModel, validarDatos} = require('../models/studentSchema');
const bcrypt = require('bcrypt');

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

            // Validar studentCode
            if (req.body.studentCode.length !== 8) {
                return res.status(400).send({message: 'El código de estudiante debe tener exactamente 8 caracteres.'});
            }

            // Validar firstName y lastName
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (!nameRegex.test(req.body.firstName) || !nameRegex.test(req.body.lastName)) {
                return res.status(400).send({message: 'El nombre y apellido solo puede contener letras.'});
            }

            // Encriptamos la contraseña y guardamos los datos
            return bcrypt.genSalt(Number(process.env.SALT))
                .then(salt => {
                    return bcrypt.hash(req.body.password, salt);
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
});

module.exports = router;
