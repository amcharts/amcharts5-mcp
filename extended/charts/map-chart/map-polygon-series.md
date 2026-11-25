---
title: "Map polygon series"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/"
scraped: "2026-11-25"
---

Map polygon series are responsible for drawing actual map areas (countries, regions, etc.). This tutorial takes a look at various angles we can use them.

## Adding series

To create a map polygon series we need to call its [`new()` method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax) and push the new object into chart's `series` list:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);
```

## Data

As with any series, polygon series needs some kind of data to operate.

In case of a map series it can be either GeoJSON format or a plain data format.

### Geodata/GeoJSON

The GeoJSON data is set via series `geodata` setting.

amCharts 5 has a number of various country and region maps in a separate geodata package available as a downloadable ZIP file, NPM package, or CDN.

File locations and naming for specific maps, as well as various detail version is described in main "[Map chart: Geodata (maps)](https://docs.amcharts.com/v5/charts/map-chart/#geodata-maps)" tutorial. Please make sure to visit it for reference.

Ads an example, let's load a map of France:

TypeScript:

```ts
import am5geodata_franceLow from "@amcharts/amcharts5-geodata/franceLow";
```

HTML:

```html
<script src="https://cdn.amcharts.com/lib/5/geodata/franceLow.js"></script>
```

Then use it for a polygon series:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_franceLow
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_franceLow
  })
);
```

### Plain data

It's also possible to pass in generic data to series via its `data` property.

The items in map polygon series need to be in GeoJSON geometry format, e.g.:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {})
);
polygonSeries.data.push({
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [26.5936, 55.6676],
        [26.175, 55.0033],
        [25.8594, 54.9192],
        [25.5473, 54.3317],
        [24.7683, 53.9746],
        [23.4845, 53.9398],
        [23.37, 54.2005],
        [22.7663, 54.3568],
        [22.8311, 54.8384],
        [21.2358, 55.2641],
        [21.0462, 56.07],
        [22.0845, 56.4067],
        [24.1206, 56.2642],
        [24.9032, 56.3982],
        [26.5936, 55.6676]
      ]
    ]
  }
});
```

JavaScript:

```js
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {})
);
polygonSeries.data.push({
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [26.5936, 55.6676],
        [26.175, 55.0033],
        [25.8594, 54.9192],
        [25.5473, 54.3317],
        [24.7683, 53.9746],
        [23.4845, 53.9398],
        [23.37, 54.2005],
        [22.7663, 54.3568],
        [22.8311, 54.8384],
        [21.2358, 55.2641],
        [21.0462, 56.07],
        [22.0845, 56.4067],
        [24.1206, 56.2642],
        [24.9032, 56.3982],
        [26.5936, 55.6676]
      ]
    ]
  }
});
```

The above will create a polygon series with a rough outline of Lithuania as a single polygon in it.

amCharts 5 also comes with some handy utility functions, that can generate geometry data for a square or a circle:

| Function                                           | Comment                                                                                                                             |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `am5map.getGeoCircle(geoPoint, radius)`            | Returns a geography data representing a circle with a center at specific latitude/longitude (first parameter) and radius (degrees). |
| `am5map.getGeoRectangle(north, east, south, west)` | Returns a geography data representing a square with boundaries at passed in via the four parameters.                                |

Here's how we would put a circle-shaped polygon, over Paris, France:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {})
);
polygonSeries.data.push({
  geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 2)
});
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {})
);
polygonSeries.data.push({
  geometry: am5map.getGeoCircle({ latitude: 48.86, longitude: 2.35 }, 2)
});
```

> **Note:** Regardless of how we add data to the polygon series, it will be reshaped according to the [projection](https://docs.amcharts.com/v5/charts/map-chart/#projections) used on the map.

### Using geodata and data together

It's also possible to set both `geodata` and `data`. It's a good way to supplement geodata with additional values and other properties via data.

Polygon series will automatically merge data located in both data sources using `id` field as a binding link.

For example, we can assign name and value to certain polygons from geodata using entries in `data`:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.data.setAll([{
  id: "FR",
  name: "France",
  value: 100
}, {
  id: "ES",
  name: "Spain",
  value: 200
}]);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.data.setAll([{
  id: "FR",
  name: "France",
  value: 100
}, {
  id: "ES",
  name: "Spain",
  value: 200
}]);
```

Now, the series will use items from `worldLow` map, but will also attach additional `value` to France and Spain, as well as override their `name` attribute.

> **Important:** It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

## Configuring polygon appearance

Polygon appearance can be configured via its template, accessible via series' `mapPolygons.template`.

A polygon is an object of type `MapPolygon`. Any of [its settings](https://docs.amcharts.com/v5/reference/mappolygon/#settings) can be set via template.

TypeScript:

```ts
polygonSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 2,
  fillOpacity: 0.5
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.setAll({
  stroke: am5.color(0xffffff),
  strokeWidth: 2,
  fillOpacity: 0.5
});
```

Polygon fill and outline colors can also be set directly via polygon series' settings `fill` and `stroke`:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    fill: am5.color(0x22ff55),
    stroke: am5.color(0xffffff)
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    fill: am5.color(0x22ff55),
    stroke: am5.color(0xffffff)
  })
);
```

## Binding to data

Polygons can take values for theirs settings from data as well, using [template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/).

Template fields allow binding an object's properties in series' data, to polygon template's settings.

TypeScript:

```ts
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  templateField: "polygonSettings"
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  templateField: "polygonSettings"
});
```

An here's how the data on series might look like if we wanted to add specific color for Canada, United States, and Mexico:

TypeScript:

```ts
polygonSeries.data.setAll([{
  id: "US",
  polygonSettings: {
    fill: am5.color(0xFF3C38)
  }
}, {
  id: "CA",
  polygonSettings: {
    fill: am5.color(0xA23E48)
  }
}, {
  id: "MX",
  polygonSettings: {
    fill: am5.color(0xFF8C42)
  }
}])
```

JavaScript:

```js
polygonSeries.data.setAll([{
  id: "US",
  polygonSettings: {
    fill: am5.color(0xFF3C38)
  }
}, {
  id: "CA",
  polygonSettings: {
    fill: am5.color(0xA23E48)
  }
}, {
  id: "MX",
  polygonSettings: {
    fill: am5.color(0xFF8C42)
  }
}])
```

Example: [Using templateDield in MapPolygonSeries](https://docs.amcharts.com/embeds/v5/using-templatedield-in-mappolygonseries/). Its code: get_example(path: "examples/docs-demos/using-templatedield-in-mappolygonseries").

## Hover behavior

### Adding tooltips

To add a tooltip to the polygons, we can use `tooltipText` on polygon template. We can set `tooltipText` along any other polygon's settings.

The value may contain [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) as well as [in-line text styles](https://docs.amcharts.com/v5/concepts/formatters/text-styling/).

TypeScript:

```ts
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}"
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}"
});
```

### Tooltips for polygons without data

A placeholder with no value shows as empty, so `"{name}: {value}"` reads "Germany: " for a country that isn't in the data.

To show different text for such polygons, add an adapter to `tooltipText`. Add it before setting the data:

TypeScript:

```ts
polygonSeries.mapPolygons.template.set("tooltipText", "{name}: {value}");

polygonSeries.mapPolygons.template.adapters.add("tooltipText", (text, target) => {
  const dataItem = target.dataItem as am5.DataItem<am5map.IMapPolygonSeriesDataItem>;
  if (dataItem && dataItem.get("value") == null) {
    return "{name}: no data";
  }
  return text;
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.set("tooltipText", "{name}: {value}");

polygonSeries.mapPolygons.template.adapters.add("tooltipText", function(text, target) {
  var dataItem = target.dataItem;
  if (dataItem && dataItem.get("value") == null) {
    return "{name}: no data";
  }
  return text;
});
```

To color polygons without data, use a heat rule's [`neutral` setting](https://docs.amcharts.com/v5/concepts/settings/heat-rules/#elements-without-a-value).

### Hover states

We can set setting values to apply to polygons when it is hovered by creating a "hover" [state](https://docs.amcharts.com/v5/concepts/settings/states/) for it.

TypeScript:

```ts
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});
```

> **Note:** Adding a "hover" state does not automatically turn on interactivity for the element, so we need to do that manually by setting its `interactive` setting to `true`.

Example: [Map chart](https://docs.amcharts.com/embeds/v5/map-chart/). Its code: get_example(path: "examples/docs-demos/map-chart").

## Adding links to polygons

Polygons can act as links, navigating to a URL when clicked. To enable it, set series' `urlField` to the name of a data field that holds the target URL. Links are off until `urlField` is set.

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    urlField: "url"
  })
);

polygonSeries.data.setAll([{
  id: "US",
  url: "https://en.wikipedia.org/wiki/United_States"
}, {
  id: "CA",
  url: "https://en.wikipedia.org/wiki/Canada"
}, {
  id: "MX",
  url: "https://en.wikipedia.org/wiki/Mexico"
}]);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    urlField: "url"
  })
);

polygonSeries.data.setAll([{
  id: "US",
  url: "https://en.wikipedia.org/wiki/United_States"
}, {
  id: "CA",
  url: "https://en.wikipedia.org/wiki/Canada"
}, {
  id: "MX",
  url: "https://en.wikipedia.org/wiki/Mexico"
}]);
```

Polygons with a URL in their data are automatically made clickable and show a pointer cursor. Those without a URL stay unaffected.

By default the URL opens in the same window. Use `linkTarget` to control where it opens, e.g. `"_blank"` for a new tab (handy when the chart is embedded in an iframe):

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    urlField: "url",
    linkTarget: "_blank"
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    urlField: "url",
    linkTarget: "_blank"
  })
);
```

## Click events

If we need to handle a click event on series' polygons, we can add it to its template, too:

TypeScript:

```ts
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  console.log("Clicked on", ev.target.dataItem.get("name"));
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  console.log("Clicked on", ev.target.dataItem.get("name"));
});
```

As an example, this can be used to add click-through to polygons, by adding target URL into data:

TypeScript:

```ts
polygonSeries.data.setAll([{
  id: "US",
  url: "https://en.wikipedia.org/wiki/United_States"
}, {
  id: "CA",
  url: "https://en.wikipedia.org/wiki/Canada"
}, {
  id: "MX",
  url: "https://en.wikipedia.org/wiki/Mexico"
}]);
```

JavaScript:

```js
polygonSeries.data.setAll([{
  id: "US",
  url: "https://en.wikipedia.org/wiki/United_States"
}, {
  id: "CA",
  url: "https://en.wikipedia.org/wiki/Canada"
}, {
  id: "MX",
  url: "https://en.wikipedia.org/wiki/Mexico"
}]);
```

And implementing the "click" event handler:

TypeScript:

```ts
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  const url = ev.target.dataItem.dataContext.url;
  if(url) {
    window.location.href = ev.target.dataItem.dataContext.url;
  }
});
```

JavaScript:

```js
polygonSeries.mapPolygons.template.events.on("click", function(ev) {
  var url = ev.target.dataItem.dataContext.url;
  if(url) {
    window.location.href = ev.target.dataItem.dataContext.url;
  }
});
```

> **Note:** The above is just an example of handling clicks manually. If all you need is to open a URL, use the built-in `urlField` setting instead - see "[Adding links to polygons](#adding-links-to-polygons)".

## Excluding or including polygons

Series can be set up to either exclude certain polygons out of the loaded geodata, or only include specific ones.

To exclude polygons use series setting `exclude`, which is an array of polygon ids:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    exclude: ["AQ"]
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    exclude: ["AQ"]
  })
);
```

The above will remove Antarctica from the map.

If we'd like to include only specific polygons from map, we can use `include` setting instead:

TypeScript:

```ts
let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    include: ["US", "CA", "MX"]
  })
);
```

JavaScript:

```js
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    include: ["US", "CA", "MX"]
  })
);
```

The above will shown countries from North America, even though `worldLow` contains all the countries of the world.

## Overlaid polygon series

Map chart allows any number of series to be added.

We can use several series with different geodata to create hybrid maps, for example a world map with U.S. state subdivisions:

TypeScript:

```ts
let worldSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    exclude: ["AQ"]
  })
);

let usaSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: usaLow
  })
);
```

JavaScript:

```js
var worldSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: worldLow,
    exclude: ["AQ"]
  })
);

var usaSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: usaLow
  })
);
```

## Background polygon

We can set background fill color for our map chart by creating a background rectangle on the chart itself:

TypeScript:

```ts
chart.chartContainer.set("background", am5.Rectangle.new(root, {
  fill: am5.color(0xd4f1f9),
  fillOpacity: 1
}));
```

JavaScript:

```js
chart.chartContainer.set("background", am5.Rectangle.new(root, {
  fill: am5.color(0xd4f1f9),
  fillOpacity: 1
}));
```

While it may work for some maps, it might look awkward for others, because chart background is just a square and is not affected by projection.

To create a true background, which would follow projection, we can create a separate polygon series with a single item - a square spanning the whole scope of longitude and latitude of the world.

We can create the square geometry using helper function `am5map.getGeoRectangle()`:

TypeScript:

```ts
let backgroundSeries = chart.series.unshift(
  am5map.MapPolygonSeries.new(root, {})
);

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xd4f1f9),
  stroke: am5.color(0xd4f1f9),
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});
```

JavaScript:

```js
var backgroundSeries = chart.series.unshift(
  am5map.MapPolygonSeries.new(root, {})
);

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xd4f1f9),
  stroke: am5.color(0xd4f1f9),
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});
```

> **Note:** Series follow the order in which they were added to the chart. To ensure that background series is in the back, we need to add it first, or (as per code snippet above) we can ensure that it is inserted at index zero using `unshift()` method instead of `push()`.

![Globe map with the background color filling the whole chart](https://docs.amcharts.com/v5/images/charts/map-chart/map-polygon-series/map_background.png "Setting background on chart")

![Globe map with the background color only inside the globe](https://docs.amcharts.com/v5/images/charts/map-chart/map-polygon-series/map_background_via_series.png "Using background series with projected rectangle")

Example: [Map chart with orthographic projection (globe)](https://docs.amcharts.com/embeds/v5/map-chart-with-orthographic-projection-globe/). Its code: get_example(path: "examples/docs-demos/map-chart-with-orthographic-projection-globe").

## Related tutorials

* [Country-specific world maps](https://docs.amcharts.com/v5/tutorials/country-specific-world-maps/)
* [Getting series object by its ID](https://docs.amcharts.com/v5/charts/map-chart/map-api/#getting-object-by-id)
* [Maps with displaced areas and dividers](https://docs.amcharts.com/v5/tutorials/maps-with-displaced-areas-and-dividers/)
* [MapChart with an auto-populated legend](https://docs.amcharts.com/v5/tutorials/mapchart-with-an-auto-populated-legend/)
