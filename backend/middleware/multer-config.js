const multer = require('multer');

//Dictionnaire des extensions de fichier.
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//Objet storage qui contient la logique pour enregistrer les fichiers à la destination voulue.
const storage = multer.diskStorage({
    //Fonction qui indique la destination.
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //Fonction permttant de nommer le fichier entrant.
    filename: (req, file, callback) => {
        //Création du nom de fichier (supprime les espaces, remplace par underscore).
        const name = file.originalname.split(' ').join('_');
        //Création de l'extesion de fichier.
        const extension = MIME_TYPES[file.mimetype];
        //Génération du nom de fichier (nom + date + extension).
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');