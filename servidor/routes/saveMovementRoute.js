const router = require('express').Router()
const {accountModel} = require('../models/accountSchema')
const {movementModel} = require('../models/movementSchema')

router.post('/', async (req, res) => {
    const {accountOriginID, accountDestinyID, movementValue, movementType, movementDate} = req.body;

    accountModel.findOne({accountID: accountOriginID.toString()})
        .then(originAccount => {
            if (!originAccount) {
                throw new Error('Cuenta de origen no encontrada');
            }

            const movementCurrencyType = originAccount.accountCurrencyType;

            const movementInfo = new movementModel({
                accountOriginID,
                accountDestinyID,
                movementValue,
                movementCurrencyType,
                movementType,
                movementDate
            });

            return movementInfo.save();
        })
        .then(savedMovementInfo => {
            res.status(201).json(savedMovementInfo);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({message: 'Error interno de servidor'});
        });
})

module.exports = router