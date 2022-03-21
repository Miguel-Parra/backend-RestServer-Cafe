const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rolBody= '') => {
    const existeRol = await Role.findOne({ rol : rolBody});
    if (!existeRol){
        throw new Error(`El rol ${rolBody} no está registrado en la BD`)
    }
}

const emailExiste = async (correoReq) => {
    const existeEmail = await  Usuario.findOne({correo: correoReq})
    if (existeEmail) {
        throw new Error(`El correo ${correoReq} ya se encuentra registrado`)
    }
}

const usuarioIDExiste = async (idReq) => {
    const existeUsuario = await  Usuario.findById(idReq)
    if (!existeUsuario) {
        throw new Error(`El ID ${idReq} no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioIDExiste
}