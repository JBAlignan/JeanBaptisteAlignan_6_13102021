//Importation d'Express.
const express = require('express');
//Création d'un router par la méthode Router d'Express.
const router = express.Router();
//Importation des fonctions de user.js du dossier controllers.
const userCtrl = require('../controllers/user');


//Routes pour l'envoi du schema rempli au serveur, pour le signup et le login.
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation de la route de signup et login.
module.exports = router;