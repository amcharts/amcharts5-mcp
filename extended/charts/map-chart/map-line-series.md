---
title: "Map line series"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-line-series/"
scraped: "2026-11-25"
---

Map line series are used to plot projected lines on the map.

## Adding series

To create a map line series we need to call its [`new()` method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax) and push the new object into chart's `series` list:

TypeScript:

```ts
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    // ...
  })
);
```

JavaScript:

```js
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    // ...
  })
);
```

## Configuring lines

### Appearance

Lines are configured using series' `mapLines.template`, which can be used to set any `MapLine` [setting](https://docs.amcharts.com/v5/reference/mapline/#settings).

TypeScript:

```ts
lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xff0000),
  strokeWidth: 2,
  strokeOpacity: 0.5
});
```

JavaScript:

```js
lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xff0000),
  strokeWidth: 2,
  strokeOpacity: 0.5
});
```

Line color can also be set directly via polygon series' setting `stroke`:

TypeScript:

```ts
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    stroke: am5.color(0x22ff55)
  })
);
```

JavaScript:

```js
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    stroke: am5.color(0x22ff55)
  })
);
```

### Curved or straight

Lines between two points will follow shortest distance, meaning that it will most probably look curved, based on the projection of the map.

This can be configured using `lineType` setting of the series.

There are two options:

* `"curved"` (default) - follows shortest distance. Can cross -180/180 longitude.
* `"straight"` - will connect two points with a visually straight line. Will not cross -180/180 longitude.

TypeScript:

```ts
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    lineType: "straight"
  })
);
```

JavaScript:

```js
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    lineType: "straight"
  })
);
```

![World map with a line curving the short way across the Pacific](https://docs.amcharts.com/v5/images/charts/map-chart/map-line-series/chrome_2022-09-27_12-29-01-1024x637.png "`lineType: 'curved'` (default)")

![World map with a straight line drawn across Africa](https://docs.amcharts.com/v5/images/charts/map-chart/map-line-series/2022-09-27_12-29-14-1024x637.png "`lineType: 'straight'`")

### Altitude

Lines can be raised above the ground, so they arc like a flight path or a trajectory. The `altitude` setting of a line sets how high, in metres, each leg of the line (from one point to the next) rises in its middle. Each leg lands on its points at both ends.

TypeScript:

```ts
lineSeries.mapLines.template.setAll({
  altitude: 800000
});
```

JavaScript:

```js
lineSeries.mapLines.template.setAll({
  altitude: 800000
});
```

For scale: `400000` is about the height of the International Space Station. On a globe, lines rise away from its surface. On flat maps they rise up the screen.

Once `altitude` is set (even to `0`), the ends of each leg are placed at the height of the points they connect: the [altitude](https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#altitude) of points in `pointsToConnect`, or the third value of the coordinates in `geometry` (in metres, as in GeoJSON). Lines without `altitude` stay on the ground, whatever their coordinates hold.

To give each line its own height, set it via data using [template fields](https://docs.amcharts.com/v5/concepts/settings/template-fields/):

TypeScript:

```ts
lineSeries.mapLines.template.set("templateField", "lineSettings");

lineSeries.data.setAll([{
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ]
    ]
  },
  lineSettings: {
    altitude: 500000
  }
}, {
  geometry: {
    type: "LineString",
    coordinates: [
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  },
  lineSettings: {
    altitude: 1200000
  }
}]);
```

JavaScript:

```js
lineSeries.mapLines.template.set("templateField", "lineSettings");

lineSeries.data.setAll([{
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ]
    ]
  },
  lineSettings: {
    altitude: 500000
  }
}, {
  geometry: {
    type: "LineString",
    coordinates: [
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  },
  lineSettings: {
    altitude: 1200000
  }
}]);
```

> **Note:** `altitude` is available since version 5.21.0. It has no effect on lines with `lineType: "straight"`.

Example: [Flight routes arcing above a globe](https://docs.amcharts.com/embeds/v5/flight-routes-arcing-above-a-globe/). Its code: get_example(path: "examples/docs-demos/flight-routes-arcing-above-a-globe").

### Filling to the surface

On flat maps, `fillToSurface: true` fills the area between a raised line and the ground below it with the line's `fill`, and strokes only the raised line. It needs `altitude` to be set. With `0`, as below, the line follows only the heights in its coordinates.

TypeScript:

```ts
lineSeries.mapLines.template.setAll({
  altitude: 0,
  fillToSurface: true,
  fill: am5.color(0x6794dc),
  fillOpacity: 0.8
});
```

JavaScript:

```js
lineSeries.mapLines.template.setAll({
  altitude: 0,
  fillToSurface: true,
  fill: am5.color(0x6794dc),
  fillOpacity: 0.8
});
```

Lines added later cover those added before. Add them from back to front, and each line hides what is behind it, like a ridgeline chart.

> **Note:** `fillToSurface` is available since version 5.24.0. It has no effect on a globe.

## Data

There is a number of ways to add data to series. Let's explore them.

### GeoJSON

Line series accepts data in GeoJSON format. It will pick out features of type `LineString` and `MultiLineString`.

Here's an example of a simple GeoJSON data, depicting flight route: JFK > Heathrow > Beijing.

```json title="GeoJSON"
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [ -73.778137, 40.641312 ],
        [ -0.454296, 51.470020 ],
        [ 116.597504, 40.072498 ]
      ]
    }
  }]
}
```

We can set such data directly to series `geoJSON` property:

TypeScript:

```ts
let routes = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [ -73.778137, 40.641312 ],
        [ -0.454296, 51.470020 ],
        [ 116.597504, 40.072498 ]
      ]
    }
  }]
};

// Create line series
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    geoJSON: routes
  })
);
```

JavaScript:

```js
var routes = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
    },
    "geometry": {
      "type": "LineString",
      "coordinates": [
        [ -73.778137, 40.641312 ],
        [ -0.454296, 51.470020 ],
        [ 116.597504, 40.072498 ]
      ]
    }
  }]
};

// Create line series
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {
    geoJSON: routes
  })
);
```

Example: [Map with line series](https://docs.amcharts.com/embeds/v5/map-with-line-series/). Its code: get_example(path: "examples/docs-demos/map-with-line-series").

### Plain data

Another way to set data is via series `data` interface.

Each item in data needs to have at least `geometry` key in it, that identifies line points. Basically, it's a subset of a GeoJSON format:

TypeScript:

```ts
lineSeries.data.setAll([{
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
}]);
```

JavaScript:

```js
lineSeries.data.setAll([{
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
}]);
```

Example: [Map with line series via data](https://docs.amcharts.com/embeds/v5/map-with-line-series-via-data/). Its code: get_example(path: "examples/docs-demos/map-with-line-series-via-data").

### Individual data items

We can also use series `pushDataItem()` method to add data lines one-by-one.

The parameter is an object that adheres to `IMapLineSeriesDataItem` interface.

TypeScript:

```ts
lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
});
```

JavaScript:

```js
lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
});
```

Example: [Map line pushing data items](https://docs.amcharts.com/embeds/v5/map-line-pushing-data-items/). Its code: get_example(path: "examples/docs-demos/map-line-pushing-data-items").

Or, if we have a map line series with points we'd like to connect, we can use `pointsToConnect` instead of `geometry`. See "[Connecting line series points](#connecting-line-series-points)" section of this tutorial for further info.

## Relation to point series

### Connecting line series points

We can use actual data items from a [map point series](https://docs.amcharts.com/v5/charts/map-chart/map-point-series/) as points for the line.

This eliminates the need to define `geometry` for our lines, as we can use `pointsToConnect` setting instead, which is an array of map line series' data items:

TypeScript:

```ts
// Create point series
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

let nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
let london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
let beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

// Create line series
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

lineSeries.pushDataItem({
  pointsToConnect: [nyc, london, beijing]
});
```

JavaScript:

```js
// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

// Create line series
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

lineSeries.pushDataItem({
  pointsToConnect: [nyc, london, beijing]
});
```

Example: [Map line and point series used together](https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together/). Its code: get_example(path: "examples/docs-demos/map-line-and-point-series-used-together").

### Points on a line

This can also work the other way around: we can make a data item form map line series "stick" to any point on a line.

All we have to do is to set `lineDataItem` to a data item of the specific line, as well as `positionOnLine` to indicate relative position, when creating a point series data item:

TypeScript:

```ts
// Create line series
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

let route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
});

// Create point series
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});

let plane = pointSeries.pushDataItem({
  lineDataItem: route,
  positionOnLine: 0.7,
  autoRotate: true
});
```

JavaScript:

```js
// Create line series
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

var route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
});

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});

var plane = pointSeries.pushDataItem({
  lineDataItem: route,
  positionOnLine: 0.7,
  autoRotate: true
});
```

Let's examine the code above.

The `pointSeries.pushDataItem()` creates a new point in point (item) series. Normally it would contain a latitude/longitude information, but since we're sticking it to a line, we use different settings:

| Setting key       | Comment                                                                                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lineDataItem`    | A data item from map line series. Created with `pushDataItem()` on a line series, or extracted from series `dataItems`.                                                                                                                                                                                 |
| `positionOnLine`  | Relative position on the line. `0` (zero) means the beginning, and `1` (one) the end. Any intermediate number will indicate relative position along the whole line. In case the line is multi-segmented, the position is calculated from the beginning of the first segment to the end of the last one. |
| `autoRotate`      | If set to `true`, point bullet will be automatically rotated to the angle of the exact point in line.                                                                                                                                                                                                   |
| `autoRotateAngle` | If set, this will be added to the angle calculated by `autoRotate`. Can be used to reverse the direction.                                                                                                                                                                                               |

If the line has an [altitude](#altitude), the point rides along the arc at the line's height.

The below example uses above code, albeit with the slightly more sophisticated image as a point bullet:

Example: [Map line and point series used together](https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together-2/). Its code: get_example(path: "examples/docs-demos/map-line-and-point-series-used-together-2").
