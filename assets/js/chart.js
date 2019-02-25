// Predrag
// Chart for expense pie
$(document).ready(function () {
  am4core.useTheme(am4themes_animated);

    var chart = am4core.create("myChart", am4charts.PieChart3D);
    // Set up data source
    chart.dataSource.url = "http://localhost:4200/chart";
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "transactions_amount";
    series.dataFields.category = "categories_name";
    series.slices.template.fill = am4core.color("color");
    series.stroke = am4core.color("color");
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
});

// Chart for income pie
$(document).ready(function () {
  am4core.useTheme(am4themes_animated);

    var chart = am4core.create("myChart2", am4charts.PieChart3D);
    // Set up data source
    chart.dataSource.url = "http://localhost:4200/chart2";
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.legend = new am4charts.Legend();
    chart.legend.valueLabels.template.text.colors = "red";

    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "transactions_amount";
    series.dataFields.category = "categories_name";
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
});
// Overall XYchart
$(document).ready(function () {
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  // Create chart instance
  var chart = am4core.create("myChart3", am4charts.XYChart);
  chart.dataSource.url = "http://localhost:4200/chart3";
  
  
  // Create axes
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "Income";
  categoryAxis.renderer.labels.template.fill = am4core.color("white");
  categoryAxis.renderer.labels.template.rotation = 270;
  categoryAxis.renderer.labels.template.hideOversized = false;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.labels.template.horizontalCenter = "right";
  categoryAxis.renderer.labels.template.verticalCenter = "middle";
  categoryAxis.tooltip.label.rotation = 270;
  categoryAxis.tooltip.label.horizontalCenter = "right";
  categoryAxis.tooltip.label.verticalCenter = "middle";
  
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.renderer.labels.template.fill = am4core.color("white");
  valueAxis.title.fontWeight = "bold";
  
  
  
  // Create series
  var series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "income";
  series.dataFields.categoryX = "Income";
  series.name = "categories_name";
  series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = .8;
  
  var columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;
  columnTemplate.stroke = am4core.color("color");
  columnTemplate.fill = am4core.color("color");
  
  columnTemplate.adapter.add("fill", (fill, target) => {
    return chart.colors.getIndex(target.dataItem.index);
  })
  
  columnTemplate.adapter.add("stroke", (stroke, target) => {
    return chart.colors.getIndex(target.dataItem.index);
  })
  
  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineX.strokeOpacity = 0;
  chart.cursor.lineY.strokeOpacity = 0;
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
categoryAxis.renderer.labels.template.fill = am4core.color("white");
categoryAxis.renderer.labels.template.rotation = 270;
categoryAxis.renderer.labels.template.hideOversized = false;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.verticalCenter = "middle";
categoryAxis.tooltip.label.rotation = 270;
categoryAxis.tooltip.label.horizontalCenter = "right";
categoryAxis.tooltip.label.verticalCenter = "middle";

let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.labels.template.fill = am4core.color("white");
valueAxis.title.fontWeight = "bold";



// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "transactions_amount";
series.dataFields.categoryX = "categories_name";
series.name = "categories_name";
series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;
series.columns.template.stroke = am4core.color("color");
series.columns.template.fill = am4core.color("#00ff00"); 

var columnTemplate = series.columns.template;
columnTemplate.strokeWidth = 2;
columnTemplate.strokeOpacity = 1;
//columnTemplate.stroke = am4core.color("color");
//columnTemplate.fill = am4core.color("color");

/*columnTemplate.adapter.add("fill", (fill, target) => {
  return chart.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", (stroke, target) => {
  return chart.colors.getIndex(target.dataItem.index);
})*/

chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.strokeOpacity = 0;
chart.cursor.lineY.strokeOpacity = 0;
});

// Predrag-end   
