const { response } = require('express');
const Usuario = require('../models/Usuario'); 
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const login = async (req, res = response ) => {
    const { email, password } = req.body;
    
    try {
        // busca usuario en la DB
        const usuarioDB = await Usuario.findOne({ email });        
        if( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        } 

        // Validar la contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        } 

        // Generar JWT
        const token = await generarJWT( usuarioDB.id );

    
        // Generar respuesta exitosa
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
            
    }
    
}

module.exports = {
    login,
}