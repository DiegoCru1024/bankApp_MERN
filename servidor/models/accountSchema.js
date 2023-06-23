const mongoose = require('mongoose');
const crypto = require('crypto');
const joi = require('joi');

// Definición del esquema de la cuenta
const accountSchema = new mongoose.Schema({
    ownerFirstName: {type: String, required: true},
    ownerLastName: {type: String, required: true},
    ownerUserID: {type: Number, required: true},
    accountName: {type: String, required: true},
    accountID: {type: Number, required: true},
    accountBalance: {type: Number, required: true},
    accountCurrencyType: {type: String, required: true}
});

// Creación del modelo de cuenta utilizando el esquema definido
const accountModel = mongoose.model("cuenta", accountSchema);

// Función para generar un ID único para la cuenta
const generarID = () => {
    const bytes = crypto.randomBytes(6);
    const numero = parseInt(bytes.toString('hex'), 16);
    return numero.toString().padStart(12, '0');
};

// Función para validar los datos de la cuenta utilizando Joi
const validarDatos = (data) => {
    const Schema = joi.object({
        ownerFirstName: joi.string().required().label('First Name'),
        ownerLastName: joi.string().required().label('Last Name'),
        ownerUserID: joi.number().required().label('UserID'),
        accountName: joi.string().required().label('Account Name'),
        accountID: joi.number().required().label('AccountID'),
        accountBalance: joi.number().required().label('Account Balance'),
        accountCurrencyType: joi.string().required().label('Account Currency Type'),
    });
    return Schema.validate(data);
};

// Exportar el modelo de cuenta, la función de validación y la función para generar ID
module.exports = {accountModel, validarDatos, generarID};
