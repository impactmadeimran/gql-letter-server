const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LetterSchema = new Schema({
    firstname:String,
    lastname:String,
    school:String,
    email:String
})
module.exports = mongoose.model('letters' , LetterSchema);