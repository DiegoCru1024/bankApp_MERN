const {loanRequestModel} = require("../models/loanRequestSchema");
const router = require('express').Router();


router.get('/', (req, res) => {
    const studentCode = req.query.studentCode;

    loanRequestModel.findOne({studentCode: studentCode}, {_id: 0}) // Excluye el campo _id en la respuesta
        .then(loan => {
            res.json(loan);
        }).catch(error => {
        console.log(error);
        res.status(500).send({message: 'Error interno de servidor...'});
    });
});

module.exports = router;
