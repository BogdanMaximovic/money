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


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public/')))

app.use('/assets', express.static('assets'))
app.use('/icons', express.static('icons'))


app.get('/', function(req, res) {
    res.render('partials/header')
})

app.get('/edit', function(req, res) {
    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function(err, result) {
            console.log("======== REQUEST ========");
            console.log(req.query);
            console.log("======== END REQUEST ========");
            console.log("======== RES ========");
            console.log(res);
            console.log("======== END RES ========");
        if (err) {
            throw err;
        } else {
            obj = result;
            //console.log(obj)
            res.render('pages/edit', obj)

        }
    })
})

app.get('/spending', function(req, res) {
    let order = req.query.order[0].dir;
    let limitStart = req.query.length;
    let limitEnd = req.query.start;
    let sql = "SELECT categories_name,transactions_amount FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.transactions ON categories_id = transactions_catid WHERE categories_inc_exp = '0' ORDER BY transactions_amount " + order + " LIMIT " + limitStart + " OFFSET " + limitEnd + " ";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            data = result;
            console.log("======== REQUEST ========");
            console.log(req.query);
            console.log("======== END REQUEST ========");
            console.log(req);
            res.json(data)
            console.log("======== END DATA ========");
        }
    })
})
    
app.get('/categories', function(req, res) {
    res.render('partials/header')
})

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

app.get('/new', function(req, res) {
    let sql = "SELECT * FROM ijs_money_tracker_g1.icons";
        
        // console.log("======== RES ========");
        // console.log(res);
        // console.log("======== END RES ========");
    con.query(sql, function(err, result) {
        console.log(result);
        if (err) {
            throw err;
        } else {
            console.log("======== REQUEST ========");
        console.log(req);
        console.log("======== END REQUEST ========");
            obj = { print: result }
            console.log(obj)
            res.render('pages/new', obj)
        }
    })
})

app.post('/addingNew', function(req, res){
        console.log("======== REQUEST ========");
        console.log(req.body);
        console.log("======== END REQUEST ========");
        let category = req.body.category;
        let radioBTN = req.body.radioBtn;
        let iconID = req.body.iconID;
        let color = req.body.color;
    let sql = "INSERT INTO `ijs_money_tracker_g1`.`categories` (`categories_name`, `categories_inc_exp`, `categories_icons_id`, `color`) VALUES ('"+category+"', '"+radioBTN+"', '"+iconID+"', '"+color+"')";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
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

app.get('/adding', function(req, res) {
    data = res;
    res.render('pages/adding', data)
})

//jovana transactions

app.get('/transactions', function(req, res) {
  

    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function(err, result) {

        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj)
            res.render('pages/transactions', obj)

        }
    })
});

app.get('/btnexp', function(req, res) {
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '0'", function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj)
            res.render('pages/transactions', obj)
        }
    })
})

app.get('/btninc', function(req, res) {
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '1'",function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj)
            res.render('pages/transactions', obj)
        }
    })
})

app.get('/delete', (req,res)=>{
    con.query('DELETE FROM main WHERE main_transid =? ', [req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows)
        }else{
            console.log(err)
        }
    })
})

// --Predrag--
app.get('/expense', function(req, res) {
    var obj = {};

    con.query("SELECT categories_name, transactions_amount FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '0' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = { print: result };
            console.log(obj);
            
        }
    });
    con.query("SELECT sum(transactions_amount) AS transactions_expense FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '0' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            //obj = { print: result }
            obj.print2 = result;
            console.log(obj);
            
        }
    });
    con.query("SELECT sum(transactions_amount) AS transactions_income FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '1' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            //obj = { print: result }
            obj.print3 = result;
            console.log(obj);
        }
    });
    con.query("SELECT (SELECT sum(transactions_amount) FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '1') - (SELECT sum(transactions_amount) FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '0') AS diference", function(err, result) {
        if (err) {
            throw err;
        } else {
            //obj = { print: result }
            obj.print4 = result;
            console.log(obj);
        }
    });
    con.query("SELECT categories_name, transactions_amount FROM categories JOIN transactions ON categories_id = transactions_id WHERE categories_inc_exp = '1' ", function(err, result) {
        if (err) {
            throw err;
        } else {
            obj.print5 = result;
            console.log(obj);
            res.render('pages/speding', obj);
        }
    });
});
// --Predrag end--

// SERVER PORT //
app.listen(4200, function() {
    console.log("Server start...")
})