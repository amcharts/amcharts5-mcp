---
title: "Map raster series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/"
scraped: "2026-10-08"
---

`MapRasterSeries` shows an image of the whole world, such as a satellite photo, on a map. The image is reprojected to fit the map's projection, and follows it as the map is panned, zoomed or rotated.

## Adding series

Set the URL of the image in `src`:

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
  })
);

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
  })
);

The image must show the whole world in equirectangular projection: longitude -180 to 180 from left to right, and latitude 90 to -90 from top to bottom. Most whole-world satellite imagery, such as NASA's Blue Marble, comes in this form.

Series are drawn in the order they are added. To draw country borders or markers over the image, add the raster series first:

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
  })
);

let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  fillOpacity: 0,
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5,
  strokeOpacity: 0.6
});

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg"
  })
);

var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  fillOpacity: 0,
  stroke: am5.color(0xffffff),
  strokeWidth: 0.5,
  strokeOpacity: 0.6
});

### Bundled images

The geodata package comes with day and night images of the Earth, ready to use. They are also on our CDN at `https://cdn.amcharts.com/lib/5/geodata/images/`.

File

Size

Shows

`earthDay2048.jpg`

2048 x 1024, 302 KB

Earth by day

`earthDay4096.jpg`

4096 x 2048, 1020 KB

Earth by day

`earthNight2048.jpg`

2048 x 1024, 127 KB

Earth at night (city lights)

`earthNight4096.jpg`

4096 x 2048, 443 KB

Earth at night (city lights)

Use the 2048 images for phones and small charts, and the 4096 ones for large charts or maps that zoom in. 4096 is the largest image many phones accept, and once loaded it takes about 32 MB of memory.

With a bundler such as webpack 5 or Vite, the image can be imported from the geodata package. The import gives its URL:

import earthDay from "@amcharts/amcharts5-geodata/images/earthDay2048.jpg";

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: earthDay
  })
);

import earthDay from "@amcharts/amcharts5-geodata/images/earthDay2048.jpg";

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: earthDay
  })
);

NOTEThe images are from NASA Earth Observatory. They can be used in commercial products, but NASA asks to be credited, e.g. with a label "Imagery: NASA Earth Observatory" on the chart.

### Images from other servers

The series has to read the image's pixels to reproject it. Browsers allow that for an image from another domain only if its server sends the `Access-Control-Allow-Origin` header. Without it, the image is not shown and an error is logged to the console.

Images are requested with `crossOrigin` set to `"anonymous"`. The `cors` setting changes it, e.g. to `"use-credentials"`.

For the same reason, the image will not load on a page opened straight from disk (`file://`), even if the image is in the same folder.

## Day and night

The series can show one image where the sun is up and another where it is down. Set the night image in `nightSrc`, and the time in `sunDate`:

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
    nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
    sunDate: "now"
  })
);

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
    nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
    sunDate: "now"
  })
);

`sunDate` can be `"now"`, a timestamp, a date string (e.g. `"2026-12-21T12:00:00Z"`) or a `Date` object. With `"now"`, the line between day and night moves with the clock, updated every minute.

NOTETo change a `Date`, set a new object. Changes made to the same `Date` object are not picked up.

Instead of a date, we can set where the sun is directly overhead, using `sunPosition`. The `am5map.getSunPosition()` function works it out for any date:

rasterSeries.set("sunPosition", am5map.getSunPosition(new Date(2026, 11, 21, 12, 0)));

// Or any point
rasterSeries.set("sunPosition", { longitude: 0, latitude: 23.4 });

rasterSeries.set("sunPosition", am5map.getSunPosition(new Date(2026, 11, 21, 12, 0)));

// Or any point
rasterSeries.set("sunPosition", { longitude: 0, latitude: 23.4 });

If both are set, `sunDate` wins.

Day turns into night gradually, across a twilight band. Its width is set with `twilight`, in degrees of the sun's height above the horizon (default: `12`). Larger numbers give a softer edge.

MORE INFOTo shade night over any map, not just a satellite image, use [Night series](https://www.amcharts.com/docs/v5/charts/map-chart/night-series/).

## Projections and performance

The image is redrawn every time the map moves. On the GPU (WebGL2) this is fast, and is used for these projections:

-   `geoOrthographic()` (globe)
-   `geoEquirectangular()`
-   `geoMercator()`
-   `geoEqualEarth()`
-   `geoNaturalEarth1()`

For other projections, or in browsers without WebGL2, the image is drawn on the CPU. This is slower, so while the map moves it is drawn at lower resolution, and redrawn sharp once it stops.

NOTEThe image is not shown while the map switches projections with `animateProjection()`. It comes back when the animation ends.

## Regional maps

The image covers the whole world, so by default the map zooms out to fit it. To keep a map fitted to its region, e.g. a map of a single country, set `affectsBounds: false`:

let rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay4096.jpg",
    affectsBounds: false
  })
);

var rasterSeries = chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay4096.jpg",
    affectsBounds: false
  })
);

## Events

The series fires `loaded` when all of its images have loaded, and `loaderror` if an image could not be loaded or read:

rasterSeries.events.on("loaded", function() {
  console.log("Images are in");
});

rasterSeries.events.on("loaderror", function() {
  console.log("Could not load an image");
});

rasterSeries.events.on("loaded", function() {
  console.log("Images are in");
});

rasterSeries.events.on("loaderror", function() {
  console.log("Could not load an image");
});

## Settings

Setting

Default

Comment

`src`

URL of the world image, in equirectangular projection.

`nightSrc`

URL of the night image, in the same form as `src`. Needs `sunDate` or `sunPosition`.

`sunDate`

Date to show day and night for: `"now"`, a timestamp, a date string or a `Date`. Overrides `sunPosition`.

`sunPosition`

Point where the sun is directly overhead, e.g. `{ longitude: 0, latitude: 23.4 }`.

`twilight`

`12`

Width of the twilight between day and night, in degrees of the sun's height.

`cors`

`"anonymous"`

`crossOrigin` setting used when loading the images.

`affectsBounds`

`true`

Set to `false` to keep the map fitted to other series instead of the whole world.
