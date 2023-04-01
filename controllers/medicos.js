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

    const id = req.params.id;
    const uid = req.uid;
    const hid = req.body.hospital;
    
    try {
        // Verificar email unique
        const medicoDB = await Medico.findById( id );

        if( !medicoDB ) {
            return res.status(404).json({
               ok: false,
               msg: 'El medico no existe'
            });
        }
        const cambiosMedico = {
            ...req.body,
            hospital: hid,
            usuario: uid
        }
        const medicoActualizado = await Medico
                                .findByIdAndUpdate( id, cambiosMedico, { new : true } );

        res.json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }


}

const borrarMedico = async (req, res = response ) => {
    const id = req.params.id;

    try {
        const medicoDB = await Medico.findById( id );

        if( !medicoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'El medico no existe'
            });
        }

        await Medico.findByIdAndDelete( id ); 

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}