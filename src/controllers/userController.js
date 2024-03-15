const User = require('../models/userModel');

// El controlador es el encargado de manejar la logica de negocio y crear los metodos correspondientes bpara manejar las solicitudes (obtener, crear, actualizar, eliminar)

const userController = {
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getUserById: async (req, res) => {
        const id = req.params.id
        try {
            const userId = await User.findById(id)
            res.json(userId)
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    },
    getUserByName: async (req,res) => {
        try{
            const {name} = req.params
            const byName = await User.findOne({name: name})
            res.json(byName)
        }catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Crear un nuevo usuario
    createUser: async (req, res) => {
        const userData = req.body;
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            // El código de respuesta de estado de éxito creado HTTP 201 Created indica que la solicitud ha tenido éxito y ha llevado a la creación de un recurso.
            res.status(201).json(savedUser);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = userController;