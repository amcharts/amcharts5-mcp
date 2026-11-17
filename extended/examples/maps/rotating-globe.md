---
title: "Rotating Globe"
source: "https://www.amcharts.com/demos/rotating-globe/"
category: "maps"
scraped: "2026-11-17"
---

The Earth from space, as a 3D globe that turns on its own. Turn on Country names to label the countries; more names appear as you zoom in.

A spinning 3D globe of the Earth: The globe uses NASA’s satellite image of the Earth, with country borders drawn on top, and it spins on its own. Drag it to spin it yourself, or click a country to zoom in on it. Turn on Country names to label the countries. Smaller countries get their names as you zoom in. Rotate to random country hops from one country to the next and shows each one’s flag.

To make your own version, open it in Chart Maker and change it without code, or copy the code below.

Prompt: Create a slowly rotating globe covered with NASA’s satellite picture of the Earth, with the country borders over it, that can be dragged and zoomed. Clicking a country turns the globe to it and zooms in, and zoom buttons with a home button bring back the whole globe. Add the countries’ names, hidden at first, each shown only where it fits, so more appear as the globe zooms in. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Rotation speed, Rotate to random country, Satellite view, Country names, Tilt, Grid opacity.

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
  panX: "rotateX",                      // a sideways drag spins the globe
  panY: "rotateY",                      // an up or down drag tilts it
  projection: am5map.geoOrthographic(), // a globe, seen from space
  // hold shift and drag a box to zoom into it
  boxZoom: "shift",
  minZoomLevel: 0.5,                    // zoom out to half the fitted size at most
  // start, and go home, slightly zoomed out, so the globe has a margin around it
  zoomLevel: 0.95,
  homeZoomLevel: 0.95,
  animationDuration: 800,               // zoom and pan animations take 0.8 seconds
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // transparent until the satellite picture shows
  })
}));

// Create series for background fill
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/#background-polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's text color: works in light and dark
  fillOpacity: 0.05, // a faint tint for the ocean
  strokeOpacity: 0 // no outline
});
// one polygon that covers the whole Earth: the ocean
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hide the series
// (visible: false) for the plain map
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series
// https://docs.amcharts.com/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
// faint grid lines in the theme's text color
graticuleSeries.mapLines.template.setAll({ strokeOpacity: 0.08, stroke: root.interfaceColors.get("alternativeBackground") });

// Create main polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // country shapes from the low-detail world map
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // hover a country for its name
  interactive: true,     // the countries react to the pointer (the click handler below picks one)
  strokeWidth: 0.5       // thin borders
});

// Hover and active fill the country; over the satellite picture they turn to a bright outline instead (see below)
polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover"), // the theme's button hover color
  fillOpacity: 1
});

// The clicked country stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive"), // the theme's pressed button color
  fillOpacity: 1
});

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small print
  fill: am5.color(0xffffff), // white, over the dark picture
  fillOpacity: 0.6,          // a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...lined up by the label's own right side
  dx: -10,                   // 10px in from the edge
  y: 10                      // 10px from the top (it hides with the satellite picture, see below)
}));

// On a narrow chart (a phone) the globe takes the whole height and the top right corner is no longer free:
// the credit moves to the bottom left corner, in smaller type on two lines. The rule is undone on a wider chart
responsive.addRule({
  relevant: function (width) { return width < 600; }, // the chart is under 600px wide
  applying: function () {
    credit.setAll({
      x: 0, centerX: 0, dx: 10,                 // 10px in from the left edge...
      y: am5.p100, centerY: am5.p100, dy: -10,  // ...and from the bottom
      fontSize: 10,                             // smaller print
      maxWidth: 100, oversizedBehavior: "wrap"  // wrapped at 100px, two lines
    });
  },
  removing: function () {
    credit.setAll({
      x: am5.p100, centerX: am5.p100, dx: -10,
      y: 10, centerY: 0, dy: 0,
      fontSize: 12,
      maxWidth: undefined, oversizedBehavior: "none"
    });
  }
});

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

// With the satellite picture, the countries are white outlines over it, the grid lines are white, the credit shows
// and the map sits in near-black space; without it, the map has its own look. Set now, and again whenever the
// picture is shown or hidden
showSatellite(satelliteSeries.get("visible", true));
satelliteSeries.on("visible", showSatellite);

function showSatellite(visible) {
  credit.set("visible", visible);
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
      shadowColor: am5.color(0x000000), // ...with a dark glow, so it reads over land, sea and clouds
      shadowBlur: 3,
      centerX: am5.p50,                 // centered on the point
      centerY: am5.p50,
      templateField: "labelSettings"    // settings from the country's data: small countries' names hidden (see below)
    })
  });
});

// Does a name fit on its country? The country must be about as big on screen as the name is wide. A country of
// area A (in steradians) is about √A globe radii across; a name takes about 5.5px a letter at 11px, and may be a
// little wider than its country (names in the middle of their countries rarely touch)
function nameFits(name, area, radius) {
  return Math.sqrt(area) * radius >= name.length * 5.5 * 0.8;
}

// One name per country, once the countries are in. Each keeps its country's area, to tell whether the name fits.
// The data hides the names that don't fit on a globe 500px tall (a radius of 250px), so a copy of the chart without
// the code below, such as its JSON in Chart Maker, shows only the big countries' names
polygonSeries.events.on("datavalidated", function () {
  nameSeries.data.setAll(polygonSeries.dataItems.map(function (dataItem) {
    var name = dataItem.dataContext.name; // the country's name, from the map's geodata
    // in steradians; three digits are plenty, and keep the chart's JSON short
    var area = +am5map.getGeoArea(dataItem.get("mapPolygon").get("geometry")).toPrecision(3);
    return {
      polygonId: dataItem.get("id"),
      name: name,
      area: area,
      labelSettings: nameFits(name, area, 250) ? undefined : { forceHidden: true }
    };
  }));
});

// Here, the names that fit right now show. The projection's scale is the globe's radius on screen (it grows as
// the map zooms in), so zooming in brings out the smaller countries' names. Towards the globe's edge a country is
// seen at a slant and covers less: its area times the cosine of its angle from the middle
var rad = Math.PI / 180; // degrees to radians
root.events.on("frameended", function () {
  if (!nameSeries.get("visible")) {
    return;
  }
  var radius = chart.get("projection").scale();
  // the point in the middle of the globe, as it's turned now
  var midLongitude = -chart.get("rotationX", 0) * rad;
  var midLatitude = -chart.get("rotationY", 0) * rad;
  nameSeries.dataItems.forEach(function (dataItem) {
    var label = dataItem.bullets && dataItem.bullets[0].get("sprite");
    if (label) {
      var longitude = dataItem.get("longitude") * rad;
      var latitude = dataItem.get("latitude") * rad;
      var slant = Math.sin(latitude) * Math.sin(midLatitude) +
        Math.cos(latitude) * Math.cos(midLatitude) * Math.cos(longitude - midLongitude);
      var area = dataItem.dataContext.area * Math.max(0, slant);
      label.set("forceHidden", !nameFits(dataItem.dataContext.name, area, radius));
    }
  });
});

// Rotate animation
var spin = chart.animate({
  key: "rotationX", // spin around the vertical axis...
  from: 0,
  to: 360,          // ...one full turn
  duration: 30000,  // every 30 seconds
  loops: Infinity   // forever
});

// Zoom control
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// going home also stops the spin
zoomControl.homeButton.events.on("click", function () {
  spin.stop();
});

// Turn the globe to a country and zoom in on it
function showCountry(dataItem) {
  spin.stop(); // the globe stops spinning
  var to = -am5map.getGeoCentroid(dataItem.get("mapPolygon").get("geometry")).longitude;
  // after a few turns rotationX can be far past 360: start from the same view, the short way round to the country
  var rx = chart.get("rotationX", 0);
  chart.set("rotationX", to + ((rx - to) % 360 + 540) % 360 - 180);
  return polygonSeries.zoomToDataItem(dataItem, true); // true: turn the globe to the country as it zooms in
}

// One country at a time: a click turns the globe to it and zooms in, a second click on it goes back home
var activePolygon;
polygonSeries.mapPolygons.template.events.on("click", function (ev) {
  var polygon = ev.target;
  var wasActive = polygon.get("active");
  if (activePolygon) {
    activePolygon.set("active", false); // the country picked before loses its highlight
  }
  activePolygon = undefined;
  if (wasActive) {
    chart.goHome();
  } else {
    polygon.set("active", true);
    activePolygon = polygon;
    showCountry(polygon.dataItem);
  }
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
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
