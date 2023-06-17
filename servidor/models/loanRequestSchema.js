const mongoose = require('mongoose')
const joi = require('joi')

const loanRequestSchema = new mongoose.Schema({
    studentCode: {type: Number, required: true},
    studentName: {type: String, required: true},
    loanValue: {type: Number, required: true},
    loanFeeRate: {type: Number, required: true},
    loanJustification: {type: String, required: true},
    loanRequestState: {type: String, required: true},
    loanSubmitDate: {type: Date, required: true},
    destinyAccountID: {type: Number, required: true}
})

const loanRequestModel = mongoose.model("prestamoRequest", loanRequestSchema)

const validarDatosSolicitud = (data) => {
    const Schema = joi.object({
        studentCode: joi.number().required().label('StudentCode'),
        studentName: joi.string().required().label('StudentName'),
        loanValue: joi.number().required().label('LoanValue'),
        loanFeeRate: joi.number().required().label('LoanFeeRate'),
        loanJustification: joi.string().required().label('LoanJustification'),
        loanRequestState: joi.string().required().label('LoanRequestState'),
        loanSubmitDate: joi.date().required().label('LoanSubmitDate'),
        destinyAccountID: joi.number().required().label('AccountDestinyID')
    })
    return Schema.validate(data)
}

module.exports = {loanRequestModel, validarDatosSolicitud}