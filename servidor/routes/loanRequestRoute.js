const router = require('express').Router();
const {loanRequestModel} = require('../models/loanRequestSchema');

router.post('/', (req, res) => {
    const studentCode = req.body.studentCode;
    let hasExistingRequest = false;

    loanRequestModel.findOne({studentCode: studentCode.toString()})
        .then((existingRequest) => {
            if (existingRequest) {
                hasExistingRequest = true;
                return;
            }

            return new loanRequestModel(req.body).save();
        })
        .then(() => {
            if (hasExistingRequest) {
                res.status(400).send({message: 'Ya tienes una solicitud pendiente...'});
            } else {
                res.status(200).send({message: 'Solicitud enviada con éxito...'});
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({message: 'Error interno de servidor...'});
        });
});


module.exports = router;
