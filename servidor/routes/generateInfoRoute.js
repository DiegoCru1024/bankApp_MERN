const router = require('express').Router()

router.post('/', async (req, res) => {
    const {accountID, infoType, consent} = req.body

    if (accountID === '') {
        return res.status(400).send({error: 'Seleccione una cuenta de ahorros...'})
    }

    if (infoType === '') {
        return res.status(400).send({error: 'Seleccione un método de envío...'})
    }

    if (!consent) {
        return res.status(400).send({error: 'Acepte los términos y condiciones...'})
    }

    res.status(200).send({message: 'Su estado de cuenta ha sido enviado al canal seleccionado...'})
})

module.exports = router