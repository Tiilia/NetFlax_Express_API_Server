// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const apiRoutes = (app, fs) => {

    //tous les films
    app.get("/movies", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT * FROM movie",
            function (error, result, fields) {
                result = result.recordsets;
                result = {
                    response: "success",
                    results: result
                };
            });
    });

    // par film ---------------
    app.get("/movies/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT * 
            FROM movie 
            WHERE IdMovie = ${req.params.id}`,
            function (error, result, fields) {
                result = result.recordset[0];
                result = {
                    response: "success",
                    results: result
                };
                res.send(result);
            });
    });

    // équipe de tournage
    app.get("/movies/:id/crew", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT * 
            FROM movie as M 
            LEFT JOIN CrewMovie as CM 
            ON M.IdMovie = CM.IdMovie 
            RIGHT JOIN Crew as C 
            ON CM.IdCrew = C.IdCrew 
            WHERE M.IdMovie = ${req.params.id}`,
            function (error, result, fields) {
                if (result.length === 0) {
                    result = {
                        response: 'error',
                        error: 'invalid i'
                    }
                } else {
                    result = result.recordset[0];
                    result = {
                        response: "success",
                        results: result
                    };
                }
                res.send(result);
            });
    });
};
module.exports = apiRoutes;