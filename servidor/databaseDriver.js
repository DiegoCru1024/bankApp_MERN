const mongoose = require('mongoose').default

//Conexión a la base de datos
module.exports = () => {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('[LOG] Conexión exitosa a la base de datos...')
    } catch(e){
        console.log(e)
        console.log('[ERROR] Error al conectar con la base de datos...')
    }
}