// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const directorsRoutes = (app) => {

    //tous les directeurs d'équipe
    app.get("/directors", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT * FROM directors",
            function (error, result, fields) {
                result = result.recordset;
                result = {
                    response: "success",
                    results: result
                };
                res.send(result);
            });
    })


    // directeurs d'équipe par id de film
    app.get("/directors/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT *
            FROM Directors
            JOIN Crew ON
            Crew.IdCrew = Directors.IdCrew
            JOIN CrewMovie ON
            Crew.IdCrew = CrewMovie.IdCrew
            WHERE CrewMovie.IdMovie = ${req.params.id}`,
            function (error, result, fields) {
                if (result.length === 0) {
                    result = {
                        response: 'error',
                        error: 'invalid id'
                    }
                } else {
                    result = result.recordset;
                    result = {
                        response: "success",
                        results: result
                    };
                }
                res.send(result);
            });
    });

};
module.exports = directorsRoutes;