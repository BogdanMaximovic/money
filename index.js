const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http');
const mysql = require('mysql');
const app = express();

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
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public/')))

app.get('/', function (req, res){
  con.query("SELECT categories_name FROM ijs_money_tracker_g1.categories", function (err, result){
    if (err) {
      throw err;
    }else {
      console.log(result)
      obj = { print : result}
      res.render('pages/categories', obj)
    }
  })
});

app.get('/', function(req,res){
  con.query("SELECT transactions_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN categories ON transactons.transactions_catid=categories.categories_name", function (err,result){
    if(err){
      throw err;
    } else {
      console.log(result)
      obj = {print:result}
      res.render('pages/transactions', obj)
    }
  })
});

app.get('/', function(req, res) {
    res.render('pages/spending')
})
app.get('/categories', function(req, res) {
    res.render('partials/header')
})
app.get('/exp', function(req, res) {
    con.query("SELECT categories_name FROM ijs_money_tracker_g1.categories WHERE categories_inc_exp = '0' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result)
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    })
})
app.get('/inc', function(req, res) {
    con.query("SELECT categories_name FROM ijs_money_tracker_g1.categories WHERE categories_inc_exp = '1' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result)
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    })
})

app.listen(4200, function() {
    console.log("Server start...")
});