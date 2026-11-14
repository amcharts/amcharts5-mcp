---
title: "Heat legend"
source: "https://docs.amcharts.com/v5/concepts/legend/heat-legend/"
scraped: "2026-11-14"
---

> Heat legend is a visual tool that usually compliments a chart with heat rules.

Heat legend is a visual tool that usually compliments a chart with [heat rules](https://docs.amcharts.com/v5/concepts/settings/heat-rules/).

## Adding

We can add a heat legend like a regular legend, by pushing and instance of `HeatLegend` into chart's children.

Heat legend also requires at least two settings: `startColor` and `endColor` (or [`colors`](#more-than-two-colors) instead).

Those will define colors for start (lowest value end) and end (highest value end) of the legend.

TypeScript:

```ts
let heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    endColor: am5.color(0x661f00),
    startColor: am5.color(0xff621f)
  })
);
```

JavaScript:

```js
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    endColor: am5.color(0x661f00),
    startColor: am5.color(0xff621f)
  })
);
```

## Orientation

Heat legend can either be arranged horizontally or vertically.

We can use `orientation` setting for that. It accepts either `"vertical"` or `"horizontal"`.

## Start/end labels

By default, the labels at the legend's ends show `startValue` and `endValue`, formatted with the global [number format](https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/).

To show other text instead, use `startText` and `endText`:

TypeScript:

```ts
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest"
  })
);
```

JavaScript:

```js
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest"
  })
);
```

* The text replaces the value. It isn't a prefix, and placeholders such as `{startValue}` are shown as typed. To add a formatted value, build the string yourself, e.g. `"Low: " + root.numberFormatter.format(min, "#,###.")`.
* An empty string (`startText: ""`) hides the label. Leave the setting out to show the value.

If we'd like to configure the look of these two labels, we can use `Label` objects available in legend's `startLabel` and `endLabel` properties:

TypeScript:

```ts
heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});
```

JavaScript:

```js
heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});
```

## Gradient or steps

Heat legend will display a gradient along itself starting at `startColor` and ending with an `endColor`.

If we would rather it display incremental steps, we can set legend's `stepCount` setting.

It accepts any integer value.

TypeScript:

```ts
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 10
  })
);
```

JavaScript:

```js
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 10
  })
);
```

![](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_1.png "`stepCount: 1` (default)")

![](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_5.png "`stepCount: 5`")

![](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_10.png "`stepCount: 10`")

## More than two colors

For a scale through more than two colors, e.g. red to yellow to green, use `colors` instead of `startColor` and `endColor`. The colors go from the lowest value end to the highest:

TypeScript:

```ts
let heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    colors: [
      root.interfaceColors.get("negative"),
      root.interfaceColors.get("warning"),
      root.interfaceColors.get("positive")
    ]
  })
);
```

JavaScript:

```js
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    colors: [
      root.interfaceColors.get("negative"),
      root.interfaceColors.get("warning"),
      root.interfaceColors.get("positive")
    ]
  })
);
```

By default, the legend shows a gradient through all the colors, spread evenly along it. With `stepCount` set to anything above `1`, it shows one step per color instead: the number itself is ignored.

Tooltips shown with [`showValue()`](#triggering-tooltip) take their color from the same scale.

> **Note:** `colors` is available since version 5.21.2. To color chart elements on the same scale, use heat rule's [`stops`](https://docs.amcharts.com/v5/concepts/settings/heat-rules/#multiple-stops) setting with the same colors.

## Tooltip

### Setting scale

In order for legend to be able to show value-sensitive tooltips, we need to assign it an actual value range using its `startValue` and `endValue` settings.

TypeScript:

```ts
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startValue: 0,
    endValue: 1000
  })
);
```

JavaScript:

```js
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startValue: 0,
    endValue: 1000
  })
);
```

If we don't know extreme values, we can extract that from series, when its data is validated:

TypeScript:

```ts
series.events.on("datavalidated", function () {
  heatLegend.set("startValue", series.getPrivate("valueLow"));
  heatLegend.set("endValue", series.getPrivate("valueHigh"));
});
```

JavaScript:

```js
series.events.on("datavalidated", function () {
  heatLegend.set("startValue", series.getPrivate("valueLow"));
  heatLegend.set("endValue", series.getPrivate("valueHigh"));
});
```

### Triggering tooltip

To trigger the legend to show a tooltip at specific value, we can use its `showValue()` method.

TypeScript:

```ts
heatLegend.showValue(500);
```

JavaScript:

```js
heatLegend.showValue(500);
```

We can also specify the optional text and color of tooltip by passing them in as a second and third parameter to `showValue` respectively.

TypeScript:

```ts
heatLegend.showValue(500, "Hot!", am5.color(0xff0000));
```

JavaScript:

```js
heatLegend.showValue(500, "Hot!", am5.color(0xff0000));
```

We can combine this with `"over"` events on related series items to automatically trigger heat legend tooltip with their value:

TypeScript:

```ts
polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});
```

## Examples

### Map chart

Example: [Map chart heat map with heat legend](https://docs.amcharts.com/embeds/v5/map-chart-heat-map-with-heat-legend/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/usaLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoAlbersUsa(),
    layout: root.horizontalLayout
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow,
    valueField: "value",
    calculateAggregates: true
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}"
});

polygonSeries.set("heatRules", [
  {
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xff621f),
    max: am5.color(0x661f00),
    key: "fill"
  }
]);

polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

polygonSeries.data.setAll([
  { id: "US-AL", value: 4447100 },
  { id: "US-AK", value: 626932 },
  { id: "US-AZ", value: 5130632 },
  { id: "US-AR", value: 2673400 },
  { id: "US-CA", value: 33871648 },
  { id: "US-CO", value: 4301261 },
  { id: "US-CT", value: 3405565 },
  { id: "US-DE", value: 783600 },
  { id: "US-FL", value: 15982378 },
  { id: "US-GA", value: 8186453 },
  { id: "US-HI", value: 1211537 },
  { id: "US-ID", value: 1293953 },
  { id: "US-IL", value: 12419293 },
  { id: "US-IN", value: 6080485 },
  { id: "US-IA", value: 2926324 },
  { id: "US-KS", value: 2688418 },
  { id: "US-KY", value: 4041769 },
  { id: "US-LA", value: 4468976 },
  { id: "US-ME", value: 1274923 },
  { id: "US-MD", value: 5296486 },
  { id: "US-MA", value: 6349097 },
  { id: "US-MI", value: 9938444 },
  { id: "US-MN", value: 4919479 },
  { id: "US-MS", value: 2844658 },
  { id: "US-MO", value: 5595211 },
  { id: "US-MT", value: 902195 },
  { id: "US-NE", value: 1711263 },
  { id: "US-NV", value: 1998257 },
  { id: "US-NH", value: 1235786 },
  { id: "US-NJ", value: 8414350 },
  { id: "US-NM", value: 1819046 },
  { id: "US-NY", value: 18976457 },
  { id: "US-NC", value: 8049313 },
  { id: "US-ND", value: 642200 },
  { id: "US-OH", value: 11353140 },
  { id: "US-OK", value: 3450654 },
  { id: "US-OR", value: 3421399 },
  { id: "US-PA", value: 12281054 },
  { id: "US-RI", value: 1048319 },
  { id: "US-SC", value: 4012012 },
  { id: "US-SD", value: 754844 },
  { id: "US-TN", value: 5689283 },
  { id: "US-TX", value: 20851820 },
  { id: "US-UT", value: 2233169 },
  { id: "US-VT", value: 608827 },
  { id: "US-VA", value: 7078515 },
  { id: "US-WA", value: 5894121 },
  { id: "US-WV", value: 1808344 },
  { id: "US-WI", value: 5363675 },
  { id: "US-WY", value: 493782 }
]);

var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical",
    startColor: am5.color(0xff621f),
    endColor: am5.color(0x661f00),
    startText: "Lowest",
    endText: "Highest",
    stepCount: 5
  })
);

heatLegend.startLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("startColor")
});

heatLegend.endLabel.setAll({
  fontSize: 12,
  fill: heatLegend.get("endColor")
});

// change this to template when possible
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});
```

### Radar chart

Example: [Radar chart with heat legend](https://docs.amcharts.com/embeds/v5/radar-chart-with-heat-legend/)

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
  height: 500px;
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

/**
 * Create root element
 * https://docs.amcharts.com/v5/getting-started/#root-element
 */
var root = am5.Root.new("chartdiv");

/**
 * Set themes
 * https://docs.amcharts.com/v5/concepts/themes/
 */
root.setThemes([am5themes_Animated.new(root)]);

/**
 * Create chart
 * https://docs.amcharts.com/v5/charts/radar-chart/
 */
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    innerRadius: am5.percent(50),
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    maxTooltipDistance: 0,
    layout: root.verticalLayout
  })
);

/**
 * Create axes and their renderers
 * https://docs.amcharts.com/v5/charts/radar-chart/#adding-axes
 */
var yRenderer = am5radar.AxisRendererRadial.new(root, {
  visible: false,
  axisAngle: 90,
  minGridDistance: 10,
  inversed: true
});

yRenderer.labels.template.setAll({
  textType: "circular",
  textAlign: "center",
  radius: -8
});

yRenderer.grid.template.set("visible", false);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    renderer: yRenderer,
    categoryField: "weekday"
  })
);

var xRenderer = am5radar.AxisRendererCircular.new(root, {
  visible: false,
  minGridDistance: 30
});

xRenderer.labels.template.setAll({
  textType: "circular",
  radius: 10
});

xRenderer.grid.template.set("visible", false);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: xRenderer,
    categoryField: "hour"
  })
);

/**
 * Create series
 * https://docs.amcharts.com/v5/charts/radar-chart/#adding-series
 */
var series = chart.series.push(
  am5radar.RadarColumnSeries.new(root, {
    calculateAggregates: true,
    stroke: am5.color(0xffffff),
    clustered: false,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryXField: "hour",
    categoryYField: "weekday",
    valueField: "value"
  })
);

series.columns.template.setAll({
  tooltipText: "{value}",
  strokeOpacity: 1,
  strokeWidth: 2,
  width: am5.percent(100),
  height: am5.percent(100)
});

series.columns.template.events.on("pointerover", function (event) {
  var di = event.target.dataItem;
  if (di) {
    heatLegend.showValue(di.get("value", 0));
  }
});

// change this to template when possible
series.events.on("datavalidated", function () {
  heatLegend.set("startValue", series.getPrivate("valueHigh"));
  heatLegend.set("endValue", series.getPrivate("valueLow"));
});

/**
 * Set up heat rules
 * https://docs.amcharts.com/v5/concepts/settings/heat-rules/
 */
series.set("heatRules", [
  {
    target: series.columns.template,
    min: am5.color(0xfffb77),
    max: am5.color(0xfe131a),
    dataField: "value",
    key: "fill"
  }
]);

/**
 * Add heat legend
 * https://docs.amcharts.com/v5/concepts/legend/heat-legend/
 */
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "horizontal",
    endColor: am5.color(0xfffb77),
    startColor: am5.color(0xfe131a)
  })
);

/**
 * Set data
 * https://docs.amcharts.com/v5/charts/radar-chart/#setting-data
 */
var data = [
  {
    hour: "12pm",
    weekday: "Sunday",
    value: 2990
  },
  {
    hour: "1am",
    weekday: "Sunday",
    value: 2520
  },
  {
    hour: "2am",
    weekday: "Sunday",
    value: 2334
  },
  {
    hour: "3am",
    weekday: "Sunday",
    value: 2230
  },
  {
    hour: "4am",
    weekday: "Sunday",
    value: 2325
  },
  {
    hour: "5am",
    weekday: "Sunday",
    value: 2019
  },
  {
    hour: "6am",
    weekday: "Sunday",
    value: 2128
  },
  {
    hour: "7am",
    weekday: "Sunday",
    value: 2246
  },
  {
    hour: "8am",
    weekday: "Sunday",
    value: 2421
  },
  {
    hour: "9am",
    weekday: "Sunday",
    value: 2788
  },
  {
    hour: "10am",
    weekday: "Sunday",
    value: 2959
  },
  {
    hour: "11am",
    weekday: "Sunday",
    value: 3018
  },
  {
    hour: "12am",
    weekday: "Sunday",
    value: 3154
  },
  {
    hour: "1pm",
    weekday: "Sunday",
    value: 3172
  },
  {
    hour: "2pm",
    weekday: "Sunday",
    value: 3368
  },
  {
    hour: "3pm",
    weekday: "Sunday",
    value: 3464
  },
  {
    hour: "4pm",
    weekday: "Sunday",
    value: 3746
  },
  {
    hour: "5pm",
    weekday: "Sunday",
    value: 3656
  },
  {
    hour: "6pm",
    weekday: "Sunday",
    value: 3336
  },
  {
    hour: "7pm",
    weekday: "Sunday",
    value: 3292
  },
  {
    hour: "8pm",
    weekday: "Sunday",
    value: 3269
  },
  {
    hour: "9pm",
    weekday: "Sunday",
    value: 3300
  },
  {
    hour: "10pm",
    weekday: "Sunday",
    value: 3403
  },
  {
    hour: "11pm",
    weekday: "Sunday",
    value: 3323
  },
  {
    hour: "12pm",
    weekday: "Monday",
    value: 3346
  },
  {
    hour: "1am",
    weekday: "Monday",
    value: 2725
  },
  {
    hour: "2am",
    weekday: "Monday",
    value: 3052
  },
  {
    hour: "3am",
    weekday: "Monday",
    value: 3876
  },
  {
    hour: "4am",
    weekday: "Monday",
    value: 4453
  },
  {
    hour: "5am",
    weekday: "Monday",
    value: 3972
  },
  {
    hour: "6am",
    weekday: "Monday",
    value: 4644
  },
  {
    hour: "7am",
    weekday: "Monday",
    value: 5715
  },
  {
    hour: "8am",
    weekday: "Monday",
    value: 7080
  },
  {
    hour: "9am",
    weekday: "Monday",
    value: 8022
  },
  {
    hour: "10am",
    weekday: "Monday",
    value: 8446
  },
  {
    hour: "11am",
    weekday: "Monday",
    value: 9313
  },
  {
    hour: "12am",
    weekday: "Monday",
    value: 9011
  },
  {
    hour: "1pm",
    weekday: "Monday",
    value: 8508
  },
  {
    hour: "2pm",
    weekday: "Monday",
    value: 8515
  },
  {
    hour: "3pm",
    weekday: "Monday",
    value: 8399
  },
  {
    hour: "4pm",
    weekday: "Monday",
    value: 8649
  },
  {
    hour: "5pm",
    weekday: "Monday",
    value: 7869
  },
  {
    hour: "6pm",
    weekday: "Monday",
    value: 6933
  },
  {
    hour: "7pm",
    weekday: "Monday",
    value: 5969
  },
  {
    hour: "8pm",
    weekday: "Monday",
    value: 5552
  },
  {
    hour: "9pm",
    weekday: "Monday",
    value: 5434
  },
  {
    hour: "10pm",
    weekday: "Monday",
    value: 5070
  },
  {
    hour: "11pm",
    weekday: "Monday",
    value: 4851
  },
  {
    hour: "12pm",
    weekday: "Tuesday",
    value: 4468
  },
  {
    hour: "1am",
    weekday: "Tuesday",
    value: 3306
  },
  {
    hour: "2am",
    weekday: "Tuesday",
    value: 3906
  },
  {
    hour: "3am",
    weekday: "Tuesday",
    value: 4413
  },
  {
    hour: "4am",
    weekday: "Tuesday",
    value: 4726
  },
  {
    hour: "5am",
    weekday: "Tuesday",
    value: 4584
  },
  {
    hour: "6am",
    weekday: "Tuesday",
    value: 5717
  },
  {
    hour: "7am",
    weekday: "Tuesday",
    value: 6504
  },
  {
    hour: "8am",
    weekday: "Tuesday",
    value: 8104
  },
  {
    hour: "9am",
    weekday: "Tuesday",
    value: 8813
  },
  {
    hour: "10am",
    weekday: "Tuesday",
    value: 9278
  },
  {
    hour: "11am",
    weekday: "Tuesday",
    value: 10425
  },
  {
    hour: "12am",
    weekday: "Tuesday",
    value: 10137
  },
  {
    hour: "1pm",
    weekday: "Tuesday",
    value: 9290
  },
  {
    hour: "2pm",
    weekday: "Tuesday",
    value: 9255
  },
  {
    hour: "3pm",
    weekday: "Tuesday",
    value: 9614
  },
  {
    hour: "4pm",
    weekday: "Tuesday",
    value: 9713
  },
  {
    hour: "5pm",
    weekday: "Tuesday",
    value: 9667
  },
  {
    hour: "6pm",
    weekday: "Tuesday",
    value: 8774
  },
  {
    hour: "7pm",
    weekday: "Tuesday",
    value: 8649
  },
  {
    hour: "8pm",
    weekday: "Tuesday",
    value: 9937
  },
  {
    hour: "9pm",
    weekday: "Tuesday",
    value: 10286
  },
  {
    hour: "10pm",
    weekday: "Tuesday",
    value: 9175
  },
  {
    hour: "11pm",
    weekday: "Tuesday",
    value: 8581
  },
  {
    hour: "12pm",
    weekday: "Wednesday",
    value: 8145
  },
  {
    hour: "1am",
    weekday: "Wednesday",
    value: 7177
  },
  {
    hour: "2am",
    weekday: "Wednesday",
    value: 5657
  },
  {
    hour: "3am",
    weekday: "Wednesday",
    value: 6802
  },
  {
    hour: "4am",
    weekday: "Wednesday",
    value: 8159
  },
  {
    hour: "5am",
    weekday: "Wednesday",
    value: 8449
  },
  {
    hour: "6am",
    weekday: "Wednesday",
    value: 9453
  },
  {
    hour: "7am",
    weekday: "Wednesday",
    value: 9947
  },
  {
    hour: "8am",
    weekday: "Wednesday",
    value: 11471
  },
  {
    hour: "9am",
    weekday: "Wednesday",
    value: 12492
  },
  {
    hour: "10am",
    weekday: "Wednesday",
    value: 9388
  },
  {
    hour: "11am",
    weekday: "Wednesday",
    value: 9928
  },
  {
    hour: "12am",
    weekday: "Wednesday",
    value: 9644
  },
  {
    hour: "1pm",
    weekday: "Wednesday",
    value: 9034
  },
  {
    hour: "2pm",
    weekday: "Wednesday",
    value: 8964
  },
  {
    hour: "3pm",
    weekday: "Wednesday",
    value: 9069
  },
  {
    hour: "4pm",
    weekday: "Wednesday",
    value: 8898
  },
  {
    hour: "5pm",
    weekday: "Wednesday",
    value: 8322
  },
  {
    hour: "6pm",
    weekday: "Wednesday",
    value: 6909
  },
  {
    hour: "7pm",
    weekday: "Wednesday",
    value: 5810
  },
  {
    hour: "8pm",
    weekday: "Wednesday",
    value: 5151
  },
  {
    hour: "9pm",
    weekday: "Wednesday",
    value: 4911
  },
  {
    hour: "10pm",
    weekday: "Wednesday",
    value: 4487
  },
  {
    hour: "11pm",
    weekday: "Wednesday",
    value: 4118
  },
  {
    hour: "12pm",
    weekday: "Thursday",
    value: 3689
  },
  {
    hour: "1am",
    weekday: "Thursday",
    value: 3081
  },
  {
    hour: "2am",
    weekday: "Thursday",
    value: 6525
  },
  {
    hour: "3am",
    weekday: "Thursday",
    value: 6228
  },
  {
    hour: "4am",
    weekday: "Thursday",
    value: 6917
  },
  {
    hour: "5am",
    weekday: "Thursday",
    value: 6568
  },
  {
    hour: "6am",
    weekday: "Thursday",
    value: 6405
  },
  {
    hour: "7am",
    weekday: "Thursday",
    value: 8106
  },
  {
    hour: "8am",
    weekday: "Thursday",
    value: 8542
  },
  {
    hour: "9am",
    weekday: "Thursday",
    value: 8501
  },
  {
    hour: "10am",
    weekday: "Thursday",
    value: 8802
  },
  {
    hour: "11am",
    weekday: "Thursday",
    value: 9420
  },
  {
    hour: "12am",
    weekday: "Thursday",
    value: 8966
  },
  {
    hour: "1pm",
    weekday: "Thursday",
    value: 8135
  },
  {
    hour: "2pm",
    weekday: "Thursday",
    value: 8224
  },
  {
    hour: "3pm",
    weekday: "Thursday",
    value: 8387
  },
  {
    hour: "4pm",
    weekday: "Thursday",
    value: 8218
  },
  {
    hour: "5pm",
    weekday: "Thursday",
    value: 7641
  },
  {
    hour: "6pm",
    weekday: "Thursday",
    value: 6469
  },
  {
    hour: "7pm",
    weekday: "Thursday",
    value: 5441
  },
  {
    hour: "8pm",
    weekday: "Thursday",
    value: 4952
  },
  {
    hour: "9pm",
    weekday: "Thursday",
    value: 4643
  },
  {
    hour: "10pm",
    weekday: "Thursday",
    value: 4393
  },
  {
    hour: "11pm",
    weekday: "Thursday",
    value: 4017
  },
  {
    hour: "12pm",
    weekday: "Friday",
    value: 4022
  },
  {
    hour: "1am",
    weekday: "Friday",
    value: 3063
  },
  {
    hour: "2am",
    weekday: "Friday",
    value: 3638
  },
  {
    hour: "3am",
    weekday: "Friday",
    value: 3968
  },
  {
    hour: "4am",
    weekday: "Friday",
    value: 4070
  },
  {
    hour: "5am",
    weekday: "Friday",
    value: 4019
  },
  {
    hour: "6am",
    weekday: "Friday",
    value: 4548
  },
  {
    hour: "7am",
    weekday: "Friday",
    value: 5465
  },
  {
    hour: "8am",
    weekday: "Friday",
    value: 6909
  },
  {
    hour: "9am",
    weekday: "Friday",
    value: 7706
  },
  {
    hour: "10am",
    weekday: "Friday",
    value: 7867
  },
  {
    hour: "11am",
    weekday: "Friday",
    value: 8615
  },
  {
    hour: "12am",
    weekday: "Friday",
    value: 8218
  },
  {
    hour: "1pm",
    weekday: "Friday",
    value: 7604
  },
  {
    hour: "2pm",
    weekday: "Friday",
    value: 7429
  },
  {
    hour: "3pm",
    weekday: "Friday",
    value: 7488
  },
  {
    hour: "4pm",
    weekday: "Friday",
    value: 7493
  },
  {
    hour: "5pm",
    weekday: "Friday",
    value: 6998
  },
  {
    hour: "6pm",
    weekday: "Friday",
    value: 5941
  },
  {
    hour: "7pm",
    weekday: "Friday",
    value: 5068
  },
  {
    hour: "8pm",
    weekday: "Friday",
    value: 4636
  },
  {
    hour: "9pm",
    weekday: "Friday",
    value: 4241
  },
  {
    hour: "10pm",
    weekday: "Friday",
    value: 3858
  },
  {
    hour: "11pm",
    weekday: "Friday",
    value: 3833
  },
  {
    hour: "12pm",
    weekday: "Saturday",
    value: 3503
  },
  {
    hour: "1am",
    weekday: "Saturday",
    value: 2842
  },
  {
    hour: "2am",
    weekday: "Saturday",
    value: 2808
  },
  {
    hour: "3am",
    weekday: "Saturday",
    value: 2399
  },
  {
    hour: "4am",
    weekday: "Saturday",
    value: 2280
  },
  {
    hour: "5am",
    weekday: "Saturday",
    value: 2139
  },
  {
    hour: "6am",
    weekday: "Saturday",
    value: 2527
  },
  {
    hour: "7am",
    weekday: "Saturday",
    value: 2940
  },
  {
    hour: "8am",
    weekday: "Saturday",
    value: 3066
  },
  {
    hour: "9am",
    weekday: "Saturday",
    value: 3494
  },
  {
    hour: "10am",
    weekday: "Saturday",
    value: 3287
  },
  {
    hour: "11am",
    weekday: "Saturday",
    value: 3416
  },
  {
    hour: "12am",
    weekday: "Saturday",
    value: 3432
  },
  {
    hour: "1pm",
    weekday: "Saturday",
    value: 3523
  },
  {
    hour: "2pm",
    weekday: "Saturday",
    value: 3542
  },
  {
    hour: "3pm",
    weekday: "Saturday",
    value: 3347
  },
  {
    hour: "4pm",
    weekday: "Saturday",
    value: 3292
  },
  {
    hour: "5pm",
    weekday: "Saturday",
    value: 3416
  },
  {
    hour: "6pm",
    weekday: "Saturday",
    value: 3131
  },
  {
    hour: "7pm",
    weekday: "Saturday",
    value: 3057
  },
  {
    hour: "8pm",
    weekday: "Saturday",
    value: 3227
  },
  {
    hour: "9pm",
    weekday: "Saturday",
    value: 3060
  },
  {
    hour: "10pm",
    weekday: "Saturday",
    value: 2855
  },
  {
    hour: "11pm",
    weekday: "Saturday",
    value: 2625
  }
];

series.data.setAll(data);

yAxis.data.setAll([
  { weekday: "Sunday" },
  { weekday: "Monday" },
  { weekday: "Tuesday" },
  { weekday: "Wednesday" },
  { weekday: "Thursday" },
  { weekday: "Friday" },
  { weekday: "Saturday" }
]);

xAxis.data.setAll([
  { hour: "12pm" },
  { hour: "1am" },
  { hour: "2am" },
  { hour: "3am" },
  { hour: "4am" },
  { hour: "5am" },
  { hour: "6am" },
  { hour: "7am" },
  { hour: "8am" },
  { hour: "9am" },
  { hour: "10am" },
  { hour: "11am" },
  { hour: "12am" },
  { hour: "1pm" },
  { hour: "2pm" },
  { hour: "3pm" },
  { hour: "4pm" },
  { hour: "5pm" },
  { hour: "6pm" },
  { hour: "7pm" },
  { hour: "8pm" },
  { hour: "9pm" },
  { hour: "10pm" },
  { hour: "11pm" }
]);

/**
 * Animate series in
 * https://docs.amcharts.com/v5/concepts/animations/#initial-animation
 */
series.appear();
```

## Related tutorials

* [A custom "heat legend" using a gradient](https://docs.amcharts.com/v5/tutorials/a-custom-heat-legend-using-a-gradient/) (demo)
* [Heat legend with scale](https://docs.amcharts.com/v5/tutorials/heat-legend-with-scale/) (demo)
