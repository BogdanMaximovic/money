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
    database: 'ijs_money_tracker_g1',
    multipleStatements: true
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
    let sql = "SELECT categories_name,transactions_amount FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.transactions ON categories_id = transactions_catid WHERE categories_inc_exp = '0' LIMIT "+req.query.length+" OFFSET "+req.query.start+" ";
    con.query(sql, function(err, result) {
        //console.log(req)
        if (err) {
            throw err;
        } else {
            data = result;
            console.log("======== REQUEST ========");
            console.log(req.query);
            console.log("======== END REQUEST ========");
            res.json(data)
            //console.log(res)
            console.log("======== END DATA ========");
        }
    })
})
// app.get('/categories', function(req, res) {
//     res.render('partials/header')
// })

app.get('/exp', function(req, res) {
    con.query("SELECT icons FROM ijs_money_tracker_g1.icons ", function(err, result) {

app.get('/spendingData', function(req, res) {
            data = res;
            res.render('pages/index', data)
})

app.get('/exp', function(req, res) {
    let sql = "SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '0'";
    con.query(sql, function(err, result) {
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
    let sql = "SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '1'";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result)
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    })
})


//jovana transactions

app.get('/transactions', function(req,res){

    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function (err, result){
        
        if(err){
           throw err;
        } else {
             obj = result;
             console.log(obj)
            res.render('pages/transactions', obj)
            
        }
    })

   
});

app.get('/btnexp', function(req,res){
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '0'", function (err, result){
        if(err){
            throw err;
        }else{
            obj = result;
             console.log(obj)
            res.render('pages/transactions', obj)
        }
    })
})

app.get('/btninc', function(req,res){
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '1'", function (err, result){
        if(err){
            throw err;
        }else{
            obj = result;
             console.log(obj)
            res.render('pages/transactions', obj)
        }
    })
})

 
    

app.listen(4200, function() {
    console.log("Server start...")
})