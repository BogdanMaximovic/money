$(document).ready(function() {

    const getDate = $('.month');

    (function() {
        var now, months, month, year;

        now = new Date();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        month = now.getMonth();

        year = now.getFullYear();

        getDate.text(`${months[month]} ${year}`);
    })();

    $('#myTable').DataTable({
        processing: true,
        serverSide: true,
        paging: true,
        searchable: true,
        ordering: true,
        ajax: {
            type: 'GET',
            url: 'http://localhost:4200/spending',
            contentType: 'application/json',
            dataType: 'json',
            dataSrc: '',
            data: { "isAjax": true }
        },
        columns: [
            { data: 'categories_name' },
            { data: 'transactions_amount' },
        ],
    })

}) // end
// Predrag
$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/expense";
    $.get(SERVER_URL, function (record) {
    
    if (record !== null) {
    var name = record.map(function (rec) {
    return rec.con.query("SELECT sum(transactions_amount) AS transactions_income FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '1'");
    });
    var value = record.map(function (rec) {
    return rec.con.query("SELECT sum(transactions_amount) AS transactions_expense FROM transactions JOIN categories ON transactions_catid = categories_id WHERE categories_inc_exp = '0'");
    });
    
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
    labels: name,
    datasets: [{
    label: 'Sample Data',
    data: value
    }]
    },
    options: {
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero: true
    }
    }]
    }
    }
    });
    
    }
    });
    });

    
