const router = require('express').Router()
const {accountModel} = require('../models/accountSchema')
const {movementModel} = require('../models/movementSchema')

router.get('/', async (req, res) => {
    const accountID = req.query.accountID;

    accountModel.find({accountID: accountID.toString()})
        .then(accountModels => {
            res.json(accountModels);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
})

module.exports = router