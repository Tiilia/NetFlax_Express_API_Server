// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const crewRoutes = (app) => {

    //tous les membres d'équipe
    app.get("/crews", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT * FROM crew",
            function (error, result, fields) {
                result = result.recordset;
                result = {
                    response: "success",
                    results: result
                };
                res.send(result);
            });
    })


    // equipe par id de film
    app.get("/crews/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT *
            FROM crew 
            JOIN CrewMovie ON 
            crew.IdCrew = CrewMovie.IdCrew
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
module.exports = crewRoutes;