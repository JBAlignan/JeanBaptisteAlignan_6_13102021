//Importation du schema mongoose du fichier user.js dans le dossier models.
const User = require('../models/user');
//Importation de bcrypt pour le hashage du mot de passe.
const bcrypt = require('bcrypt');
//Importation de jsonwebtoken.
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Recherche de l'email dans la BDD.
        .then(user => {
            if (!user){ //Si l'email n'est pas trouvé.
                return res.status(401).json({ error: 'Utilisateur inconnu' });
            }
            bcrypt.compare(req.body.password, user.password) //Si email trouvé, comparaison des hash des mots de passe.
                .then(valid => {
                    if (!valid){ //Si échec de la comparaison.
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({ //Si valide, retour de l'id de l'utilisateur et d'un token.
                        userId: user._id,
                        token: jwt.sign( //Fonction sign encode un nouveau token.
                            { userId: user._id }, //Token contien l'ID en tant que payload.
                            'RANDOM_TOKEN_SECRET',  //Chaine secrète pour encoder le token.
                            { expiresIn: '24h' }    //Durée de validité du token.
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
};