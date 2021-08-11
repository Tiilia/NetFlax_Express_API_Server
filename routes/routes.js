// route pour les films
const apiRoutes = require("./movies")


const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('Welcome to the NetFlax api-server!');
    });

    // run our route module here to complete the wire up
    apiRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;