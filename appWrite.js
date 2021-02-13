const http = require('http');
let url = require("url");
const mysql = require("mysql");

//creatconnection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "lab6"
    }
);

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);
    res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
    });

    //Connect to MySQL to run SQL query
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        let sql = "INSERT INTO name_score(name, score) values ('" + q.query["name"] + "', " + q.query["score"] + ")";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

    res.end("Name: " + q.query["name"] + " Score: " + q.query["score"]);
}).listen(7000);

// let server = http.createServer(function (req, res) {
//     res.writeHead(200, {"Content-Type": "text/html", "Access-Control-Allow-Origin": "*"});
//     db.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//         let message = 'Connected!\n',
//             version = 'NodeJS' + process.versions.node + '\n',
//             response = [message, version].join('\n');
//         res.end(response);
//     });
// });
// server.listen(7000);

//Connect to MySQL to run SQL query
// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     let sql = "INSERT INTO name_score(name, score) values ('elon tusk', 2900)";
//     db.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("1 record inserted");
//     });
// });
