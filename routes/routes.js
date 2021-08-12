// route pour les films
const moviesRoutes = require("./movies")
const crewRoutes = require("./crews")
const directorsRoutes = require("./directors")


const appRouter = (app) => {

    app.get('/', (req, res) => {
        res.send('Welcome to the NetFlax api-server!');
    });

    // run our route module here to complete the wire up
    moviesRoutes(app);
    crewRoutes(app);
    directorsRoutes(app);
};

// this line is unchanged
module.exports = appRouter;