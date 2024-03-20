const express = require('express');
// Llamamos el enrutador a traves del metodo Router()
const router = express.Router();
// Importación del controlador de usuario
const userController = require('../controllers/userController');

const auth = require("../middleware/auth")


// Definición de rutas y asignación a funciones del controlador
router.get('/api/v1/users', auth.authenticate(), userController.getAllUsers);
router.get('/api/v1/users/nombre/:name', userController.getUserByName);
router.get('/api/v1/user/id/:id', userController.getUserById);
router.post('/api/v1/users', userController.createUser);
router.patch('/api/v1/users/update/:name', userController.updateUser);
router.delete('/api/v1/users/delete/:name', userController.deleteUser);
router.post('/register',userController.register);
router.post('/login',userController.login);


module.exports = router;