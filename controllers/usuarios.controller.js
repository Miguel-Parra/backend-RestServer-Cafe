const { response, request } = require('express');
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");


const usuarioGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0, } = req.query; //argumentos opcionales
    const consulta = { estado: true } // consulta para extrer solo los que cumplen dicha propiedad
    const [usuarios, total] = await Promise.all([
        Usuario.find(consulta)
            .skip(Number(desde))
            .limit(Number(limite)),
        Usuario.countDocuments(consulta)
    ]);
    res.json({
        total,
        usuarios
    });
}

const usuarioPost = async (req, res = response) => {
    const { nombre, password, correo, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña mediante un hash
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en la base de datos
    await usuario.save();
    res.json({ usuario });
}

const usuarioPut = async (req, res = response) => {
    const id = req.params.idUsuario;
    const { _id, password, google, correo, ...resto } = req.body;
    //TODO validar contra base de datos
    if (password) {
        //Encriptar la contraseña mediante un hash
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })
    res.json({ usuario });
}

const usuarioDelete = async(req, res = response) => {
    const { idUsuario } = req.params
    //Borrado fisicamente 
    // const usuarioEliminado = await Usuario.findByIdAndDelete(idUsuario)

    const usuarioAModificar = await Usuario.findByIdAndUpdate(idUsuario,{estado: false},{new: true} )
    res.json({ usuarioAModificar});
}

const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch API Controlador'
    });
}


module.exports = {
    usuarioGet,
    usuarioPatch,
    usuarioPut,
    usuarioPost,
    usuarioDelete

}