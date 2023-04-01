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
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = async (req, res = response ) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}