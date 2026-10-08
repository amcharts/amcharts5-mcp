---
title: "Animations Along Lines"
source: "https://www.amcharts.com/demos/animations-along-lines/"
category: "maps"
scraped: "2026-10-08"
---

A plane flies back and forth along a route from Paris to Toronto, Los Angeles and Havana. Drag a city and the route and the plane follow it.

Moving along a map line: Any point on a map can sit on a line and move along it, turning with the line as it goes. That makes a route easy to follow: the eye tracks the plane instead of reading a still path. The route takes the shortest way over the globe, which is why it curves on a flat map.

Good for:
- Flight, shipping and delivery routes
- The order of stops on a trip
- Live tracking of a vehicle or a parcel

Think twice when:
- Many routes at once: moving markers crowd, so keep the lines still
- When each leg happens: a timeline says it better
- Print: the motion is lost

Prompt: Create a world map zoomed to a travel route through four cities, from Paris to Havana, with a plane icon that flies back and forth along it and turns with the route. The cities can be dragged, and the route follows them. Use the amCharts 5 library with its Responsive theme.

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
    fillOpacity: 0 // invisible until the satellite view turns it on
  }),
  minZoomLevel: 0.5, // zoom out to half the fitted size at most
  // go to the home view once the map is fitted: zoomed to the route
  autoHome: true,
  homeGeoPoint: { longitude: -58, latitude: 37 }, // the home view centers on the North Atlantic...
  homeZoomLevel: 2.6,                             // ...zoomed in 2.6 times
  // dragging sideways turns the world around, dragging up and down moves it
  panX: "rotateX",
  panY: "translateY",
  projection: am5map.geoEqualEarth() // the Equal Earth projection
}));

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default; it brings back the view of the route
zoomControl.homeButton.set("visible", true);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  name: "Background Series",
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background
  fillOpacity: 0, // transparent oceans; raise it to tint them
  strokeOpacity: 0 // no outline
});

// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle around the whole world
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background...
  strokeOpacity: 0.08 // ...very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  name: "Polygon Series",
  geoJSON: am5geodata_worldLow // low-detail world countries
}));

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  name: "Line Series"
}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background...
  strokeOpacity: 0.3 // ...for a faint route line
});

// Create point series for markers
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  name: "City Series"
}));

pointSeries.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    radius: 7, // a 7px dot for each city
    tooltipText: "{title}", // the city's name
    cursorOverStyle: "pointer", // a hand pointer: the cities can be dragged
    tooltipY: 0, // the tooltip points at the dot's center
    fill: colors.getIndex(10),
    stroke: root.interfaceColors.get("background"), // an outline in the background color...
    strokeWidth: 2, // ...2px wide
    draggable: true, // drag a city to move it
    // a black shadow, a little blurred
    shadowColor: am5.color(0x000000),
    shadowBlur: 4,
    shadowOffsetX: 1,
    shadowOffsetY: 2,
    shadowOpacity: 0.4
  });

  // a dragged city takes the coordinates under it as it moves, so the route and the plane follow
  circle.events.on("dragged", function(event) {
    var dataItem = event.target.dataItem;
    var geoPoint = chart.invert({ x: circle.x(), y: circle.y() }); // the map coordinates under the dot

    dataItem.setAll({
      longitude: geoPoint.longitude,
      latitude: geoPoint.latitude
    });
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

pointSeries.data.setAll([
  { id: "paris", title: "Paris", latitude: 48.8567, longitude: 2.351 },
  { id: "toronto", title: "Toronto", latitude: 43.8163, longitude: -79.4287 },
  { id: "la", title: "Los Angeles", latitude: 34.3, longitude: -118.15 },
  { id: "havana", title: "Havana", latitude: 23, longitude: -82 }
]);

// the route connects the cities by their ids
lineSeries.set("pointSeries", pointSeries);
lineSeries.data.setAll([
  { id: "route", pointIds: ["paris", "toronto", "la", "havana"] }
]);

// The plane's color, in a template so the satellite view can change it
var planeTemplate = am5.Template.new({
  fill: root.interfaceColors.get("text") // in the text color, so it shows in light and dark mode
});

// a series with a single point: the plane on the route
var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  name: "Plane Series"
}));

planeSeries.bullets.push(function(root, series, dataItem) {
  var container = am5.Container.new(root, {});

  var plane = container.children.push(am5.Graphics.new(root, {
    // the plane's outline, as an SVG path
    svgPath:
      "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
    scale: 0.06,                            // the path is drawn big; shrink it to 6%
    centerY: am5.p50,                       // centered on its point on the route
    centerX: am5.p50,
    // a soft black shadow on the ground, in light and dark mode
    shadowColor: am5.color(0x000000),
    shadowBlur: 10,
    shadowOffsetX: 4,
    shadowOffsetY: 6,
    shadowOpacity: 0.5
  }, planeTemplate));

  // The plane turns with the route; flip it around when it heads back.
  // The listener goes when the plane does.
  var prevPosition;
  plane.addDisposer(dataItem.on("positionOnLine", function(value) {
    if (prevPosition < value) {
      plane.set("rotation", 0);    // heading forward
    }
    if (prevPosition > value) {
      plane.set("rotation", -180); // turned around
    }
    prevPosition = value;
  }));

  return am5.Bullet.new(root, { sprite: container });
});

// the plane sits on the start of the route
planeSeries.data.setAll([
  // autoRotate turns the plane along the line
  { id: "plane", lineId: "route", positionOnLine: 0, autoRotate: true }
]);

// Fly back and forth along the route
planeSeries.getDataItemById("plane").animate({
  key: "positionOnLine",
  to: 1, // to the end of the route...
  duration: 10000, // ...and back, in 10 seconds
  loops: Infinity, // over and over
  easing: am5.ease.yoyo(am5.ease.linear) // out and back at a steady speed
});

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // 12px text
  fill: am5.color(0xffffff), // white, over the dark picture
  fillOpacity: 0.6,
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...measured from the label's right end...
  dx: -10,                   // ...10px in from it
  y: 10,                     // 10px from the top
  visible: false             // shown with the satellite view only
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines,
// the route and the plane turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    // NASA's 2048px picture of the Earth
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0); // the near-black space behind the map
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  lineSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  planeTemplate.set("fill", visible ? am5.color(0xffffff) : root.interfaceColors.get("text"));
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
