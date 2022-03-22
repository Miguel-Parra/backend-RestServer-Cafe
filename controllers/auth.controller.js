const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


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
          usuarioExiste,
          token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}