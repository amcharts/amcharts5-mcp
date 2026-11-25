---
title: "Pie chart with external legend"
source: "https://docs.amcharts.com/embeds/v5/pie-chart-with-external-legend-2/"
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

/**
 * Chart
 */

// Create chartRoot and chart
var chartRoot = am5.Root.new("chartdiv");

chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var chart = chartRoot.container.children.push(
  am5percent.PieChart.new(chartRoot, {
    layout: chartRoot.horizontalLayout
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 160000
  },
  {
    country: "United Kingdom",
    sales: 80000
  },
  {
    country: "Netherlands",
    sales: 90000
  },
  {
    country: "Portugal",
    sales: 25000
  },
  {
    country: "Germany",
    sales: 70000
  },
  {
    country: "Austria",
    sales: 75000
  },
  {
    country: "Belgium",
    sales: 40000
  },
  {
    country: "Poland",
    sales: 60000
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(chartRoot, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

/**
 * Legend
 */

// Create chartRoot and chart
var legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var legend = legendRoot.container.children.push(
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
  })
);

legend.data.setAll(series.dataItems);

// Resize legend to actual height of its content
legend.events.on("boundschanged", function () {
  document.getElementById("legenddiv").style.height = legend.height() + "px";
});
```

## HTML

```html
<h2>Chart</h2>
<div id="chartdiv"></div>

<h2>Legend</h2>
<div id="legendwrapper">
  <div id="legenddiv"></div>
</div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 300px;
  border: 1px dotted #888;
}

#legendwrapper {
  width: 100%;
  height: 80px;
  overflow-y: scroll;
  border: 1px dotted #888;
}

#legenddiv {
  width: 100%;
  height: 80px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
