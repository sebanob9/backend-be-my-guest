const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema ({
    email: String,
    password: { type: String, required: true},
    phone: Number,
    confirmPassword: String,
    date: String,
    eventPlace: String,
    bride: String,
    groom: String,
    otherEvent: String
}, {
    timestamps: true // para guardar fecha de creacion y modificacion
}
); 

module.exports = mongoose.model('User', userSchema);
