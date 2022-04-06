const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const  fileUpload  = require('express-fileUpload')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        }

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
        //CORS para que todos puedan acceder y no les bloquee
        this.app.use(cors())
        //Directorio Público
        this.app.use(express.static('public'));
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.buscar, require('../routes/buscar.route'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.route'));
        this.app.use(this.paths.categorias, require('../routes/categorias.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'))
        this.app.use(this.paths.productos, require('../routes/productos.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}
module.exports = Server;