const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");


const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        //Verificar si el email existe
        const usuarioExiste = await Usuario.findOne({ correo })
        if (!usuarioExiste) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - parte correo'
            })
        }
        // Si el usuario esta activo
        if (!usuarioExiste.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - parte estado: false'
            })
        }
        // verificar la contraseña
        const passwordValid = bcryptjs.compareSync(password, usuarioExiste.password)
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - parte contraseña'
            })
        }
        // Generar el JWT

        const token = await generarJWT(usuarioExiste._id);
        res.json({
            usuario:usuarioExiste,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);
        //verificar existencia en la base de datos
        let usuario = await Usuario.findOne({ correo: correo })
        if (!usuario) {
            // tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ":P",
                img,
                google: true
            }
            usuario = new Usuario(data)
            await usuario.save();
        }
        //si el usuario tiene estado false en nuestra DB
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            })
        }
        // Generar el JWT
        const token = await generarJWT(usuario._id);
        res.json({
           usuario,
           token
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Token no se pudo verificar'
        })
    }

}

module.exports = {
    login, googleSignIn
}