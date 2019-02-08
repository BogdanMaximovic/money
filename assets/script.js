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

    /*$('#myTable').DataTable({
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
    })*/

}) // end

// Predrag
$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/chart";
    $.get(SERVER_URL, function (record) {
        if (record !== null) {
            var name = record.map(function (rec) {
                return rec.categories_name;
            });
            var value = record.map(function (rec) {
                return rec.transactions_amount;
            });
            var colors = record.map(function (rec) {
                return rec.color;
            });
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: name,
                    datasets: [{
                        label: 'Sample Data',
                        data: value,
                        backgroundColor: colors,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    tooltips: {
                        callbacks: {
                            label: function(tooltipItem, data) {
                                var allData = data.datasets[tooltipItem.datasetIndex].data;
                                var tooltipLabel = data.labels[tooltipItem.index];
                                var tooltipData = allData[tooltipItem.index];
                                var total = 0;
                                for (var i in allData) {
                                    total += allData[i];
                                }
                                var tooltipPercentage = Math.round((tooltipData / total) * 100);
                                return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
                            }
                        }
                    }
                    /*scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }*/
                }
            });
        }
    });
});

// Predrag-end   
