const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_secret = "##%dasdsadasd##"; 

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
    },

    updateUser: async (req, res) => {
        try {
            const {name} = req.params;
            const userUpdate = await User.findOneAndUpdate({name: name}, {$set: { name: 'Diana'}})
            res.json(userUpdate)
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {name} = req.params;
            const deleteUser = await User.findOneAndDelete({name: name})
            res.json(deleteUser)    

        } catch (error) {
            console.error('Error al borrar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    },

    register: async (req, res) => {
        try {
            const users = await User.find();
            const { name, email, password } = req.body;

            const userData = {
                userid: users.length + 1,
                name: name,
                email: email,
                password: await bcrypt.hash(password,10),
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save(); 
            res.status(201).json(savedUser)

        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.find({email: email});

            if (!user) {
               return res.status(400).json({message: "Invalid username or password"});     
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isPasswordValid) {
                return res.status(400).json({message: "Invalid username or password"});     
            }
            
            const token = jwt.sign({userid: user.id }, jwt_secret, {
                expiresIn: "1h"
            })

            res.json({message: "Logged in successfully", token})


        } catch (error) {
            console.error('Error al loguear el usuario:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Otros métodos para manejar otras solicitudes relacionadas con los usuarios (actualizar, eliminar, etc.)
};

module.exports = userController;