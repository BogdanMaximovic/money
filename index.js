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
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public/')))

app.use('/assets', express.static('assets'))
app.use('/icons', express.static('icons'))

app.get('/', function(req, res) {
    res.render('partials/header')
})
app.get('/spending', function(req, res) {
    let sql = "SELECT categories_name,transactions_amount, SUM(transactions_amount) FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.transactions ON categories_id = transactions_catid WHERE categories_inc_exp = '1';" ;
    con.query(sql, function(err, result) {
        //console.log(req)
        if (err) {
            throw err;
        } else {
            data = { print: result }
            console.log(data)
            res.render('pages/index', data)
        }
    })
})
app.get('/exp', function(req, res) {
    con.query("SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '0'", function(err, result) {
      console.log(result);
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            console.log(obj)
            res.render('pages/categories', obj)
        }
    })
})
app.get('/inc', function(req, res) {
    con.query("SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '1'", function(err, result) {
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
})