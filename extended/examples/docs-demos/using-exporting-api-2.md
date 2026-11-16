---
title: "Using exporting API"
source: "https://docs.amcharts.com/embeds/v5/using-exporting-api-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/exporting-api"]
---

A demo from the docs page "Exporting API" (get_doc(path: "concepts/exporting/exporting-api")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 690
  },
  {
    category: "Marketing",
    value: 1000
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 400,
    max: 1400,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    interpolationDuration: 2000,
    interpolationEasing: am5.ease.inOut(am5.ease.elastic)
  })
);

series.data.setAll(data);

// Create custoim state on columns
series.columns.template.states.create("off", {
  fillOpacity: 0.1,
  strokeOpacity: 0.1
});

series.columns.template.setAll({
  interactive: true,
  stateAnimationDuration: 2000,
  stateAnimationEasing: am5.ease.out(am5.ease.cubic)
});

series.columns.template.events.on("click", function (ev) {
  if (ev.target.get("fillOpacity") !== 1) {
    ev.target.states.applyAnimate("default");
  } else {
    ev.target.states.applyAnimate("off");
  }
});

var exporting = am5plugins_exporting.Exporting.new(root, {
  dataSource: data,
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

setTimeout(function () {
  exporting.getCSV().then(function (csvData) {
    document.getElementById("myData").innerHTML = csvData;
  });
}, 2000);
```

## HTML

```html
<div id="chartdiv"></div>

<p><textarea id="myData"></textarea></p>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 250px;
}

#myData {
  width: 100%;
  height: 200px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
