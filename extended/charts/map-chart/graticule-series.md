---
title: "Graticule series"
source: "https://docs.amcharts.com/v5/charts/map-chart/graticule-series/"
scraped: "2026-11-25"
---

Graticule is a special kind of map series that will draw a map grid.

## Adding

To add a graticule grid to map we need to do two things:

* Add `GraticuleSeries` instance to map.
* Configure its line settings.

TypeScript:

```ts
let graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});
```

JavaScript:

```js
var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});
```

The `unshift()` call above is used to insert graticule series at the beginning of the series list so it stays behind all the other series we may have.

Please note that graticule series is actually a line series under the hood. Please refer to the "[Map line series](https://docs.amcharts.com/v5/charts/map-chart/map-line-series/)" tutorial for further info on how to configure appearance of the lines.

Example: [Map with graticule series](https://docs.amcharts.com/embeds/v5/map-with-graticule-series/). Its code: get_example(path: "examples/docs-demos/map-with-graticule-series").

## Grid density

Normally. graticule series places a line every 10 degrees of latitude and longitude.

We can change the density using series' `step` setting:

TypeScript:

```ts
let graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 20
  })
);
```

JavaScript:

```js
var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 20
  })
);
```

![World map with grid lines every 10 degrees](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_10-1024x621.png "`step: 10` (default)")

![World map with sparser grid lines every 20 degrees](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_20-1024x621.png "`step: 20`")

![World map with dense grid lines every 5 degrees](https://docs.amcharts.com/v5/images/charts/map-chart/graticule-series/graticule_step_5-1024x621.png "`step: 5`")
