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

    let numberOfEntries;

    //Connect to MySQL to run SQL query
    db.connect(function(err) {
        if (err) {
            console.error('Error:- ' + err.stack);
            return;
        }
        console.log("Connected!");
        let numberOfEntriesSQL = "SELECT COUNT(id) FROM name_score";
        db.query(numberOfEntriesSQL, function (err, result) {
            if (err) throw err;
            console.log("record retrieval in progress");
            numberOfEntries = (parseInt(Number(Object.values(JSON.parse(JSON.stringify(result[0])))).toString()));
            console.log(numberOfEntries)
            console.log("record retrieval complete");

        });
        console.log("Startign for loop")
        for (let i = 1; i <= numberOfEntries; i++) {
            let getNameSQL = "SELECT name FROM name_score WHERE id=" + i;
            let getScoreSQL = "SELECT score FROM name_score WHERE id=" + i;
            db.query(getNameSQL, function (err, result) {
                if (err) throw err;
                console.log((Object.values(JSON.parse(JSON.stringify(result[0])))).toString())
            })
        }
        db.end();
    });


}).listen(7001);


// DECLARE @Counter INT
// SET @Counter=1
// WHILE( @Counter <= (SELECT COUNT(id) FROM name_score))
// BEGIN
// SELECT name FROM name_score WHERE id=@Counter
// SELECT score FROM name_score WHERE id=@Counter
// END

