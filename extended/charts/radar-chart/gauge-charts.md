---
title: "Gauge charts"
source: "https://docs.amcharts.com/v5/charts/radar-chart/gauge-charts/"
scraped: "2026-11-16"
---

This tutorial will address how to build gauges using radar chart components.

## Creating chart

In amCharts 5, we use radar chart to create gauges.

That means that the process of creating a gauge is identical as creating a [radar chart](https://docs.amcharts.com/v5/charts/radar-chart/):

### Loading required modules

TypeScript:

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
```

JavaScript:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/radar.js"></script>
```

### Creating chart instance

TypeScript:

```ts
let root = am5.Root.new("chartdiv");
let chart = root.container.children.push(
  am5radar.RadarChart.new(root, {})
);
```

JavaScript:

```js
var root = am5.Root.new("chartdiv");
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {})
);
```

## Axes

### Adding axes

Gauges are one-dimensional chart, that's why we will only need one circular axis here.

We can use any axis type in gauge/radar, by pushing it into chart's `xAxes` list:

TypeScript:

```ts
let axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);
```

JavaScript:

```js
var axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);
```

### Axis scale

Since gauges do not have any actual series, its axis can't calculate it's own scale, so we will need to set it manually using axis' `min` and `max` settings:

TypeScript:

```ts
let axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 100,
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);
```

JavaScript:

```js
var axis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 100,
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);
```

### Grid and ticks

Grid and ticks can be configured using like on any other axis: via its `grid.template` and `ticks.template`:

TypeScript:

```ts
// Create axis renderer
let axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1,
  minGridDistance: 30
});

// Enable ticks
axisRenderer.ticks.template.setAll({
  visible: true,
  strokeOpacity: 0.5
});

// Disable grid
axisRenderer.grid.template.setAll({
  visible: false
});
```

JavaScript:

```js
// Create axis renderer
var axisRenderer = am5radar.AxisRendererCircular.new(root, {
  strokeOpacity: 0.1,
  minGridDistance: 30
});

// Enable ticks
axisRenderer.ticks.template.setAll({
  visible: true,
  strokeOpacity: 0.5
});

// Disable grid
axisRenderer.grid.template.setAll({
  visible: false
});
```

For more information about configuration of grid and ticks, refer to "[Axes: Grid](https://docs.amcharts.com/v5/charts/xy-chart/axes/#grid)" and "[Axes: Ticks](https://docs.amcharts.com/v5/charts/xy-chart/axes/#ticks)".

### Axis configuration

For more information on how to configure axes - labels, ticks, grid, individual radii and angles - refer to the "[Radar axes](https://docs.amcharts.com/v5/charts/radar-chart/radar-axes/#axis-radii-and-angles)" tutorial.

## Start/end angles

Gauges (radar chart) is not limited to a full circle. It can start and end at any angle.

For that we have to chart's settings: `startAngle` and `radarAngle`.

These are numeric values denoting degrees.

A zero angle is one that goes from the center of the chart directly to right.

Defaults are `-90` (`startAngle`) and `270` (`endAngle`) forming full circle starting at vertical line up.

We can change that any way we want.

TypeScript:

```ts
let chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    startAngle: -180,
    endAngle: 0
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    startAngle: -180,
    endAngle: 0
  })
);
```

The above will result in a horizontal semi-circle:

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/gauge_full_circle.png "Default behavior")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/gauge_half_circle.png "`\{ startAngle: -180, endAngle: 0 }`")

Example: [Gauge chart](https://docs.amcharts.com/embeds/v5/gauge-chart/). Its code: get_example(path: "examples/docs-demos/gauge-chart").

## Chart radius

Radar chart (which is used for gauges) have two radius settings:

* `radius` - outer radius.
* `innerRadius` - inner radius.

Both can be either percent value (relative to available space) or fixed pixel value.

`radius` is set to `80%` by default to leave some space for possible ticks and labels.

`innerRadius` (default: `0`) percent value is relative to the chart's radius, rather than available space.

We can also use negative values in `innerRadius`. Those will mean pixel distance from the outer radius. This allows creating fixed-width bands.

The inner radius will affect grid length as well as width of the [bands](#bands).

TypeScript:

```ts
let chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    radius: am5.percent(95),
    innerRadius: -20
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    radius: am5.percent(95),
    innerRadius: -20
  })
);
```

For more information about chart radii settings, refer to "[Radar chart: Radius](https://docs.amcharts.com/v5/charts/radar-chart/#chart-radius)".

## Bands

To add colored bands to axis, we can use [axis ranges](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/).

### Creating a range

Creating an axis range requires:

* Creating an axis data item using axis' `makeDataItem()` method.
* Creating an axis range from a data item using axis' `createAxisRange()` method.
* Specifying start and end value/date/category (depending on axis type used) for the range.

TypeScript:

```ts
// Create range axis data item
let rangeDataItem = axis.makeDataItem({
  value: 0,
  endValue: 70
});

// Create a range
let range = axis.createAxisRange(rangeDataItem);
```

JavaScript:

```js
// Create range axis data item
var rangeDataItem = axis.makeDataItem({
  value: 0,
  endValue: 70
});

// Create a range
var range = axis.createAxisRange(rangeDataItem);
```

For more information about setting start and end values depending on axis type, refer to "[Axis ranges: Range start and end](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/#range-start-and-end)" tutorial.

### Setting fill

Range fills are not visible by default. We need to configure them using `axisFill` setting, which is a generic object of type `Graphics`.

TypeScript:

```ts
rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2
});
```

JavaScript:

```js
rangeDataItem.get("axisFill").setAll({
  fill: color,
  fillOpacity: 0.2
});
```

### Band width

Bad widths depend on the chart's [`radius` and `innerRadius` settings](https://docs.amcharts.com/v5/charts/radar-chart/gauge-charts/#chart-radius).

TypeScript:

```ts
let chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    innerRadius: -20
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    innerRadius: -20
  })
);
```

The above will make bands 2% the radius of the chart itself.

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/gauge_innerradius_0.png "`innerRadius: 0` (default)")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/gauge_innerradius_90.png "`innerRadius: -30`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/gauge_innerradius_98.png "`innerRadius: am5.percent(98)`")

### Variable-width bands

We can set `radius` and `innerRadius` directly on axis range fill data item, too.

This way we can make each range/band specific width:

TypeScript:

```ts
rangeDataItem.get("axisFill").setAll({
  visible: true,
  fill: color,
  fillOpacity: 0.8,
  innerRadius: -45
});
```

JavaScript:

```js
rangeDataItem.get("axisFill").setAll({
  visible: true,
  fill: color,
  fillOpacity: 0.8,
  innerRadius: -45
});
```

Example: [Variable-radius ranges on a gauge](https://docs.amcharts.com/embeds/v5/variable-radius-ranges-on-a-gauge/). Its code: get_example(path: "examples/docs-demos/variable-radius-ranges-on-a-gauge").

### Band labels

To add labels to a band/axis range, use `label` setting:

TypeScript:

```ts
rangeDataItem.get("label").setAll({
  text: "Warning",
  inside: true,
  radius: 5,
  fontSize: "0.9em",
  fill: am5.color(0xffffff)
});
```

JavaScript:

```js
rangeDataItem.get("label").setAll({
  text: "Warning",
  inside: true,
  radius: 5,
  fontSize: "0.9em",
  fill: am5.color(0xffffff)
});
```

Example: [Gauge chart](https://docs.amcharts.com/embeds/v5/gauge-chart-2/). Its code: get_example(path: "examples/docs-demos/gauge-chart-2").

For more information about labels on a circular axis, refer to "[Radar axes: Labels](https://docs.amcharts.com/v5/charts/radar-chart/radar-axes/#labels-on-a-circular-axis)".

## Clock hands

### Adding

In amCharts 5, clock hands are added as an [axis range bullet](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/#bullet).

As a "sprite" for the axis bullet, we are going to be using special element of type `ClockHand`:

TypeScript:

```ts
let handDataItem = axis.makeDataItem({
  value: 0
});

let hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99)
  })
}));

axis.createAxisRange(handDataItem);
```

JavaScript:

```js
var handDataItem = axis.makeDataItem({
  value: 0
});

var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(99)
  })
}));

axis.createAxisRange(handDataItem);
```

### Setting value

#### Initial value

As per code snippet above, initial hand value is set via data item's `value` setting:

TypeScript:

```ts
let handDataItem = axis.makeDataItem({
  value: 55
});
```

JavaScript:

```js
var handDataItem = axis.makeDataItem({
  value: 55
});
```

#### Dynamic value

To move the clock hand to different value, all we need to do is to set `value` setting of the data item again:

TypeScript:

```ts
handDataItem.set("value", 20);
```

JavaScript:

```js
handDataItem.set("value", 20);
```

Or, if we want the hand to smoothly turn to a new value, we can [animate its `value` setting](https://docs.amcharts.com/v5/concepts/animations/#animating-settings):

TypeScript:

```ts
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

JavaScript:

```js
handDataItem.animate({
  key: "value",
  to: 20,
  duration: 800,
  easing: am5.ease.out(am5.ease.cubic)
});
```

### Radius

There are three clock hand settings that effect its radii:

* `radius` - radius from the center of the chart to the tip of the hand.
* `innerRadius` - radius from the center of the chart to the base of the hand.
* `pinRadius` - radius of the pin - a circle at the center of the chart.

All radii can be either set in absolute pixel values from the center of the chart, as well as percent values.

Percent values are relative to the axis radius.

Radii can also be set in negative absolute value. In such case the radius will be counted from the axis, rather then from the center of the chart.

TypeScript:

```ts
let hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(85),
    innerRadius: 15,
    pinRadius: 10
  })
}));
```

JavaScript:

```js
var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(85),
    innerRadius: 15,
    pinRadius: 10
  })
}));
```

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_radius1.png "(Default) | `radius: am5.percent(90)` | `innerRadius: 0`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_radius2.png "`radius: am5.percent(98)` | `innerRadius: 15`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_radius3.png "`radius: -3` | `innerRadius: -15`")

### Configuring hand elements

#### Setting colors

There are two properties on a clock hand: `hand` and `pin`.

They are both elements of type `Graphics` that can be used to set basic settings like `fill` and `stroke`.

TypeScript:

```ts
hand.get("sprite").pin.setAll({
  fill: am5.color(0x946b49),
  fillOpacity: 0.5
});

hand.get("sprite").hand.setAll({
  fill: am5.color(0x946b49),
  fillOpacity: 0.9
});
```

JavaScript:

```js
hand.get("sprite").pin.setAll({
  fill: am5.color(0x946b49),
  fillOpacity: 0.5
});

hand.get("sprite").hand.setAll({
  fill: am5.color(0x946b49),
  fillOpacity: 0.9
});
```

Or, if we need to disable an element, we can simply set its `visible` setting:

TypeScript:

```ts
hand.get("sprite").pin.set("visible", false);
```

JavaScript:

```js
hand.get("sprite").pin.set("visible", false);
```

#### Setting hand end widths

Besides radius settings, a clock hand also has two additional settings that control widths of hand's ends:

* `topWidth` - width of the hand's tip, in pixels (default: `1`).
* `bottomWidth` - width of the hand's base, in pixels (default: `10`).

TypeScript:

```ts
let hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    topWidth: 5,
    bottomWidth: 5
  })
}));
```

JavaScript:

```js
var hand = handDataItem.set("bullet", am5xy.AxisBullet.new(root, {
  sprite: am5radar.ClockHand.new(root, {
    radius: am5.percent(85),
    topWidth: 5,
    bottomWidth: 5
  })
}));
```

The above will create a straight hand line, 5 pixel wide.

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_hadnwidths1.png "`topWidth: 5` | `bottomWidth: 5`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_hadnwidths2.png "`topWidth: 5` | `bottomWidth: 20`")

![](https://docs.amcharts.com/v5/images/charts/radar-chart/gauge-charts/clockhand_hadnwidths3.png "`topWidth: 20` | `bottomWidth: 1` | `radius: am5.percent(110)` | `innerRadius: am5percent(102)`")

### Disabling ticks and grid

Clock hand is an axis data item, which in turn may have a tick and grid enabled.

If we don't want those to show up next to our hand, we need to disable them:

TypeScript:

```ts
handDataItem.get("grid").set("visible", false);
handDataItem.get("tick").set("visible", false);
```

JavaScript:

```js
handDataItem.get("grid").set("visible", false);
handDataItem.get("tick").set("visible", false);
```

## Example

Example: [Gauge chart with hand](https://docs.amcharts.com/embeds/v5/gauge-chart-with-hand/). Its code: get_example(path: "examples/docs-demos/gauge-chart-with-hand").

And here's a more advanced example, using multiple axes and hands at different start/end angles:

Example: [Multi-part Gauge](https://docs.amcharts.com/embeds/v5/multi-part-gauge/). Its code: get_example(path: "examples/docs-demos/multi-part-gauge").

## Related tutorials

* [Gauge chart with custom ClockHand](https://docs.amcharts.com/v5/tutorials/gauge-chart-with-custom-clockhand/) (demo)
