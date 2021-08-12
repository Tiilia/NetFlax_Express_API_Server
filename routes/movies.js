// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const moviesRoutes = (app) => {

    //tous les films
    app.get("/movies", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT * FROM movie",
            function (error, result, fields) {
                result = result.recordset;
                result = {
                    response: "success",
                    results: result
                };
                res.send(result);
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
                if (result.length === 0) {
                    result = {
                        response: 'error',
                        error: 'invalid id'
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

    // // équipe de tournage
    // app.get("/movies/:id/crew", function (req, res) {
    //     let request = new sql.Request(dbConnect);
    //     request.query(
    //         `SELECT * 
    //         FROM movie as M 
    //         LEFT JOIN CrewMovie as CM 
    //         ON M.IdMovie = CM.IdMovie 
    //         RIGHT JOIN Crew as C 
    //         ON CM.IdCrew = C.IdCrew 
    //         WHERE M.IdMovie = ${req.params.id}`,
    //         function (error, result, fields) {
    //             if (result.length === 0) {
    //                 result = {
    //                     response: 'error',
    //                     error: 'invalid id'
    //                 }
    //             } else {
    //                 result = result.recordset[0];
    //                 result = {
    //                     response: "success",
    //                     results: result
    //                 };
    //             }
    //             res.send(result);
    //         });
    // });
    // app.get("/movies/:id/crew", function (req, res) {
    //     let request = new sql.Request(dbConnect);
    //     let movieslist, crewlist;
    //     request.query(
    //             `SELECT * 
    //         FROM movie
    //         WHERE IdMovie = ${req.params.id}`).then(
    //             (resultQuery) => {
    //                 movieslist = resultQuery;

    //                 request.query(`
    //                 SELECT *
    //                 FROM crew`).then(
    //                     (resultQuery) => {
    //                         crewlist = resultQuery;

    //                     }
    //                 )
    //             }
    //         ),
    //         function (error, result, fields) {
    //             if (result.length === 0) {
    //                 result = {
    //                     response: 'error',
    //                     error: 'invalid id'
    //                 }
    //             } else {
    //                 result = result.recordset[0];
    //                 result = {
    //                     response: "success",
    //                     movie: result.movieslist,
    //                     crew: result.crewlist
    //                 };
    //             }
    //             res.send(result);
    //         }
    // });
};
module.exports = moviesRoutes;