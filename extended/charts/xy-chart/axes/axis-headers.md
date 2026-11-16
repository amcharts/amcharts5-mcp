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

Example: [Stacked axes +  legend](https://docs.amcharts.com/embeds/v5/stacked-axes-legend/). Its code: get_example(path: "examples/docs-demos/stacked-axes-legend").

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
