const router = require('express').Router()
const {generarID, accountModel, validarDatos} = require("../models/accountSchema");

router.post('/', async (req, res) => {
    // Generamos un ID único para la cuenta
    let accountData;
    let generatedID;

    function generateUniqueID() {
        generatedID = generarID();
        return accountModel.findOne({accountID: generatedID.toString()});
    }

    generateUniqueID()
        .then(data => {
            accountData = data;
            if (accountData) {
                return generateUniqueID();
            }
        })
        .then(() => {
            // Comprobamos si los datos ingresados son correctos
            const {dataError} = validarDatos(req.body);
            if (dataError) {
                return res.status(400).send({message: dataError.details[0].message});
            }

            return new accountModel({...req.body}).save();
        })
        .then(() => {
            res.status(201).send({message: 'Cuenta de ahorros creada con éxito...'});
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
})

module.exports = router