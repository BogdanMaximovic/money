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

$(document).ready(function () {
    var SERVER_URL = "http://localhost:4200/chart3";
    $.get(SERVER_URL, function (record) {
        if (record !== null) {
           var income = record.map(function (rec) {
                return rec.income;
            });
            var expense = record.map(function (rec) {
                return rec.expense;
            });
            var diference = record.map(function (rec) {
                return rec.diference;
            });
            var ctx = document.getElementById("myChart3");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Income', 'Expense', 'Balanc'],
                    datasets: [{
                        label: 'Sample Data',
                        data: income,
                        backgroundColor: ['#28a745', '#dc3545', '#17a2b8'],
                        borderColor: '#fff'
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

// Predrag-end   
