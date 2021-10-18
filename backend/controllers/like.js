//Importation du schema mongoose du fichier sauces.js dans le dossier models.
const Sauce = require('../models/sauces');
console.log(typeof Sauce);


exports.likeHandler = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;

    let usersLikedArray = Sauce.usersLiked.find( id => id === userId );
    let usersDislikedArray = Sauce.usersDisliked.find( id => id === userId );
    // function checkArraysUsers (arrayUsers, userId){
    //     return arrayUsers.find(id => id === userId);
    // };

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //Si l'utilisateur aime la sauce.
            if( usersLikedArray = false ) {
                Sauce.likes += 1;
                Sauce.usersLiked.push(userId);
            }
            //Si l'utilisateur a déjà aimé la sauce.
            else {
                throw new Error ("Vous avez déjà liké cette sauce.")
            }
            //Si l'utilisateur n'aime pas la sauce.
            if( usersDislikedArray = false ){
                Sauce.likes -= 1;
                Sauce.usersDisliked.push(userId);
            }
            //Si l'utilisateur a déjà non-aimé la sauce.
            else {
                throw new Error ("Vous avez déjà disliké cette sauce.")
            }
            sauce.save()
        //retour promise status OK
        .then(() => res.status(201).json({ message: "choix appliqué" }))
        //retour erreur requète
        .catch(error => res.status(400).json({ error }));
        })       
        .catch(error => res.status(403).json({ error: error.message}))
}
