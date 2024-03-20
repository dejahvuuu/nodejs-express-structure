const mongoose = require('mongoose');
let User

const connectDatabase = async () => {
    try {

        // Se comprueba si el modelo de usuario (User) ya está definido. Si no está definido, se define utilizando el método mongoose.model(). Se pasa el nombre del modelo como primer argumento y el esquema del modelo como segundo argumento
        if (!User) {
            User = mongoose.model('User', require('../models/userModel').schema);
        }

        await mongoose.connect('mongodb+srv://alberto:riwi@riwi.toyicbg.mongodb.net/')
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));

        await initializeData();

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
};

// Se define una función asíncrona llamada initializeData, que se encarga de borrar todos los documentos de la colección User y de insertar algunos datos de ejemplo en la base de datos

const initializeData = async () => {
    try {
        await User.deleteMany(); 

        const usersData = [
            {
                userid: 1,
                name: 'Juan',
                email: 'juan@gmail.com',
                password: 'Londres',
            },
            {
                userid: 2,
                name: 'Adriana',
                email: 'maria@hotmail.com',
                password: 'París',
            },
        ];

        await User.insertMany(usersData);
        console.log('Data successfully initialized');
    } catch (error) {
        console.error('Data initialization error:', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;