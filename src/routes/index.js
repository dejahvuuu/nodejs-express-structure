const express = require('express');
// Llamamos el enrutador a traves del metodo Router()
const router = express.Router();
// Importación del controlador de usuario
const userController = require('../controllers/userController');


// Definición de rutas y asignación a funciones del controlador
router.get('/api/v1/users', userController.getAllUsers);
router.get('/api/v1/users/nombre/:name', userController.getUserByName);
router.get('/api/v1/user/id/:id', userController.getUserById);
router.post('/api/v1/users', userController.createUser);


module.exports = router;