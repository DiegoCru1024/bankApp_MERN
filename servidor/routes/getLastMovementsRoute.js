const router = require('express').Router()
const {movementModel} = require('../models/movementSchema')

router.get('/', async (req, res) => {
    const studentCode = req.query.studentCode;

    movementModel.find({$or: [{accountOriginID: studentCode.toString()}, {accountDetinyID: studentCode.toString()}]})
        .then(movementModels => {
            res.json(movementModels);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
})

module.exports = router