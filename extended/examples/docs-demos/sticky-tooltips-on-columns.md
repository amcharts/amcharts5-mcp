---
title: "Sticky tooltips on columns"
source: "https://docs.amcharts.com/embeds/v5/sticky-tooltips-on-columns/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/tooltips"]
---

A demo from the docs page "Tooltips" (get_doc(path: "concepts/common-elements/tooltips")).

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
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

var data = [
  {
    category: "2021",
    value: 2.5
  },
  {
    category: "2022",
    value: 2.6
  },
  {
    category: "2023",
    value: 2.8
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.columns.template.setAll({
  tooltipText: "{name}, {categoryX}:{valueY}",
  width: am5.percent(90),
  tooltipY: 0,
  tooltipText: "{categoryX}: {valueY}",
  showTooltipOn: "always"
});

series.columns.template.setup = function (target) {
  target.set("tooltip", am5.Tooltip.new(root, {}));
};

series.data.setAll(data);

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
