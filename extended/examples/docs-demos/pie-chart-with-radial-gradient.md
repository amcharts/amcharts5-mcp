---
title: "Pie chart with radial gradient"
source: "https://docs.amcharts.com/embeds/v5/pie-chart-with-radial-gradient/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/colors-gradients-and-patterns/gradients"]
---

A demo from the docs page "Gradients" (get_doc(path: "concepts/colors-gradients-and-patterns/gradients")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    radius: am5.percent(90),
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

series.data.setAll(data);

// Disabling labels and ticks
series.labels.template.set("visible", false);
series.ticks.template.set("visible", false);

series.slices.template.set("strokeOpacity", 0);
series.slices.template.set(
  "fillGradient",
  am5.RadialGradient.new(root, {
    stops: [
      {
        brighten: -0.8
      },
      {
        brighten: -0.8
      },
      {
        brighten: -0.5
      },
      {
        brighten: 0
      },
      {
        brighten: -0.5
      }
    ]
  })
);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 300px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
