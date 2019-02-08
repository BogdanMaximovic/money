const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const http = require('http');
const mysql = require('mysql');
const port = 4200; 
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public/')))

app.use('/assets', express.static('assets'))
app.use('/icons', express.static('icons'))

/*===== BOGDAN =====*/

app.get('/', function(req, res) {
    res.render('partials/header')
})

// Jovana EDIT
app.get('/edit', function(req, res) {

    con.query('select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_id, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id', function(err, result) {
        if (err) {
            throw err;
        } else {
            obj = result; 
            res.render('pages/edit', obj)
        }
    })
})

 app.post('/editval', function(req, res){
    
    let nwct = req.body.nwct;
    let nwdt = req.body.nwdt;
    let nwam = req.body.nwam;
    let nwcm = req.body.nwcm;
    let id = req.body.id;
    
    let sql  = "UPDATE ijs_money_tracker_g1.main INNER JOIN categories ON main.main_catid = categories.categories_id INNER JOIN transactions ON main.main_transid=transactions.transactions_id SET main_catid = '"+nwct+"', main_date = '"+nwdt+"', transactions_amount= '"+nwam+"', main_comment='"+nwcm+"' WHERE main_transid = '"+id+"' "

    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
  })

  app.get('/chart', function(req, res) {
      let  sql = "SELECT main_transid, main_catid, main_date, transaction_amount FROM ijs_money_tracker_g1.main INNER JOIN  main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id"
    con.query(sql, function(err, rows, fields) {
      if(err) throw err;
      formatData(rows);
      res.send(jsonArray);
      console.log(jsonArray);
      res.render('pages/transactions', {result: data})
    });
  });

//  Jovana EDIT END

app.get('/spending', (req, res) => {
    let sql = `select transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            data = result;
            res.render('pages/index', data)
        }
    })
})

app.get('/categories', (req, res) => {
    res.render('partials/header')
})

app.get('/exp', (req, res) => {
    let sql = `SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '0'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    })
})

app.get('/inc', (req, res) => {
    let sql = `SELECT categories_icons_id,categories_name,categories_id,icons FROM ijs_money_tracker_g1.categories JOIN ijs_money_tracker_g1.icons ON categories.categories_icons_id = icons.icons_id WHERE categories_inc_exp = '1'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/categories', obj)
        }
    })
})

app.get('/new', (req, res) => {
    let sql = `SELECT * FROM ijs_money_tracker_g1.icons`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/new', obj)
        }
    })
})

app.post('/addingNew', (req, res) => {
    let category = req.body.category;
    let radioBTN = req.body.radioBtn;
    let iconID = req.body.iconID;
    let color = req.body.color;
    let sql = `INSERT INTO ijs_money_tracker_g1.categories (categories_name, categories_inc_exp, categories_icons_id, color) VALUES ('${category}','${radioBTN}','${iconID}','${color}')`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
})

app.get('/adding', (req, res) => {
    data = res;
    res.render('pages/adding', data)
})

app.get('/add', (req, res) => {
    let sql = `SELECT categories_id,categories_name FROM ijs_money_tracker_g1.categories`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = { print: result }
            res.render('pages/input', obj)
        }
    })
})

app.post('/addingNewInput', (req, res) => {
    let selectedDate = req.body.selectedDate;
    let category = req.body.category;
    let number = req.body.number;
    let message = req.body.message;
    let sql = `BEGIN; INSERT INTO transactions (transactions_id,transactions_amount, transactions_catid) VALUES('0','${number}', '${category}');INSERT INTO main (main_date, main_comment, main_catid,main_transid) VALUES('${selectedDate}', '${message}','${category}',LAST_INSERT_ID()); COMMIT`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
})

/*===== BOGDAN END=====*/

/*===== jovana transactions START=====*/

app.get('/transactions', (req, res) => {
    let sql = `select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = result;
            res.render('pages/transactions', obj)
        }
    })
});

app.get('/btnexp', (req, res) => {
    let sql = `select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '0'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = result;
            res.render('pages/transactions', obj)
        }
    })
})

app.get('/btninc', (req, res) => {
    let sql = `select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id WHERE categories_inc_exp = '1'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = result;
            res.render('pages/transactions', obj)
        }
    })
})

app.post('/delete', (req, res) => {

    let id = req.body.id;
    let sql = `DELETE FROM main WHERE main_transid = '${id}'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
})

/*===== Jovana transactions END=====*/
// Jovana EDIT
app.get('/edit', (req, res) => {
    let sql = `select transactions_id, transactions_amount, main_transid, main_date, main_comment, main_catid, categories_id, categories_name FROM ijs_money_tracker_g1.transactions INNER JOIN main ON transactions.transactions_id=main.main_transid INNER JOIN categories ON main.main_catid = categories.categories_id`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = result; 
            res.render('pages/edit', obj)
        }
    })
})

 app.post('/editval', (req, res) => {
    let nwct = req.body.nwct;
    let nwdt = req.body.nwdt;
    let nwam = req.body.nwam;
    let nwcm = req.body.nwcm;
    let id = req.body.id;
    let sql  = `UPDATE ijs_money_tracker_g1.main INNER JOIN categories ON main.main_catid = categories.categories_id INNER JOIN transactions ON main.main_transid=transactions.transactions_id SET main_catid = '${nwct}', main_date = '${nwdt}', transactions_amount= '${nwam}', main_comment='${nwcm}' WHERE main_transid = '${id}'`;
    con.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            var obj = {};
            res.json(req.body);
        }
    })
  })

//  Jovana EDIT END
/*===== Predrag START=====*/
app.get('/', (req, res) => {
    let obj = {};
    let sql1 = `SELECT main_date,categories_name, transactions_amount FROM transactions LEFT JOIN categories ON transactions_catid = categories_id LEFT JOIN main ON main_transid = transactions_id WHERE categories_inc_exp = '0' ORDER BY main_date`;
    con.query(sql1, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj = { print: result };
        }
    });
    let sql2 = `SELECT sum(transactions_amount) AS transactions_expense FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '0'`;
    con.query(sql2, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj.print2 = result;
        }
    });
    let sql3 = `SELECT sum(transactions_amount) AS transactions_income FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '1'`;
    con.query(sql3, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj.print3 = result;
        }
    });
    let sql4 = `SELECT (SELECT sum(transactions_amount) FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '1') - (SELECT sum(transactions_amount) FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '0') AS diference`
    con.query(sql4, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj.print4 = result;
        }
    });
    let sql5 = `SELECT main_date,categories_name, transactions_amount FROM transactions LEFT JOIN categories ON transactions_catid = categories_id LEFT JOIN main ON main_transid = transactions_id WHERE categories_inc_exp = '1' ORDER BY main_date`;
    con.query(sql5, (err, result) => {
        if (err) {
            throw err;
        } else {
            obj.print5 = result;
            res.render('pages/speding', obj);
        }
    });
});
/*===== Predrag =====*/

/*===== SERVER PORT =====*/
app.listen(`${port}`, () => {
    console.log(`Server start at port ${port}`);
})