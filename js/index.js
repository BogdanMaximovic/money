/*var mysql = require('mysql');

var connection = mysql.createConnection({

    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'ijs_money_tracker_g1'
    

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("SELECT * FROM ijs_money_tracker_g1.categories", function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].categories_name)
        let ttt = result[0].categories_name
        
      })
  });*/



var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/'));
app.set('categories', 'html');

var connection = mysql.createConnection({
    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'ijs_money_tracker_g1'
});

connection.connect();

app.get('/',(req, res) => {

    connection.connect(function(err) {
    if(err) throw err;
        else {
            connection.query("SELECT * FROM ijs_money_tracker_g1.categories",(err, result) => {
                if(err) {
                    console.log(err); 
                    res.json({"error":true});
                }
                else { 
                    console.log(result); 
                    res.json(result); 
                }
            });
        }
        res.sendFile(__dirname + "/categories.html");
    });
});