---
title: "Radar axes"
source: "https://docs.amcharts.com/v5/charts/radar-chart/radar-axes/"
scraped: "2026-11-25"
---

Radar chart reuses same axes types as XY chart. However it uses different axis renderers. While those are very similar to XY renderers in configuration, there some differences. This tutorial will address those.

## Labels on a circular axis

Configuration of labels on an axis is done via axis renderer's `labels.template` property. For more information about it, please refer to "[Axes: Labels](https://docs.amcharts.com/v5/charts/xy-chart/axes/#labels)" tutorial

### Label type

Circular axis renderer positions its labels neatly curved along the axis line by default.

This can be configured via label template's `textType` setting.

Available options for use on a radar chart are: `"circular"` (default), `"radial"`, and `"adjusted"`.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial"
});
```

![Radar chart with axis labels curving along the circle](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_circular.png "`textType: 'circular'` (default)")

![Radar chart with axis labels pointing outward from the center](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_adjusted-2.png "`textType: 'radial'`")

![Radar chart with horizontal axis labels placed around the circle](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/radar_labels_adjusted.png "`textType: 'adjusted'`")

Example: [Radar chart axis labels](https://docs.amcharts.com/embeds/v5/radar-chart-axis-labels/). Its code: get_example(path: "examples/docs-demos/radar-chart-axis-labels").

### Label radius

Label setting `radius` that can be set via its template controls distance from the axis line.

It's a number in pixels. The higher the radius, the further from the slice edge the label will be:

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10
});
```

### Labels inside plot area

We can set `inside` setting to `true` on the label template, if we want the labels to appear inside charts plot area.

If we do so, the `radius` setting will revert: it will mean radius in pixels inwards, rather than outwards from the axis line.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10,
  inside: true
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  fontSize: 12,
  textType: "radial",
  radius: 10,
  inside: true
});
```

## Axis radii and angles

Just like radar chart itself can have `radius`, `innerRadius`, `startAngle`, and `endAngle` settings, so can circular axis renderer.

Percent value on `radius` and `innerRadius` work in relation to the radar chart itself, not chart container.

We can also use negative values in `innerRadius`. Those will mean pixel distance from the outer radius. This allows creating fixed-width axis.

`startAngle` and `endAngle` work just like for radar chart: we can specify where each axis starts and where it ends precisely, even if it is not the same values as the chart itself.

Here's an example of a radar chart using two circular axes with different angle settings:

![Radar chart with two semicircular axes side by side, one per series](https://docs.amcharts.com/v5/images/charts/radar-chart/radar-axes/dual_radar_axis.png)

The above chart has following setup:

TypeScript:

```ts
let chart = root.container.children.push( 
  am5radar.RadarChart.new(root, {
    radius: am5.percent(70),
    innerRadius: am5.percent(50),
    startAngle: -160,
    endAngle: -20
  }) 
);

let xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -160,
      endAngle: -95
    })
  })
);

let xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -85,
      endAngle: -20
    })
  })
);
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5radar.RadarChart.new(root, {
    radius: am5.percent(70),
    innerRadius: am5.percent(50),
    startAngle: -160,
    endAngle: -20
  }) 
);

var xAxis1 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -160,
      endAngle: -95
    })
  })
);

var xAxis2 = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {
      startAngle: -85,
      endAngle: -20
    })
  })
);
```

Example: [Radar chart axis labels](https://docs.amcharts.com/embeds/v5/radar-chart-axis-labels-2/). Its code: get_example(path: "examples/docs-demos/radar-chart-axis-labels-2").
