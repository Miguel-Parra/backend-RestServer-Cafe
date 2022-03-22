const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

//crear la instancia
const router = new Router();

//crear las rutas
router.post('/login', [
    check('correo', 'El correo no cumple con un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
],login);


//exportar
module.exports = router;