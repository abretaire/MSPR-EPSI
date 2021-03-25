require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const table = 'QR_CODE';
// Autorise les requêtes Cross-origin resource sharing
app.use(cors());
// Encode le résultat en json
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Création de la connexion à la BDD
let con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
});

let server = app.listen(1348, function() {
    let host = server.address().address
    let port = server.address().port
    console.log("start");
});

con.connect(function(error) {
    if (error) console.log(error);
    else console.log("connected");
});
// Récupération des QR code dans la BDD
app.get('/promos', function(req, res) {
    con.query(`select * from ${table}`, function(error, rows, fields) {
        if (error) console.log(error);

        else {
            console.log(rows);
            res.send(rows);
        }
    });
});