const { response } = require('express');
//const { validationResult } = require('express-validator');

const Medico = require('../models/Medico');


const getMedicos = async (req, res = response ) => {

     
    const medicos = await Medico.find()
                    .populate('usuario','nombre img')
                    .populate('hospital','nombre img');

    res.json({
        ok: true,
        medicos
    });

}

const crearMedico = async (req, res = response ) => {
    const uid = req.uid;
    const hid = req.hospital;
    const medico = new Medico( { 
                    usuario: uid, 
                    hospital: hid,
                    ...req.body } );

    try {
        // Valida que exista el hospital
        /*
        const hospitalDB = await Hospital.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }
        */
        // Crear usuario de BD
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medicoDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }

}

const actualizarMedico = async (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = async (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}