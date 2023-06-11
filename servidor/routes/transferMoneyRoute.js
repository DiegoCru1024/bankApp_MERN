const router = require('express').Router()
const {accountModel} = require("../models/accountSchema");

router.post('/', async (req, res) => {
    accountModel.findOne({accountID: req.body.accountOriginID.toString()})
        .then((originAccount) => {
            //Comprobamos que la cuenta ingresada exista
            if (!originAccount) {
                return res.status(400).send({message: 'La cuenta de origen no existe...'});
            }

            accountModel.findOne({accountID: req.body.accountDestinyID.toString()})
                .then((destinyAccount) => {
                    //Comprobamos que la cuenta ingresada exista
                    if (!destinyAccount) {
                        return res.status(400).send({message: 'La cuenta de destino no existe...'});
                    }

                    //Comprobamos que las cuentas no sean iguales
                    if (originAccount.accountID === destinyAccount.accountID) {
                        return res.status(400).send({message: 'La cuenta de origen no puede ser la cuenta de destino...'});
                    }

                    //Comprobamos que el tipo de divisa sea el mismo
                    if (originAccount.accountCurrencyType !== destinyAccount.accountCurrencyType) {
                        return res.status(400).send({message: 'Las cuentas deben tener la misma divisa...'});
                    }

                    //Comprobamos que el saldo sea mayor a 0
                    if (req.body.transferValue < 0) {
                        return res.status(400).send({message: 'El valor de transferencia debe ser mayor a 0...'});
                    }

                    //Comprobamos que el saldo sea suficiente
                    if (originAccount.accountBalance < req.body.transferValue) {
                        return res.status(400).send({message: 'No hay saldo suficiente...'});
                    }

                    // Realizar las actualizaciones necesarias
                    const originBalance = parseFloat(originAccount.accountBalance) - parseFloat(req.body.transferValue);
                    const destinyBalance = parseFloat(destinyAccount.accountBalance) + parseFloat(req.body.transferValue);

                    accountModel.findOneAndUpdate(
                        {accountID: req.body.accountOriginID.toString()},
                        {$set: {accountBalance: originBalance.toFixed(2)}},
                        {new: true}
                    )
                        .then((updatedOriginAccount) => {
                            // El usuario se actualizó correctamente
                            console.log('Cuenta de origen actualizada:', updatedOriginAccount);

                            accountModel.findOneAndUpdate(
                                {accountID: req.body.accountDestinyID.toString()},
                                {$set: {accountBalance: destinyBalance.toFixed(2)}},
                                {new: true}
                            )
                                .then((updatedDestinyAccount) => {
                                    // El usuario se actualizó correctamente
                                    console.log('Cuenta de destino actualizada:', updatedDestinyAccount);

                                    res.status(201).send({message: 'Transacción realizada con éxito...'});
                                })
                                .catch((error) => {
                                    console.error(error);
                                    res.status(500).send({message: 'Error interno de servidor...'});
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send({message: 'Error interno de servidor...'});
                        });
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send({message: 'Error interno de servidor...'});
                });
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router