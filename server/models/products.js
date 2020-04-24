const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    date: String,
    photo: String,
    amount: String
});

module.exports = mongoose.model('product', productSchema, 'products')