const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagenCloudinary, obtenerImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.post('/', [
    validarArchivoSubir
], cargarArchivo);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(col => coleccionesPermitidas(col, ['usuarios', 'productos'])),
    validarCampos
], obtenerImagen);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', `El id debe ser de mongo`).isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

module.exports = router;