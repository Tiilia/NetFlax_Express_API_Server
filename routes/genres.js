// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const genresRoutes = (app) => {

    //tous les genres
    app.get("/genres", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT genre.* FROM Genre",
            function (error, result, fields) {
                result = result.recordset;
                res.send(result);
            });
    })


    // genre par id de film
    app.get("/genres/movie/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT g.*
            From Genre as g
            JOIN MovieGenre as mg ON
            mg.IdGenre = g.IdGenre
            WHERE IdMovie = ${req.params.id}`,
            function (error, result, fields) {
                if (result.length === 0) {
                    result = {
                        response: 'error',
                        error: 'invalid id'
                    }
                } else {
                    result = result.recordset;
                }
                res.send(result);
            });
    });

};
module.exports = genresRoutes;