const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';
        //Conectar a DB
        this.conectarDB();
        // middleware
        this.middleware();
        //rutas de mi aplicación
        this.routes(); // para que configure mis rutas cuando se instancia
        //correr el servidor
        this.listen();
    }
    async conectarDB() {
        //aqui podriamos crear varias conexiones dependiendo si estamos en
        // ambiente de desarrollo o de produccion. El ambiente lo colocaríamos
        // en process.env 
        await dbConnection()
    }

    middleware() {
        // Lectura y parseo del body
        this.app.use(express.json());
        //CORS
        this.app.use(cors())
        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.usuariosPath, require('../routes/usuarios.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
module.exports = Server;