---
title: "Axis headers"
source: "https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-headers/"
scraped: "2026-11-16"
---

Axis header is a container attached to each axis that can be used to put any additional stuff in it: title labels, legend, or anything else.

## Header content

Each axis has a header container pre-created. It's accessible via axis' property `axisHeader`.

By default, it contains no content, so is essentially invisible.

To put content into it, we can push new elements into its `children` list:

TypeScript:

```ts
yAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "500"
}));
```

JavaScript:

```js
yAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "500"
}));
```

The above will add a label on top of the plot area the axis represents.

## Legend in header

Since header is a full-fledged container, it can contain absolutely any element.

It's also a good place for a legend:

TypeScript:

```ts
var legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

JavaScript:

```js
var legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

Example: [Stacked axes +  legend](https://docs.amcharts.com/embeds/v5/stacked-axes-legend/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
    height: am5.percent(70),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis1.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Value",
    fontWeight: "500",
    y: am5.p50,
    centerY: am5.p50
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    height: am5.percent(30),
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis2.axisHeader.set("paddingTop", 10);
yAxis2.axisHeader.children.push(
  am5.Label.new(root, {
    text: "Volume",
    y: am5.p50,
    centerY: am5.p50,
    fontWeight: "500"
  })
);

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

  var legend = yAxis.axisHeader.children.push(
    am5.Legend.new(root, {
      y: am5.p50,
      centerY: am5.p50
    })
  );

  legend.data.setAll([series]);
}

createSeries("Series #1", "value", yAxis1);
createSeries("Series #2", "value2", yAxis2);
```

## Header background

Axis header automatically has its `background` set to a `Rectangle` using default background (e.g. white).

The background does the job of obstructing X axis grid.

Should we need to change color, opacity, or disable the background altogether, we can do it by configuring background rectangle:

TypeScript:

```ts
yAxis.axisHeader.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2
});
```

JavaScript:

```js
yAxis.axisHeader.get("background").setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.2
});
```
