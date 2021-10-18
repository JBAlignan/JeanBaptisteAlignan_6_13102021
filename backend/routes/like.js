//Importation d'Express.
const express = require('express');
//Création d'un router par la méthode Router d'Express.
const router = express.Router();
//Importation des fonctions de like.js du dossier controllers.
const likeCtrl = require ('../controllers/like');
//Importation du middleware d'autentification.
const auth = require('../middleware/auth');

router.post('/:id/like', auth, likeCtrl.likeHandler);

module.exports = router;