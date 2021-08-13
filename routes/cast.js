// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const castRoutes = (app) => {

    //tous les directeurs d'équipe
    app.get("/cast", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT * FROM cast",
            function (error, result, fields) {
                result = result.recordset;
                res.send(result);
            });
    })


    // acteur par id
    app.get("/cast/id/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT *
            FROM cast
            WHERE IdCast = ${req.params.id}`,
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
    // acteurs par id de film
    app.get("/cast/movie/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT c.*
            FROM cast as c
            JOIN MovieCast as mc ON
            mc.IdCast =c.IdCast
            WHERE mc.idMovie = ${req.params.id}`,
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
module.exports = castRoutes;