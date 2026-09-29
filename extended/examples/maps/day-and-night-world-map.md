---
title: "Day and Night World Map"
source: "https://www.amcharts.com/demos/day-and-night-world-map/"
category: "maps"
scraped: "2026-09-29"
---

This map shows where on Earth it's day and where it's night right now. The glowing yellow dot marks the spot where the sun is directly overhead, and the darker the shading, the deeper the night. The map follows the sun while you watch, and the time controls let you see how the night moves across the world.
Drag the slider or press play to move the time up to a day back or forward
Click the date to type any other date and time, for example the next solstice
Hover over a country to see its name
Drag the map sideways to turn the world, or up and down to move it. Scroll, double-click or use the + and − buttons to zoom, and the home button to reset the view
The lighter band along the edge of the night is twilight: the sun has set, but the sky is not fully dark yet
More to explore on DataViz Dojo
Day & Night World MapThe full version: live sun and moon positions, today's moon phase, and a globe view.
Solar Eclipse MapEvery solar eclipse from 2024 to 2100, with animated shadow paths and where each one can be seen.
Earthquake MapFive years of earthquakes around the world from USGS data. Pick any day, month or year.
Make it your own
Want your own version of this map? Click Edit this chart to open it in the amCharts Editor. Change the colors, add pins and labels for the places you care about, then export it or share it with a link. No coding needed. The editor opens a still copy of the map, without the time controls.
For developers
This is an amCharts 5 MapChart on the Equal Earth projection (am5map.geoEqualEarth()), and panX: "rotateX" makes dragging turn it sideways. maxPanOut: 0.01 keeps it from being dragged off the chart, and minZoomLevel: 0.5 lets it zoom out below its normal size. The ocean is a MapPolygonSeries with one rectangle covering the whole Earth, and the countries come from another one. The sun is a MapPointSeries with two circle bullets, the larger one blurred with filter: "blur(5px)" for the glow. Its position comes from a short function that calculates where the sun is directly overhead at a given time. The night is one more MapPolygonSeries with three semi-transparent circles made with am5map.getGeoCircle(), centered on the point opposite the sun: 90° covers everywhere the sun has set, and 84° and 78° add twilight.
The controls at the bottom are a play Button, a Slider and an EditableLabel. The slider moves the time up to a day either way, the play button animates the slider's start, and a date typed into the label is read with root.dateFormatter.parse() and becomes the new middle of the slider. A timer moves everything on every minute. The full JavaScript and TypeScript source is below.
Related demos
Rotating Globe
Solar Eclipse Map
Map point series
Map polygon series
getGeoCircle()

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Dark.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "translateY",
  maxPanOut: 0.01,
  minZoomLevel: 0.5,
  projection: am5map.geoEqualEarth(),
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x454a58),
    fillOpacity: 1
  })
}));


// Create series for the ocean, so the outline of the Earth shows on the day side too
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var oceanSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

oceanSeries.mapPolygons.template.setAll({
  fill: am5.color(0x565c70),
  fillOpacity: 1,
  strokeOpacity: 0
});

oceanSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  fill: am5.color(0x47c78a),
  stroke: am5.color(0x454a58),
  strokeWidth: 0.5,
  tooltipText: "{name}"
});


// Create polygon series for the night side of the Earth
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var nightSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

nightSeries.mapPolygons.template.setAll({
  fill: am5.color(0x000000),
  fillOpacity: 0.25,
  strokeOpacity: 0
});


// Create point series for the sun
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var sunSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

// Soft glow around the sun
sunSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 20,
      fill: am5.color(0xffba00),
      filter: "blur(5px)"
    })
  });
});

// The sun itself
sunSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 12,
      fill: am5.color(0xffba00),
      tooltipText: "The sun is directly overhead here"
    })
  });
});

// One sun and three night circles; updateDayNight() below moves them
var sunDataItem = sunSeries.pushDataItem({});

var nightDataItems = [
  nightSeries.pushDataItem({}),
  nightSeries.pushDataItem({}),
  nightSeries.pushDataItem({})
];


// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);


// Create controls at the bottom: play button, time slider and the date
var controls = chart.children.push(am5.Container.new(root, {
  x: am5.p50,
  centerX: am5.p50,
  y: am5.p100,
  centerY: am5.p100,
  width: am5.percent(100),
  paddingLeft: 60, // leave room for the amCharts logo
  paddingRight: 80, // and for the zoom control
  paddingBottom: 20,
  layout: root.horizontalLayout
}));

var playButton = controls.children.push(am5.Button.new(root, {
  themeTags: ["play"],
  centerY: am5.p50,
  marginRight: 15,
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"]
  })
}));

// The slider moves the time up to one day back or forward
var slider = controls.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  start: 0.5,
  centerY: am5.p50
}));

// The date and time shown on the map; click it to type another one
var dateLabel = controls.children.push(am5.EditableLabel.new(root, {
  multiLine: false,
  marginLeft: 15,
  centerY: am5.p50
}));

dateLabel.get("background").set("strokeOpacity", 0.5);


// Find the point where the sun is directly overhead at a given time.
// A simple approximation, accurate to a fraction of a degree.
function getSunPosition(date) {
  var dayOfYear = (date.getTime() - Date.UTC(date.getUTCFullYear(), 0, 0)) / 86400000;
  var angle = 2 * Math.PI / 365;

  // Over a year the sun moves between the Tropic of Cancer and the Tropic of Capricorn
  var latitude = -Math.asin(0.39779 * Math.cos(angle * (dayOfYear + 10) + 0.0334 * Math.sin(angle * (dayOfYear - 2)))) * 180 / Math.PI;

  // The sun moves 15° west every hour; the "equation of time" (in minutes)
  // corrects for Earth's tilted, elliptical orbit
  var b = angle * (dayOfYear - 81);
  var equationOfTime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
  var hours = date.getUTCHours() + date.getUTCMinutes() / 60 + equationOfTime / 60;
  var longitude = -15 * (hours - 12);

  return am5map.normalizeGeoPoint({ longitude: longitude, latitude: latitude });
}


// The time shown on the map: now, moved by the slider
var dateFormat = "MMM dd yyyy HH:mm";
var baseTime = new Date().getTime();

function getTime() {
  return baseTime + (slider.get("start", 0.5) - 0.5) * am5.time.getDuration("day", 2);
}


// Put the sun on the map and draw the night around the point opposite to it
function updateDayNight() {
  var time = getTime();
  var sun = getSunPosition(new Date(time));

  var night = am5map.normalizeGeoPoint({
    longitude: sun.longitude + 180,
    latitude: -sun.latitude
  });

  sunDataItem.setAll({ longitude: sun.longitude, latitude: sun.latitude });

  // It's night wherever the sun is below the horizon: a 90° circle around the
  // point opposite the sun. Two smaller circles add twilight, where the sun is
  // less than 6° and 12° below the horizon, so the night gets darker gradually.
  nightDataItems[0].set("geometry", am5map.getGeoCircle(night, 90));
  nightDataItems[1].set("geometry", am5map.getGeoCircle(night, 84));
  nightDataItems[2].set("geometry", am5map.getGeoCircle(night, 78));

  dateLabel.set("text", root.dateFormatter.format(new Date(time), dateFormat));
}

slider.events.on("rangechanged", updateDayNight);


// Play moves the slider to the end; press it again to pause
var playAnimation;

playButton.on("active", function(active) {
  if (active) {
    if (slider.get("start") >= 1) {
      slider.set("start", 0);
    }
    playAnimation = slider.animate({
      key: "start",
      to: 1,
      duration: 15000 * (1 - slider.get("start"))
    });
  }
  else if (playAnimation) {
    playAnimation.stop();
  }
});

slider.on("start", function(start) {
  if (start >= 1) {
    playButton.set("active", false);
  }
});


// A typed date becomes the new middle of the slider
dateLabel.on("active", function(active) {
  if (!active) {
    var date = root.dateFormatter.parse(dateLabel.get("text"), dateFormat);
    if (date && !isNaN(date.getTime())) {
      baseTime = date.getTime();
      slider.set("start", 0.5);
    }
    updateDayNight();
  }
});


updateDayNight();

// Keep the clock running: move the time on every minute
setInterval(function() {
  baseTime += 60000;
  updateDayNight();
}, 60000);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  max-width: 100%;
  height: 600px;
background-color:#454a58;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Dark.js
