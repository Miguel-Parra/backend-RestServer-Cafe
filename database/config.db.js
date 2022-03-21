const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.MONGO_CNN)
        console.log('Base de datos online')
    } catch (error) {
        console.log('Error con console.log'.red , error);
        throw new Error('Error al iniciar la base de datos'.blue)
    }
}
module.exports = {
    dbConnection
}