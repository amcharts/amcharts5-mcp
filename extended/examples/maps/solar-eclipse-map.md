---
title: "Solar Eclipse Map"
source: "https://www.amcharts.com/demos/solar-eclipse-map/"
category: "maps"
scraped: "2026-03-15"
---

See the Path of the 2026 Total Solar Eclipse
Follow the August 12, 2026 solar eclipse as it moves across the world on an interactive globe. Want a different view? Use the switch in the top-left corner to change from globe to map.
Reminder: Don’t look directly at the Sun! Use eclipse glasses or other safe solar viewers to protect your eyes.

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
const centralLine = [[113.5, 75.14005], [114.0, 76.38297], [110.0, 83.7025], [109.5, 83.90157], [109.0, 84.08367], [108.5, 84.2513], [108.0, 84.40643], [107.5, 84.55064], [107.0, 84.68523], [106.5, 84.81127], [106.0, 84.92966], [105.5, 85.04117], [105.0, 85.14644], [104.5, 85.24605], [104.0, 85.34048], [103.5, 85.43016], [103.0, 85.51548], [102.5, 85.59677], [102.0, 85.67433], [101.5, 85.74842], [101.0, 85.81928], [100.5, 85.88714], [100.0, 85.95218], [99.5, 86.01458], [99.0, 86.07451], [98.5, 86.13212], [98.0, 86.18753], [97.5, 86.24087], [97.0, 86.29226], [96.5, 86.3418], [96.0, 86.38958], [95.5, 86.43571], [95.0, 86.48026], [94.5, 86.5233], [94.0, 86.56492], [93.5, 86.60517], [93.0, 86.64413], [92.5, 86.68184], [92.0, 86.71837], [91.5, 86.75376], [91.0, 86.78806], [90.5, 86.82133], [90.0, 86.8536], [89.5, 86.8849], [89.0, 86.91529], [88.5, 86.94479], [88.0, 86.97345], [87.5, 87.00128], [87.0, 87.02832], [86.5, 87.0546], [86.0, 87.08015], [85.5, 87.10499], [85.0, 87.12915], [84.5, 87.15265], [84.0, 87.17551], [83.5, 87.19775], [83.0, 87.21939], [82.5, 87.24046], [82.0, 87.26096], [81.5, 87.28092], [81.0, 87.30036], [80.5, 87.31928], [80.0, 87.33771], [79.5, 87.35566], [79.0, 87.37313], [78.5, 87.39016], [78.0, 87.40674], [77.5, 87.42289], [77.0, 87.43862], [76.5, 87.45394], [76.0, 87.46886], [75.5, 87.4834], [75.0, 87.49756], [74.5, 87.51135], [74.0, 87.52478], [73.5, 87.53786], [73.0, 87.5506], [72.5, 87.563], [72.0, 87.57507], [71.5, 87.58683], [71.0, 87.59827], [70.5, 87.6094], [70.0, 87.62023], [69.5, 87.63078], [69.0, 87.64103], [68.5, 87.651], [68.0, 87.66069], [67.5, 87.67011], [67.0, 87.67927], [66.5, 87.68816], [66.0, 87.6968], [65.5, 87.70518], [65.0, 87.71332], [64.5, 87.72121], [64.0, 87.72886], [63.5, 87.73628], [63.0, 87.74347], [62.5, 87.75042], [62.0, 87.75715], [61.5, 87.76366], [61.0, 87.76995], [60.5, 87.77603], [60.0, 87.78189], [59.5, 87.78754], [59.0, 87.79298], [58.5, 87.79822], [58.0, 87.80325], [57.5, 87.80809], [57.0, 87.81273], [56.5, 87.81717], [56.0, 87.82141], [55.5, 87.82547], [55.0, 87.82933], [54.5, 87.83301], [54.0, 87.8365], [53.5, 87.8398], [53.0, 87.84292], [52.5, 87.84586], [52.0, 87.84862], [51.5, 87.85119], [51.0, 87.85359], [50.5, 87.85581], [50.0, 87.85785], [49.5, 87.85972], [49.0, 87.86141], [48.5, 87.86292], [48.0, 87.86426], [47.5, 87.86543], [47.0, 87.86643], [46.5, 87.86725], [46.0, 87.8679], [45.5, 87.86838], [45.0, 87.86869], [44.5, 87.86883], [44.0, 87.86879], [43.5, 87.86858], [43.0, 87.86821], [42.5, 87.86766], [42.0, 87.86693], [41.5, 87.86604], [41.0, 87.86497], [40.5, 87.86373], [40.0, 87.86232], [39.5, 87.86073], [39.0, 87.85897], [38.5, 87.85703], [38.0, 87.85492], [37.5, 87.85263], [37.0, 87.85016], [36.5, 87.84751], [36.0, 87.84468], [35.5, 87.84167], [35.0, 87.83848], [34.5, 87.8351], [34.0, 87.83154], [33.5, 87.82779], [33.0, 87.82385], [32.5, 87.81972], [32.0, 87.81539], [31.5, 87.81088], [31.0, 87.80616], [30.5, 87.80125], [30.0, 87.79614], [29.5, 87.79082], [29.0, 87.7853], [28.5, 87.77957], [28.0, 87.77362], [27.5, 87.76747], [27.0, 87.7611], [26.5, 87.75451], [26.0, 87.74769], [25.5, 87.74065], [25.0, 87.73339], [24.5, 87.72588], [24.0, 87.71814], [23.5, 87.71017], [23.0, 87.70194], [22.5, 87.69347], [22.0, 87.68474], [21.5, 87.67576], [21.0, 87.66651], [20.5, 87.657], [20.0, 87.64721], [19.5, 87.63715], [19.0, 87.62681], [18.5, 87.61617], [18.0, 87.60524], [17.5, 87.59401], [17.0, 87.58247], [16.5, 87.57062], [16.0, 87.55844], [15.5, 87.54594], [15.0, 87.5331], [14.5, 87.51992], [14.0, 87.50639], [13.5, 87.49249], [13.0, 87.47823], [12.5, 87.46358], [12.0, 87.44855], [11.5, 87.43312], [11.0, 87.41729], [10.5, 87.40103], [10.0, 87.38434], [9.5, 87.3672], [9.0, 87.34962], [8.5, 87.33156], [8.0, 87.31302], [7.5, 87.29399], [7.0, 87.27444], [6.5, 87.25437], [6.0, 87.23375], [5.5, 87.21257], [5.0, 87.19082], [4.5, 87.16847], [4.0, 87.1455], [3.5, 87.1219], [3.0, 87.09764], [2.5, 87.0727], [2.0, 87.04705], [1.5, 87.02067], [1.0, 86.99353], [0.5, 86.96561], [0.0, 86.93688], [-0.5, 86.9073], [-1.0, 86.87684], [-1.5, 86.84547], [-2.0, 86.81315], [-2.5, 86.77984], [-3.0, 86.7455], [-3.5, 86.71009], [-4.0, 86.67356], [-4.5, 86.63585], [-5.0, 86.59693], [-5.5, 86.55673], [-6.0, 86.51519], [-6.5, 86.47225], [-7.0, 86.42783], [-7.5, 86.38188], [-8.0, 86.3343], [-8.5, 86.28502], [-9.0, 86.23394], [-9.5, 86.18097], [-10.0, 86.126], [-10.5, 86.06891], [-11.0, 86.00958], [-11.5, 85.94789], [-12.0, 85.88368], [-12.5, 85.81679], [-13.0, 85.74705], [-13.5, 85.67427], [-14.0, 85.59823], [-14.5, 85.51872], [-15.0, 85.43546], [-15.5, 85.34819], [-16.0, 85.25658], [-16.5, 85.16027], [-17.0, 85.05888], [-17.5, 84.95196], [-18.0, 84.83899], [-18.5, 84.71941], [-19.0, 84.59254], [-19.5, 84.45762], [-20.0, 84.31377], [-20.5, 84.15993], [-21.0, 83.99487], [-21.5, 83.8171], [-22.0, 83.62484], [-22.5, 83.41586], [-23.0, 83.18742], [-23.5, 82.936], [-24.0, 82.65699], [-24.5, 82.34422], [-25.0, 81.98906], [-25.5, 81.57886], [-26.0, 81.09375], [-26.5, 80.49942], [-27.0, 79.72619], [-27.5, 78.5797], [-27.5, 72.10167], [-27.0, 70.12556], [-26.5, 68.54075], [-26.0, 67.15351], [-25.5, 65.89469], [-25.0, 64.73029], [-24.5, 63.64066], [-24.0, 62.61322], [-23.5, 61.6393], [-23.0, 60.71259], [-22.5, 59.82829], [-22.0, 58.98258], [-21.5, 58.17236], [-21.0, 57.39504], [-20.5, 56.64841], [-20.0, 55.93053], [-19.5, 55.23971], [-19.0, 54.57441], [-18.5, 53.93328], [-18.0, 53.31505], [-17.5, 52.71859], [-17.0, 52.14284], [-16.5, 51.58683], [-16.0, 51.04965], [-15.5, 50.53046], [-15.0, 50.02847], [-14.5, 49.54295], [-14.0, 49.07321], [-13.5, 48.61861], [-13.0, 48.17852], [-12.5, 47.75238], [-12.0, 47.33965], [-11.5, 46.93982], [-11.0, 46.55241], [-10.5, 46.17696], [-10.0, 45.81304], [-9.5, 45.46024], [-9.0, 45.11818], [-8.5, 44.78649], [-8.0, 44.46483], [-7.5, 44.15285], [-7.0, 43.85026], [-6.5, 43.55675], [-6.0, 43.27203], [-5.5, 42.99584], [-5.0, 42.72791], [-4.5, 42.46801], [-4.0, 42.2159], [-3.5, 41.97135], [-3.0, 41.73416], [-2.5, 41.50411], [-2.0, 41.28102], [-1.5, 41.0647], [-1.0, 40.85496], [-0.5, 40.65164], [0.0, 40.45458], [0.5, 40.26362], [1.0, 40.0786], [1.5, 39.89939], [2.0, 39.72585], [2.5, 39.55784], [3.0, 39.39523], [3.5, 39.23791], [4.0, 39.08576], [4.5, 38.93866], [5.0, 38.7965]];

const width = 293000; // e.g., 120 km total path width
let extendWidth = 293000;

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
    chart.animate({ key: "rotationX", to: 0, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
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
