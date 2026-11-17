---
title: "Axis ranges with series"
source: "https://docs.amcharts.com/embeds/v5/axis-ranges-with-series/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/axes/axis-ranges"]
---

A demo from the docs page "Axis ranges" (get_doc(path: "charts/xy-chart/axes/axis-ranges")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);

  return series;
}

var series1 = createSeries("Series #1", "value");

// Create axis ranges
function createRange(series, value, endValue, color) {
  var range = series.createAxisRange(
    yAxis.makeDataItem({
      value: value,
      endValue: endValue
    })
  );

  range.columns.template.setAll({
    fill: color,
    stroke: color
  });

  range.axisDataItem.get("axisFill").setAll({
    fill: color,
    fillOpacity: 0.05,
    visible: true
  });
}

createRange(series1, 125, 275, am5.color(0xff621f));

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
