const express = require('express');
const bodyParser = require('body-parser')
const connectDB = require('./config/database');
const routes = require('./routes');

const app = express();
const port = 3000;

// Conecta a la base de datos MongoDB
connectDB();


// Analiza las solicitudes entrantes con el tipo de contenido application/json.
app.use(bodyParser.json())

// Analiza las solicitudes entrantes con el tipo de contenido application/x-www-form-urlencoded.
// Cuando extended está establecido en false, bodyParser utiliza la función querystring de Node.js para analizar los cuerpos de las solicitudes entrantes. 
// Cuando extended está establecido en true, utiliza la biblioteca qs para analizar los cuerpos de las solicitudes entrantes, lo que permite analizar objetos anidados y matrices. 
app.use(bodyParser.urlencoded({ extended: false }))

// Configura las rutas
app.use('/', routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
