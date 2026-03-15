---
title: "Pictogram"
source: "https://www.amcharts.com/demos/pictogram/"
category: "miscellaneous"
scraped: "2026-03-15"
---

This demo uses bullets on a matrix from two category axes, to display a pictogram.
XY chart
Category axis
Column series
Bullets

## JavaScript

```javascript
var rowSize = 20;
var colSize = 5;

function generateData(count) {
  var row = 1;
  var col = 1;
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      x: col + "",
      y: row + ""
    });
    col++;
    if (col > rowSize) {
      row++;
      col = 1;
    }
  }
  return data;
}

function generateCategories(count) {
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      cat: (i + 1) + ""
    });
  }
  return data;
}



// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX",
  layout: root.verticalLayout
}));


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererX.new(root, {})
}));
var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.set("forceHidden", true);
xRenderer.grid.template.set("forceHidden", true);
xAxis.data.setAll(generateCategories(rowSize));

var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
var yRenderer1 = yAxis1.get("renderer");
yRenderer1.labels.template.set("forceHidden", true);
yRenderer1.grid.template.set("forceHidden", true);
yAxis1.data.setAll(generateCategories(colSize));

yAxis1.children.unshift(
  am5.Label.new(root, {
    text: "[#247ba0]Male[/]
[#247ba0]58[/][#999999]/100[/]",
    fontSize: 32,
    y: am5.p50,
    centerY: am5.p50
  })
);

var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {}),
  marginTop: 20
}));
var yRenderer2 = yAxis2.get("renderer");
yRenderer2.labels.template.set("forceHidden", true);
yRenderer2.grid.template.set("forceHidden", true);
yAxis2.data.setAll(generateCategories(colSize));

yAxis2.children.unshift(
  am5.Label.new(root, {
    text: "[#f25f5c]Female[/]
[#f25f5c]67[/][#999999]/100[/]",
    fontSize: 32,
    y: am5.p50,
    centerY: am5.p50
  })
);

chart.leftAxesContainer.set("layout", root.verticalLayout);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, yAxis, data, color, path) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryYField: "y",
    openCategoryYField: "y",
    categoryXField: "x",
    openCategoryXField: "x",
    clustered: false
  }));

  series.columns.template.setAll({
    width: am5.percent(100),
    height: am5.percent(100),
    fillOpacity: 0,
    strokeOpacity: 0
  });

  
  series.bullets.push(function(root) {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 0.5,
      sprite: am5.Graphics.new(root, {
        fill: color,
        svgPath: path,
        centerX: am5.p50,
        centerY: am5.p50,
        scale: 0.8
      })
    });
  });
  
  series.data.setAll(data);
  
  series.appear();
  return series;
}

var femaleColor = am5.color(0xf25f5c);
var maleColor = am5.color(0x247ba0);
var placeholderColor = am5.color(0x999999);

var maleIcon = "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z";
var femaleIcon = "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z";

var maleSeriesMax = makeSeries("Male", yAxis1, generateData(100), placeholderColor, maleIcon, false);
var maleSeries = makeSeries("Male", yAxis1, generateData(58), maleColor, maleIcon, true);

var femaleSeriesMax = makeSeries("Female", yAxis2, generateData(100), placeholderColor, femaleIcon, false);
var femaleSeries = makeSeries("Female", yAxis2, generateData(67), femaleColor, femaleIcon, true);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
