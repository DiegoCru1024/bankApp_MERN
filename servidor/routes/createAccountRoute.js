const router = require('express').Router()
const {generarID, accountModel, validarDatos} = require("../models/accountSchema");

async function generateUniqueID() {
    const generatedID = generarID();
    const accountData = await accountModel.findOne({accountID: generatedID.toString()});
    if (accountData) {
        return generateUniqueID();
    }
    return generatedID;
}

router.post('/', async (req, res) => {
    try {
        // Generamos un ID único para la cuenta
        const generatedID = await generateUniqueID();

        // Comprobamos si los datos ingresados son correctos
        const {dataError} = validarDatos(req.body);
        if (dataError) {
            return res.status(400).send({message: dataError.details[0].message});
        }

        await new accountModel({...req.body, accountID: generatedID}).save();
        res.status(201).send({message: 'Cuenta de ahorros creada con éxito...'});
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error interno de servidor...'});
    }
});

module.exports = router;
