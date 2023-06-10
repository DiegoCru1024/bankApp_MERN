const mongoose = require('mongoose')
const joi = require('joi')

const movementSchema = new mongoose.Schema({
    accountOriginID: {type: Number, required: true},
    accountDestinyID: {type: Number, required: true},
    movementValue: {type: Number, required: true},
    movementCurrencyType: {type: String, required: true},
    movementDate: {type: Date, required: true}
})

const movementModel = mongoose.model("movimiento", movementSchema)

const validarDatosMovimiento = (data) => {
    const Schema = joi.object({
        ownerOriginID: joi.number().required().label('AccountOriginID'),
        ownerDesnityID: joi.number().required().label('AccountDestinyID'),
        movementValue: joi.number().required().label('Movement Value'),
        movementCurrencyType: joi.string().required().label('Movement Currency Type'),
        movementDate: joi.date().required().label('Movement Date')
    })
    return Schema.validate(data)
}

module.exports = {movementModel, validarDatosMovimiento}