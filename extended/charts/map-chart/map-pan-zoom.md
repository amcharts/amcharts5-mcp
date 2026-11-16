---
title: "Panning and zooming the map"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/"
scraped: "2026-11-16"
---

This tutorial looks at all the ways we can configure map panning and zooming.

## Panning

The map chart has two options related to panning it: `panX` and `panY`.

`panX` controls what happens when map is dragged horizontally, and `panY` is responsible for vertical drag behavior.

There are three options for both:

| Value                                      | Comment                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `"none"`                                   | Do nothing. Map will remain static when dragged in the specific direction.     |
| `"rotateX"` or `"rotateY"`                 | Will "rotate" the map, wrapping around contents like a globe would be rotated. |
| `"translateX"` or `"translateY"` (default) | Move contents of the map without changing appearance.                          |

## Zooming

Zooming in and out the chart can be done in a variety of ways, e.g. with [mouse wheel](https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#mouse-wheel-behavior) or pinch gestures, via API and some interactions on the map, or via [zoom control](#zoom-control).

### Zoom steps

Whenever zoom operation kicks in (via API, zoom control, or mouse wheel spin) the map changes its zoom level by `2`.

We can change map chart's `zoomStep` setting to a lower value (making zoom in slower) or to a bigger value to make map zoom in deeper with each step.

### Limiting zoom

As a default behavior, map chart would not let zoom out beyond level `1` and zoom in beyond level `32`.

We can change that using `minZoomLevel` and `maxZoomLevel` chart settings respectively.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom",
    minZoomLevel: 0.5,
    maxZoomLevel: 16
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom",
    minZoomLevel: 0.5,
    maxZoomLevel: 16

  })
);
```

### Zooming via API

Map chart provides several methods for us to use to perform zoom operations:

| Method              | Comment                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `zoomToPoint()`     | Centers and zooms the map to specific X/Y coordinates in pixels.                             |
| `zoomToGeoPoint()`  | Centers and zooms the map to specific latitude/longitude coordinates and zoom level.         |
| `zoomIn()`          | Zooms the map in by `zoomStep` setting value.                                                |
| `zoomOut()`         | Zooms the map out by `zoomStep` setting value.                                               |
| `zoomToDataItem()`  | Zooms the map to a specific polygon (data item).                                             |
| `zoomToDataItems()` | Zooms the map to so all the map polygon data items passed in an array parameter are visible. |

The following call will zoom the map to focus on Europe:

TypeScript:

```ts
chart.zoomToGeoPoint({ longitude: 10, latitude: 52 }, 3.5);
```

JavaScript:

```js
chart.zoomToGeoPoint({ longitude: 10, latitude: 52 }, 3.5);
```

### Zooming to clicked object

To zoom the map to a polygon when it is clicked, set polygon series' `clickZoom` setting to `true`:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    clickZoom: true
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    clickZoom: true
  })
);
```

Clicking the same polygon again, or the map's background, zooms back to the [home position](#initial-position-and-zoom). On a rotating map, such as a globe, the map also turns to bring the polygon to the center.

The polygon zoomed to is set as active, so we can highlight it with an "active" [state](https://docs.amcharts.com/v5/concepts/settings/states/):

TypeScript:

```ts
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0x297373)
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0x297373)
});
```

> **Note:** `clickZoom` is available since version 5.21.0.

For custom behavior, we can instead add a `click` event to map polygons, and zoom in on them by using map polygon series' method `zoomToDataItem()`:

TypeScript:

```ts
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  polygonSeries.zoomToDataItem(ev.target.dataItem);
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  polygonSeries.zoomToDataItem(ev.target.dataItem);
});
```

Example: [Zoom to a clicked country](https://docs.amcharts.com/embeds/v5/zoom-to-a-clicked-country/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series with clickZoom: click a country to zoom to it,
// click it again or the background to zoom back out
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zooming-to-clicked-object
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"],
    clickZoom: true
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

// The country zoomed to is active
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0x297373)
});

// Add zoom control with a home button
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

### Pre-zooming to polygon(s)

We can combine methods `getDataItemById()` and `zoomToDataItems()` to pre-zoom to a group of polygons.

The following code will pre-zoom on Scandinavia:

TypeScript:

```ts
polygonSeries.events.on("datavalidated", function() {
  const zoomTargets = ["SE", "FI", "NO", "DK"];
  const zoomDataItems = [];
  zoomTargets.forEach(function(id) {
    zoomDataItems.push(polygonSeries.getDataItemById(id));
  });
  polygonSeries.zoomToDataItems(zoomDataItems);
});
```

JavaScript:

```js
polygonSeries.events.on("datavalidated", function() {
  var zoomTargets = ["SE", "FI", "NO", "DK"];
  var zoomDataItems = [];
  zoomTargets.forEach(function(id) {
    zoomDataItems.push(polygonSeries.getDataItemById(id));
  });
  polygonSeries.zoomToDataItems(zoomDataItems);
});
```

> **Note:** Both methods need to be called when the data on series is ready, hence the use of `datavalidated` event.

Example: [Pre-zoom the map to a list of countries](https://docs.amcharts.com/embeds/v5/pre-zoom-the-map-to-a-list-of-countries/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "Country: {name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

polygonSeries.events.on("datavalidated", function () {
  var zoomTargets = ["SE", "FI", "NO", "DK"];
  var zoomDataItems = [];
  zoomTargets.forEach(function (id) {
    zoomDataItems.push(polygonSeries.getDataItemById(id));
  });
  polygonSeries.zoomToDataItems(zoomDataItems);
});
```

## Mouse-wheel behavior

### Setting behavior

There are two separate settings for mouse wheel behavior: `wheelX` (controls what happens when wheel is spinned horizontally) and `wheelY` (what happens when wheel is spinned vertically).

With the following possible values:

| Value          | Comment                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------- |
| `"none"`       | Do nothing. Map will remain static when dragged in the specific direction.                  |
| `"rotateX"`    | Will "rotate" the map horizontally, wrapping around contents like a globe would be rotated. |
| `"rotateY"`    | Will "rotate" the map vertically, wrapping around contents like a globe would be rotated.   |
| `"translateX"` | Move contents of the map horizontally without changing appearance.                          |
| `"translateY"` | Move contents of the map vertically without changing appearance.                            |
| `"zoom"`       | Zoom the map while centering on the actual position of the mouse cursor.                    |

`wheelY` is set to `"zoom"` by default.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom"
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom"
  })
);
```

### Sensitivity

Mouse wheel sensitivity can be adjusted with map chart's `wheelSensitivity` setting.

With default at `1`, the value can be increased or decreased to make chart zoom in faster or slower, respectively.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom",
    wheelSensitivity: 0.7
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    wheelY: "zoom",
    wheelSensitivity: 0.7
  })
);
```

> **Note:** Sensitivity settings are ignored when `wheelY` (or `wheelX`) is set to `"zoom"`.

### Control+scroll

Enabling mouse-wheel behavior will make the map zoom but may disrupt scrolling of the whole page when mouse cursor is over the chart.

The common practice is to enable zoomonly when CTRL key is pressed. To implement that we can disable all wheel behavior by default, and only enable it when CTRL key is down:

TypeScript:

```ts
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
    wheelY: "none"
  })
);

chart.events.on("wheel", function(ev) {
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  }
  else {
    chart.set("wheelY", "none");
  }
});
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
    wheelY: "none"
  })
);

chart.events.on("wheel", function(ev) {
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  }
  else {
    chart.set("wheelY", "none");
    overlay.show();
    overlay.setTimeout(function() {
      overlay.hide()
    }, 800);
  }
});
```

Example: [Zooming map with CTRL key and mouse wheel](https://docs.amcharts.com/embeds/v5/zooming-map-with-ctrl-key-and-mouse-wheel/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
  margin-bottom: 100vh;
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

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
    wheelY: "none"
  })
);

chart.events.on("wheel", function (ev) {
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  } else {
    chart.set("wheelY", "none");
  }
});

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});
```

We can enhance this behavior with Google-like message over the chart when scroll is used without CTRL key pressed.

TypeScript:

```ts
// Create curtain + message to show when wheel is used over chart without CTRL
let overlay = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,
  height: am5.p100,
  layer: 100,
  visible: false
}));
                                           
let curtain = overlay.children.push(am5.Rectangle.new(root, {
  width: am5.p100,
  height: am5.p100,
  fill: am5.color(0x000000),
  fillOpacity: 0.3
}));

let message = overlay.children.push(am5.Label.new(root, {
  text: "Use CTRL + Scroll to zoom",
  fontSize: 30,
  x: am5.p50,
  y: am5.p50,
  centerX: am5.p50,
  centerY: am5.p50
}));

chart.events.on("wheel", function(ev) {
  // Show overlay when wheel is used over chart
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  }
  else {
    chart.set("wheelY", "none");
    overlay.show();
    overlay.setTimeout(function() {
      overlay.hide()
    }, 800);
  }
});
```

JavaScript:

```js
// Create curtain + message to show when wheel is used over chart without CTRL
var overlay = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,
  height: am5.p100,
  layer: 100,
  visible: false
}));
                                           
var curtain = overlay.children.push(am5.Rectangle.new(root, {
  width: am5.p100,
  height: am5.p100,
  fill: am5.color(0x000000),
  fillOpacity: 0.3
}));

var message = overlay.children.push(am5.Label.new(root, {
  text: "Use CTRL + Scroll to zoom",
  fontSize: 30,
  x: am5.p50,
  y: am5.p50,
  centerX: am5.p50,
  centerY: am5.p50
}));

chart.events.on("wheel", function(ev) {
  // Show overlay when wheel is used over chart
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  }
  else {
    chart.set("wheelY", "none");
    overlay.show();
    overlay.setTimeout(function() {
      overlay.hide()
    }, 800);
  }
});
```

Example: [Zooming map with CTRL key and mouse wheel + curtain](https://docs.amcharts.com/embeds/v5/zooming-map-with-ctrl-key-and-mouse-wheel-curtain/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/worldLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
  margin-bottom: 100vh;
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

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
    wheelY: "none"
  })
);

// Create curtain + message to show when wheel is used over chart without CTRL
var overlay = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layer: 100,
    visible: false
  })
);

var curtain = overlay.children.push(
  am5.Rectangle.new(root, {
    width: am5.p100,
    height: am5.p100,
    fill: am5.color(0x000000),
    fillOpacity: 0.3
  })
);

var message = overlay.children.push(
  am5.Label.new(root, {
    text: "Use CTRL + Scroll to zoom",
    fontSize: 30,
    x: am5.p50,
    y: am5.p50,
    centerX: am5.p50,
    centerY: am5.p50
  })
);

chart.events.on("wheel", function (ev) {
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  } else {
    chart.set("wheelY", "none");
    overlay.show();
    overlay.setTimeout(function () {
      overlay.hide();
    }, 800);
  }
});

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});
```

## Pinch zoom

The map can be pinch-zoomed/panned on multi-touch devices, like phones, tables and touch-screen-enabled computers.

Should we want to disable it, we can use `pinchZoom` setting:

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    pinchZoom: false
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    pinchZoom: false
  })
);
```

## Double-click zoom

Double-clicking will zoom in the map centered on the pointer's position.

Double-clicking while holding SHIFT key down, will zoom out.

To disable this behavior, set Map chart's setting `doubleClickZoom: false`.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    doubleClickZoom: false
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    doubleClickZoom: false
  })
);
```

## Box-selection zoom

To enable zooming by selecting a box on the map, use `boxZoom` setting (default: `"none"`).

The following `boxZoom` values are available:

| Value     | Comment                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| `"none"`  | Box-zoom is disabled (default).                                                                                       |
| `"drag"`  | Select by pushing down on the map area and dragging. To use this option, `panX` and `panY` should be set to `"none"`. |
| `"shift"` | Box-select will be active when SHIFT key is down.                                                                     |
| `"ctrl"`  | Box-select will be active when CTRL key is down.                                                                      |
| `"alt"`   | Box-select will be active when ALT key is down.                                                                       |

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    boxZoom: "shift"
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    boxZoom: "shift"
  })
);
```

To configure the box rectangle, use Map chart's `boxZoomSelection` property which is an instance of `Rectangle`:

TypeScript:

```ts
chart.boxZoomSelection.setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.2
});
```

JavaScript:

```js
chart.boxZoomSelection.setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.2
});
```

## Panning outside viewport

Chart will restrict how far outside its viewport map can be dragged out.

Basically, map chart would not allow map to be dragged in such way, that it would not cover or at least touch center of the chart container.

We can restrict it even further using chart's setting: `maxPanOut`.

It accepts numeric values (default: `0.4`) that mean relative size to map itself.

E.g. setting `maxPanOut` to `0.5` will mean that 50% of the map can be outside center of the chart container.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "translateX",
    maxPanOut: 0.5
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "translateX",
    maxPanOut: 0.5
  })
);
```

![](https://docs.amcharts.com/v5/images/charts/map-chart/map-pan-zoom/maxpanout_04-1024x882.png "`maxPanout: 0.4` (default)")

![](https://docs.amcharts.com/v5/images/charts/map-chart/map-pan-zoom/maxpanout_1-1024x882.png "`maxPanout: 1`")

![](https://docs.amcharts.com/v5/images/charts/map-chart/map-pan-zoom/maxpanout_0-1024x882.png "`maxPanout: 0`")

> **Note:** `maxPanOut` is not relevant if pan settings are set to rotate the map, rather than move it.

## Initial position and zoom

### Setting

Map chart has two options for setting its initial/default position and zoom level: `homeGeoPoint` and `homeZoomLevel` respectively.

We can use those to set those to center around some latitude/longitude coordinates and zoom in automatically on start.

To have the map go to this home position once it loads, set `autoHome: true`. The following will position and zoom in the map to focus on Europe:

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    homeZoomLevel: 3.5,
    homeGeoPoint: { longitude: 10, latitude: 52 },
    autoHome: true
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    homeZoomLevel: 3.5,
    homeGeoPoint: { longitude: 10, latitude: 52 },
    autoHome: true
  })
);
```

The move is animated if the chart has an animation duration set, e.g. by the Animated theme, and instant otherwise. Since it needs no code, it also works in [JSON configs](https://docs.amcharts.com/v5/concepts/serializing/).

> **Note:** `autoHome` is available since version 5.21.0. In earlier versions, call `chart.goHome()` in polygon series' `datavalidated` event instead.

### Initial rotation

If you have a rotating map, i.e. `panX: "rotateX"` and/or `panY: "rotateY"`, you might also want to set initial (home) rotation point using `homeRotationX` and `homeRotationY`.

Both accept number values meaning longitude and latitude respectively.

TypeScript:

```ts
let chart = root.container.children.push(
  am5map.MapChart.new(root, {
    homeRotationX: -74
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    homeRotationX: -74
  })
);
```

The above code will start the map rotated to NYC in the middle.

### Resetting position/level

#### Via API

Map can be reset to its initial position and zoom level by invoking map chart's `goHome()` method:

TypeScript:

```ts
chart.goHome();
```

JavaScript:

```js
chart.goHome();
```

#### Via background click

If polygon series has [`clickZoom`](#zooming-to-clicked-object) enabled, clicking the background already zooms the map out.

Otherwise, we can add `click` event to the chart's background and invoke `goHome()` method in it to zoom out the chart when user clicks on background (water):

TypeScript:

```ts
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
});
```

JavaScript:

```js
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
});
```

## Disabling zoom and pan

To completely disable all zoom and pan of the map, we need to set `panX`, `panY`, `wheelX`, and `wheelY` to `"none"`, as well as `pinchZoom` to `false`:

TypeScript:

```ts
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "none",
    panY: "none",
    wheelX: "none",
    wheelY: "none",
    pinchZoom: false
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "none",
    panY: "none",
    wheelX: "none",
    wheelY: "none",
    pinchZoom: false
  })
);
```

## Zoom control

### Adding zoom control

Map chart supports built-in control that adds zooming chart via handy buttons.

To add it, simply instantiate a `ZoomControl` and set it to map chart's `zoomControl` setting.

TypeScript:

```ts
chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
```

JavaScript:

```js
chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
```

### Configuring buttons

Zoom control has two properties that hold button instances: `minusButton` and `plusButton`.

Both are elements of type `Button`.

### Home button

While not enabled by default, zoom control has a third button in it - Home - which when pressed will reset zoom/position of the map.

Home button is hidden by default. To enable it, set `visible: true` on zoom control's `homeButton` property:

TypeScript:

```ts
let zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);
```

JavaScript:

```js
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);
```

### Positioning

The zoom control is placed in the right-bottom corner by default.

Its position is determined by 4 settings: `x`, `centerX`, `y`, and `centerY`.

Defaults look like this:

```json
{
  x: am5.p100,
  centerX: am5.p100,
  y: am5.p100,
  centerY: am5.p100,
};
```

`x` and `centerX` control control's horizontal position, and its horizontal "center" respectively.

Similarly with "y" settings.

If we'd like to move the control to top-right, we could just override its "y" settings:

TypeScript:

```ts
chart.set("zoomControl", am5map.ZoomControl.new(root, {
  y: am5.p0,
  centerY: am5.p0
}));
```

JavaScript:

```js
chart.set("zoomControl", am5map.ZoomControl.new(root, {
  y: am5.p0,
  centerY: am5.p0
}));
```

To move to upper-left, we'd need to override all four of the settings:

TypeScript:

```ts
chart.set("zoomControl", am5map.ZoomControl.new(root, {
  x: am5.p0,
  centerX: am5.p0,
  y: am5.p0,
  centerY: am5.p0
}));
```

JavaScript:

```js
chart.set("zoomControl", am5map.ZoomControl.new(root, {
  x: am5.p0,
  centerX: am5.p0,
  y: am5.p0,
  centerY: am5.p0
}));
```

## Related tutorials

* [Rotate and zoom the globe to a clicked country](https://docs.amcharts.com/v5/tutorials/rotate-and-zoom-the-globe-to-a-clicked-country/) (demo)
* [Get points within current viewport of a MapChart](https://docs.amcharts.com/v5/tutorials/get-points-within-current-viewport-of-a-mapchart/) (demo)
