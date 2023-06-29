const {loanRequestModel} = require("../models/loanRequestSchema");
const router = require('express').Router();


router.get('/', (req, res) => {
    const studentCode = req.query.studentCode;

    loanRequestModel.findOne({studentCode: studentCode.toString()}, {_id: 0}) // Excluye el campo _id en la respuesta
        .then(loan => {
            if (loan) {
                res.json(loan);
            } else {
                return res.status(400).send({message: 'No tienes ningún préstamos registrado...'})
            }
        }).catch(error => {
        console.log(error);
        res.status(500).send({message: 'Error interno de servidor...'});
    });
});

module.exports = router;
