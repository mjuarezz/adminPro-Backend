const { response } = require('express');

const Hospital = require('../models/Hospital');


const getHospitales = async (req, res = response ) => {
     
    const hospitales = await Hospital.find()
                            .populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async (req, res = response ) => {
    
    const uid = req.uid;
    const hospital = new Hospital( { 
                    usuario: uid, 
                    ...req.body } );

    try {
        // Crear usuario de BD
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }

}


/*

    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }


*/

const actualizarHospital = async (req, res = response ) => {
    const hospitalId = req.params.id;
    const uid = req.uid;
    
    try {
        // Verificar email unique
        const hospitalDB = await Hospital.findById( hospitalId );

        if( !hospitalDB ) {
            return res.status(404).json({
               ok: false,
               msg: 'El hospital no existe'
            });
        }
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        const hospitalActualizado = await Hospital
                                .findByIdAndUpdate( hospitalId, cambiosHospital, { new : true } );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactar con el administrador'
        });
        
    }
}

const borrarHospital = async (req, res = response ) => {
    const hospitalId = req.params.id;

    try {
        const hospitalDB = await Hospital.findById( hospitalId );

        if( !hospitalDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'El hospital no existe'
            });
        }

        await Hospital.findByIdAndDelete( hospitalId ); 

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}