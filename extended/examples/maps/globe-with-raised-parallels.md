---
title: "Globe with Raised Parallels"
source: "https://www.amcharts.com/demos/globe-with-raised-parallels/"
category: "maps"
scraped: "2026-10-18"
---

The Earth drawn with nothing but its parallels, one every 1.5 degrees. Over the sea they lie flat on the globe; over land they rise by the real height of the ground, 200 times exaggerated, so mountains and ice sheets stand out.

Lines that carry their own heights: Set altitude on a map line, even to 0, and each of its points can carry a height of its own: a third value after longitude and latitude, in metres. Here every parallel is cut into pieces, flat ones over the sea and raised ones over land, with a point every degree at the ground's height. On a globe the raised lines rise past its edge and hide behind it, so the relief reads as 3D. The code leaves out points that add nothing and caps the frame rate, as every raised point is redrawn while the globe turns. The heights come from NOAA's ETOPO1 Global Relief Model (Amante and Eakins, 2009; public domain), averaged over cells 1.5° high and 1° wide.

Good for:
- Elevation, depth or any value measured along lines
- A striking globe that opens a landing page
- Profiles along routes, rivers or borders

Think twice when:
- Reading exact heights: a profile chart or a colored map is clearer
- Slow devices: thousands of raised points are redrawn as the globe turns
- Values by country: color the countries instead

Prompt: Create a slowly turning globe drawn only by its parallels, one every 1.5 degrees, with no country shapes. Take the heights from https://www.amcharts.com/static/demo-data/relief-parallels.js, which sets reliefParallels: NOAA ETOPO1 elevation, one row per parallel from 84°N to 84°S, 360 heights in metres each (the sea as 0). Each parallel lies flat on the globe over the sea and rises over land by the real elevation, exaggerated 200 times, drawn as map lines whose points carry their own heights. Color the land lines by height band in the theme's colors, 2px wide, keep the sea lines faint (a quarter opaque), credit the data, and let the globe be dragged and zoomed. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// At most 30 frames a second: plenty for a slow turn, and it leaves the browser time for the rest of the page,
// as every turn redraws thousands of raised points
// https://docs.amcharts.com/v5/getting-started/root-element/#performance
root.fps = 30;

// The land's heights along the parallels, from relief-parallels.js, loaded before this code: NOAA's ETOPO1 relief
// model averaged every 1.5° of latitude and 1° of longitude. rows run north to south, from 84°N to 84°S; each holds
// 360 heights in metres, one per degree of longitude eastward from 180°W, with the sea as 0
var relief = reliefParallels;

// How the lines are drawn
var heightScale = 200; // heights drawn 200 times their real size: true to scale, the Himalayas would be a hair
var speed = 4;         // the globe turns 4° a second, once round in 90 seconds
// degrees between the parallels drawn: every one in the data, 1.5° apart, or every other one on a small screen,
// where they would crowd together
var lineSpacing = root.dom.offsetWidth < 600 ? 3 : 1.5;

// Height bands, highest last: each gets a line of its own, in its own color
var bands = [
  { name: "Up to 500 m", from: 0 },
  { name: "500 to 2,000 m", from: 500 },
  { name: "Over 2,000 m", from: 2000 }
];

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoOrthographic(), // a globe, seen from space
  panX: "rotateX",                      // a sideways drag spins the globe
  panY: "rotateY",                      // an up or down drag tilts it
  rotationX: -20,                       // start over Europe and Africa, at longitude 20°E...
  rotationY: -25,                       // ...seen from 25°N, as most of the land is in the north
  // a little smaller than the space, for the mountains that rise past the globe's edge
  zoomLevel: 0.85,
  homeZoomLevel: 0.85,
  autoHome: true,                       // go to the home view once the map is fitted
  minZoomLevel: 0.5                     // zoom out to half the fitted size at most
}));

// The whole globe as one polygon, never seen: a map of lines alone has no outline to fit, so the map is fitted
// to this
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/#background-polygon
var globeSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  opacity: 0 // invisible
}));

globeSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// The sea: where a parallel crosses water, it lies flat on the globe. All of it is one line, in a grey between
// the background and the text color, so it suits light and dark themes
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var seaColor = am5.Color.interpolate(0.2, root.interfaceColors.get("background"), root.interfaceColors.get("alternativeBackground"));

var seaSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  name: "Sea",
  stroke: seaColor,     // the line's color
  affectsBounds: false  // the lines take no part in fitting the map
}));

// faint, a quarter opaque, so the land stands out
seaSeries.mapLines.template.set("strokeOpacity", 0.25);

// The land: a line per height band, in the theme's colors, raised off the globe by the heights its points carry
// the theme's first color for the lowest land and its sixth for the highest, far apart in its color set, and a blend
// halfway between them for the middle band, so the bands follow the theme and stay apart in any of them
var colors = am5.ColorSet.new(root, {});
var lowColor = colors.getIndex(0);
var highColor = colors.getIndex(5);

var landSeries = bands.map(function(band, i) {
  var color = am5.Color.interpolate(i / (bands.length - 1), lowColor, highColor);
  var series = chart.series.push(am5map.MapLineSeries.new(root, {
    name: band.name,
    stroke: color,        // the line's color
    affectsBounds: false  // the lines take no part in fitting the map
  }));
  series.mapLines.template.setAll({
    // altitude 0: the line has no arc of its own, and each point's third value, [longitude, latitude, metres],
    // raises it there. Lines without altitude stay on the surface, whatever their points hold
    altitude: 0,
    strokeWidth: 2 // twice as thick as the sea's
  });
  return series;
});

// The band a height falls in
function bandOf(height) {
  var n = 0;
  while (n < bands.length - 1 && height >= bands[n + 1].from) {
    n++;
  }
  return n;
}

// Leave out the points of a raised piece that add nothing, as the globe redraws every point each time it turns.
// A point stays where its drawn height is more than 30 km off the straight run between the points kept on either
// side (the Douglas-Peucker method), about a pixel on this globe; and no two points are more than 5° apart, as
// the line runs the shortest way between them, not along the parallel
var tolerance = 30000; // metres, as drawn
function simplify(points) {
  var keep = points.map(function() { return false; });
  keep[0] = keep[points.length - 1] = true; // the ends always stay

  // the points between a and b: keep the one farthest off the straight run, and look again on each side of it
  function split(a, b) {
    if (b - a < 2) {
      return;
    }
    var farthest = -1, at = a;
    for (var j = a + 1; j < b; j++) {
      var straight = points[a][2] + (points[b][2] - points[a][2]) * (j - a) / (b - a);
      var off = Math.abs(points[j][2] - straight);
      if (off > farthest) {
        farthest = off;
        at = j;
      }
    }
    if (farthest <= tolerance) {
      if (b - a <= 5) {
        return; // close enough to straight, and short enough
      }
      at = Math.floor((a + b) / 2); // straight but long: halve it
    }
    keep[at] = true;
    split(a, at);
    split(at, b);
  }

  split(0, points.length - 1);
  return points.filter(function(point, j) { return keep[j]; });
}

// Draw the parallels. Each one is cut where it goes from sea to land or from one height band to the next, and
// the pieces go to the line of their kind. A leg, one degree of longitude, is sea when both its ends are;
// otherwise it takes the band of its higher end
function drawLines() {
  var sea = [];
  var land = bands.map(function() { return []; });
  var equator = relief.north / relief.step;         // the row of the equator
  var every = Math.round(lineSpacing / relief.step); // 1: every row, 2: every other row...

  relief.rows.forEach(function(row, i) {
    // the rows lineSpacing apart, counted from the equator, so the equator is always drawn
    if ((i - equator) % every !== 0) {
      return;
    }
    var latitude = relief.north - i * relief.step;

    // what each leg is: -1 for sea, or the land's height band. The last leg ends at 180°, where the first began
    var legs = [];
    for (var k = 0; k < 360; k++) {
      var a = row[k], b = row[(k + 1) % 360];
      legs.push(a || b ? bandOf(Math.max(a, b)) : -1);
    }

    // a point of the parallel, k degrees east of 180°W: on land with its height, drawn heightScale times taller
    function point(k, kind) {
      return kind < 0 ? [k - 180, latitude] : [k - 180, latitude, row[k % 360] * heightScale];
    }

    var piece;
    for (k = 0; k < 360; k++) {
      // a new piece where the kind changes
      if (k === 0 || legs[k] !== legs[k - 1]) {
        piece = [point(k, legs[k])];
        (legs[k] < 0 ? sea : land[legs[k]]).push(piece);
      }
      // the leg's end. Land gets a point every degree, for its shape; flat sea only every 5° and where it ends,
      // which keeps it on the parallel, as the line runs the shortest way between its points
      if (legs[k] >= 0 || (k + 1) % 5 === 0 || legs[k + 1] !== legs[k]) {
        piece.push(point(k + 1, legs[k]));
      }
    }
  });

  // each series is one line of many pieces; the raised ones lose the points they don't need
  seaSeries.data.setAll([{ geometry: { type: "MultiLineString", coordinates: sea } }]);
  landSeries.forEach(function(series, n) {
    series.data.setAll([{ geometry: { type: "MultiLineString", coordinates: land[n].map(simplify) } }]);
  });
}

drawLines();

// The globe turns on its own: rotationX goes once round in 360 / speed seconds, again and again (loops: 0). Set as
// the chart's animations, so a saved JSON config keeps it
// https://docs.amcharts.com/v5/concepts/animations/
function spin() {
  var from = chart.get("rotationX", 0);
  chart.set("animations", [{
    key: "rotationX",
    from: from,
    to: from + 360,
    duration: 360000 / speed, // (at 0° a second, an endless turn: the globe stays where it is)
    loops: 0
  }]);
}

spin();

// A drag turns the globe itself, which stops the spin: let go, and it turns on from there
chart.chartContainer.events.on("globalpointerup", spin);

// Credit the heights' source, in small print under the globe
root.container.set("layout", root.verticalLayout); // the globe, then the credit, one under the other

root.container.children.push(am5.Label.new(root, {
  text: "Heights: NOAA ETOPO1 Global Relief Model",
  fontSize: 11,     // small print...
  fillOpacity: 0.6, // ...a little faded
  x: am5.p50,       // the label's middle...
  centerX: am5.p50  // ...at the middle of the chart
}));

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://www.amcharts.com/static/demo-data/relief-parallels.js
