//Importation du schema mongoose du fichier sauces.js dans le dossier models.
const Sauce = require('../models/sauces');

   function checkArrayUsers (arrayUsers, userId){
        return arrayUsers.find(id => id === userId);
    };

    function newUserArray (arrayUsers, userId){
        return arrayUsers.filter(id => id !== userId)
    };

exports.likeHandler = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    console.log(req.body);

    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            //Si l'utilisateur aime la sauce.
            if (like === 1){
                let likeUser = checkArrayUsers(sauce.usersLiked, userId);
                if (!likeUser) {
                    sauce.likes += 1;
                    sauce.usersLiked.push(userId);
                }
                //Si l'utilisateur a déjà aimé la sauce.
                else {
                    throw new Error ("Vous avez déjà liké cette sauce.")
                }
            }
            //Si l'utilisateur n'aime pas la sauce.
            else if (like === -1){
                let dislikeUser = checkArrayUsers(sauce.usersDisliked, userId);
                if (!dislikeUser){
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(userId);
                }
                //Si l'utilisateur a déjà disliké la sauce.
                else {
                    throw new Error ("Vous avez déjà disliké cette sauce.")
                }
            }
            //Si annulation d'un like ou dislike.
            else if (like === 0){
            let likeUser = checkArrayUsers(sauce.usersLiked, userId);
                //Si l'utilisateur annule sont like.
                if(likeUser) {
                    sauce.likes -= 1;
                    sauce.usersLiked = newUserArray(sauce.usersLiked, userId);
                }
                else {
                    //Si l'utilisateur annule son dislike.
            let dislikeUser = checkArrayUsers(sauce.usersDisliked, userId);
                    if(dislikeUser){
                    sauce.dislikes += 1;
                    sauce.usersLiked = newUserArray(sauce.usersDisliked, userId);
                }
                }
            }
            sauce.save()
            //Status de validation de requête.
            .then(() => res.status(201).json({ message: "Choix appliqué" }))
            //Status d'erreur de requête.
            .catch(error => res.status(400).json({ error }));
        })       
        .catch(error => res.status(403).json({ error: error.message}))
}