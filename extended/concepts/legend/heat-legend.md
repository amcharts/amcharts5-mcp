---
title: "Heat legend"
source: "https://docs.amcharts.com/v5/concepts/legend/heat-legend/"
scraped: "2026-11-25"
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

![Vertical heat legend with a smooth gradient from lowest to highest](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_1.png "`stepCount: 1` (default)")

![Vertical heat legend split into five solid color steps](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_5.png "`stepCount: 5`")

![Vertical heat legend split into ten solid color steps](https://docs.amcharts.com/v5/images/concepts/legend/heat-legend/heatlegend_stepcount_10.png "`stepCount: 10`")

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

Example: [Map chart heat map with heat legend](https://docs.amcharts.com/embeds/v5/map-chart-heat-map-with-heat-legend/). Its code: get_example(path: "examples/docs-demos/map-chart-heat-map-with-heat-legend").

### Radar chart

Example: [Radar chart with heat legend](https://docs.amcharts.com/embeds/v5/radar-chart-with-heat-legend/). Its code: get_example(path: "examples/docs-demos/radar-chart-with-heat-legend").

## Related tutorials

* [A custom "heat legend" using a gradient](https://docs.amcharts.com/v5/tutorials/a-custom-heat-legend-using-a-gradient/) (demo)
* [Heat legend with scale](https://docs.amcharts.com/v5/tutorials/heat-legend-with-scale/) (demo)
