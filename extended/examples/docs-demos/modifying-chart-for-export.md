---
title: "Modifying chart for export"
source: "https://docs.amcharts.com/embeds/v5/modifying-chart-for-export/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/exporting/exporting-images"]
---

A demo from the docs page "Exporting to image formats" (get_doc(path: "concepts/exporting/exporting-images")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
xRenderer.labels.template.setAll({
  rotation: -90,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "country",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "country",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

// Set data
var data = [
  {
    country: "USA",
    value: 2025
  },
  {
    country: "China",
    value: 1882
  },
  {
    country: "Japan",
    value: 1809
  },
  {
    country: "Germany",
    value: 1322
  },
  {
    country: "UK",
    value: 1122
  },
  {
    country: "France",
    value: 1114
  },
  {
    country: "India",
    value: 984
  },
  {
    country: "Spain",
    value: 711
  },
  {
    country: "Netherlands",
    value: 665
  },
  {
    country: "South Korea",
    value: 443
  },
  {
    country: "Canada",
    value: 441
  }
];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

// Add chart title
// Hide it by default, but make it show on export
var title = chart.children.unshift(
  am5.Label.new(root, {
    text: "Sales by country ($M)",
    fontSize: 24,
    textAlign: "center",
    width: am5.p100,
    visible: false
  })
);

// Add export
// https://docs.amcharts.com/v5/concepts/exporting/
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

exporting.events.on("exportstarted", function () {
  title.show(0);
});

exporting.events.on("exportfinished", function () {
  title.hide(0);
});
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
- https://cdn.amcharts.com/lib/5/plugins/exporting.js
