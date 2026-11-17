---
title: "Pie chart with gradient fill and grain pattern"
source: "https://docs.amcharts.com/embeds/v5/pie-chart-with-gradient-fill-and-grain-pattern/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/colors-gradients-and-patterns/patterns"]
---

A demo from the docs page "Patterns" (get_doc(path: "concepts/colors-gradients-and-patterns/patterns")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout,
    innerRadius: am5.percent(50)
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
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

series.slices.template.setAll({
  fillGradient: am5.RadialGradient.new(root, {
    stops: [{ offset: 0.5 }, { brighten: -0.5 }]
  }),

  fillPattern: am5.GrainPattern.new(root, {})
});

series.data.setAll(data);
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
