---
title: "Radar series"
source: "https://docs.amcharts.com/v5/charts/radar-chart/radar-series/"
scraped: "2026-11-16"
---

While radar series resemble their equivalents in XY chart in how they are configured, there are some differences. This tutorial will address those.

## Connecting ends

Line-based series like `RadarLineSeries` and `SmoothedRadarLineSeries` will automatically connect their first and last data points to complete the circle.

We can disable this behavior using series' `connectEnds` setting:

TypeScript:

```ts
let series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);
```

JavaScript:

```js
var series = chart.series.push( 
  am5radar.RadarLineSeries.new(root, { 
    xAxis: xAxis, 
    yAxis: yAxis, 
    valueYField: "value",
    valueXField: "date",
    connectEnds: false
  }) 
);
```

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-series/connectends_true.png "`connectEnds: true` (default)")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-series/connectends_false.png "`connectEnds: false`")

Example: [Disabling radar line series end connection](https://docs.amcharts.com/embeds/v5/disabling-radar-line-series-end-connection/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}
```

JavaScript:

```js
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
  am5radar.RadarChart.new(root, {
    wheelY: "zoomX",
    layout: root.horizontalLayout,
    radius: am5.percent(90),
    innerRadius: am5.percent(40)
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
    renderer: am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20,
      gridType: "polygons"
    })
  })
);

yAxis.get("renderer").labels.template.setAll({
  visible: false
});

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
    })
  })
);

xAxis.get("renderer").labels.template.setAll({
  fontSize: 12
});

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5radar.RadarLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      connectEnds: false
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 3
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");

// Add cursor
chart.set(
  "cursor",
  am5radar.RadarCursor.new(root, {
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
