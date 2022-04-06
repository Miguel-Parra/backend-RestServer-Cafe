const { Categoria, Role, Usuario, Producto } = require('../models');

const esRolValido = async (rolBody = '') => {
    const existeRol = await Role.findOne({ rol: rolBody });
    if (!existeRol) {
        throw new Error(`El rol ${rolBody} no está registrado en la BD`)
    }
}

const emailExiste = async (correoReq) => {
    const existeEmail = await Usuario.findOne({ correo: correoReq })
    if (existeEmail) {
        throw new Error(`El correo ${correoReq} ya se encuentra registrado`)
    }
}

const usuarioIDExiste = async (idReq) => {
    const existeUsuario = await Usuario.findById(idReq)
    if (!existeUsuario) {
        throw new Error(`El ID ${idReq} no existe`)
    }
}
/**
 * VAlidadores de Categorias
 */
const existeCategoria = async (idCategoria) => {
    try {
        const categoriaExiste = await Categoria.findById(idCategoria)
        if (!categoriaExiste) {
            throw new Error(`El id ${idCategoria} no existe`)
        }

    } catch (error) { //No es necesario si es que se utiliza el check con isMongoID()
        throw new Error(`El id no es válido`)
    }
}
/**
 * VAlidadores de Categorias
 */
const existeProducto = async (idProducto) => {

    try {
        const existeProducto = await Producto.findById(idProducto)
        if (!existeProducto) {
            throw new Error(`El id ${idProducto} no existe`)
        }
    } catch (error) { //No es necesario si es que se utiliza el check con isMongoID()
        throw new Error(`El id no es válido`)
    }
}
/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = async (coleccion = '', colecciones = []) => {
    if (!colecciones.includes(coleccion)) {
        throw new Error(`La coleccion ${coleccion} no es permitida (${colecciones})`)
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    usuarioIDExiste,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}