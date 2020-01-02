const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema ({
    email: String,
    password: String
}, {
    timestamps: true // para guardar fecha de creacion y modificacion
}
); 

module.exports = mongoose.model('User', userSchema);
