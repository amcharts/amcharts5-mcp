---
title: "Syncing axis widths across multiple charts"
source: "https://docs.amcharts.com/embeds/v5/syncing-axis-widths-across-multiple-charts/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/xy-chart/axes/value-axis"]
---

A demo from the docs page "Value axis" (get_doc(path: "charts/xy-chart/axes/value-axis")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    value2: 14200
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    value2: 4500
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    value2: 10000
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    value2: 8000
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    value2: 9200
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 801,
    value2: 11400
  }
];

// Craete Y-axes
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var label1 = am5.Label.new(root, {
  rotation: -90,
  text: "Axis title 1",
  y: am5.p50,
  centerX: am5.p50
  //x: am5.p0,
  //centerY: am5.p0
});

yAxis1.children.unshift(label1);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    x: am5.percent(100),
    centerX: am5.percent(100),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var label2 = am5.Label.new(root, {
  rotation: -90,
  text: "Axis title 2",
  y: am5.p50,
  centerX: am5.p50
  //x: am5.p0,
  //centerY: am5.p0
});
yAxis2.children.unshift(label2);

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(
  am5.Label.new(root, {
    fontWeight: "500"
  })
);

yAxis1.ghostLabel.events.on("boundschanged", function () {
  syncTitles();
});

yAxis2.ghostLabel.events.on("boundschanged", function () {
  syncTitles();
});

function syncTitles() {
  var g1w = yAxis1.ghostLabel.width();
  var g2w = yAxis2.ghostLabel.width();

  let max = Math.max(g1w, g2w);

  yAxis1.ghostLabel.set("minWidth", max);
  yAxis2.ghostLabel.set("minWidth", max);
}

// Stack Y-axes
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field, yAxis) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      clustered: false
    })
  );

  series.data.setAll(data);
}

createSeries("Series #1", "value", yAxis1);
createSeries("Series #2", "value2", yAxis2);
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
