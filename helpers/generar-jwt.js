const jwt = require('jsonwebtoken');
const util = require('util');


const generarJWT = (uid = '') => {
    const payload = { uid: uid };
    const sign = util.promisify(jwt.sign) //transformo a promesa 
    return sign(payload, process.env.SECRETORPRIVATEKEY, {
        expiresIn: '4h'
    })

}

module.exports = {
    generarJWT
};