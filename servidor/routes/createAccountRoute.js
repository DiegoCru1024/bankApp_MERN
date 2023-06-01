const router = require('express').Router()
const {accountModel, validarDatos, generarID} = require('../models/accountSchema')

router.post('/', async (req, res) => {
    try {
        //Generamos un ID unico para la cuenta
        let accountData
        do {
            req.body.accountID = generarID()
            accountData = await accountModel.findOne({accountID: req.body.accountID.toString()})
        } while (accountData)

        //Comprobamos si los datos ingresados son correctos
        const {dataError} = validarDatos(req.body)
        if (dataError) {
            return res.status(400).send({message: dataError.details[0].message})
        }

        await new accountModel({...req.body}).save()
        res.status(201).send({message: 'Cuenta de ahorros creada con éxito...'})
    } catch (e) {
        console.log(e)
        res.status(500).send({message: 'Error interno de servidor...'})
    }
})

router.get('/', async (req, res) => {
    const studentCode = req.query.studentCode

    try {
        const accountModels = await accountModel.find({ownerUserID: studentCode});
        res.json(accountModels);
    } catch (error) {
        res.status(500).json({error: 'Error al buscar modelos...'});
    }
})

module.exports = router