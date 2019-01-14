var mysql = require('mysql');

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
        console.log(result[1].categories_name)
        $.each(items, function (i, item) {
            let a = result[i].categories_name
            $('#mySelect').append($(`<option>${a}</option>`));
        });
      })
  });
  
/*const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))*/

  
// app.listen('3306');
