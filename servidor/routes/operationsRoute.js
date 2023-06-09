const router = require('express').Router()
const {accountModel, validarDatos, generarID} = require('../models/accountSchema')

router.post('/createAccount', async (req, res) => {
    try {
        //Generamos un ID unico para la cuenta
        let accountData
        do {
            req.body.accountID = generarID()
            accountModel.findOne({accountID: req.body.accountID.toString()})
                .then((modelResponse) => {
                    accountData = modelResponse
                })
                .catch((error) => {
                    console.log(error)
                })
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

router.get('/getAccounts', async (req, res) => {
    const studentCode = req.query.studentCode

    accountModel.find({ownerUserID: studentCode.toString()})
        .then((modelResponse) => {
            res.json(modelResponse)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({error: 'Error al buscar modelos...'});
        })
})

router.post('/transferMoney', async (req, res) => {
    let originAccount, destinyAccount

    accountModel.findOne({accountID: req.body.accountOriginID.toString()}).then((modelResponse) => {
        if (modelResponse) {
            originAccount = modelResponse
        }
    }).catch((error) => {
        console.log(error)
    })

    accountModel.findOne({accountID: req.body.accountDestinyID.toString()}).then((modelResponse) => {
        if (modelResponse) {
            destinyAccount = modelResponse
        }
    }).catch((error) => {
        console.log(error)
    })

    //Comprobamos que la cuenta ingresada exista
    if (!destinyAccount) {
        return res.status(400).send({message: 'La cuenta de destino no existe...'})
    }

    //Comprobamos que las cuentas no sean iguales
    if (originAccount.accountID === destinyAccount.accountID) {
        return res.status(400).send({message: 'La cuenta de origen no puede ser la cuenta de destino...'})
    }

    //Comprobamos que el tipo de divisa sea el mismo
    if (originAccount.accountCurrencyType !== destinyAccount.accountCurrencyType) {
        return res.status(400).send({message: 'Las cuentas deben tener la misma divisa...'})
    }

    //Comprobamos que el saldo sea mayor a 0
    if (req.body.transferValue < 0) {
        return res.status(400).send({message: 'El valor de transferencia debe ser mayor a 0...'})
    }

    //Comprobamos que el saldo sea suficiente
    if (originAccount.accountBalance < req.body.transferValue) {
        return res.status(400).send({message: 'No hay saldo suficiente...'})
    }

    //Validamos la transferencia
    const originBalance = parseFloat(originAccount.accountBalance) - parseFloat(req.body.transferValue)
    const destinyBalance = parseFloat(destinyAccount.accountBalance) + parseFloat(req.body.transferValue)

    accountModel.findOneAndUpdate(
        {accountID: req.body.accountOriginID.toString()},
        {$set: {accountBalance: originBalance.toFixed(2)}},
        {new: true}
    ).then((updatedUser) => {
        // El usuario se actualizó correctamente
        console.log('Usuario actualizado:', updatedUser);
    }).catch((err) => {
        // Manejar el error
        console.error(err);
    })

    accountModel.findOneAndUpdate(
        {accountID: req.body.accountDestinyID.toString()},
        {$set: {accountBalance: destinyBalance.toFixed(2)}},
        {new: true}
    ).then((updatedUser) => {
        // El usuario se actualizó correctamente
        console.log('Usuario actualizado:', updatedUser);
    }).catch((err) => {
        // Manejar el error
        console.error(err);
    })

    res.status(201).send({message: 'Transacción realizada con exito...'})
})

module.exports = router