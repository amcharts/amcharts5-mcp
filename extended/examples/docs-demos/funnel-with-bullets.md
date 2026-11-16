---
title: "Funnel with bullets"
source: "https://docs.amcharts.com/embeds/v5/funnel-with-bullets/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/percent-charts/sliced-chart"]
---

A demo from the docs page "Funnel, pyramid, and pictorial charts" (get_doc(path: "charts/percent-charts/sliced-chart")).

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
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(
  am5percent.SlicedChart.new(root, {
    layout: root.verticalLayout
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#series
var series = chart.series.push(
  am5percent.FunnelSeries.new(root, {
    orientation: "vertical",
    valueField: "value",
    categoryField: "category"
  })
);

series.bullets.push(function (root) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{category2}",
      centerX: am5.p50,
      centerY: am5.p50,
      populateText: true
    })
  });
});

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/sliced-chart/#setting-data
series.data.setAll([
  { value: 10, category: "One", category2: "First" },
  { value: 9, category: "Two", category2: "Second" },
  { value: 6, category: "Three", category2: "Third" },
  { value: 5, category: "Four", category2: "Fourth" },
  { value: 4, category: "Five", category2: "Fifth" },
  { value: 3, category: "Six", category2: "Sixth" },
  { value: 3, category: "Seven", category2: "Seventh" }
]);

// Play initial series animation
// https://docs.amcharts.com/v5/concepts/animations/#animation-of-series
series.appear();

// Create legend
// https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    marginTop: 15,
    marginBottom: 15
  })
);

legend.data.setAll(am5.array.copy(series.dataItems).reverse());

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
