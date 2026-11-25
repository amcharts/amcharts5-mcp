---
title: "Legend with custom data"
source: "https://docs.amcharts.com/embeds/v5/legend-with-custom-data/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["concepts/legend"]
---

A demo from the docs page "Legend" (get_doc(path: "concepts/legend")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    value: 1000,
    settings: {
      fill: am5.color(0x297373)
    }
  },

  {
    category: "Marketing",
    value: 1200,
    settings: {
      fill: am5.color(0xff621f)
    }
  },

  {
    category: "Sales",
    value: 850,
    settings: {
      fill: am5.color(0x297373)
    }
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
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
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.setAll({
  templateField: "settings"
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    nameField: "name",
    fillField: "color",
    strokeField: "color",
    centerX: am5.percent(50),
    x: am5.percent(50)
  })
);

legend.itemContainers.template.events.on("click", function (e) {
  console.log(e.target.dataItem.dataContext.name);
});

legend.data.setAll([
  {
    name: "Under budget",
    color: am5.color(0x297373)
  },
  {
    name: "Over budget",
    color: am5.color(0xff621f)
  }
]);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 250px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
