---
title: "Solar Eclipse Map"
source: "https://www.amcharts.com/demos/solar-eclipse-map/"
category: "maps"
scraped: "2026-09-29"
---

See the Path of the 2027 Total Solar Eclipse
Follow the August 2, 2027 total solar eclipse as it crosses southern Spain, North Africa and the Middle East on an interactive globe, with over six minutes of totality near Luxor, Egypt. Want a different view? Use the switch in the top-left corner to change from globe to map.
Reminder: Don’t look directly at the Sun! Use eclipse glasses or other safe solar viewers to protect your eyes.
Eclipse path data: Eclipse Predictions by Fred Espenak, NASA's GSFC.
Explore every solar eclipse from 2024 to 2100
Our Solar Eclipse Map on DataViz Dojo shows total, annular and hybrid eclipses with animated shadow paths, city visibility and video export.
Open the Solar Eclipse Map →

## JavaScript

```javascript
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

function toDegrees(radians) {
  return radians * 180 / Math.PI;
}

function offsetPoint(lat, lon, distanceMeters, bearingDegrees) {
  const R = 6371000; // Earth radius in meters
  const δ = distanceMeters / R;
  const θ = toRadians(bearingDegrees);

  const φ1 = toRadians(lat);
  const λ1 = toRadians(lon);

  const φ2 = Math.asin(
    Math.sin(φ1) * Math.cos(δ) +
    Math.cos(φ1) * Math.sin(δ) * Math.cos(θ)
  );

  const λ2 = λ1 + Math.atan2(
    Math.sin(θ) * Math.sin(δ) * Math.cos(φ1),
    Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2)
  );

  return [toDegrees(λ2), toDegrees(φ2)];
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

function calculateEclipsePath(centralLine, pathWidthMeters) {
  const halfWidth = pathWidthMeters / 2;
  const northPoints = [];
  const southPoints = [];

  let bearing = 0;

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

  const polygon = [...southPoints, ...northPoints.reverse(), southPoints[0]];
  return polygon;
}

// MAIN: extend line at start and end
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

// Example usage:
const centralLine = [[-44.4767, 27.9617], [-36.2333, 30.4883], [-30.09, 32.1183], [-25.9033, 33.085], [-22.5183, 33.77], [-19.6017, 34.2883], [-17.0033, 34.6883], [-14.64, 35.0017], [-12.46, 35.2433], [-10.43, 35.4283], [-8.52167, 35.565], [-6.72167, 35.66], [-5.01, 35.7183], [-3.38167, 35.7433], [-1.82333, 35.7383], [-0.33, 35.7083], [1.105, 35.6517], [2.48667, 35.575], [3.81833, 35.4767], [5.105, 35.36], [6.35, 35.225], [7.555, 35.0733], [8.725, 34.905], [9.85833, 34.7233], [10.96, 34.5267], [12.0317, 34.3183], [13.075, 34.0967], [14.09, 33.8633], [15.08, 33.6183], [16.045, 33.3617], [16.9867, 33.0967], [17.9067, 32.82], [18.805, 32.535], [19.6833, 32.24], [20.5433, 31.9367], [21.385, 31.6233], [22.2083, 31.3033], [23.0167, 30.975], [23.8083, 30.6383], [24.585, 30.295], [25.3467, 29.9433], [26.0967, 29.585], [26.8317, 29.22], [27.5567, 28.8483], [28.2683, 28.4683], [28.97, 28.0833], [29.66, 27.6917], [30.3417, 27.2933], [31.0133, 26.8883], [31.6767, 26.4783], [32.3333, 26.0617], [32.98, 25.6383], [33.6217, 25.21], [34.2567, 24.775], [34.885, 24.335], [35.5083, 23.8883], [36.1267, 23.4367], [36.7417, 22.9783], [37.3517, 22.5133], [37.9583, 22.0433], [38.5633, 21.5667], [39.1667, 21.085], [39.7683, 20.5967], [40.37, 20.1017], [40.97, 19.6017], [41.5717, 19.095], [42.1733, 18.5817], [42.7767, 18.0617], [43.3833, 17.5333], [43.9933, 17], [44.6067, 16.46], [45.225, 15.9117], [45.85, 15.3567], [46.48, 14.7933], [47.1183, 14.2217], [47.765, 13.6433], [48.4217, 13.055], [49.09, 12.4583], [49.7683, 11.8517], [50.4617, 11.235], [51.1717, 10.61], [51.8967, 9.97167], [52.6417, 9.32333], [53.4067, 8.66167], [54.1967, 7.98833], [55.0133, 7.3], [55.8583, 6.595], [56.7367, 5.87667], [57.6517, 5.13833], [58.61, 4.38167], [59.615, 3.60167], [60.6767, 2.79833], [61.8033, 1.96833], [63.005, 1.10833], [64.295, 0.21], [65.695, -0.72833], [67.2267, -1.71833], [68.9317, -2.77167], [70.86, -3.90667], [73.1083, -5.155], [75.8517, -6.575], [79.52, -8.30667], [90.4417, -12.4833]];

const width = 259000; // max path width of the 2 Aug 2027 eclipse (259 km)
let extendWidth = 259000;

const extendedCentralLine = extendCentralLine(centralLine, width);
const eclipsePolygon = calculateEclipsePath(extendedCentralLine, width);

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


var myTheme = am5.Theme.new(root);

myTheme.rule("InterfaceColors").setAll({
  primaryButton: am5.color(0xc83830),
  primaryButtonHover: am5.Color.lighten(am5.color(0xc83830), 0.2),
  primaryButtonDown: am5.Color.lighten(am5.color(0xc83830), -0.2),
  primaryButtonActive: am5.color(0xd9cec8),
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
  projection: am5map.geoOrthographic(),
  paddingBottom: 20,
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20
}));


var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: 20,
  y: 40
}));

// Add labels and controls
cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Globe"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

switchButton.on("active", function () {
  if (switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    chart.set("panY", "translateY");
    chart.animate({ key: "rotationY", to: 0, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    chart.animate({ key: "rotationX", to: 0, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
  } else {
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panY", "rotateY")
    chart.animate({ key: "rotationY", to: -25, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    chart.animate({ key: "rotationX", to: -20, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
  }
});

cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Map"
  })
);


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true,
  fill: am5.color(0xd9d9d9),
  stroke: am5.color(0xffffff),
  strokeWidth: 0.75,
  strokeOpacity: 1
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover")
});

polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonHover")
});


// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.1,
  strokeOpacity: 0
});
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

var graticuleSeries = chart.series.unshift(
  am5map.GraticuleSeries.new(root, {
    step: 10
  })
);

graticuleSeries.mapLines.template.set("strokeOpacity", 0.1)

// Set up events
var previousPolygon;

polygonSeries.mapPolygons.template.on("active", function (active, target) {
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

//var geoData = {"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[75.10,108.418],[64.34,21.46],[40.39,3.18]]]}}
var pathSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {

}));

pathSeries.mapPolygons.template.setAll({
  fill: am5.color(0xc83830),
  fillOpacity: 0.18,
  strokeOpacity: 0
});



pathSeries.data.push({
  geometry: { "type": "Polygon", "coordinates": [eclipsePolygon] }
})

// make more polygons, width increasing from 0 to 6000 km
var count = 3;
for (var i = 1; i < count; i++) {
  let pathWidth = 1000000 * (i + 1) / count;
  let extendedCentralLine = extendCentralLine(centralLine, width);
  let eclipsePolygon = calculateEclipsePath(extendedCentralLine, pathWidth);

  pathSeries.data.push({
    geometry: { "type": "Polygon", "coordinates": [eclipsePolygon] }
  });
}

var shadowSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {

}));

// Uncomment this to pre-center the globe on a country when it loads
//polygonSeries.events.on("datavalidated", function() {
//  selectCountry("AU");
//});


// Make stuff animate on load
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
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
