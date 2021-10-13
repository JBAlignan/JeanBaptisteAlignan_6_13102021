//Importation d'Express.
const express = require('express');
//Création d'un router par la méthode Router d'Express.
const router = express.Router();
//Importation du middleware d'autentification.
const auth = require('../middleware/auth');
//Importation de la gestion de création de nom de fichier dans la constante multer.
const multer = require('../middleware/multer-config');
//Importation des fonctions de sauces.js du dossier controllers.
const saucesCtrl = require('../controllers/sauces');



router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.findAllSauces);
router.get('/:id', auth, saucesCtrl.findOne);
router.put('/:id', auth, multer, saucesCtrl.updateOne);
router.delete('/:id', auth, multer, saucesCtrl.supressOne);


module.exports = router;