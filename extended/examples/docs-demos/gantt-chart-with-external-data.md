---
title: "Gantt Chart with external data"
source: "https://docs.amcharts.com/embeds/v5/gantt-chart-with-external-data/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/data"]
---

A demo from the docs page "Data" (get_doc(path: "concepts/data")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX", "openValueX"]
});

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var colors = chart.get("colors");

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, { inversed: true }),
    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 200
    })
  })
);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "minute", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    openValueXField: "fromDate",
    valueXField: "toDate",
    categoryYField: "category",
    sequencedInterpolation: true
  })
);

series.columns.template.setAll({
  templateField: "columnSettings",
  strokeOpacity: 0,
  tooltipText:
    "{category}: {openValueX.formatDate('yyyy-MM-dd HH:mm')} - {valueX.formatDate('yyyy-MM-dd HH:mm')}"
});

series.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["fromDate", "toDate"],
  dateFormat: "yyyy-MM-dd HH:mm",
  colorFields: ["columnSettings.fill"]
});

// Add scrollbars
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

am5.net
  .load("https://docs.amcharts.com/assets/gantt_data.json")
  .then(function (result) {
    var data = am5.JSONParser.parse(result.response);
    var categories = [];
    am5.array.each(data, function (item) {
      if (categories.indexOf(item.category) == -1) {
        categories.push(item.category);
      }
    });
    am5.array.each(categories, function (category, index) {
      categories[index] = {
        category: category
      };
    });
    yAxis.data.setAll(categories);
    series.data.setAll(data);
  })
  .catch(function (result) {
    // Error
    console.log("Error loading " + result.xhr.responseURL);
  });

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear();
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
