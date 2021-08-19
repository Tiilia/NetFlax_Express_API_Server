// route pour les films
const moviesRoutes = require("./movies")
const crewRoutes = require("./crews")
const directorsRoutes = require("./directors")
const castRoutes = require("./cast");
const genresRoutes = require("./genres")
const ratingRoutes = require("./rating")


const appRouter = (app) => {

    app.get('/', (req, res) => {
        res.send('Welcome to the NetFlax api-server!');
    });

    // run our route module here to complete the wire up
    moviesRoutes(app);
    crewRoutes(app);
    directorsRoutes(app);
    castRoutes(app);
    genresRoutes(app);
    ratingRoutes(app);
};

// this line is unchanged
module.exports = appRouter;