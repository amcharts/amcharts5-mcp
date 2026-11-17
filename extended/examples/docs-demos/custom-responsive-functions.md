---
title: "Custom responsive functions"
source: "https://docs.amcharts.com/embeds/v5/custom-responsive-functions/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/responsive"]
---

A demo from the docs page "Responsive theme" (get_doc(path: "concepts/responsive")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

var root = am5.Root.new("chartdiv");

var responsive = am5themes_Responsive.newEmpty(root);

responsive.addRule({
  relevant: am5themes_Responsive.widthM,
  applying: function () {
    chart.set("layout", root.verticalLayout);
    legend.setAll({
      y: null,
      centerY: null,
      x: am5.p0,
      centerX: am5.p0
    });
  },
  removing: function () {
    chart.set("layout", root.horizontalLayout);
    legend.setAll({
      y: am5.p50,
      centerY: am5.p50,
      x: null,
      centerX: null
    });
  }
});

root.setThemes([am5themes_Animated.new(root), responsive]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.horizontalLayout
  })
);

var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" }
]);

var legend = chart.children.push(
  am5.Legend.new(root, {
    centerY: am5.percent(50),
    y: am5.percent(50),
    marginTop: 15,
    marginBottom: 15,
    layout: root.verticalLayout
  })
);

legend.data.setAll(series.dataItems);
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
