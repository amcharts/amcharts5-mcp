---
title: "Night series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/night-series/"
scraped: "2026-10-08"
---

`NightSeries` shades the part of a map where it is night, fading through twilight at the edge, and shows the sun where it is directly overhead.

## Adding series

Add the night series after the series it should shade, and tell it what time to show with `sunDate`:

let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

let nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now"
  })
);

var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

var nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now"
  })
);

The night series works with any projection, including a globe, and does not affect how the map is fitted or zoomed.

## Setting the time

`sunDate` can be `"now"`, a timestamp, a date string (e.g. `"2026-12-21T12:00:00Z"`) or a `Date` object. With `"now"`, the night moves with the clock, updated every minute.

NOTETo change a `Date`, set a new object. Changes made to the same `Date` object are not picked up.

Instead of a date, we can set where the sun is directly overhead, using `sunPosition`. The `am5map.getSunPosition()` function works it out for any date:

nightSeries.set("sunPosition", am5map.getSunPosition(new Date(2026, 11, 21, 12, 0)));

// Or any point
nightSeries.set("sunPosition", { longitude: 0, latitude: 23.4 });

nightSeries.set("sunPosition", am5map.getSunPosition(new Date(2026, 11, 21, 12, 0)));

// Or any point
nightSeries.set("sunPosition", { longitude: 0, latitude: 23.4 });

If both are set, `sunDate` wins.

## Night shade

The night is made of map polygons, so it is styled through `mapPolygons.template`. `fill` sets its color, and `fillOpacity` sets how dark full night is. By default it is black at `0.5`.

nightSeries.mapPolygons.template.setAll({
  fill: am5.color(0x0b1d3a),
  fillOpacity: 0.7
});

nightSeries.mapPolygons.template.setAll({
  fill: am5.color(0x0b1d3a),
  fillOpacity: 0.7
});

### Twilight

Day turns into night across a twilight band, drawn in steps that get darker towards full night. Two settings control it:

-   `twilight` - width of the band, in degrees of the sun's height above the horizon (default: `12`).
-   `twilightSteps` - how many shades the band is drawn in (default: `4`). More steps give a smoother edge.

let nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now",
    twilight: 18,
    twilightSteps: 8
  })
);

var nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now",
    twilight: 18,
    twilightSteps: 8
  })
);

## Sun

The series marks where the sun is directly overhead with a glowing yellow circle. On a globe, it is hidden while that point is on the far side.

The circle can be accessed with `get("sun")`:

nightSeries.get("sun").setAll({
  radius: 12,
  fill: am5.color(0xff6600)
});

nightSeries.get("sun").setAll({
  radius: 12,
  fill: am5.color(0xff6600)
});

To use something else, such as an image, set any element as `sun`:

nightSeries.set("sun", am5.Picture.new(root, {
  src: "sun.svg",
  width: 32,
  height: 32,
  centerX: am5.p50,
  centerY: am5.p50
}));

nightSeries.set("sun", am5.Picture.new(root, {
  src: "sun.svg",
  width: 32,
  height: 32,
  centerX: am5.p50,
  centerY: am5.p50
}));

To hide the sun:

nightSeries.get("sun").set("forceHidden", true);

nightSeries.get("sun").set("forceHidden", true);

### Sun above a globe

`sunAltitude` raises the sun above the map, in metres. On a globe, a raised sun floats out from the surface and stays in view a little longer as it goes round the edge.

It is for looks, not the real distance: values from 1,000,000 to 5,000,000 work well (the Earth's radius is about 6,371,000).

let nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now",
    sunAltitude: 2000000
  })
);

var nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now",
    sunAltitude: 2000000
  })
);

## With satellite images

A [Map raster series](https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/) can show day and night by itself, swapping in a night image of city lights. To also show the sun there, add a night series with no shade:

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
    nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
    sunDate: "now"
  })
);

let nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now"
  })
);

nightSeries.mapPolygons.template.set("fillOpacity", 0);

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
    nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
    sunDate: "now"
  })
);

var nightSeries = chart.series.push(
  am5map.NightSeries.new(root, {
    sunDate: "now"
  })
);

nightSeries.mapPolygons.template.set("fillOpacity", 0);

## Settings

Setting

Default

Comment

`sunDate`

Date to show the night for: `"now"`, a timestamp, a date string or a `Date`. Overrides `sunPosition`.

`sunPosition`

Point where the sun is directly overhead, e.g. `{ longitude: 0, latitude: 23.4 }`.

`twilight`

`12`

Width of the twilight band, in degrees of the sun's height.

`twilightSteps`

`4`

How many shades the twilight is drawn in.

`sun`

Circle

Element shown where the sun is overhead.

`sunAltitude`

`0`

Raises the sun above the map, in metres.
