const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

// conectamos la BBDD
mongoose.connect('mongodb://localhost/mean-crud', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('BD conectada'))
    .catch(err => console.log(err));

//SETTINGS: definimos configuracion del puerto: process.env.por revisa si existe un puerto definido, sino utiliza el 3000
app.set('port', process.env.PORT || 3000);

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // para poder interpretar los datos que llegan al servidor
app.use(cors({origin: 'http://localhost:4200'}))

//ROUTES --> aqui establecemos la ruta en la que se van a hacer las distintas consultas
app.use('/api/guests',require('./routes/guests.routes'));
app.use('/api/users',require('./routes/user.routes'));

// STARTING SERVER
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'));
}); 