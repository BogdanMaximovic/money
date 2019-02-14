// Predrag
// Chart for expense pie
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
            var myChart = AmCharts.makeChart(ctx, {
                type: 'pie',
                data: {
                    labels: name,
                    datasets: [{
                        label: 'Chart pie of expense',
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
                }
            });
        }
    });
});
// Chart for income pie
$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/chart2";
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
            var ctx = document.getElementById("myChart2");
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: name,
                    datasets: [{
                        label: 'Chart pie of income',
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
                }
            });
        }
    });
});
// Chart of overall transactions
$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/chart3";
    $.get(SERVER_URL, function (record) {
        if (record !== null) {
           var value = record.map(function (rec) {
                return rec.income;
            });
            var value2 = record.map(function (rec) {
                return rec.expense;
            });
            var value3 = record.map(function (rec) {
                return rec.balanc;
            });
            var ctx = document.getElementById("myChart3");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expense', 'Balanc'],
                    datasets: [{
                        label: 'Chart bar of balanc',
                        data: [parseInt(value), parseInt(value2), parseInt(value3)],
                        backgroundColor: ['#28a745', '#dc3545', '#17a2b8'],
                        borderColor: ['#28a745', '#dc3545', '#17a2b8']
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        }
    });
});
// Chart of incomes and expenses
$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/chart4";
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
            var ctx = document.getElementById("myChart4");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: name,
                    datasets: [{
                        label: 'Chart bar of balanc',
                        data: value,
                        backgroundColor: colors,
                        borderColor: colors
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        }
    });
});

// Predrag-end   
