const router = require('express').Router();
const {loanModel} = require('../models/movementSchema');

router.get('/', (req, res) => {
    const studentCode = req.query.studentCode;

    loanModel.findOne({studentCode: studentCode})
        .then(loan => {
            res.json(loan)
        }).catch(error => {
        console.log(error)
        res.status(500).send({message: 'Error interno de servidor...'});
    })
});

module.exports = router;
