---
title: "Smoothed line series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/series/smoothed-series/"
scraped: "2026-11-16"
---

This tutorial looks at what options we have to create smoothed line and area series.

## Creating smoothed line series

amCharts 5 offers types of smoothed line series:

| Class                        | Comment                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `am5xy.SmoothedXLineSeries`  | Used for horizontal series.                                                            |
| `am5xy.SmoothedYLineSeries`  | Used for vertical series.                                                              |
| `am5xy.SmoothedXYLineSeries` | Used for scenarios where series does not have any specific direct, e.g. scatter chart. |

Using proper axis type ensures that the line itself will not go outside its value bounds.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmoothedXSeries.png "`SmoothedXSeries`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmootherdYSeries.png "`SmoothedYSeries`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/SmoothedXYSeries.png "`SmoothedXYSeries`")

Example: [Smoothed line series](https://docs.amcharts.com/embeds/v5/smoothed-line-series/)

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
  height: 250px;
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
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1,
    value2: 2.5
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3,
    value2: 2.1
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2,
    value2: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1,
    value2: 2
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5,
    value2: 0.5
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

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
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.SmoothedXLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
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

## Line tension

Smoothed lines do have one setting: `tension`.

It's a numeric value from `0` (zero) to `1` (one) indicating strength the two connected points are "pulling" at the connecting line.

The smaller the number, the more lose and curvy the line will be. `1` indicates maximum strength which means it will be a perfectly straight line.

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_02.png "`tension: 0.2`")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_05.png "`tension: 0.5` (default)")

![](https://docs.amcharts.com/v5/images/charts/xy-chart/series/smoothed-series/tension_08.png "`tension: 0.8`")

## Configuring appearance

By all intents and purposes all smoothed line series types are essentially a line series. Its appearance, just like line series, is configured via `strokes.template` and `fills.template`.

For more information, please refer to "[Line series: Configuring appearance](https://docs.amcharts.com/v5/charts/xy-chart/series/line-series/#configuring-appearance)" tutorial.

## Using D3 smoothing

If the three smoothed line series choices does not fit our requirements, we have an option of using various smoothing algorithms bundled with [d3-shape](https://github.com/d3/d3-shape) library.

Since those are not bundled with amCharts, you may need to load load them as modules from [d3-shape npm package](https://www.npmjs.com/package/d3-shape) or compiled JS binaries from some CDN:

TypeScript:

```ts
import * as d3 from "https://cdn.skypack.dev/d3-shape@3";
```

JavaScript:

```js
<script src="https://cdn.jsdelivr.net/npm/d3-shape@3"></script>
```

Then it's just as easy as setting `curveFactory` on your regular `LineSeries`:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBumpX
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBumpX
  })
);
```

Example: [Using d3 curve factories](https://docs.amcharts.com/embeds/v5/using-d3-curve-factories/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.jsdelivr.net/npm/d3-shape@3

HTML:

```html
<div class="tools">
  <input id="selector-prev" type="button" value="&lt;" onclick="setIndex(-1)" disabled="disabled" />
  <select id="selector" onchange="setCurveFactory(this.options[this.selectedIndex].value)">
    <option value="curveBasis">curveBasis</option>
    <option value="curveBumpX">curveBumpX</option>
    <option value="curveBumpY">curveBumpY</option>
    <option value="curveCardinal">curveCardinal</option>
    <option value="curveCatmullRom">curveCatmullRom</option>
    <option value="curveMonotoneX">curveMonotoneX</option>
    <option value="curveMonotoneY">curveMonotoneY</option>
    <option value="curveNatural">curveNatural</option>
    <option value="curveStep">curveStep</option>
    <option value="curveStepAfter">curveStepAfter</option>
    <option value="curveStepBefore">curveStepBefore</option>
  </select>
  <input id="selector-next" type="button" value="&gt;" onclick="setIndex(1)" />
</div>

<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.tools {
  text-align: center;
}

.tools select,
.tools input {
  font-size: 1.2em;
  padding: 0.2em 0.4em;
}

#chartdiv {
  width: 100%;
  height: 600px;
}
```

JavaScript:

```js
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  })
);

cursor.lineY.set("visible", false);

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 40
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBasis
  })
);

series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.2
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0,
    sprite: am5.Circle.new(root, {
      radius: 4,
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,
      fill: series.get("fill")
    })
  });
});

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueY}");

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = generateDatas(50);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

function setCurveFactory(factory) {
  series.set("curveFactory", d3[factory]);
  setButtonState();
}

function setIndex(offset) {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex + offset;
  if (index < 0) {
    index = 0;
  }
  if (index > selector.options.length - 1) {
    index = selector.options.length - 1;
  }
  selector.selectedIndex = index;
  setCurveFactory(selector.options[index].value);
  setButtonState();
}

function setButtonState() {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex;
  if (index == 0) {
    document.getElementById("selector-prev").disabled = "disabled";
    document.getElementById("selector-next").disabled = "";
  } else if (index >= selector.options.length - 1) {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "disabled";
  } else {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "";
  }
}
```

## Related tutorials

* [Line series with a border](https://docs.amcharts.com/v5/tutorials/line-series-with-a-border/)
