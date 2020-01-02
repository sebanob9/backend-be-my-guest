// NO SE USA

var mongoose = require('mongoose'),

// creamos uri para cambiarlo en un futuro si es necesario
/* const URI = 'mongodb://localhost/mean-crud'; */

// conectamos la BBDD
mongoose.connect('mongodb://localhost/mean-crud')
    .then(db => console.log('BD conectada'))
    .catch(err => console.log(err));

// es necesario exportar
module.exports = mongoose;

