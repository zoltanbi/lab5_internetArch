const http = require('http');
let url = require("url");
const mysql = require("mysql");

http.createServer(function (req, res) {
    //creatconnection
    let db = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "lab6"
        }
    );

    res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
    });

    let databaseEntries = '<table> <tr><th>ID:</th><th>Name:</th><th>Score:</th></tr>'

    //Connect to MySQL to run SQL query
    db.connect(function(err) {
        if (err) {
            console.error('Error:- ' + err.stack);
            return;
        }
        console.log("Connected!");

        const sql = "SELECT * FROM name_score";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record retrieval in progress");
            console.log(result)
            for (let i = 0; i < result.length; i++) {
                let temp = (Object.values(JSON.parse(JSON.stringify(result[i]))));
                databaseEntries += ("<tr><td>" + temp[0] + "</td><td>" + temp[1] + "</td><td>" + temp[2] + "</td></tr>")
            }
            databaseEntries += "</table>"
            console.log("record retrieval complete");
            res.end(databaseEntries)

        });
        db.end();
    });


}).listen(7001);



