const { request } = require("express");
const { response } = require("express");
const { Categoria } = require("../models")


//Obtener categorias -paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const condicion = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.count(condicion),
        Categoria.find(condicion)
            .skip(Number(desde))
            .limit(Number(limite))
         .populate('usuario', 'nombre')
    ])
    res.json({
        total,
        categorias
    })
}

//Obtener categoria por id - populate {}

const obtenerCategoria = async (req = request, res = response) => {
    const { idCategoria } = req.params;
    const categoria = await Categoria.findById(idCategoria)
        .populate('usuario', 'nombre');
    res.json(categoria)
}

const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    //verificar que no exista esa categoria
    const categoriaDB = await Categoria.findOne({ nombre: nombre });
    console.log(categoriaDB);
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${nombre}, ya existe`
        })
    }
    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data); //crea la categoria pero aun no la guarda
    await categoria.save(); //guardando en DB

    res.json({
        categoria
    })
}

//actualizar categoria

const actualizarCategoria = async (req = request, res = response) => {
    const { idCategoria } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    //usuario quien hizo la ultmia modificacion
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(idCategoria, data, { new: true });
    res.json(categoria)

}


// borrarCategoria - estado: false
const borrarCategoria = async (req = request, res = response) => {
    const { idCategoria } = req.params;
    const data = {
        estado: false,
        usuario: req.usuario._id
    }
    const categoriaBorrada = await Categoria.findByIdAndUpdate(idCategoria, data, { new: true })
    return res.json(categoriaBorrada)

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}