//Schema of the users db

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registerSchema = new Schema({
   firstName: String,
   lastName: String,
   username: String,
   email: String,
   password: String
});


module.exports = mongoose.model('register', registerSchema, 'register') //name, schemaName, collectionName