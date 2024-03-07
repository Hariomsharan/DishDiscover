const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'recipe'}] 
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);