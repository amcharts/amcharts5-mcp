---
title: "Approximate Working Hours Map"
source: "https://www.amcharts.com/demos/approximate-working-hours-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map of where it’s working hours right now: the band between the 9 AM and 5 PM lines stays clear, the rest is shaded, and the sun marks where it’s overhead. The Time slider goes up to a day back or forward.

Mapping a time of day: Shading by the clock shows at a glance where people are at work, which helps when planning calls or launches across the world. This map goes by the sun, not by time zones, so its lines are straight and only roughly match local clocks. For real office hours, color the time zones instead.

Good for:
- Planning calls and launches across the world
- Showing where support teams are at work
- Explaining time differences

Think twice when:
- Exact local times: time zone borders zigzag, so map those
- Daylight saving time: this map ignores it
- Countries that span several hours: label the cities that matter

Prompt: Create a world map that shows where it is roughly working hours (9 AM to 5 PM) right now: work out the sun’s position from the current time, mark it with a pulsing sun, and shade the rest of the world. Use the amCharts 5 library with its Responsive theme.

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

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5, // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX", // dragging sideways turns the globe...
  panY: "rotateY", // ...and dragging up and down tilts it
  // hold Shift and drag a box to zoom into it
  boxZoom:"shift",
  projection: am5map.geoEqualEarth() // the Equal Earth projection
}));

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
// it covers the whole sphere, so it doesn't count when the map is fitted to the countries
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
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
  geoJSON: am5geodata_worldLow // low-detail world countries
}));

// Create point series for Sun icon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var sunSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

// two bullets make the sun: a blurred, pulsing glow and a solid disc drawn over it
sunSeries.bullets.push(function () {
  var circle = am5.Circle.new(root, {
    radius: 18,                // the glow...
    fill: am5.color(0xffba00), // ...in sun yellow...
    filter: "blur(5px)"        // ...with blurred edges
  });

  circle.animate({
    key: "radius",
    duration: 2000, // every 2 seconds...
    to: 23, // ...it grows to 23px and back
    loops: Infinity, // over and over
    easing: am5.ease.yoyo(am5.ease.linear) // out and back at a steady speed
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

sunSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 14, // the solid disc, smaller than the glow
      fill: am5.color(0xffba00)
    })
  });
});

var sunDataItem = sunSeries.pushDataItem({}); // one point for the sun; updateDateNight places it

// Create polygon series that shades the hours outside 9 AM to 5 PM
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var nightSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  affectsBounds: false // the shade doesn't count when the map is fitted
}));

nightSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background...
  fillOpacity: 0.25,                                        // ...at 25%, a light shade
  strokeOpacity: 0           // no outline
});

var nightDataItem = nightSeries.pushDataItem({}); // one shape; updateDateNight draws it

// Create line series for lines at 9 and 17 o'clock
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background
  strokeOpacity: 1,
  strokeDasharray: [2, 2] // dotted lines
});

var nineLine = lineSeries.pushDataItem({}); // the 9 AM line...
var fiveLine = lineSeries.pushDataItem({}); // ...and the 5 PM line, drawn by updateDateNight

// create point series for labels
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

pointSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, { templateField: "labelConfig" }) // settings from each point's labelConfig
  });
});

var ninePoint = pointSeries.pushDataItem({});
ninePoint.dataContext = {
  labelConfig: { text: "9 AM", fontWeight: "600", centerY: am5.p50 } // semi-bold, its left end on the 9 AM line
};

var fivePoint = pointSeries.pushDataItem({});
fivePoint.dataContext = {
  labelConfig: {
    text: "5 PM",
    fontWeight: "600",
    centerX: am5.p100, // its right end on the 5 PM line
    centerY: am5.p50
  }
};

// The time now, once the series are ready: values set on their data items before that do not take
root.events.once("frameended", function () {
  updateDateNight(new Date().getTime());
});

chart.appear(1000, 100);

// place the sun, the shade, the two lines and their labels for a time
function updateDateNight(time) {
  var sunPosition = solarPosition(time); // where the sun is overhead at that time
  sunDataItem.set("longitude", sunPosition.longitude);
  sunDataItem.set("latitude", sunPosition.latitude);

  var nineLongitude = sunPosition.longitude - 15 * 3; // 3 hours from 12 to 9
  var fiveLongitude = sunPosition.longitude + 15 * 5; // 5 hours from 12 to 17
  var max = 89.999; // just short of the poles

  var multipolygon = [];
  // the shade: 10-degree strips from the 9 AM line westward, round the globe to the 5 PM line
  for (var i = nineLongitude; i > fiveLongitude - 360; i = i - 10) {
    multipolygon.push([ // one strip, from pole to pole
      [
        [i - 10, -max],
        [i - 10, 0],
        [i - 10, max],
        [i, max],
        [i, 0],
        [i, -max]
      ]
    ]);
  }

  nightDataItem.set("geometry", { // all the strips as one shape
    type: "MultiPolygon",
    coordinates: multipolygon
  });

  nineLine.set("geometry", { // the 9 AM line from pole to pole
    type: "MultiLineString",
    coordinates: [
      [
        [nineLongitude, max],
        [nineLongitude, -max]
      ]
    ]
  });
  fiveLine.set("geometry", { // the 5 PM line
    type: "MultiLineString",
    coordinates: [
      [
        [fiveLongitude, max],
        [fiveLongitude, -max]
      ]
    ]
  });

  ninePoint.set("longitude", nineLongitude);
  fivePoint.set("longitude", fiveLongitude);

  ninePoint.set("latitude", sunPosition.latitude); // the labels at the sun's latitude, on their lines
  fivePoint.set("latitude", sunPosition.latitude);
}

var offset = new Date().getTimezoneOffset() * 60 * 1000; // the browser's time zone offset in milliseconds

// all sun position calculation is taken from: http://bl.ocks.org/mbostock/4597134
function solarPosition(time) {
  var centuries = (time - Date.UTC(2000, 0, 1, 12)) / 864e5 / 36525; // since J2000
  var longitude = // where it is noon now, before the correction below
    ((am5.time.round(new Date(time), "day", 1).getTime() - time - offset) /
      864e5) *
      360 -
    180;

  return am5map.normalizeGeoPoint({ // keep the point within the map's range
    longitude: longitude - equationOfTime(centuries) * am5.math.DEGREES,
    latitude: solarDeclination(centuries) * am5.math.DEGREES
  });
}

// Equations based on NOAA’s Solar Calculator; all angles in RADIANS.
// http://www.esrl.noaa.gov/gmd/grad/solcalc/

// how far solar time runs ahead of or behind clock time
function equationOfTime(centuries) {
  var e = eccentricityEarthOrbit(centuries),
    m = solarGeometricMeanAnomaly(centuries),
    l = solarGeometricMeanLongitude(centuries),
    y = Math.tan(obliquityCorrection(centuries) / 2);

  y *= y;
  return (
    y * Math.sin(2 * l) -
    2 * e * Math.sin(m) +
    4 * e * y * Math.sin(m) * Math.cos(2 * l) -
    0.5 * y * y * Math.sin(4 * l) -
    1.25 * e * e * Math.sin(2 * m)
  );
}

// the sun's angle north or south of the equator: the latitude it is overhead
function solarDeclination(centuries) {
  return Math.asin(
    Math.sin(obliquityCorrection(centuries)) *
      Math.sin(solarApparentLongitude(centuries))
  );
}

// the sun's position along its yearly path, as seen from the Earth
function solarApparentLongitude(centuries) {
  return (
    solarTrueLongitude(centuries) -
    (0.00569 +
      0.00478 * Math.sin((125.04 - 1934.136 * centuries) * am5.math.RADIANS)) *
      am5.math.RADIANS
  );
}

// the sun's true position along its yearly path
function solarTrueLongitude(centuries) {
  return (
    solarGeometricMeanLongitude(centuries) + solarEquationOfCenter(centuries)
  );
}

// the sun's mean anomaly
function solarGeometricMeanAnomaly(centuries) {
  return (
    (357.52911 + centuries * (35999.05029 - 0.0001537 * centuries)) *
    am5.math.RADIANS
  );
}

// the sun's mean longitude
function solarGeometricMeanLongitude(centuries) {
  var l = (280.46646 + centuries * (36000.76983 + centuries * 0.0003032)) % 360;
  return ((l < 0 ? l + 360 : l) / 180) * Math.PI;
}

// the difference between the sun's true and mean anomaly
function solarEquationOfCenter(centuries) {
  var m = solarGeometricMeanAnomaly(centuries);
  return (
    (Math.sin(m) * (1.914602 - centuries * (0.004817 + 0.000014 * centuries)) +
      Math.sin(m + m) * (0.019993 - 0.000101 * centuries) +
      Math.sin(m + m + m) * 0.000289) *
    am5.math.RADIANS
  );
}

// the tilt of the Earth's axis, corrected
function obliquityCorrection(centuries) {
  return (
    meanObliquityOfEcliptic(centuries) +
    0.00256 *
      Math.cos((125.04 - 1934.136 * centuries) * am5.math.RADIANS) *
      am5.math.RADIANS
  );
}

// the mean tilt of the Earth's axis
function meanObliquityOfEcliptic(centuries) {
  return (
    (23 +
      (26 +
        (21.448 -
          centuries * (46.815 + centuries * (0.00059 - centuries * 0.001813))) /
          60) /
        60) *
    am5.math.RADIANS
  );
}

// how far the Earth's orbit is from a circle
function eccentricityEarthOrbit(centuries) {
  return 0.016708634 - centuries * (0.000042037 + 0.0000001267 * centuries);
}
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px;
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
