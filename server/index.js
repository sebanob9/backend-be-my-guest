const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

// conectamos la BBDD
const URI = 'mongodb://localhost/mean-crud'
mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}) // promesa para que nos muestre cuando está conectado a base de datos
    .then(db => console.log('db Be-my-guest conectada'))
    .catch(err => console.log(err));

//SETTINGS: definimos configuracion del puerto: process.env.por revisa si existe un puerto definido por el sistema operativo
//En caso contrario utiliza el 3000
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev')); // para enseñar mensajes con estilos en consola. 'dev es una forma de enseñar los datos'
app.use(express.json()); // para poder interpretar los datos que llegan al servidor. Angular envia los datos en formato json. Metodo que viene de express
// ahora los datos de el navegador se pueden tomar desde ---req.body---
app.use(cors({origin: 'http://localhost:4200'}))

//ROUTES --> aqui establecemos la ruta en la que se van a hacer las distintas consultas
app.use('/api/guests',require('./routes/guests.routes'));
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/gifts',require('./routes/gifts.routes'));

// Lanzamos servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
}); 