const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/Usuario');


const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({},'nombre email role google');

    res.json({
        ok: true,
        usuarios
    }) 
    
}

const crearUsuario = async (req, res = response ) => {
    const { nombre, email, password } = req.body;

    try {
        
        // Verificar email unique
        
        const existeEmail = await Usuario.findOne({ email } );

        if( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con ese email'
            });
        }
        
        // Crear usuario con el modelo
        const usuario = new Usuario( req.body );
        
        // Cifrar contraseña - Hash password
        const salt = bcrypt.genSaltSync( 10 );
        usuario.password = bcrypt.hashSync( password, salt );

        // Crear usuario de BD
        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id );

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            usuario,
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

const actualizarUsuario = async (req, res = response ) => {
    const uid = req.params.id;
    //const { nombre, email, password } = req.body;

    try {
        // Verificar email unique
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        // Actualizacion
        const {password, google, email, ...campos} = req.body;
        if( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email } );
    
            if( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario ya existe con ese email'
                });
            }       
        } 

        campos.email = email;
        // TODO: Validar token y que sea el usuario correcto

        const usuarioActualizado = await Usuario
                                .findByIdAndUpdate( uid, campos, { new : true } );

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            usuario: usuarioActualizado
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }


}


const borrarUsuario = async (req, res = response ) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete( uid ); 

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Usuario eliminado'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}