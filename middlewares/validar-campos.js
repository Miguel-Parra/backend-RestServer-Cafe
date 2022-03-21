const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) =>{
    const erroresValidacion = validationResult(req);
    if (!erroresValidacion.isEmpty()) {
        return res.status(400).json(erroresValidacion)
    }
    next();
}

module.exports = {
    validarCampos
}