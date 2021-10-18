//Importation d'Express.
const express = require('express');
//Constante contenant Express.
const app = express();
//Importation de path; donne accès à notre système de fichier.
const path = require('path');
//importation du fichier de config
const config =  require('./config.js');
//Importation des routes.
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const likeRoute = require('./routes/like');
//Importation de mongoose.
const mongoose = require('mongoose');


//Connexion à la BDD.
mongoose.connect(`mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@cluster0.gbs7x.mongodb.net/${config.DATA_BASE_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => {
    console.log('Connexion à MongoDB échouée !');
  });

// Gestion du CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

//Enregistrement des routes.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.delete('/api/sauces/:id', saucesRoutes);
app.put('/api/sauces/:id', saucesRoutes);
app.use('/api/sauces', likeRoute);


module.exports = app;