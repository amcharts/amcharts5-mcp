---
title: "Expanded tooltip area"
source: "https://docs.amcharts.com/embeds/v5/expanded-tooltip-area/"
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

for (var i = 1; i <= 5; i++) {
  // Create root and chart
  var root = am5.Root.new("chartdiv" + i, {
    tooltipContainerBounds: {
      top: 50,
      right: 100,
      bottom: 50,
      left: 100
    }
  });

  root.setThemes([am5themes_Animated.new(root)]);

  var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    })
  );

  // Define data
  var data = [
    {
      country: "France",
      sales: Math.random() * 10000
    },
    {
      country: "Spain",
      sales: Math.random() * 10000
    },
    {
      country: "United Kingdom",
      sales: Math.random() * 10000
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

  series.data.setAll(data);
}
```

## HTML

```html
<div class="charts">
  <div id="chartdiv1" class="chart"></div>
  <div id="chartdiv2" class="chart"></div>
  <div id="chartdiv3" class="chart"></div>
  <div id="chartdiv4" class="chart"></div>
  <div id="chartdiv5" class="chart"></div>
</div>
```

## CSS

```css
.chart {
  width: 50px;
  height: 50px;
  float: left;
  margin: 10px;
  border: 1px dotted #eee;
  position: relative;
}

.chart:hover {
  z-index: 1000;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
