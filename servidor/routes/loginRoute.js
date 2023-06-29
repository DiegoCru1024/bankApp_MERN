const router = require('express').Router();
const { studentModel } = require('../models/studentSchema');
const bcrypt = require('bcrypt');
const joi = require('joi');

router.post('/', (req, res) => {
    try {
        // Comprobamos si los datos ingresados son correctos
        const { error } = validarDatos(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        studentModel.findOne({ email: req.body.email.toString() })
            .then((modelResponse) => {
                // Comprobamos que el usuario esté registrado
                if (!modelResponse) {
                    return res.status(401).send({ message: 'Correo o contraseña inválida...' });
                }

                // Comprobamos las credenciales de acceso
                bcrypt.compare(req.body.password, modelResponse.password)
                    .then((validPassword) => {
                        if (!validPassword) {
                            return res.status(401).send({ message: 'Correo o contraseña inválida...' });
                        }

                        // Generamos el Token de Autenticación
                        const token = studentModel.generarToken;
                        res.status(200).send({ data: token, model: modelResponse, message: 'Inicio de sesión exitoso...' });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500).send({ message: 'Error interno de servidor...' });
                    });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({ message: 'Error interno de servidor...' });
            });
    } catch (e) {
        res.status(500).send({ message: 'Error interno de servidor...' });
    }
});

module.exports = router;

const validarDatos = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label('Email'),
        password: joi.string().required().label('Password'),
    });
    return schema.validate(data);
};
