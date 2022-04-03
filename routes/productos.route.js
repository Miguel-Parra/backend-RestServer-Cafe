const { Router } = require('express')
const { check } = require('express-validator');
const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos.controller');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');



const router = Router();

/**
 * {{url}}/api/productos
 */

// //Obtener todos los productos - publico
router.get('/', obtenerProductos);

//Obtener producto por id - publico

router.get('/:idProducto', [
    check('idProducto').custom(existeProducto),
    validarCampos
], obtenerProducto)

//Crear producto- cualquier persona con token valido - privado
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto)

//Actualizar - cualquiera con token válido - privado
router.put('/:idProducto', [
    validarJWT,
    check('idProducto').custom(existeProducto),
    check('categoria').custom(existeCategoria),
], actualizarProducto)

//Borrar prodcuto - cualquiera con token válido - privado
router.delete('/:idProducto', [
    validarJWT,
    esAdminRole,
    check('idProducto').custom(existeProducto),
    check('categoria').custom(existeCategoria)
], borrarProducto)

module.exports = router;

