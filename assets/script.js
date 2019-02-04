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
/*$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:4200/expense',
        type: 'GET',
        success: function(expense){
            
        },
        error: function(expense){
            
        }
        
        
    });*/

var labels = [
    "Income",
    "Expense",
    "Balanc"
];
var data = [
    30,
    50,
    20
];
var pie = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(pie, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [
            {
                data: data,
                borderColor: ['rgba(40, 167, 69, 1)', 'rgba(220, 53, 69, 1)', 'rgba(23, 162, 184, 1)'],
                backgroundColor: ['rgba(40, 167, 69, 0.2)', 'rgba(220, 53, 69, 0.2)', 'rgba(23, 162, 184, 0.2)'],
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: "Chart of spading"
        }
    }
});
