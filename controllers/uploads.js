const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require( 'fs' );

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = async (req, res = response ) => {
    const coleccion = req.params.coleccion;
    const id = req.params.id;
    const tiposValidos = ['hospitales','medicos','usuarios'];
    const extensionesValidas = ['png','jpg','jpeg','gif']

    if( !tiposValidos.includes( coleccion ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'La colección no existe'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo para cargar'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    if(!extensionesValidas.includes( extensionArchivo )) {
        return res.status(400).json({
            ok: false,
            msg: 'Formato invalido de la imagen'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ coleccion }/${ nombreArchivo }`;


    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al cargar el archivo'
            });
        }

        // Actualizar BD
        actualizarImagen( coleccion, id, nombreArchivo );
    
        res.status(200).json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
      });

}




const retornaImagen = async (req, res = response ) => {
    const coleccion = req.params.coleccion;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname,`../uploads/${ coleccion }/${ foto }`);

    if( !fs.existsSync ( pathImg )  ) {
        pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
    }
    res.sendFile( pathImg );
    
}

module.exports = {
    fileUpload,
    retornaImagen
}

