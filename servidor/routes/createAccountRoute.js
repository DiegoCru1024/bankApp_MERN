const router = require('express').Router();
const {generarID, accountModel, validarDatos} = require("../models/accountSchema");

function generateUniqueID() {
    const generatedID = generarID();
    return accountModel.findOne({accountID: generatedID.toString()})
        .then(accountData => {
            if (accountData) {
                return generateUniqueID();
            }
            return generatedID;
        });
}

router.post('/', (req, res) => {
    const {dataError} = validarDatos(req.body);
    if (dataError) {
        return res.status(400).send({message: dataError.details[0].message});
    }

    const {studentCode, accountName} = req.body;

    // Consultar si el usuario ya tiene una cuenta con el mismo nombre
    accountModel.findOne({studentCode, accountName})
        .then(existingAccount => {
            if (existingAccount) {
                // Si se encuentra una cuenta existente, enviar una respuesta con error
                return res.status(400).send({message: 'El usuario ya tiene una cuenta registrada con ese nombre'});
            }

            // Generar un ID único
            return generateUniqueID()
                .then(generatedID => {
                    // Asignar el ID generado al campo accountID
                    req.body.accountID = generatedID;

                    // Guardar la nueva cuenta
                    return new accountModel(req.body).save()
                        .then(() => {
                            res.status(201).send({message: 'Cuenta de ahorros creada con éxito...'});
                        });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
});


module.exports = router;
