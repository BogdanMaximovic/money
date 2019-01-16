var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')
var http = require('http');
var mysql = require('mysql');
var app = express();

const con = mysql.createConnection({
    host: 'sqldemo.softmetrixgroup.com',
    port: '3306',
    user: 'root',
    password: 'smx1111',
    database: 'ijs_money_tracker_g1'
});

global.db = con;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, '/public/')))

app.get('/', function (req, res){
  con.query("SELECT * FROM ijs_money_tracker_g1.categories", function (err, result){
    if (err) {
      throw err;
    }else {
      console.log(result)
      obj = { print : result}
      res.render('pages/categories', obj)
    }
  })
});


app.listen(4000,function(){
    console.log("Server start...")
})