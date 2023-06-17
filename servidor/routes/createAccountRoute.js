const router = require('express').Router();
const { generarID, accountModel, validarDatos } = require("../models/accountSchema");

function generateUniqueID() {
    const generatedID = generarID();
    return accountModel.findOne({ accountID: generatedID.toString() })
        .then(accountData => {
            if (accountData) {
                return generateUniqueID();
            }
            return generatedID;
        });
}

router.post('/', (req, res) => {
    generateUniqueID()
        .then(generatedID => {
            const { dataError } = validarDatos(req.body);
            if (dataError) {
                return res.status(400).send({ message: dataError.details[0].message });
            }
            return new accountModel({ ...req.body, accountID: generatedID }).save();
        })
        .then(() => {
            res.status(201).send({ message: 'Cuenta de ahorros creada con éxito...' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: 'Error interno de servidor...' });
        });
});

module.exports = router;
