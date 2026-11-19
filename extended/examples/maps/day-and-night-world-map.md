---
title: "Day and Night World Map"
source: "https://www.amcharts.com/demos/day-and-night-world-map/"
category: "maps"
scraped: "2026-11-19"
---

A live map of where it is day and where it is night right now, with the city lights on the night side, the twilight in between, and the sun and moon where they stand overhead. Click a country to see whether it is day or night there.

Where it is day and night right now: The map uses NASA’s satellite pictures of the Earth, the sunlit side by day and the city lights at night, and moves on with the clock. The yellow dot marks where the sun is straight overhead, and the moon is drawn in its current phase. Click a country to see its flag and whether it is day, twilight or night there, or turn on Country names to label the countries.

Drag the Time slider to move up to a day either way, or press its play button to watch the night sweep across the map. Pick a date to see any other day. Around the June solstice, for example, the Arctic stays in daylight all day long. Globe shows the same on a 3D globe.

To make your own version, open it in Chart Maker and change it without code, or copy the code below.

Prompt: Create a live world map over NASA’s satellite pictures of the Earth, by day where the sun is up and city lights where it is night, that shades the night side with twilight in steps and moves on with the clock. Mark the sun and the moon where each stands overhead, draw the moon in its current phase, show the time in a label, and add the countries’ names, hidden at first, each shown only where it fits. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Time, Date, Projection, Satellite view, Country names, Moon, Twilight, City clocks.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
var responsive = am5themes_ResponsiveMax.new(root); // kept in a variable: a rule of its own is added below
root.setThemes([
  am5themes_Animated.new(root),
  responsive
]);

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // go to the home view once the map is fitted
  autoHome: true,
  // dragging sideways turns the world around, dragging up and down moves it
  panX: "rotateX",
  panY: "translateY",
  // how far the map may be dragged out of view: not at all
  maxPanOut: 0,
  minZoomLevel: 0.5,                  // zoom out to half the fitted size at most
  projection: am5map.geoEqualEarth(), // the Equal Earth projection
  // near-black space behind the satellite pictures, shown only with them
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // invisible until the satellite view turns it on
  })
}));

// Satellite view: NASA's pictures of the Earth, by day where the sun is up and city lights where it is night,
// blended across the twilight, under the countries. Hide the series (visible: false) for the plain map. The images
// are read from the amCharts CDN
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg", // the Earth by day...
  // ...and its city lights by night
  nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg",
  sunDate: "now" // split between day and night for the current time
}));

// Create main polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // low-detail world countries
}));

polygonSeries.mapPolygons.template.setAll({
  strokeWidth: 0.5,     // thin borders
  tooltipText: "{name}" // the country's name
});

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // 12px text
  fill: am5.color(0xffffff), // white, over the dark pictures
  fillOpacity: 0.6,
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...measured from the label's right end...
  dx: -10,                   // ...10px in from it
  y: 10                      // 10px from the top (it hides with the satellite view, see below)
}));

// On a narrow chart (a phone) the top is needed for other things: the credit moves to the bottom left, in smaller
// type, just above the time. The rule is undone on a wider chart
responsive.addRule({
  relevant: function (width) { return width < 600; }, // the chart is under 600px wide
  applying: function () {
    credit.setAll({
      x: 20, centerX: 0, dx: 0,                 // 20px in from the left edge, like the time...
      y: am5.p100, centerY: am5.p100, dy: -40,  // ...and just above it
      fontSize: 10                              // smaller print
    });
  },
  removing: function () {
    credit.setAll({ x: am5.p100, centerX: am5.p100, dx: -10, y: 10, centerY: 0, dy: 0, fontSize: 12 });
  }
});

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// With the pictures, the image credit shows, the countries are white outlines over them, the grid lines are white,
// and the map sits in near-black space, with white text; without them, the map has its own look. Set once the time
// label is made (below), and again whenever the pictures are shown or hidden
satelliteSeries.on("visible", showSatellite);

function showSatellite(visible) {
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  timeLabel.set("fill", visible ? am5.color(0xffffff) : root.interfaceColors.get("text"));
}

// Create night series: it shades the part of the world where it is night,
// with the twilight in steps, and shows the sun where it is directly overhead.
// With sunDate "now" it keeps moving with the clock.
var nightSeries = chart.series.push(am5map.NightSeries.new(root, {
  sunDate: "now"
}));

// How dark the full night gets
nightSeries.mapPolygons.template.setAll({
  fillOpacity: 0.5
});

// A bigger sun than the default
nightSeries.get("sun").setAll({
  radius: 12, // a 12px sun
  tooltipText: "The sun is directly overhead here" // shown when the sun is hovered
});

// Create graticule series: grid lines every 10 degrees, over the map
// https://docs.amcharts.com/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // a color that contrasts with the background...
  strokeOpacity: 0.1 // ...faint
});

// The moon: where it is overhead at the time, drawn in its phase, with the phase in a tooltip
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/
var moonSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
var moonRadius = 10; // the moon's radius in pixels

// Templates, so a new phase and tooltip reach the moon in one place
var moonTemplate = am5.Template.new({});
var moonLitTemplate = am5.Template.new({});

moonSeries.bullets.push(function() {
  var container = am5.Container.new(root, {});

  // The dark side, which also shows the tooltip
  container.children.push(am5.Circle.new(root, {
    radius: moonRadius,
    fill: am5.color(0x3a3e48),   // dark gray...
    stroke: am5.color(0xb8bcc6), // ...with a light rim
    strokeWidth: 1,
    tooltipY: -moonRadius        // the tooltip points at the moon's top edge
  }, moonTemplate));

  // The lit side, drawn for the phase
  container.children.push(am5.Graphics.new(root, {
    fill: am5.color(0xf4f2ea) // off-white
  }, moonLitTemplate));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

var moonItem = moonSeries.pushDataItem({ latitude: 0, longitude: 0 }); // one point; updateMoon moves it

// The lit part of the moon at a phase from 0 (new) through 0.5 (full) to 1 (new again): a half circle, closed by
// the half ellipse of the line between its day and night. Waxing, the right side is lit, as seen from the north
function drawMoon(display, r, phase) {
  if (phase < 0.005 || phase > 0.995) {
    return; // a new moon: nothing lit
  }
  var k = 0.5523; // bezier curves close to a quarter circle
  // how far the day-night line bulges, and to which side
  var edge = Math.cos(phase * 2 * Math.PI) * r * (phase <= 0.5 ? 1 : -1);
  display.moveTo(0, -r); // start at the top
  // the lit half circle: the right side while waxing, the left side after
  display.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, phase > 0.5);
  display.bezierCurveTo(edge * k, r, edge, r * k, edge, 0); // then back up along the day-night line
  display.bezierCurveTo(edge, -r * k, edge * k, -r, 0, -r);
}

// The point where the moon is overhead at a time, from the main terms of its orbit
function getMoonPosition(date) {
  var rad = Math.PI / 180;
  var days = date.getTime() / 86400000 - 10957.5; // since 1 January 2000, noon
  var t = days / 36525; // centuries since 2000
  var Lp = 218.3165 + 481267.8813 * t; // mean longitude
  var Mp = (134.9634 + 477198.8676 * t) * rad; // mean anomaly
  var D = (297.8502 + 445267.1115 * t) * rad; // mean elongation
  var M = (357.5291 + 35999.0503 * t) * rad; // the sun's mean anomaly
  var F = (93.272 + 483202.0175 * t) * rad; // argument of latitude
  // the moon's longitude along the sun's path, in radians...
  var lon = (Lp + 6.289 * Math.sin(Mp) + 1.274 * Math.sin(2 * D - Mp) + 0.658 * Math.sin(2 * D) + 0.214 * Math.sin(2 * Mp) -
    0.186 * Math.sin(M) - 0.114 * Math.sin(2 * F)) * rad;
  // ...and its latitude above or below that path
  var lat = (5.128 * Math.sin(F) + 0.281 * Math.sin(Mp + F) + 0.278 * Math.sin(Mp - F) + 0.173 * Math.sin(2 * D - F)) * rad;
  // from the ecliptic to the sky, then to the turning Earth
  var tilt = (23.439 - 0.013 * t) * rad;
  // right ascension: the moon's place on the sky's east-west circle
  var ra = Math.atan2(Math.cos(tilt) * Math.sin(lon) * Math.cos(lat) - Math.sin(tilt) * Math.sin(lat), Math.cos(lon) * Math.cos(lat));
  // declination: the latitude where the moon is overhead
  var dec = Math.asin(Math.sin(tilt) * Math.sin(lon) * Math.cos(lat) + Math.cos(tilt) * Math.sin(lat));
  var siderealTime = 280.46061837 + 360.98564736629 * days; // how far the Earth has turned, in degrees
  // the longitude where the moon is overhead, -180 to 180
  var longitude = ((ra / rad - siderealTime) % 360 + 540) % 360 - 180;
  return { latitude: dec / rad, longitude: longitude };
}

// eight names, from new moon round to waning crescent
var moonPhases = ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"];

// Put the moon where it is overhead at a time, and draw its phase. The angle between the points under the sun and
// under the moon is the angle between the two, seen from the Earth
function updateMoon(date) {
  var rad = Math.PI / 180;
  var moon = getMoonPosition(date);
  var sun = am5map.getSunPosition(date);
  moonItem.setAll({ latitude: moon.latitude, longitude: moon.longitude }); // move the moon's point
  var cos = Math.sin(sun.latitude * rad) * Math.sin(moon.latitude * rad) +
    Math.cos(sun.latitude * rad) * Math.cos(moon.latitude * rad) * Math.cos((moon.longitude - sun.longitude) * rad);
  var angle = Math.acos(Math.max(-1, Math.min(1, cos))) / rad;             // in degrees
  // waxing while the moon is east of the sun
  var waxing = (moon.longitude - sun.longitude + 360) % 360 < 180;
  var phase = (waxing ? angle : 360 - angle) / 360; // 0 to 1, from new moon to new moon
  moonLitTemplate.set("draw", function(display) {   // redraw the lit part
    drawMoon(display, moonRadius, phase);
  });
  // the phase name in bold, then how much of the moon is lit
  moonTemplate.set("tooltipText", "[bold]" + moonPhases[Math.round(phase * 8) % 8] + "[/]\n" + Math.round((1 - cos) / 2 * 100) + "% lit");
}

// Country names: a label in the middle of each country, on top of everything. Hidden at first (visible: false):
// make the series visible to show them
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#relation-to-polygon-series
var nameSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  polygonIdField: "polygonId", // each name sits in the middle of the country with this id
  visible: false
}));

nameSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{name}",
      populateText: true,               // fill in {name} from the point's data
      fontSize: 11,
      fill: am5.color(0xffffff),        // white...
      shadowColor: am5.color(0x000000), // ...with a dark glow, so it reads over day, night and the plain map
      shadowBlur: 3,
      centerX: am5.p50,                 // centered on the point
      centerY: am5.p50,
      templateField: "labelSettings"    // settings from the country's data: small countries' names hidden (see below)
    })
  });
});

// Does a name fit on its country? The country must be about as big on screen as the name is wide. On this map,
// which keeps areas true (Equal Earth), a country of area A (in steradians) covers about A × scale² on screen, so it
// is about √A × scale across; a name takes about 5.5px a letter at 11px, and may be a little wider than its country
function nameFits(name, area, scale) {
  return Math.sqrt(area) * scale >= name.length * 5.5 * 0.8;
}

// One name per country, once the countries are in. Each keeps its country's area, to tell whether the name fits.
// The data hides the names that don't fit on a map about 1,000px wide (a scale of 180), so a copy of the chart
// without the code below, such as its JSON in Chart Maker, shows only the big countries' names
polygonSeries.events.on("datavalidated", function () {
  nameSeries.data.setAll(polygonSeries.dataItems.map(function (dataItem) {
    var name = dataItem.dataContext.name; // the country's name, from the map's geodata
    // in steradians; three digits are plenty, and keep the chart's JSON short
    var area = +am5map.getGeoArea(dataItem.get("mapPolygon").get("geometry")).toPrecision(3);
    return {
      polygonId: dataItem.get("id"),
      name: name,
      area: area,
      labelSettings: nameFits(name, area, 180) ? undefined : { forceHidden: true }
    };
  }));
});

// Here, the names that fit right now show. The projection's scale grows as the map zooms in, so zooming in brings
// out the smaller countries' names. On a globe (an orthographic projection, which shows one side), a country
// towards the edge is seen at a slant and covers less: its area times the cosine of its angle from the middle
var rad = Math.PI / 180; // degrees to radians
root.events.on("frameended", function () {
  if (!nameSeries.get("visible")) {
    return;
  }
  var projection = chart.get("projection");
  var scale = projection.scale();
  var onGlobe = projection.clipAngle() > 0; // a globe hides its far side
  // the point in the middle of the globe, as it's turned now
  var midLongitude = -chart.get("rotationX", 0) * rad;
  var midLatitude = -chart.get("rotationY", 0) * rad;
  nameSeries.dataItems.forEach(function (dataItem) {
    var label = dataItem.bullets && dataItem.bullets[0].get("sprite");
    if (label) {
      var slant = 1;
      if (onGlobe) {
        var longitude = dataItem.get("longitude") * rad;
        var latitude = dataItem.get("latitude") * rad;
        slant = Math.sin(latitude) * Math.sin(midLatitude) +
          Math.cos(latitude) * Math.cos(midLatitude) * Math.cos(longitude - midLongitude);
      }
      var area = dataItem.dataContext.area * Math.max(0, slant);
      label.set("forceHidden", !nameFits(dataItem.dataContext.name, area, scale));
    }
  });
});

// Add zoom control
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// The time on the map: now, or a chosen date and time, moved by up to a day either way (hours)
var baseTime = new Date().getTime();
var dateChosen = false; // true once a date is picked
var hours = 0;          // the shift from baseTime

// The time shown, at the bottom left
var timeLabel = chart.children.push(am5.Label.new(root, {
  x: 20,       // 20px from the left...
  y: am5.p100, // ...at the bottom...
  centerY: am5.p100,
  dy: -15      // ...15px up from it
}));

showSatellite(satelliteSeries.get("visible", true)); // the satellite view's look, now that everything it changes is made

// Move the night, the sun, the moon and the satellite pictures to the time, and show it
function updateDayNight() {
  var time = baseTime + hours * am5.time.getDuration("hour");
  // the time now: the night keeps up with the clock by itself
  var sunDate = hours == 0 && !dateChosen ? "now" : time;
  nightSeries.set("sunDate", sunDate);     // the night shade...
  satelliteSeries.set("sunDate", sunDate); // ...and the pictures follow the same time
  updateMoon(new Date(time));
  // like Oct 07 2026 14:30
  timeLabel.set("text", root.dateFormatter.format(new Date(time), "MMM dd yyyy HH:mm"));
}

updateDayNight();

// Keep the clock running: unless a date was chosen, the time moves on every minute
setInterval(function() {
  if (!dateChosen) {
    baseTime = new Date().getTime();
    updateDayNight();
  }
}, 60000);

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
  height: 600px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
