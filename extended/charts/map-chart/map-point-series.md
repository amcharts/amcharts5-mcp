---
title: "Map point series"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/"
scraped: "2026-03-15"
---

Map point series can be used to add points (markers) at specific coordinates on the map.

## Adding series

To create a map line series we need to call its [`new()` method](https://www.amcharts.com/docs/v5/getting-started/#New_element_syntax) and push the new object into chart's `series` list:

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
  })
);

## Markers

### Marker template

Markers (or points) on a map point series are bullets. We create them like on any other series: by pushing a function that returns `Bullet` object into `bullets` list of the series.

It can be any visual element, from as simple as a `Circle` or a `Label`, to a full-fledged chart.

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000)
    })
  });
});

Whenever a point/marker will need to be created (as per data explained below), series will call the bullet function to create an actual element.

### Auto-scaling markers

Markers (bullets) will stay the same size when map is panned or zoomed.

If we'd rather they grew when zoomed in (and shrank when zoomed out), we can set series' `autoScale` property to `true`.

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    autoScale: true
  })
);

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // ...
    autoScale: true
  })
);

## Data

There is a number of ways to add data to series. Let's explore them.

### GeoJSON

Point series accepts data in GeoJSON format. It will pick out features of type `Point` and `MultiPoint`.

Here's an example of a simple GeoJSON data, depicting three points: New York City, London, and Beijing.

{
  "type": "FeatureCollection",
  "features": \[{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-73.778137, 40.641312\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-0.454296, 51.470020\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[116.597504, 40.072498\]
    }
  }\]
}

We can set such data directly to series `geoJSON` property:

let cities = {
  "type": "FeatureCollection",
  "features": \[{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-73.778137, 40.641312\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-0.454296, 51.470020\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[116.597504, 40.072498\]
    }
  }\]
};

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    geoJSON: cities
  })
);

var cities = {
  "type": "FeatureCollection",
  "features": \[{
    "type": "Feature",
    "properties": {
      "name": "New York City"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-73.778137, 40.641312\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "London"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[-0.454296, 51.470020\]
    }
  }, {
    "type": "Feature",
    "properties": {
      "name": "Beijing"
    },
    "geometry": {
      "type": "Point",
      "coordinates": \[116.597504, 40.072498\]
    }
  }\]
};

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    geoJSON: cities
  })
);


### Plain data

Another way to set data is via series `data` interface.

There are two ways to do that:

-   Arrays containing objects with GeoJSON-like geometry syntax.
-   Arrays of objects containing proprietary keys bound to series via its `latitudeField` and `longitudeField` settings.

#### Using GeoJSON-like geometry

With this approach, each item in data needs to have at least `geometry` key in it, that identifies points. Basically, it's a subset of a GeoJSON format:

pointSeries.data.setAll(\[{
  geometry: {
    type: "Point",
    coordinates: \[-73.778137, 40.641312\]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: \[-0.454296, 51.470020\]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: \[116.597504, 40.072498\]
  }
}\]);

pointSeries.data.setAll(\[{
  geometry: {
    type: "Point",
    coordinates: \[-73.778137, 40.641312\]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: \[-0.454296, 51.470020\]
  }
}, {
  geometry: {
    type: "Point",
    coordinates: \[116.597504, 40.072498\]
  }
}\]);


#### Using custom data fields

This approach requires setting series' `latitudeField` and `longitudeField` to indicate which keys in data hold latitude and longitude values.

While it requires additional configuration, it allows data to be considerably simpler:

var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "lat",
  longitudeField: "long"
}));

pointSeries.data.setAll(\[{
  long: -73.778137,
  lat: 40.641312
}, {
  long: -0.454296,
  lat: 51.470020
}, {
  long: 116.597504,
  lat: 40.072498
}\]);

var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  latitudeField: "lat",
  longitudeField: "long"
}));

pointSeries.data.setAll(\[{
  long: -73.778137,
  lat: 40.641312
}, {
  long: -0.454296,
  lat: 51.470020
}, {
  long: 116.597504,
  lat: 40.072498
}\]);


IMPORTANT It's a good practice to make sure setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

### Individual data items

We can also use series `pushDataItem()` method to add data points one-by-one.

The parameter is an object that adheres to `[IMapPointSeriesDataItem](https://www.amcharts.com/docs/v5/reference/imappointseriesdataitem/)` interface.

let nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
let london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
let beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });

var nyc = pointSeries.pushDataItem({ latitude: 40.641312, longitude: -73.778137 });
var london = pointSeries.pushDataItem({ latitude: 51.470020, longitude: -0.454296 });
var beijing = pointSeries.pushDataItem({ latitude: 40.072498, longitude: 116.597504 });


## Relation to polygon series

Point series can use a [map polygon series](https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/) to position its markers.

### Via ID data field

If we are using series `data` to points, we can include an ID of the related polygon in it, then set `polygonIdField` setting to let series know we are providing polygon ids.

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "country"
  })
);

pointSeries.data.setAll(\[{
  country: "CA",
  name: "Canada"
}, {
  country: "US",
  name: "United States"
},{
  country: "MX",
  name: "Mexico"
}\]);

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    polygonIdField: "country"
  })
);

pointSeries.data.setAll(\[{
  country: "CA",
  name: "Canada"
}, {
  country: "US",
  name: "United States"
},{
  country: "MX",
  name: "Mexico"
}\]);


### Via data items

We can do that with custom-created point data items, too:

let pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });

var pointSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

pointSeries.pushDataItem({ polygonId: "CA", name: "Canada" });
pointSeries.pushDataItem({ polygonId: "US", name: "United States" });
pointSeries.pushDataItem({ polygonId: "MX", name: "Mexico" });


### Automatic labels

We can also automate the above process, by utilizing polygon series' `datavalidated` event, to automatically build data for our point series:

polygonSeries.events.on("datavalidated", function(ev) {
  let series = ev.target;
  let labelData = \[\];
  series.mapPolygons.each(function(polygon) {
    labelData.push({
      polygonId: polygon.dataItem.get("id"),
      name: polygon.dataItem.get("name")
    })
  })
  pointSeries.data.setAll(labelData);
});

polygonSeries.events.on("datavalidated", function(ev) {
  var series = ev.target;
  var labelData = \[\];
  series.mapPolygons.each(function(polygon) {
    var id = polygon.dataItem.get("id");
    labelData.push({
      polygonId: polygon.dataItem.get("id"),
      name: polygon.dataItem.get("name")
    });
  })
  pointSeries.data.setAll(labelData);
});


## Relation to line series

### Connecting line series points

We can use actual data items from a map line series as points for the line from a [map line series](https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/).

This eliminates the need to define `geometry` for our lines, as we can use `pointsToConnect` setting instead, which is an array of map line series' data items:

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
  pointsToConnect: \[nyc, london, beijing\]
});

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
  pointsToConnect: \[nyc, london, beijing\]
});


### Points on a line

This can also work the other way around: we can make a data item form map line series "stick" to any point on a line.

All we have to do is to set `lineDataItem` to a data item of the specific line, as well as `positionOnLine` to indicate relative position, when creating a point series data item:

// Create line series
let lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

let route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: \[
      \[ -73.778137, 40.641312 \],
      \[ -0.454296, 51.470020 \],
      \[ 116.597504, 40.072498 \]
    \]
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

// Create line series
var lineSeries = chart.series.push(
  am5map.MapLineSeries.new(root, {})
);

var route = lineSeries.pushDataItem({
  geometry: {
    type: "LineString",
    coordinates: \[
      \[ -73.778137, 40.641312 \],
      \[ -0.454296, 51.470020 \],
      \[ 116.597504, 40.072498 \]
    \]
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

Let's examine the code above.

The `pointSeries.pushDataItem()` creates a new point in point (item) series. Normally it would contain a latitude/longitude information, but since we're sticking it to a line, we use different settings:

Setting key

Comment

`lineDataItem`

A data item from map line series. Created with `pushDataItem()` on a line series, or extracted from series `dataItems`.

`positionOnLine`

Relative position on the line. `0` (zero) means the beginning, and `1` (one) the end. Any intermediate number will indicate relative position along the whole line.  
In case the line is multi-segmented, the position is calculated from the beginning of the first segment to the end of the last one.

`autoRotate`

If set to `true`, point bullet will be automatically rotated to the angle of the exact point in line.

`autoRotateAngle`

If set, this will be added to the angle calculated by `autoRotate`. Can be used to reverse the direction.

The below example uses above code, albeit with the slightly more sophisticated image as a point bullet:


## Hover behavior

### Adding tooltips

To add a tooltip to the points/markers, we can use `tooltipText` on a related bullet.

The value may contain [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) as well as [in-line text styles](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/).

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      tooltipText: "{name}"
    })
  });
});

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: am5.color(0xff0000),
      tooltipText: "{name}"
    })
  });
});

### Hover states

We can set values to apply to point bullets when it is hovered by creating a "hover" [state](https://www.amcharts.com/docs/v5/concepts/settings/states/) for them.

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

## Events

To attach events like click and hover on map point series we will need to add them on its bullets when they are created.

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


## Related tutorials

-   [Map point series with rounded image bullets](https://www.amcharts.com/docs/v5/tutorials/map-point-series-with-rounded-image-bullets/) (demo)
-   [Get points within current viewport of a MapChart](https://www.amcharts.com/docs/v5/tutorials/get-points-within-current-viewport-of-a-mapchart/) (demo)
-   [Map with custom markers and data-bound colors](https://www.amcharts.com/docs/v5/tutorials/map-with-custom-markers-and-data-bound-colors/) (demo)
