---
title: "Map with Animated Lines"
source: "https://www.amcharts.com/demos/map-with-animated-lines/"
category: "maps"
scraped: "2026-10-08"
---

Lines from London that draw themselves to ten cities, over and over, all at the same speed, so the long route to New York takes longest.

When to animate lines: Motion shows direction without arrows: lines that grow from one end tell readers which way things flow, here out of London. Each line follows an invisible guide, with two points moving along it and the visible line drawn between them. Use it sparingly; constant motion pulls the eye from everything else on the page.

Good for:
- Flights, shipments or data flowing from a hub
- Eye-catching headers and dashboards
- Direction without arrows

Think twice when:
- Reports and print: the motion is lost, so use arrows
- Many routes at once: it gets busy
- Comparing amounts: vary the line width instead

Prompt: Create a map of Europe and the North Atlantic with lines from London to ten cities that draw themselves over and over, growing out from London and shrinking away into the far city, all at the same speed. Show the cities as dots with name tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0
  }),
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted: zoomed to the lines and cities
  autoHome: true,
  homeGeoPoint: { longitude: -18, latitude: 43 }, // the home view is centered west of Europe...
  homeZoomLevel: 3,                  // ...and zoomed in 3 times
  panX: "translateX",                // dragging moves the map sideways...
  panY: "translateY",                // ...and up and down
  projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0.05, // ...barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  name: "Polygon Series",
  geoJSON: am5geodata_worldLow // the world's countries, in low detail
}));

// grid lines every 10 degrees
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  name: "Graticule Series"
}));
graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.08 // ...and very faint
});

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/

// this will be invisible line (note strokeOpacity = 0) along which invisible points will animate
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  name: "Guide Line Series"
}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0
});

// this will be visible line. Lines will connect animating points so they will look like animated
var animatedLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  name: "Animated Line Series"
}));
animatedLineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.6 // ...slightly faded
});

// destination series
var citySeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    name: "City Series"
  })
);

// visible city circles
citySeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 5,                 // 5px radius
    tooltipText: "{title}",    // the city's name on hover
    tooltipY: 0,               // the tooltip points at the top of the dot
    fill: colors.getIndex(10), // a theme color
    stroke: root.interfaceColors.get("background"), // a ring in the background color...
    strokeWidth: 2, // ...2px wide
    // a black shadow, a little blurred
    shadowColor: am5.color(0x000000),
    shadowBlur: 4,
    shadowOffsetX: 1,  // shifted 1px right...
    shadowOffsetY: 2,  // ...and 2px down...
    shadowOpacity: 0.4 // ...at 40% opacity
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

// invisible series which will animate along invisible lines
var animatedBulletSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    name: "Animated Point Series"
  })
);

animatedBulletSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 0 // zero size: the point is there but not seen
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
    id: "ljubljana",
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
    id: "kyiv",
    title: "Kyiv",
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
var destinations = ["reykjavik", "lisbon", "moscow", "belgrade", "ljubljana", "madrid", "stockholm", "bern", "kyiv", "new york"];

// guide lines connect London to each destination
lineSeries.set("pointSeries", citySeries);
lineSeries.data.setAll(destinations.map(function(did) {
  return { id: did, pointIds: ["london", did] }; // each guide line runs from London to the destination
}));

// a start and an end point on each guide line
var animatedPoints = [];
am5.array.each(destinations, function(did) {
  animatedPoints.push({ id: did + "-start", lineId: did, positionOnLine: 0 }); // at the guide line's start...
  animatedPoints.push({ id: did + "-end", lineId: did, positionOnLine: 1 }); // ...and at its end
});
animatedBulletSeries.data.setAll(animatedPoints);

// visible lines connect the start and end points
animatedLineSeries.set("pointSeries", animatedBulletSeries);
animatedLineSeries.data.setAll(destinations.map(function(did) {
  return { pointIds: [did + "-start", did + "-end"] };
}));

var londonDataItem = citySeries.getDataItemById("london"); // London, where all the lines start

// this will do all the animations
am5.array.each(destinations, function(did) {
  var destinationDataItem = citySeries.getDataItemById(did);
  var startDataItem = animatedBulletSeries.getDataItemById(did + "-start");
  var endDataItem = animatedBulletSeries.getDataItemById(did + "-end");

  var lon0 = londonDataItem.get("longitude");
  var lat0 = londonDataItem.get("latitude");

  var lon1 = destinationDataItem.get("longitude");
  var lat1 = destinationDataItem.get("latitude");

  var distance = Math.hypot(lon1 - lon0, lat1 - lat0); // the line's length in degrees, roughly
  // longer lines take longer, so all lines move at the same speed
  var duration = distance * 100;

  animateStart(startDataItem, endDataItem, duration); // start the loop
});

// a loop: the start point runs out (the line shrinks away), then the end point (it grows back)
function animateStart(startDataItem, endDataItem, duration) {

  var startAnimation = startDataItem.animate({
    key: "positionOnLine", // move the start point along the guide line...
    from: 0,               // ...from London...
    to: 1,                 // ...to the destination
    duration: duration
  });

  startAnimation.events.on("stopped", function() { // when it gets there, the end point runs out next
    animateEnd(startDataItem, endDataItem, duration);
  });
}

// the start point jumps back to London and the end point runs out, so the line grows again
function animateEnd(startDataItem, endDataItem, duration) {
  startDataItem.set("positionOnLine", 0)
  var endAnimation = endDataItem.animate({
    key: "positionOnLine",
    from: 0,
    to: 1,
    duration: duration
  })

  endAnimation.events.on("stopped", function() { // and the loop goes on
    animateStart(startDataItem, endDataItem, duration);
  });
}

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small...
  fill: am5.color(0xffffff), // ...white...
  fillOpacity: 0.6,          // ...slightly faded text
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...anchored by its right end...
  dx: -10,                   // ...10px in from it
  y: 10,                     // 10px from the top
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines and
// the animated lines turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  animatedLineSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
