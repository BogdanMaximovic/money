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

app.use('/assets', express.static('assets'))

app.get('/', function(req, res) {
    res.render('partials/header')
})
app.get('/spending', function(req, res) {
    res.render('partials/header')
})
/*
app.get('/input', function(req, res) {  //Tamara,u radu
    res.render('pages/input')
})
*/
app.get('/categories', function(req, res) {
    res.render('partials/header')
})
app.get('/exp', function(req, res) {
    con.query("SELECT categories_name,categories_id FROM ijs_money_tracker_g1.categories WHERE categories_inc_exp = '0' ", function(err, result) {
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

//u radu
//Tamara
/*
app.post('/input',function(req,res){ 
    console.log(req.body);

     var newInput= {    //format datuma nije isti kao u tabeli u bazi
         date: req.body.date, //da li treba da pisu isti nazivi kao kolone u tabeli
         category: req.body.category,
         amount: req.body.amount,
         comment: req.body.comment
        }
//Tamara
    con.query('INSERT into ijs_money_tracker_g1.main SET ?',newInput,function(err,res){
    if(err){
        throw err;
    }
        else{
        console.log(res);
    }
        })
   res.send(JSON.stringify(req.body));
})
*/

app.listen(4200, function() {
    console.log("Server start...")
})