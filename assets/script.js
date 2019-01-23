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

    setTimeout(() => {
        $('#myTable').DataTable({
            processing: true,
            serverSide: true,
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
            ]
        })
    }, 200);

// CHART.JS

$.ajax({
    url: "http://localhost:4200/spending",
    method: "GET",
    success: function(data) {
        console.log(data);
        var player = [];
        var score = [];

        for(var i in data) {
            player.push("Player " + data[i].playerid);
            score.push(data[i].score);
        }

        var chartdata = {
            labels: player,
            datasets : [
                {
                    label: 'Player Score',
                    backgroundColor: 'rgba(200, 200, 200, 0.75)',
                    borderColor: 'rgba(200, 200, 200, 0.75)',
                    hoverBackgroundColor: 'rgba(200, 200, 200, 1)',
                    hoverBorderColor: 'rgba(200, 200, 200, 1)',
                    data: score
                }
            ]
        };

        var ctx = $("#mycanvas");

        var barGraph = new Chart(ctx, {
            type: 'bar',
            data: chartdata
        });
    },
    error: function(data) {
        console.log(data);
    }
});

}) // end