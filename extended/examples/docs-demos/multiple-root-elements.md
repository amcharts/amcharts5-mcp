---
title: "Multiple Root elements"
source: "https://docs.amcharts.com/embeds/v5/multiple-root-elements/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["getting-started/root-element"]
---

A demo from the docs page "Root element" (get_doc(path: "getting-started/root-element")).

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

function createChart(div, data) {
  var root = am5.Root.new(div);

  root.setThemes([am5themes_Animated.new(root)]);

  var chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX"
    })
  );

  var xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      maxDeviation: 0.1,
      groupData: false,
      baseInterval: {
        timeUnit: "week",
        count: 1
      },

      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 50
      }),

      tooltip: am5.Tooltip.new(root, {})
    })
  );

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      maxDeviation: 0.1,
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );

  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date"
    })
  );

  series.data.setAll(data);
  series.appear(1000, 100);
  chart.appear(1000, 100);
}

createChart("chartdiv1", [
  { date: new Date(2022, 9, 1).getTime(), value: 8 },
  { date: new Date(2022, 9, 8).getTime(), value: 10 },
  { date: new Date(2022, 9, 15).getTime(), value: 12 },
  { date: new Date(2022, 9, 22).getTime(), value: 14 },
  { date: new Date(2022, 9, 29).getTime(), value: 11 }
]);

createChart("chartdiv2", [
  { date: new Date(2022, 9, 1).getTime(), value: 18 },
  { date: new Date(2022, 9, 8).getTime(), value: 2 },
  { date: new Date(2022, 9, 15).getTime(), value: 8 },
  { date: new Date(2022, 9, 22).getTime(), value: 24 },
  { date: new Date(2022, 9, 29).getTime(), value: 11 }
]);

createChart("chartdiv3", [
  { date: new Date(2022, 9, 1).getTime(), value: 5 },
  { date: new Date(2022, 9, 8).getTime(), value: 6 },
  { date: new Date(2022, 9, 15).getTime(), value: 12 },
  { date: new Date(2022, 9, 22).getTime(), value: 5 },
  { date: new Date(2022, 9, 29).getTime(), value: 2 }
]);
```

## HTML

```html
<div id="chartdiv1" class="chartdiv"></div>
<div id="chartdiv2" class="chartdiv"></div>
<div id="chartdiv3" class="chartdiv"></div>
```

## CSS

```css
.chartdiv {
  width: 100%;
  height: 200px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
