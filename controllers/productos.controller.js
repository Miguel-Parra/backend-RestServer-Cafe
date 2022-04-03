const { request, response } = require('express');
const { body } = require('express-validator');
const { Schema } = require('mongoose')
const { Producto, Categoria } = require('../models');

const obtenerProductos = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, productos] = await Promise.all([
        Producto.count(query),
        Producto.find(query)
            .limit(limite)
            .skip(desde)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);
    res.json({
        total,
        productos
    });
}

const obtenerProducto = async (req = request, res = response) => {
    const { idProducto } = req.params;
    const producto = await Producto.findById(idProducto)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre');
    res.json(producto)
}

const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;
    console.log(body);
    body.nombre = body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({ 'categoria': body.categoria, nombre: body.nombre })
        .populate('categoria', 'nombre');
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe en la categoria ${productoDB.categoria.nombre}`
        })
    }
    body.usuario = req.usuario._id;
    const producto = new Producto(body);
    await producto.save();
    res.status(201).json(producto)
}


const actualizarProducto = async (req = request, res = response) => {
    const { idProducto } = req.params;
    const { usuario, estado, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const productoDB = await Producto.findOne({ 'categoria': data.categoria, nombre: data.nombre, _id: { $ne: idProducto } })
        .populate('categoria', 'nombre');
    console.log({ productoDB });
    if (productoDB) {
        return res.status(400).json({
            msg: `El nombre ${productoDB.nombre} ya existe en la categoria ${productoDB.categoria.nombre}`
        })
    }
    const producto = await Producto.findByIdAndUpdate(idProducto, data, { new: true });
    res.json(producto)
}

const borrarProducto = async (req = request, res = response) => {
    const { idProducto } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(idProducto, { estado: false }, { new: true })
    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}