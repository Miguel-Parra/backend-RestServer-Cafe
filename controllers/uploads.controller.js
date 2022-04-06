const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require('express');
const path = require('path');
const fs = require('fs')
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req = request, res = response) => {
    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs'); //no envio ningun parametro más porque voy a usar las que estan colocadas por defecto
        res.json({
            msg: nombreArchivo
        })
    } catch (error) {
        res.status(error.status).json({
            msg: error.msg
        })
    }
}

const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe el usuario' })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe el producto' })
            break;
        default:
            return res.status(500).json({ msg: 'Al administrador se le olvido validar esto' })
    }
    //Limpiar imagenes previas
    if (modelo.img) { // verificamos en el modelo
        // hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        //verificamos en el servidor (carpeta)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }
    try {
        const nombreFinal = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombreFinal;
        await modelo.save();
        res.json({
            msg: modelo
        })
    } catch (error) {
        res.status(error.status).json({
            msg: error.msg
        })
    }
}

const actualizarImagenCloudinary = async (req = request, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe el usuario' })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: 'No existe el producto' })
            break;
        default:
            return res.status(500).json({ msg: 'Al administrador se le olvido validar esto' })
    }
    //Limpiar imagenes previas
    if (modelo.img) { // verificamos en el modelo
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.'); //destructuración y cogemos la primera parte colocandole ese  nombre
        await cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo;
    try {
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        modelo.img = secure_url;
        await modelo.save();
        res.json({
            msg: modelo
        })
    } catch (error) {
        res.status(error.status).json({
            msg: error.msg
        })
    }
}

const obtenerImagen = async (req = request, res = resolve) => {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) return res.status(400).json({ msg: `No existen ${coleccion} con el id ${id}` })
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) return res.status(400).json({ msg: `No existen ${coleccion} con el id ${id}` })
            break
        default:
            return res.status(500).json({ msg: 'Al administrador se le olvido validar esto' })
    }
    //verificar si existe en la base
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        // verificar si existe en el directorio
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }
    const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathNoImagen);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    obtenerImagen
}