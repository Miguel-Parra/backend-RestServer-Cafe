const { request, response } = require('express');
const { Usuario, Categoria, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
]
const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //verifica si es un MongoId
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            resultados: usuario ? [usuario] : []
        }
        );
    }
    const expresionTermino = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{ nombre: expresionTermino }, { correo: expresionTermino }],
        $and: [{ estado: true }]
    });

    res.json({
        resultados: usuarios
    })

}
const buscarCategorias = async (termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            resultados: categoria ? [categoria] : []
        })
    }
    const expresionTermino = new RegExp(termino, 'i');
    const categorias = await Categoria.find({
        nombre: expresionTermino,
        estado: true
    });
    res.json({
        resultados: categorias
    })
}
const buscarProductos = async (termino, res = response) => {
    const esMongoID = ObjectId.isValid(termino);
    if (esMongoID) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
        return res.json({
            resultados: producto ? [producto] : []
        })
    }
    const expresionTermino = new RegExp(termino, 'i');
    const productos = await Producto.find({
        nombre: expresionTermino,
        estado: true
    })
        .populate('categoria', 'nombre')
    res.json({
        resultados: productos
    })
}



const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        default:
            return res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
    }
}

module.exports = {
    buscar,
}