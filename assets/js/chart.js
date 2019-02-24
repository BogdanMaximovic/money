// Predrag
// Chart for expense pie
$(document).ready(function () {
  am4core.useTheme(am4themes_animated);

    var chart = am4core.create("myChart", am4charts.PieChart3D);
    // Set up data source
    chart.dataSource.url = "http://localhost:4200/chart";
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labelColor = am4core.color("#ccc");
    var marker = chart.legend.markers.template.children.getIndex(0);
    //marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    marker.fill = am4core.color("#ccc");

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "transactions_amount";
    series.dataFields.category = "categories_name";
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.propertyFields.stroke = "color";
    series.legendSettings.labelColor = am4core.color("#ccc");
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
});

// Chart for income pie
$(document).ready(function () {
    var chart = am4core.create("myChart2", am4charts.PieChart3D);
    // Set up data source
    chart.dataSource.url = "http://localhost:4200/chart2";
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();
    chart.legend.useDefaultMarker = true;
    chart.legend.labels.template.text.color = am4core.color("#ccc");
    var marker = chart.legend.markers.template.children.getIndex(0);
    //marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 2;
    marker.strokeOpacity = 1;
    marker.stroke = am4core.color("#ccc");
    marker.fill = am4core.color("#ccc");

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "transactions_amount";
    series.dataFields.category = "categories_name";
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.propertyFields.stroke = "color";
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
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
labels: ["Income", "Expense", "Balanc"],
datasets: [{
label: 'Sample Data',
data: [parseInt(value), parseInt(value2), parseInt(value3)],
backgroundColor: [
    'rgba(40, 167, 69, 1)',
    'rgba(220, 53, 69, 1)',
    'rgba(23, 162, 184, 1)'
],
borderColor: [
    'rgba(40, 167, 69,1)',
    'rgba(220, 53, 69, 1)',
    'rgba(23, 162, 184, 1)'
]
}]
},
options: {
  responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}
});

}
});
});

// Chart of incomes and expenses
$(document).ready(function () {
    am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("myChart4", am4charts.XYChart);
chart.dataSource.url = "http://localhost:4200/chart4";

// Create axes
let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "categories_name";
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.renderer.labels.template.hideOversized = false;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.tooltip.label.rotation = 270;
categoryAxis.tooltip.label.horizontalCenter = "right";
categoryAxis.tooltip.label.verticalCenter = "middle";

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.fontWeight = "bold";

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "transactions_amount";
series.dataFields.categoryX = "categories_name";
series.name = "categories_name";
series.columns.template.propertyFields.fill = "color";
series.columns.template.propertyFields.stroke = "color";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;

var columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;

chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineY.strokeOpacity = 0;
});

// Predrag-end   
