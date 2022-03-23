const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

//crear la instancia
const router = new Router();

//crear las rutas
router.post('/login', [
    check('correo', 'El correo no cumple con un formato válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
],login);

router.post('/google', [
    check('id_token', 'id_token de google es neccesario').notEmpty(),
    validarCampos
], googleSignIn);



//exportar
module.exports = router;