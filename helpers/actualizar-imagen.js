
const fs = require( 'fs' );


const Usuario = require('../models/Usuario');
const Medico = require('../models/Medico');
const Hospital = require('../models/Hospital');

const borrarImagen = async ( path ) => {
    // Borrar la imagen anterior
    
    if( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }

}


const actualizarImagen = async ( coleccion, id, nombreArchivo ) => {
    
    switch ( coleccion ) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if(! medico ) {
                console.log('No es un medico');
                return false;
            }
            borrarImagen( `./uploads/medicos/${ medico.img }` ); 

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if(! hospital ) {
                console.log('No es un hospital');
                return false;
            }
            borrarImagen( `./uploads/hospitales/${ hospital.img }` ); 

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if(! usuario ) {
                console.log('No es un usuario');
                return false;
            }
            borrarImagen( `./uploads/usuarios/${ usuario.img }` ); 

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }

}


module.exports = {
    actualizarImagen
}