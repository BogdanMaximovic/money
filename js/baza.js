// var express = require('express');
var mysql = require('mysql');
// var app = express();


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
    connection.query("SELECT * FROM transakcija", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      })
  });

  
// app.listen('3306');
