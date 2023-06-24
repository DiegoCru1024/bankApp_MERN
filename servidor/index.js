//Importamos las variables de entorno
require('dotenv').config()


//Importados las dependencias a utilizar
const cors = require('cors')
const express = require('express')
const mongoDB = require('./databaseDriver')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const createAccountRoute = require('./routes/createAccountRoute')
const getAccountsRoute = require('./routes/getAccountsRoute')
const transferMoneyRoute = require('./routes/transferMoneyRoute')
const saveMovementRoute = require('./routes/saveMovementRoute')
const getLastMovementsRoute = require('./routes/getLastMovementsRoute')
const loanRequestRoute = require('./routes/loanRequestRoute')
const loanInfoRoute = require('./routes/loanInfoRoute')
const generateInfoRoute = require('./routes/generateInfoRoute')
const app = express()


//Conexion a la base de datos
mongoDB()

//Configuración de Express y CORS
app.disable("x-powered-by")
const corsOptions = {
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

//Middlewares
app.use(express.json())
app.use(cors(corsOptions))
console.log('[LOG] Habilitando CORS para ', process.env.CORS_URL)

//Rutas
app.use('/loginAPI', loginRoute)
app.use('/registerAPI', registerRoute)
app.use('/operationsAPI/createAccount', createAccountRoute)
app.use('/operationsAPI/getAccounts', getAccountsRoute)
app.use('/operationsAPI/transferMoney', transferMoneyRoute)
app.use('/operationsAPI/saveMovementInfo', saveMovementRoute)
app.use('/operationsAPI/getLastMovements', getLastMovementsRoute)
app.use('/loanAPI/loanRequest', loanRequestRoute)
app.use('/loanAPI/loanInfo', loanInfoRoute)
app.use('/infoAPI/generateInfo', generateInfoRoute)

//Iniciando servidor
app.listen(process.env.PORT, () => {
    console.log('[LOG] Servidor iniciado en el puerto ' + process.env.PORT)
})