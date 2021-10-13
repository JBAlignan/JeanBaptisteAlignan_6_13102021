//Importation de mongoose.
const mongoose = require('mongoose');
//Importation de uniqueValidator (une seule connexion par un utilisateur).
const uniqueValidator = require('mongoose-unique-validator');

//Modèle utilisateur.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
//Utilisation du plugin Validator de mongoose.
userSchema.plugin(uniqueValidator);

//Exportation du modèle.
module.exports = mongoose.model('User', userSchema);