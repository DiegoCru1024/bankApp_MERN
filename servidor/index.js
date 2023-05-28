//Importamos las variables de entorno
require('dotenv').config()


//Importados las dependencias a utilizar
const cors = require('cors')
const express = require('express')
const mongoDB = require('./databaseDriver')
const loginRoute = require('./routes/loginRoute')
const registerRoute = require('./routes/registerRoute')
const app = express()


//Conexion a la base de datos
mongoDB()

//Configuración de Express y CORS
app.disable("x-powered-by")

//Middlewares
app.use(express.json())
app.use(cors())


//Rutas
app.use('/loginAPI', loginRoute)
app.use('/registerAPI', registerRoute)

//Iniciando servidor
app.listen(process.env.PORT, () => {
    console.log('[LOG] Servidor iniciado en el puerto ' + process.env.PORT)
})