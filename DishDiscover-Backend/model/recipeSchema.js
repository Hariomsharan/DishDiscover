const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    dish: String,
    chef: Object,
    ingredients: [String],
    image: String,
    description: String,
}, {timestamps: true});

module.exports = mongoose.model('recipe', recipeSchema);