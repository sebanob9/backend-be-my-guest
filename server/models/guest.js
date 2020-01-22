const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const guestSchema = new Schema ({
    friendFrom: { type: String},
    name: { type: String, required: true},
    category: { type: String, required: true},
    withCompanion: { type: Boolean, required: true},
    nameCompanion: { type: String, required: false},
    phone: { type: Number, required: true},
    noAllergies: { type: Boolean, required: true},
    queso: { type: Boolean, required: true},
    marisco: { type: Boolean, required: true},
    pescado: { type: Boolean, required: true},
    gluten: { type: Boolean, required: true}
    //allergies: { type: String, required: true},
})

// se pasan los datos a modelo de datos de mongoose.
// se va a guardar como 'guest' y va a usar el esquema indicado para almacenar datos.
module.exports = mongoose.model('Guest', guestSchema);


