---
title: "Map point series"
source: "https://docs.amcharts.com/v5/charts/map-chart/map-point-series/"
scraped: "2026-11-16"
---

Map point series can be used to add points (markers) at specific coordinates on the map.

## Adding series

To create a map line series we need to call its [`new()` method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax) and push the new object into chart's `series` list:

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);
```

## Markers

### Marker template

Markers (or points) on a map point series are bullets. We create them like on any other series: by pushing a function that returns `Bullet` object into `bullets` list of the series.

It can be any visual element, from as simple as a `Circle` or a `Label`, to a full-fledged chart.

TypeScript:

```ts
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});
```

Whenever a point/marker will need to be created (as per data explained below), series will call the bullet function to create an actual element.

### Auto-scaling markers

Markers (bullets) will stay the same size when map is panned or zoomed.

If we'd rather they grew when zoomed in (and shrank when zoomed out), we can set series' `autoScale` property to `true`.

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    autoScale: true
  })
);
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    autoScale: true
  })
);
```

### Surface bullets

Normally, markers face the viewer, whatever the projection. With `surfaceBullets: true`, they are laid onto the map instead, as if painted on it: each one turns, squashes, and stretches with the map at its location.

On a globe, such markers flatten towards its edge. On a Mercator map, they grow towards the poles, just like the countries do.

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    surfaceBullets: true
  })
);
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    surfaceBullets: true
  })
);
```

> **Note:** `surfaceBullets` is available since version 5.21.0.

Example: [Surface bullets on a globe](https://docs.amcharts.com/embeds/v5/surface-bullets-on-a-globe/)

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

// Create the map chart: a globe that keeps turning
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationY: -20,
    animations: [{ key: "rotationX", from: 0, to: 360, duration: 60000, loops: 0 }]
  })
);

// Add water
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Create point series with surface bullets: each marker lies on the map,
// turning and squashing with the globe
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#surface-bullets
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    surfaceBullets: true
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Rectangle.new(root, {
      width: 24,
      height: 24,
      centerX: am5.p50,
      centerY: am5.p50,
      fill: am5.color(0xff5500),
      fillOpacity: 0.8
    })
  });
});

// A marker every 30 degrees
var data = [];
for (var longitude = -180; longitude < 180; longitude += 30) {
  for (var latitude = -60; latitude <= 60; latitude += 30) {
    data.push({ geometry: { type: "Point", coordinates: [longitude, latitude] } });
  }
}
pointSeries.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Data

There is a number of ways to add data to series. Let's explore them.

### GeoJSON

Point series accepts data in GeoJSON format. It will pick out features of type `Point` and `MultiPoint`.

Here's an example of a simple GeoJSON data, depicting three points: New York City, London, and Beijing.

```json title="GeoJSON"
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-73.778137, 40.641312]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-0.454296, 51.470020]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [116.597504, 40.072498]
    }
  }]
}
```

We can set such data directly to series `geoJSON` property:

TypeScript:

```ts
let cities = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-73.778137, 40.641312]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-0.454296, 51.470020]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [116.597504, 40.072498]
    }
  }]
};

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    geoJSON: cities
  })
);
```

JavaScript:

```js
var cities = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-73.778137, 40.641312]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-0.454296, 51.470020]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [116.597504, 40.072498]
    }
  }]
};

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    geoJSON: cities
  })
);
```

Example: [Map point series with GeoJSON](https://docs.amcharts.com/embeds/v5/map-point-series-with-geojson/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// GeoJSON data
var cities = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "New York City"
      },

      geometry: {
        type: "Point",
        coordinates: [-73.778137, 40.641312]
      }
    },

    {
      type: "Feature",
      properties: {
        name: "London"
      },

      geometry: {
        type: "Point",
        coordinates: [-0.454296, 51.47002]
      }
    },

    {
      type: "Feature",
      properties: {
        name: "Beijing "
      },

      geometry: {
        type: "Point",
        coordinates: [116.597504, 40.072498]
      }
    }
  ]
};

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    geoJSON: cities
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xffba00)
    })
  });
});
```

### Plain data

Another way to set data is via series `data` interface.

There are two ways to do that:

* Arrays containing objects with GeoJSON-like geometry syntax.
* Arrays of objects containing proprietary keys bound to series via its `latitudeField` and `longitudeField` settings.

#### Using GeoJSON-like geometry

With this approach, each item in data needs to have at least `geometry` key in it, that identifies points. Basically, it's a subset of a GeoJSON format:

TypeScript:

```ts
pointSeries.data.setAll([{
  geometry: {
    type: "Point",
    coordinates: [-73.778137, 40.641312]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: [-0.454296, 51.470020]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: [116.597504, 40.072498]
  }
}]);
```

JavaScript:

```js
pointSeries.data.setAll([{
  geometry: {
    type: "Point",
    coordinates: [-73.778137, 40.641312]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: [-0.454296, 51.470020]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: [116.597504, 40.072498]
  }
}]);
```

Example: [Map point series with data](https://docs.amcharts.com/embeds/v5/map-point-series-with-data/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.data.setAll([
  {
    geometry: {
      type: "Point",
      coordinates: [-73.778137, 40.641312]
    }
  },

  {
    geometry: {
      type: "Point",
      coordinates: [-0.454296, 51.47002]
    }
  },

  {
    geometry: {
      type: "Point",
      coordinates: [116.597504, 40.072498]
    }
  }
]);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xffba00)
    })
  });
});
```

#### Using custom data fields

This approach requires setting series' `latitudeField` and `longitudeField` to indicate which keys in data hold latitude and longitude values.

While it requires additional configuration, it allows data to be considerably simpler:

TypeScript:

```ts
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "lat",
  longitudeField: "long"
}));

pointSeries.data.setAll([{
  long: -73.778137,
  lat: 40.641312
}, {
  long: -0.454296,
  lat: 51.470020
}, {
  long: 116.597504,
  lat: 40.072498
}]);
```

JavaScript:

```js
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "lat",
  longitudeField: "long"
}));

pointSeries.data.setAll([{
  long: -73.778137,
  lat: 40.641312
}, {
  long: -0.454296,
  lat: 51.470020
}, {
  long: 116.597504,
  lat: 40.072498
}]);
```

Example: [Map point series with data and datafields](https://docs.amcharts.com/embeds/v5/map-point-series-with-data-and-datafields/)

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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long"
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xffba00)
    })
  });
});

pointSeries.data.setAll([
  {
    long: -73.778137,
    lat: 40.641312
  },
  {
    long: -0.454296,
    lat: 51.47002
  },
  {
    long: 116.597504,
    lat: 40.072498
  }
]);
```

> **Important:** It's a good practice to make sure setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

### Individual data items

We can also use series `pushDataItem()` method to add data points one-by-one.

The parameter is an object that adheres to `IMapPointSeriesDataItem` interface.

TypeScript:

```ts
let nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
let london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
let beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });
```

JavaScript:

```js
var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });
```

Example: [Map point series creating individual data items](https://docs.amcharts.com/embeds/v5/map-point-series-creating-individual-data-items/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.47002, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xffba00)
    })
  });
});
```

## Relation to polygon series

Point series can use a [map polygon series](https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/) to position its markers.

### Via ID data field

If we are using series `data` to points, we can include an ID of the related polygon in it, then set `polygonIdField` setting to let series know we are providing polygon ids.

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "country"
  })
);

pointSeries.data.setAll([{
  country: "CA",
  name: "Canada"
}, {
  country: "US",
  name: "United States"
},{
  country: "MX",
  name: "Mexico"
}]);
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "country"
  })
);

pointSeries.data.setAll([{
  country: "CA",
  name: "Canada"
}, {
  country: "US",
  name: "United States"
},{
  country: "MX",
  name: "Mexico"
}]);
```

Example: [Map point series creating individual data items](https://docs.amcharts.com/embeds/v5/map-point-series-creating-individual-data-items-2/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    include: ["CA", "US", "MX"]
  })
);

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "country"
  })
);

pointSeries.data.setAll([
  {
    country: "CA",
    name: "Canada"
  },
  {
    country: "US",
    name: "United States"
  },
  {
    country: "MX",
    name: "Mexico"
  }
]);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      text: "{name}",
      populateText: true
    })
  });
});
```

### Via data items

We can do that with custom-created point data items, too:

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });
```

Example: [Map point series creating individual data items](https://docs.amcharts.com/embeds/v5/map-point-series-creating-individual-data-items-3/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    include: ["CA", "US", "MX"]
  })
);

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      text: "{name}",
      populateText: true
    })
  });
});
```

### Automatic labels

We can also automate the above process, by utilizing polygon series' `datavalidated` event, to automatically build data for our point series:

TypeScript:

```ts
polygonSeries.events.on("datavalidated", function(ev) {
  let series = ev.target;
  let labelData = [];
  series.mapPolygons.each(function(polygon) {
    labelData.push({
      polygonId: polygon.dataItem.get("id"),
      name: polygon.dataItem.get("name")
    })
  })
  pointSeries.data.setAll(labelData);
});
```

JavaScript:

```js
polygonSeries.events.on("datavalidated", function(ev) {
  var series = ev.target;
  var labelData = [];
  series.mapPolygons.each(function(polygon) {
    var id = polygon.dataItem.get("id");
    labelData.push({
      polygonId: polygon.dataItem.get("id"),
      name: polygon.dataItem.get("name")
    });
  })
  pointSeries.data.setAll(labelData);
});
```

Example: [State abbreviations on a US map](https://docs.amcharts.com/embeds/v5/state-abbreviations-on-a-us-map/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/map.js, https://cdn.amcharts.com/lib/5/geodata/usaLow.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
    projection: am5map.geoAlbersUsa()
  })
);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_usaLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
});

// Create series for labels
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "polygonId"
  })
);

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      fontSize: 10,
      centerX: am5.p50,
      centerY: am5.p50,
      text: "{name}",
      populateText: true
    })
  });
});

// Add state labels
polygonSeries.events.on("datavalidated", function (ev) {
  var series = ev.target;
  var labelData = [];
  series.mapPolygons.each(function (polygon) {
    var id = polygon.dataItem.get("id");
    labelData.push({
      polygonId: id,
      name: id.split("-").pop()
    });
  });
  pointSeries.data.setAll(labelData);
});
```

## Relation to line series

### Connecting line series points

We can use actual data items from a map line series as points for the line from a [map line series](https://docs.amcharts.com/v5/charts/map-chart/map-line-series/).

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

Example: [Map line and point series used together](https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  let circle = am5.Circle.new(root, {
    radius: 7,
    tooltipY: 0,
    fill: am5.color(0xffba00),
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 2,
    draggable: true
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.47002, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

// Create line series
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.pushDataItem({
  pointsToConnect: [nyc, london, beijing]
});

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xffba00),
  strokeWidth: 2,
  strokeOpacity: 1
});
```

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

The below example uses above code, albeit with the slightly more sophisticated image as a point bullet:

Example: [Map line and point series used together](https://docs.amcharts.com/embeds/v5/map-line-and-point-series-used-together-2/)

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
  height: 400px;
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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create line series
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: am5.color(0xffba00),
  strokeWidth: 2,
  strokeOpacity: 1
});

var route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: [
      [-73.778137, 40.641312],
      [-0.454296, 51.47002],
      [116.597504, 40.072498]
    ]
  }
});

// Create point series
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  var container = am5.Container.new(root, {});
  container.children.push(
    am5.Graphics.new(root, {
      svgPath:
        "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
      scale: 0.06,
      centerY: am5.p50,
      centerX: am5.p50,
      fill: am5.color(0x000000)
    })
  );

  return am5.Bullet.new(root, { sprite: container });
});

var plane = pointSeries.pushDataItem({
  lineDataItem: route,
  positionOnLine: 0.7,
  autoRotate: true
});
```

#### Via data

Points can be put on lines via series data, too. Give the line an `id`, and refer to it in the point's `lineId`:

TypeScript:

```ts
lineSeries.data.setAll([{
  id: "route",
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
}]);

pointSeries.data.setAll([{
  lineId: "route",
  positionOnLine: 0.7,
  autoRotate: true
}]);
```

JavaScript:

```js
lineSeries.data.setAll([{
  id: "route",
  geometry: {
    type: "LineString",
    coordinates: [
      [ -73.778137, 40.641312 ],
      [ -0.454296, 51.470020 ],
      [ 116.597504, 40.072498 ]
    ]
  }
}]);

pointSeries.data.setAll([{
  lineId: "route",
  positionOnLine: 0.7,
  autoRotate: true
}]);
```

If the data uses other names for these keys, set them with series' `lineIdField`, `positionOnLineField`, `autoRotateField`, and `autoRotateAngleField` settings.

Points follow their line when it changes, e.g. when it is moved or given a new `altitude`.

## Altitude

Points can float above the ground, e.g. satellites or aircraft. The height is in metres: `400000` is about the height of the International Space Station.

To read heights from data, set series' `altitudeField`:

TypeScript:

```ts
let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long",
    altitudeField: "altitude"
  })
);

pointSeries.data.setAll([{
  name: "ISS",
  long: -73.778137,
  lat: 40.641312,
  altitude: 400000
}]);
```

JavaScript:

```js
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long",
    altitudeField: "altitude"
  })
);

pointSeries.data.setAll([{
  name: "ISS",
  long: -73.778137,
  lat: 40.641312,
  altitude: 400000
}]);
```

`altitudeField` is not set by default, so data that happens to have an "altitude" key (e.g. elevation above sea level, or a value in feet) is not used as height by accident.

When adding points one by one, set `altitude` on the data item:

TypeScript:

```ts
pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137, altitude: 400000 });
```

JavaScript:

```js
pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137, altitude: 400000 });
```

On a globe, raised points rise away from its surface. On flat maps they rise up the screen.

A point on a line takes the line's altitude instead. For lines that arc above the ground, see "[Map line series](https://docs.amcharts.com/v5/charts/map-chart/map-line-series/)".

> **Note:** Altitude is available since version 5.21.0.

Example: [Satellites at different heights](https://docs.amcharts.com/embeds/v5/satellites-at-different-heights/)

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

// Create the map chart: a globe
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "rotateY",
    projection: am5map.geoOrthographic(),
    rotationY: -20
  })
);

// Add water
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create polygon series for countries
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

// Create point series that reads heights (metres) from data
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#altitude
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long",
    altitudeField: "altitude"
  })
);

pointSeries.bullets.push(function () {
  var container = am5.Container.new(root, {});

  container.children.push(
    am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff5500),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,
      tooltipText: "{name}: {altitude.formatNumber('#,###')} m"
    })
  );

  container.children.push(
    am5.Label.new(root, {
      text: "{name}",
      fontSize: 12,
      centerY: am5.p50,
      dx: 8,
      populateText: true
    })
  );

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// Positions are made up; heights are roughly real
pointSeries.data.setAll([
  { name: "Tiangong", long: 20, lat: 35, altitude: 390000 },
  { name: "ISS", long: -10, lat: 45, altitude: 420000 },
  { name: "Hubble", long: 0, lat: 20, altitude: 540000 },
  { name: "Sentinel", long: 30, lat: 10, altitude: 790000 },
  { name: "Iridium", long: 10, lat: 60, altitude: 1100000 },
  { name: "Globalstar", long: -20, lat: 15, altitude: 1400000 }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Hover behavior

### Adding tooltips

To add a tooltip to the points/markers, we can use `tooltipText` on a related bullet.

The value may contain [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) as well as [in-line text styles](https://docs.amcharts.com/v5/concepts/formatters/text-styling/).

TypeScript:

```ts
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      tooltipText: "{name}"
    })
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      tooltipText: "{name}"
    })
  });
});
```

### Hover states

We can set values to apply to point bullets when it is hovered by creating a "hover" [state](https://docs.amcharts.com/v5/concepts/settings/states/) for them.

TypeScript:

```ts
pointSeries.bullets.push(function() {
  let circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.states.create("hover", {
    fill: am5.color(0x00ff00)
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.states.create("hover", {
    fill: am5.color(0x00ff00)
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

## Events

To attach events like click and hover on map point series we will need to add them on its bullets when they are created.

TypeScript:

```ts
pointSeries.bullets.push(function() {
  let circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.events.on("click", function(ev) {
    console.log(ev.target.dataItem);
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

JavaScript:

```js
pointSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.events.on("click", function(ev) {
    console.log(ev.target.dataItem);
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});
```

Example: [Click events on map point series](https://docs.amcharts.com/embeds/v5/click-events-on-map-point-series/)

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

// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
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

// Create point series
var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    latitudeField: "lat",
    longitudeField: "long"
  })
);

pointSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 5,
    fill: am5.color(0xff0000),
    tooltipText: "{name}"
  });

  circle.events.on("click", function (ev) {
    alert("Clicked on " + ev.target.dataItem.dataContext.name);
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

pointSeries.data.setAll([
  {
    long: -73.778137,
    lat: 40.641312,
    name: "New York"
  },
  {
    long: -0.454296,
    lat: 51.47002,
    name: "London"
  },
  {
    long: 116.597504,
    lat: 40.072498,
    name: "Beijing"
  }
]);
```

## Related tutorials

* [Map point series with rounded image bullets](https://docs.amcharts.com/v5/tutorials/map-point-series-with-rounded-image-bullets/) (demo)
* [Get points within current viewport of a MapChart](https://docs.amcharts.com/v5/tutorials/get-points-within-current-viewport-of-a-mapchart/) (demo)
* [Map with custom markers and data-bound colors](https://docs.amcharts.com/v5/tutorials/map-with-custom-markers-and-data-bound-colors/) (demo)
