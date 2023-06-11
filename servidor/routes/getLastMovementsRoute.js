const router = require('express').Router();
const {movementModel} = require('../models/movementSchema');

router.get('/', (req, res) => {
    const accountID = req.query.accountID;

    movementModel
        .find({
            $or: [
                {accountOriginID: accountID.toString()},
                {accountDestinyID: accountID.toString()}
            ]
        })
        .then(movementModels => {
            res.json(movementModels);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
});

module.exports = router;
