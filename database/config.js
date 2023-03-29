
const mongoose = require("mongoose");


const dbConnection = async() => {
  try {

    await mongoose.connect( process.env.DB_CNN, {
    //await mongoose.connect( 'mongodb+srv://mean_user:Ctq4YAMz93SOJ6CU@cluster0.juh5sld.mongodb.net/hospitaldb', {
        useNewUrlParser: true,
        useUnifiedTopology: true        
    });

    console.log('BD connected');

  } catch (error) {
    console.log(error);
    throw new Error('Error al inicializar la BD')
  }

  
}

module.exports = {
    dbConnection
}