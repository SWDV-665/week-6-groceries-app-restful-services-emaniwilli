const mongoose = require('mongoose');

const Grocery = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('Grocery', Grocery);