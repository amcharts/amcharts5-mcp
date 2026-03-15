---
title: "Map with Animated Lines"
source: "https://www.amcharts.com/demos/map-with-animated-lines/"
category: "maps"
scraped: "2026-03-15"
---

Connecting points on a map is a typical way to display relationships between these points. When you want to display the direction of that relationship you can either use arrows, like in the Maps with Curved Lines demo, or you can use animation like we are doing here.
Key implementation details
We setup our regular static MapLineSeries to act as our guides and set strokeOpacity on them to 0 (they are only used as guides). Then we add bullets based on our cities (again, invisible) using MapPointSeries. Finally, we animate these bullets along their respective lines and use those bullet positions as end-point data items for our animated lines.
Map chart
Map line series
Map point series
Animations

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "translateX",
  panY: "translateY",
  projection: am5map.geoMercator()
}));

var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: 20,
  y: 40
}));


// Add labels and controls
cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Map"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

switchButton.on("active", function() {
  if (!switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    chart.set("panX", "translateX");
    chart.set("panY", "translateY");
  }
  else {
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panX", "rotateX");
    chart.set("panY", "rotateY");
  }
});

cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Globe"
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.08
});

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/

// this will be invisible line (note strokeOpacity = 0) along which invisible points will animate
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0
});

// this will be visible line. Lines will connectg animating points so they will look like animated
var animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
animatedLineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.6
});

// destination series
var citySeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

// visible city circles
citySeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 5,
    tooltipText: "{title}",
    tooltipY: 0,
    fill: am5.color(0xffba00),
    stroke: root.interfaceColors.get("background"),
    strokeWidth: 2
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

// invisible series which will animate along invisible lines
var animatedBulletSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {})
);

animatedBulletSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 0
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});


var cities = [
  {
    id: "london",
    title: "London",
    geometry: { type: "Point", coordinates: [-0.1262, 51.5002] },
  },
  {
    id: "brussels",
    title: "Brussels",
    geometry: { type: "Point", coordinates: [4.3676, 50.8371] }
  }, {
    id: "prague",
    title: "Prague",
    geometry: { type: "Point", coordinates: [14.4205, 50.0878] }
  }, {
    id: "athens",
    title: "Athens",
    geometry: { type: "Point", coordinates: [23.7166, 37.9792] }
  }, {
    id: "reykjavik",
    title: "Reykjavik",
    geometry: { type: "Point", coordinates: [-21.8952, 64.1353] }
  }, {
    id: "dublin",
    title: "Dublin",
    geometry: { type: "Point", coordinates: [-6.2675, 53.3441] }
  }, {
    id: "oslo",
    title: "Oslo",
    geometry: { type: "Point", coordinates: [10.7387, 59.9138] }
  }, {
    id: "lisbon",
    title: "Lisbon",
    geometry: { type: "Point", coordinates: [-9.1355, 38.7072] }
  }, {
    id: "moscow",
    title: "Moscow",
    geometry: { type: "Point", coordinates: [37.6176, 55.7558] }
  }, {
    id: "belgrade",
    title: "Belgrade",
    geometry: { type: "Point", coordinates: [20.4781, 44.8048] }
  }, {
    id: "bratislava",
    title: "Bratislava",
    geometry: { type: "Point", coordinates: [17.1547, 48.2116] }
  }, {
    id: "ljublana",
    title: "Ljubljana",
    geometry: { type: "Point", coordinates: [14.5060, 46.0514] }
  }, {
    id: "madrid",
    title: "Madrid",
    geometry: { type: "Point", coordinates: [-3.7033, 40.4167] }
  }, {
    id: "stockholm",
    title: "Stockholm",
    geometry: { type: "Point", coordinates: [18.0645, 59.3328] }
  }, {
    id: "bern",
    title: "Bern",
    geometry: { type: "Point", coordinates: [7.4481, 46.9480] }
  }, {
    id: "kiev",
    title: "Kiev",
    geometry: { type: "Point", coordinates: [30.5367, 50.4422] }
  }, {
    id: "paris",
    title: "Paris",
    geometry: { type: "Point", coordinates: [2.3510, 48.8567] }
  }, {
    id: "new york",
    title: "New York",
    geometry: { type: "Point", coordinates: [-74, 40.43] }
  }];

citySeries.data.setAll(cities);

// Prepare line series data
var destinations = ["reykjavik", "lisbon", "moscow", "belgrade", "ljublana", "madrid", "stockholm", "bern", "kiev", "new york"];

// London coordinates
var originLongitude = -0.1262;
var originLatitude = 51.5002;

var londonDataItem = citySeries.getDataItemById("london");

// this will do all the animations
am5.array.each(destinations, function(did) {
  var destinationDataItem = citySeries.getDataItemById(did);
  var lineDataItem = lineSeries.pushDataItem({});
  lineDataItem.set("pointsToConnect", [londonDataItem, destinationDataItem])

  var startDataItem = animatedBulletSeries.pushDataItem({});
  startDataItem.setAll({
    lineDataItem: lineDataItem,
    positionOnLine: 0
  });

  var endDataItem = animatedBulletSeries.pushDataItem({});
  endDataItem.setAll({
    lineDataItem: lineDataItem,
    positionOnLine: 1
  });

  var animatedLineDataItem = animatedLineSeries.pushDataItem({});
  animatedLineDataItem.set("pointsToConnect", [startDataItem, endDataItem])

  var lon0 = londonDataItem.get("longitude");
  var lat0 = londonDataItem.get("latitude");

  var lon1 = destinationDataItem.get("longitude");
  var lat1 = destinationDataItem.get("latitude");


  var distance = Math.hypot(lon1 - lon0, lat1 - lat0);
  var duration = distance * 100;

  animateStart(startDataItem, endDataItem, duration);
});

function animateStart(startDataItem, endDataItem, duration) {

  var startAnimation = startDataItem.animate({
    key: "positionOnLine",
    from: 0,
    to: 1,
    duration: duration
  });

  startAnimation.events.on("stopped", function() {
    animateEnd(startDataItem, endDataItem, duration);
  });
}

function animateEnd(startDataItem, endDataItem, duration) {
  startDataItem.set("positionOnLine", 0)
  var endAnimation = endDataItem.animate({
    key: "positionOnLine",
    from: 0,
    to: 1,
    duration: duration
  })

  endAnimation.events.on("stopped", function() {
    animateStart(startDataItem, endDataItem, duration);
  });
}

polygonSeries.events.on("datavalidated", function() {
  chart.zoomToGeoPoint({
    longitude: -0.1262,
    latitude: 51.5002
  }, 3);
});


// Make stuff animate on load
chart.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
