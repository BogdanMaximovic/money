const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http');
const mysql = require('mysql');
const app = express();
var Chart = require('chart.js');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public/')))

app.use('/assets', express.static('assets'))
app.use('/icons', express.static('icons'))

/*===== BOGDAN =====*/

app.get('/', function(req, res) {
    res.render('partials/header')
})
app.get('/edit', function(req, res) {
    res.render('pages/edit');
})

app.get('/edit', function(req, res) {
    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj)
            res.json('pages/edit')
        }
    });
});
        //    res.render('pages/edit', obj);

// <<<<<<< HEAD
app.get('/edit/new', function(req, res) {
    console.log("======== RES ========");
    console.log(req.query);
    console.log("======== END RES ========");

    res.render('pages/edit');
});

// >>>>>>> ecdb6f2653451669f02c15f00acb846eccf37f23

<<<<<<< HEAD
//=======
// >>>>>>> 5c3b1f08efdb73a6a36fe0772b74fbfbbbf17cc0
=======
// app.post('/editval', function(req, res){
//     con.query("UPDATE main INNER JOIN categories ON main_catid = categories.categories_id SET main_cat = '"++"' ")
// })

>>>>>>> cb6c6e949a91c1b3d84b9bc083b3119fefc3361e
app.get('/spending', function(req, res) {
    let sql = "select transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            data = result;
<<<<<<< HEAD
            res.json(data);
=======
            res.render('pages/index', data)
>>>>>>> cb6c6e949a91c1b3d84b9bc083b3119fefc3361e
        }
    });
});
    
app.get('/categories', function(req, res) {
    res.render('partials/header');
});

<<<<<<< HEAD
app.get('/spendingData', function(req, res) {
    data = res;
    res.render('pages/index', data);
});

=======
>>>>>>> cb6c6e949a91c1b3d84b9bc083b3119fefc3361e
app.get('/exp', function(req, res) {
    let sql = "SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '0'";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/categories', obj);
        }
    });
});

app.get('/inc', function(req, res) {
    let sql = "SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '1'";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    });
});

app.get('/new', function(req, res) {
    let sql = "SELECT * FROM ijs_money_tracker_g1.icons";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/new', obj)
        }
    });
});

app.post('/addingNew', function(req, res){
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
    });
});

app.get('/adding', function(req, res) {
    data = res;
    res.render('pages/adding', data)
})

app.get('/add', function(req, res) {
    let sql = "SELECT categories_id,categories_name FROM ijs_money_tracker_g1.categories";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/input', obj)
        }
    })
})

<<<<<<< HEAD
app.get('/adding', function(req, res) {
    data = res;
    res.render('pages/adding', data);
});
=======
app.post('/addingNewInput', function(req, res){
    let selectedDate = req.body.selectedDate;
    let category = req.body.category;
    let number = req.body.number;
    let message = req.body.message;
    let sql = "BEGIN; INSERT INTO transactions (transactions_id,transactions_amount, transactions_catid) VALUES('0','"+number+"', '"+category+"');INSERT INTO main (main_date, main_comment, main_catid,main_transid) VALUES('"+selectedDate+"', '"+message+"','"+category+"',LAST_INSERT_ID()); COMMIT";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
})
>>>>>>> cb6c6e949a91c1b3d84b9bc083b3119fefc3361e

/*===== BOGDAN =====*/

/*===== jovana transactions =====*/

app.get('/transactions', function(req, res) {
  

    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function(err, result) {

        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj);
            res.render('pages/transactions', obj);

        }
    });
});

app.get('/btnexp', function(req, res) {
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '0'", function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj);
            res.render('pages/transactions', obj);
        }
    })
})

app.get('/btninc', function(req, res) {
    con.query("select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '1'",function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result;
            console.log(obj);
            res.render('pages/transactions', obj);
        }
    })
})

app.post('/delete', function(req, res){
    
    let id = req.body.id;
    
   let sql = "DELETE FROM main WHERE main_transid = '"+id+"'";
    con.query(sql, function(err, result) {
    if (err) {
        throw err;
    } else {
        var obj = {};
        res.json(req.body);
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
    console.log("Server start...");
});