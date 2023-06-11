const router = require('express').Router()
const {accountModel} = require("../models/accountSchema");

router.get('/', async (req, res) => {
    const studentCode = req.query.studentCode;

    accountModel.find({ownerUserID: studentCode.toString()})
        .then(accountModels => {
            res.json(accountModels);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
})

module.exports = router