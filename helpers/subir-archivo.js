const { v4: uuidv4 } = require('uuid');
const path = require('path')

const subirArchivo = (files,
    extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'],carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1]
        // validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject({
                status: 400,
                msg: `La extensión ${extension} no es permitida (${extensionesValidas})`
            })
        }
        const nombreFinalUuid = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreFinalUuid);
        archivo.mv(uploadPath, (error) => {
            if (error) {
                console.log(error);
                return reject({
                    status: 500,
                    msg: `Error al subir el archivo, comuníquese con el administrador`
                });
            }
            resolve(nombreFinalUuid)
        })
    })
}

module.exports = {
    subirArchivo
}