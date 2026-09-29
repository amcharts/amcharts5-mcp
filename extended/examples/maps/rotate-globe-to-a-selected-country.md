---
title: "Rotate Globe to a Selected Country"
source: "https://www.amcharts.com/demos/rotate-globe-to-a-selected-country/"
category: "maps"
scraped: "2026-09-29"
---

Spin this 3D globe and click any country: the globe turns smoothly to bring it front and center. While you explore, a plane keeps flying its route around the world, from London to New York, Los Angeles, Tokyo, Singapore, Dubai and back.
Drag to spin the globe in any direction
Click a country to rotate the globe to it, and hover over a country to see its name
Scroll, double-click or use the + and − buttons to zoom (Shift + double-click zooms out)
Drag the green city markers to change the plane's route
Hold Shift and drag to zoom into an area, and use the home button to reset the view
More to explore on DataViz Dojo
Spot the CountryHow fast can you find it? A world map geography quiz with five difficulty levels.
PAC-WORLDThe classic arcade game played on a 3D globe: eat the dots and dodge the ghosts across the continents.
Earthquake MapFive years of earthquakes around the world from USGS data. Pick any day, month or year.
Make it your own
Want your own version of this globe? Click Edit this chart to open it in the amCharts Editor. Change the colors, highlight countries, add pins and labels, or map your own data, then export it or share it with a link. No coding needed.
For developers
This globe is an amCharts 5 MapChart with the orthographic projection (am5map.geoOrthographic()), and panX: "rotateX" with panY: "rotateY" make dragging spin it. Countries use toggleKey: "active", so a click selects them. When a country becomes active, the code deselects the previous one, finds the country's center with geoCentroid() and animates the chart's rotationX and rotationY to it. A GraticuleSeries draws the grid lines, and the dark, grainy background is a GrainPattern fill.
The route is a MapLineSeries that connects the cities of a MapPointSeries by their ids (pointIds). The plane is a point placed on that line with lineId and autoRotate: true, and a looping animation of its positionOnLine flies it around. The city markers are draggable: when one is dragged, chart.invert() turns its position back into latitude and longitude, and the route and the plane follow. The full JavaScript, TypeScript and JSON source is below.
Related demos
Rotating Globe
Zooming to Countries Map
Capitals Map
Map chart
Map polygon series
Map line series
Animations

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Dark buttons to match the dark globe
var myTheme = am5.Theme.new(root);

myTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0x3a3a3a),
  primaryButtonHover: am5.color(0x555555),
  primaryButtonDown: am5.color(0x2a2a2a),
  primaryButtonActive: am5.color(0xe59e24)
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root), myTheme
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "rotateY",
  boxZoom: "shift",
  minZoomLevel: 0.5,
  projection: am5map.geoOrthographic(),
  // Start (and go home) tilted towards the northern hemisphere, where the route runs
  rotationX: 20,
  rotationY: -35,
  homeRotationX: 20,
  homeRotationY: -35,
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20,
  // Dark background with a subtle film-grain texture
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x1a1a1a),
    fillOpacity: 1,
    fillPattern: am5.GrainPattern.new(root, {
      colors: [am5.color(0xe4e4e4)],
      size: 1,
      density: 0.6,
      maxOpacity: 0.07
    })
  })
}));


// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);


// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xe6e6e6),
  fillOpacity: 0.05,
  strokeOpacity: 0
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0xe6e6e6),
  strokeOpacity: 0.06
});


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true,
  fill: am5.color(0x4a4a4a),
  stroke: am5.color(0x1a1a1a),
  strokeWidth: 0.5
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x6a6a6a)
});

// The selected country stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0xe59e24)
});


// Create point series for the cities on the route
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var citySeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

citySeries.bullets.push(function() {
  // Cities can be dragged; the route and the plane follow
  var container = am5.Container.new(root, {
    tooltipText: "{name}",
    draggable: true,
    cursorOverStyle: "move"
  });

  container.events.on("dragged", function(ev) {
    var geoPoint = chart.invert({ x: container.x(), y: container.y() });
    ev.target.dataItem.setAll({
      longitude: geoPoint.longitude,
      latitude: geoPoint.latitude
    });
  });

  // Outer ring
  container.children.push(am5.Circle.new(root, {
    radius: 7,
    fillOpacity: 0,
    stroke: am5.color(0x6e8d34),
    strokeWidth: 2
  }));

  // Dot in the middle
  container.children.push(am5.Circle.new(root, {
    radius: 3,
    fill: am5.color(0x6e8d34)
  }));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

citySeries.data.setAll([
  { id: "london", name: "London", latitude: 51.5074, longitude: -0.1278 },
  { id: "new-york", name: "New York", latitude: 40.7128, longitude: -74.0060 },
  { id: "los-angeles", name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { id: "tokyo", name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { id: "singapore", name: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { id: "dubai", name: "Dubai", latitude: 25.2048, longitude: 55.2708 }
]);


// Create line series for the route around the world
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var routeSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  pointSeries: citySeries
}));

routeSeries.mapLines.template.setAll({
  stroke: am5.color(0xe59e24),
  strokeOpacity: 0.9,
  strokeWidth: 1.5,
  strokeDasharray: [2, 2]
});

// The route connects the cities by their ids and ends where it started
routeSeries.data.setAll([
  { id: "route", pointIds: ["london", "new-york", "los-angeles", "tokyo", "singapore", "dubai", "london"] }
]);


// Create point series for the plane that flies the route
var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

planeSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Graphics.new(root, {
      svgPath: "M28 15h-6.5L14.9 5.2C14.7 4.8 14.2 4.6 13.8 4.6 12.8 4.6 12.2 5.5 12.5 6.4L15.6 15H8.5c0 0 0 0-1.8-2.2C6.5 12.6 6.3 12.4 6 12.4H5.3C4.8 12.4 4.5 12.8 4.6 13.2L5.9 17.6l-1.3 4.4C4.5 22.4 4.8 22.8 5.3 22.8h.8c.3 0 .5-.2.7-.4C8.5 20.2 8.5 20.2 8.5 20.2h7.1l-3.2 8.6C12.2 29.7 12.8 30.6 13.8 30.6c.5 0 .9-.2 1.2-.6L21.5 20.2h6.5c1.4 0 2.6-1.2 2.6-2.6S29.4 15 28 15z",
      scale: 0.7,
      centerX: am5.p50,
      centerY: am5.p50,
      fill: am5.color(0x6e8d34),
      // Shadow on the ground makes the plane look like it's flying above the globe
      shadowColor: am5.color(0x000000),
      shadowBlur: 4,
      shadowOffsetX: 4,
      shadowOffsetY: 6,
      shadowOpacity: 0.7,
      // Fly around the world, over and over
      animations: [{
        target: "dataItem",
        key: "positionOnLine",
        from: 0,
        to: 1,
        duration: 30000,
        loops: 0
      }]
    })
  });
});

// The plane sits on the route and turns to follow it
planeSeries.data.setAll([
  { lineId: "route", positionOnLine: 0, autoRotate: true }
]);


// Rotate the globe to the country that was clicked
var previousPolygon;

polygonSeries.mapPolygons.template.on("active", function(active, target) {
  if (previousPolygon && previousPolygon != target) {
    previousPolygon.set("active", false);
  }
  if (target.get("active")) {
    selectCountry(target.dataItem.get("id"));
  }
  previousPolygon = target;
});

function selectCountry(id) {
  var dataItem = polygonSeries.getDataItemById(id);
  var target = dataItem.get("mapPolygon");
  if (target) {
    var centroid = target.geoCentroid();
    if (centroid) {
      chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
      chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    }
  }
}

// Uncomment this to pre-center the globe on a country when it loads
//polygonSeries.events.on("datavalidated", function() {
//  selectCountry("AU");
//});


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
  max-width: 100%;
}

.single-demo .demo-background{background:#1a1a1a;}
.single-demo .demo-body.extended{background:#1a1a1a;padding:0;border-radius:0;border-top:none;}

```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
