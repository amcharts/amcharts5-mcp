---
title: "Solar Eclipse Map"
source: "https://www.amcharts.com/demos/solar-eclipse-map/"
category: "maps"
scraped: "2026-10-08"
---

The path of the total solar eclipse of August 2, 2027, on a globe: a band up to 259 km wide where the Moon covers the whole Sun, from the Atlantic across North Africa and Arabia to the Indian Ocean.

Drawing a path on the globe: The data is only the eclipse's central line, a list of points. The code widens it into a polygon by stepping half the path's width to each side of every point, along the curve of the Earth, so the band follows any projection, globe or flat. Two wider, lighter bands around it soften its edges.

Good for:
- Eclipse paths and other events that cross the map
- Storm tracks, flight corridors, coverage areas
- Science and education pages

Think twice when:
- When totality arrives along the path: add times as labels
- Local detail: zoom in, or use a country map
- Exact edges: real paths vary in width, use published outlines

Prompt: Create a globe that shows the path of totality of the total solar eclipse of August 2, 2027, as a band drawn around its central line, with two wider, fainter bands around it. Clicking a country turns the globe to center it. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// The path of totality of the total solar eclipse of August 2, 2027: the
// central line comes as points [longitude, latitude], and the functions below
// widen it into a band.

// Helpers for working on a sphere
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

// The point a given distance away from another, in a given direction
function offsetPoint(lat, lon, distanceMeters, bearingDegrees) {
  const R = 6371000; // Earth radius in meters
  const δ = distanceMeters / R;        // the distance as an angle at the Earth's center
  const θ = toRadians(bearingDegrees); // the direction, in radians

  const φ1 = toRadians(lat); // latitude...
  const λ1 = toRadians(lon); // ...and longitude, in radians

  // the new point's latitude and longitude, by the great-circle formulas
  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) +
    Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  const λ2 = λ1 + Math.atan2(
    Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
  );

  return [toDegrees(λ2), toDegrees(φ2)]; // longitude first, as GeoJSON wants it
}

// Helper to compute bearing between two lon/lat pairs
function calculateBearing(lon1, lat1, lon2, lat2) {
  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  return (toDegrees(Math.atan2(y, x)) + 360) % 360;
}

// A band of the given width around the central line, as a polygon
function calculateEclipsePath(centralLine, pathWidthMeters) {
  const halfWidth = pathWidthMeters / 2; // the band reaches half the width out on each side
  const northPoints = [];
  const southPoints = [];

  let bearing = 0;

  // for every point of the line, a point half the width out on either side of it
  for (let i = 0; i < centralLine.length; i++) {
    const [lon, lat] = centralLine[i];

    if (i < centralLine.length - 1) {
      const [nextLon, nextLat] = centralLine[i + 1];
      bearing = calculateBearing(lon, lat, nextLon, nextLat);
    }
    // else keep previous bearing

    const north = offsetPoint(lat, lon, halfWidth, (bearing + 90) % 360);
    const south = offsetPoint(lat, lon, halfWidth, (bearing + 270) % 360);

    northPoints.push(north);
    southPoints.push(south);
  }

  // along one side, back along the other, and closed at the starting point
  const polygon = [...southPoints, ...northPoints.reverse(), southPoints[0]];
  return polygon;
}

// Extend the line by half the width at both ends, so the band gets round-ish ends
function extendCentralLine(centralLine, pathWidthMeters) {
  const halfWidth = pathWidthMeters / 2;
  const first = centralLine[0];
  const second = centralLine[1];
  const last = centralLine[centralLine.length - 1];
  const secondLast = centralLine[centralLine.length - 2];

  const startBearing = calculateBearing(first[0], first[1], second[0], second[1]);
  const endBearing = calculateBearing(secondLast[0], secondLast[1], last[0], last[1]);

  // Extend backward from first point
  const startExtension = offsetPoint(first[1], first[0], -halfWidth, startBearing);
  // Extend forward from last point
  const endExtension = offsetPoint(last[1], last[0], halfWidth, endBearing);

  // Prepend and append extended points
  const extendedCentralLine = [
    [startExtension[0], startExtension[1]],
    ...centralLine,
    [endExtension[0], endExtension[1]]
  ];

  return extendedCentralLine;
}

// The central line of the eclipse
const centralLine = [[-44.4767, 27.9617], [-36.2333, 30.4883], [-30.09, 32.1183], [-25.9033, 33.085], [-22.5183, 33.77], [-19.6017, 34.2883], [-17.0033, 34.6883], [-14.64, 35.0017], [-12.46, 35.2433], [-10.43, 35.4283], [-8.52167, 35.565], [-6.72167, 35.66], [-5.01, 35.7183], [-3.38167, 35.7433], [-1.82333, 35.7383], [-0.33, 35.7083], [1.105, 35.6517], [2.48667, 35.575], [3.81833, 35.4767], [5.105, 35.36], [6.35, 35.225], [7.555, 35.0733], [8.725, 34.905], [9.85833, 34.7233], [10.96, 34.5267], [12.0317, 34.3183], [13.075, 34.0967], [14.09, 33.8633], [15.08, 33.6183], [16.045, 33.3617], [16.9867, 33.0967], [17.9067, 32.82], [18.805, 32.535], [19.6833, 32.24], [20.5433, 31.9367], [21.385, 31.6233], [22.2083, 31.3033], [23.0167, 30.975], [23.8083, 30.6383], [24.585, 30.295], [25.3467, 29.9433], [26.0967, 29.585], [26.8317, 29.22], [27.5567, 28.8483], [28.2683, 28.4683], [28.97, 28.0833], [29.66, 27.6917], [30.3417, 27.2933], [31.0133, 26.8883], [31.6767, 26.4783], [32.3333, 26.0617], [32.98, 25.6383], [33.6217, 25.21], [34.2567, 24.775], [34.885, 24.335], [35.5083, 23.8883], [36.1267, 23.4367], [36.7417, 22.9783], [37.3517, 22.5133], [37.9583, 22.0433], [38.5633, 21.5667], [39.1667, 21.085], [39.7683, 20.5967], [40.37, 20.1017], [40.97, 19.6017], [41.5717, 19.095], [42.1733, 18.5817], [42.7767, 18.0617], [43.3833, 17.5333], [43.9933, 17], [44.6067, 16.46], [45.225, 15.9117], [45.85, 15.3567], [46.48, 14.7933], [47.1183, 14.2217], [47.765, 13.6433], [48.4217, 13.055], [49.09, 12.4583], [49.7683, 11.8517], [50.4617, 11.235], [51.1717, 10.61], [51.8967, 9.97167], [52.6417, 9.32333], [53.4067, 8.66167], [54.1967, 7.98833], [55.0133, 7.3], [55.8583, 6.595], [56.7367, 5.87667], [57.6517, 5.13833], [58.61, 4.38167], [59.615, 3.60167], [60.6767, 2.79833], [61.8033, 1.96833], [63.005, 1.10833], [64.295, 0.21], [65.695, -0.72833], [67.2267, -1.71833], [68.9317, -2.77167], [70.86, -3.90667], [73.1083, -5.155], [75.8517, -6.575], [79.52, -8.30667], [90.4417, -12.4833]];

const width = 259000; // the widest the path of totality gets: 259 km

const extendedCentralLine = extendCentralLine(centralLine, width);
const eclipsePolygon = calculateEclipsePath(extendedCentralLine, width);

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme: the path and the buttons in its first color
var colors = am5.ColorSet.new(root, {});
var mainColor = colors.getIndex(0);

// Buttons and switches in the main color
root.interfaceColors.setAll({
  primaryButton: mainColor,
  primaryButtonHover: am5.Color.lighten(mainColor, 0.2), // a little lighter under the pointer
  primaryButtonDown: am5.Color.lighten(mainColor, -0.2), // darker while pressed
  primaryButtonActive: am5.Color.lighten(mainColor, 0.7) // much lighter when switched on
});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // transparent until the satellite picture shows
  }),
  minZoomLevel: 0.5, // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX",                      // a sideways drag spins the globe
  panY: "rotateY",                      // an up or down drag tilts it
  projection: am5map.geoOrthographic(), // a globe, seen from space
  paddingBottom: 20,                    // 20px of space around the globe on each side
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20
}));

// Zoom control, in the buttons' main color
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// What the map shows
var title = chart.children.push(am5.Label.new(root, {
  text: "Path of totality, August 2, 2027",
  x: am5.p100,       // at the chart's right edge...
  centerX: am5.p100, // ...lined up by the label's own right side
  dx: -20,           // 20px in from the edge
  y: 40,             // 40px from the top...
  centerY: am5.p50   // ...to the label's middle
}));

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  affectsBounds: false // the map fits the countries, not this rectangle around the whole world
}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's text color: works in light and dark
  fillOpacity: 0.1, // a faint tint for the ocean
  strokeOpacity: 0  // no outline
});

// one polygon that covers the whole Earth: the ocean
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10 // grid lines every 10 degrees
}));

graticuleSeries.mapLines.template.set("strokeOpacity", 0.1); // faint grid lines

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // country shapes from the low-detail world map
}));

// Gray countries, a shade off the background in light and dark mode alike
polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // hover a country for its name
  toggleKey: "active",   // a click switches the country's "active" state on and off
  interactive: true,     // the countries react to the pointer
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.15,
  stroke: root.interfaceColors.get("background"), // borders in the background color...
  strokeWidth: 0.75,     // ...thin...
  strokeOpacity: 1       // ...and solid
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fillOpacity: 0.3 // a darker gray under the pointer
});

// The country that was clicked stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonHover"),
  fillOpacity: 0.8
});

// Turn the globe to the country that was clicked
var previousPolygon; // the country clicked before, to switch it off

polygonSeries.mapPolygons.template.on("active", function (active, target) {
  if (previousPolygon && previousPolygon != target) {
    previousPolygon.set("active", false); // only one country stays active at a time
  }
  if (target.get("active")) {
    selectCountry(target.dataItem.get("id"));
  }
  previousPolygon = target;
});

// animates the globe round to a country's center
function selectCountry(id) {
  var dataItem = polygonSeries.getDataItemById(id);
  var target = dataItem.get("mapPolygon");
  if (target) {
    var centroid = target.geoCentroid(); // the country's center, as longitude and latitude
    if (centroid) {
      // turning the globe by minus the longitude and latitude brings that point to the center
      chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
      // only the globe turns up or down: on a flat map that would slant it
      if (chart.get("panY") == "rotateY") {
        chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
      }
    }
  }
}

// Create polygon series for the path of totality
var pathSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

pathSeries.mapPolygons.template.setAll({
  fill: mainColor,   // in the theme's first color...
  fillOpacity: 0.18, // ...see-through, so the land shows
  strokeOpacity: 0   // no outline
});

// the band, worked out by the functions at the top, as a GeoJSON polygon
pathSeries.data.push({
  geometry: { "type": "Polygon", "coordinates": [eclipsePolygon] }
});

// Two wider, see-through bands around the path (667 and 1,000 km) soften its
// edges: where they overlap the path, it shows darker
var count = 3;
for (var i = 1; i < count; i++) {
  let pathWidth = 1000000 * (i + 1) / count;
  let extendedCentralLine = extendCentralLine(centralLine, width);
  let eclipsePolygon = calculateEclipsePath(extendedCentralLine, pathWidth);

  pathSeries.data.push({
    geometry: { "type": "Polygon", "coordinates": [eclipsePolygon] }
  });
}

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small print
  fill: am5.color(0xffffff), // white, over the dark picture
  fillOpacity: 0.6,          // a little see-through
  x: 10,                     // 10px from the left edge
  y: am5.p100,               // at the chart's bottom...
  centerY: am5.p100,         // ...lined up by the label's own bottom
  dy: -10,                   // 10px up from the edge
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// Hovered and active countries: their own look on the map, only a bright outline over the satellite picture
var outlineLook = { fillOpacity: 0, strokeOpacity: 1, strokeWidth: 2 };
var hoverState = landTemplate.states.lookup("hover");
var hoverLook = stateLook(hoverState);
var activeState = landTemplate.states.lookup("active");
var activeLook = stateLook(activeState);

// the settings of a state that the outline changes, as they are on the map
function stateLook(state) {
  return {
    fillOpacity: state.get("fillOpacity", landLook.fillOpacity),
    strokeOpacity: state.get("strokeOpacity", landLook.strokeOpacity),
    strokeWidth: state.get("strokeWidth", landTemplate.get("strokeWidth", 1))
  };
}

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  title.set("fill", visible ? am5.color(0xffffff) : root.interfaceColors.get("text"));
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  var look = visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook;
  landTemplate.setAll(look);
  hoverState.setAll(visible ? outlineLook : hoverLook);
  activeState.setAll(visible ? outlineLook : activeLook);
  // a country hovered before kept the look it had then as its own and as its default one: give it the new look
  polygonSeries.mapPolygons.each(function (polygon) {
    var defaultState = polygon.states.lookup("default");
    if (defaultState) {
      defaultState.setAll(look);
    }
    polygon.setAll(polygon.get("active") ? (visible ? outlineLook : activeLook) : look);
  });
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
});

// Make stuff animate on load, then tilt the globe towards the path
chart.appear(1000, 100);
chart.animate({ key: "rotationY", to: -25, duration: 2500, easing: am5.ease.inOut(am5.ease.cubic) });
chart.animate({ key: "rotationX", to: -20, duration: 2500, easing: am5.ease.inOut(am5.ease.cubic) });
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
