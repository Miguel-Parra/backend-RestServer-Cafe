const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria, 
    borrarCategoria} = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categoría por id - publico
router.get('/:idCategoria', [
    check('idCategoria', 'No es un ID válido').isMongoId(),
    check('idCategoria').custom(existeCategoria),
    validarCampos
], obtenerCategoria)

// Crear categorias - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

// Actualizar - privado - cualquier persona con un token válido
router.put('/:idCategoria',[
validarJWT,
check('idCategoria', 'No es un ID de cátegoria válido').isMongoId(),
check('nombre', 'El nombre es obligatorio').notEmpty(),
check('idCategoria').custom(existeCategoria),
validarCampos
], actualizarCategoria)

// Borrar una categoria- admin
router.delete('/:idCategoria', [
    validarJWT,
    esAdminRole,
    check('idCategoria', 'No es un ID válido').isMongoId(),
    check('idCategoria').custom(existeCategoria),
    validarCampos
],borrarCategoria)

module.exports = router; 