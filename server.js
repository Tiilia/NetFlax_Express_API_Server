// chargement express et body-parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// lien à la db
var dbConnect = require("./dbConnect");

// point d'entrée du serveur
const app = express();

// fs
const fs = require('fs');

// configuration de expresss avec des paramètres de body-parser pour utiliser le json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// création des routes
const routes = require('./routes/routes.js')(app, fs);

// lancement du serveur au port 3000
const server = app.listen(3000, () => {
    console.log('listening on port %s...', server.address().port);
});