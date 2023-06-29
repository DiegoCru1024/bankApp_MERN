const router = require('express').Router();
const {movementModel} = require('../models/movementSchema');

router.get('/', (req, res) => {
    const accountID = req.query.accountID;

    if (accountID === '-1') {
        return res.status(400).send({message: 'No se ha seleccionado una cuenta de ahorros...'})
    }

    movementModel
        .find({
            $or: [
                {accountOriginID: accountID.toString()},
                {accountDestinyID: accountID.toString()}
            ]
        })
        .then(movementModels => {
            if (movementModels.length === 0) {
                return res.status(400).send({message: 'Esta cuenta no registra movimientos...'})
            } else {
                res.json(movementModels);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
});

module.exports = router;
