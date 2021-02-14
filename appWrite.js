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

    let q = url.parse(req.url, true);
    res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
    });

    //Connect to MySQL to run SQL query
    db.connect(function(err) {
        if (err) {
            console.error('Error:- ' + err.stack);
            return;
        }
        console.log("Connected!");
        let sql = "INSERT INTO name_score(name, score) values ('" + q.query["name"] + "', " + q.query["score"] + ")";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        db.end();
    });

    res.end("Name: " + q.query["name"] + " Score: " + q.query["score"] + " was successfully uploaded to the database.");
}).listen(7000);

