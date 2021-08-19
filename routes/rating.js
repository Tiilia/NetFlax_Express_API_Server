// lien à la db
var dbConnect = require("../dbConnect");
// objet sql
const sql = require('mssql/msnodesqlv8');


const ratingRoutes = (app) => {

    //tous les rating par id de film
    app.get("/rating/movie/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT r.Score, r.DateRating, m.Title, u.FirstName, u.LastName, u.Login
            FROM Rating as r
            JOIN Movie as m 
            ON m.IdMovie = r.IdMovie
            JOIN [NetFlax].[dbo].[User] as u
            ON u.IdUser = r.IdUser
            WHERE m.IdMovie = ${req.params.id}`,
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

    // //tous les rating par id de film
    // app.get("/rating/movie/:id", function (req, res) {
    //     let request = new sql.Request(dbConnect);
    //     request.query(
    //         `SELECT r.*
    //         FROM Rating as r
    //         JOIN Movie as m 
    //         ON m.IdMovie = r.IdMovie
    //         WHERE m.IdMovie = ${req.params.id}`,
    //         function (error, result, fields) {
    //             if (result.length === 0) {
    //                 result = {
    //                     response: 'error',
    //                     error: 'invalid id'
    //                 }
    //             } else {
    //                 result = result.recordset;
    //             }
    //             res.send(result);
    //         });
    // });

    //tous les rating par id user
    app.get("/rating/user/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT r.*
            FROM Rating as r
            JOIN [NetFlax].[dbo].[User] as u
            ON u.IdUser = r.IdUser
            WHERE u.IdUser = ${req.params.id}`,
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

    app.post(`/rating/`, (req, res) => {
        let content = req.body;
        console.log(content);
        let request = new sql.Request(dbConnect);
        request.query(`INSERT INTO Rating VALUES('${content.IdMovie}','${content.IdUser}','${content.Score}','${content.DateRating}')`, (err, result) => {
            if (err) console.error(err);
            else res.send(result.recordset);
        })
    });

};
module.exports = ratingRoutes;