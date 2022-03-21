const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch } = require('../controllers/usuarios.controller');
const { esRolValido, emailExiste, usuarioIDExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuarioGet)
router.put('/:idUsuario', [
    check('idUsuario', 'No es un ID válido').isMongoId(),
    check('idUsuario').custom(usuarioIDExiste),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut)
router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contraseña debe tener más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no cumple con un formato válido').isEmail(),
    // check('rol').custom((rolBody)=> esRolValido(rolBody))
    check('correo').custom(emailExiste),//verificar si el correo existe
    check('rol').custom(esRolValido),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos

], usuarioPost)
router.delete('/:idUsuario', [
    check('idUsuario', 'No es un ID válido').isMongoId(),
    check('idUsuario').custom(usuarioIDExiste),
    validarCampos
], usuarioDelete)
router.patch('/', usuarioPatch)


module.exports = router;