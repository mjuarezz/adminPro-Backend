// npm run start:dev
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')

// Crear el servidor express
const app = express();

//Base de datos
dbConnection();

// CORS
app.use( cors() );

// Rutas



app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
    
});

//console.log(process.env);




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

