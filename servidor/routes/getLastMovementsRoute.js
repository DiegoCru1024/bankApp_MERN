const router = require('express').Router()
const {accountModel} = require('../models/accountSchema')
const {movementModel} = require('../models/movementSchema')

router.get('/', async (req, res) => {
    const studentCode = req.query.studentCode;

    accountModel.find({ownerUserID: studentCode.toString()})
        .then(accounts => {
            const accountIDs = accounts.map(account => account.accountID);

            movementModel.find({
                $or: [
                    {accountOriginID: {$in: accountIDs}},
                    {accountDetinyID: {$in: accountIDs}}
                ]
            })
                .then(movements => {
                    res.json(movements);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({message: 'Error interno de servidor'});
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({message: 'Error interno de servidor'});
        });
})

module.exports = router