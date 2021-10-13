//Importation du schema mongoose du fichier user.js dans le dossier models.
const User = require('../models/user');
//Importation du schema mongoose du fichier sauces.js dans le dossier models.
const Sauce = require('../models/sauces');


exports.likeHandler = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            
        })
        .catch()
}
