const { response } = require("express")
const jwt = require('jsonwebtoken')


const validarJWT = ( req, res = response, next) => {
    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    } 
    try {
        const { uid } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        
        //todo Ok
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });        
    } 
}

module.exports = {
    validarJWT
}
