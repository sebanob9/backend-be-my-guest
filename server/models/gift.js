const mongoose = require('mongoose');
const { Schema, model } = mongoose; 

const giftSchema = new Schema ({
    name: String,
    //guestId: String,
    guestName: String,
    price: Number
})

module.exports = mongoose.model('Gift', giftSchema);
