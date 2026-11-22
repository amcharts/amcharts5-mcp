---
title: "Interactive World Globe"
source: "https://www.amcharts.com/demos/rotate-globe-to-a-selected-country/"
category: "maps"
scraped: "2026-11-21"
---

A 3D world globe, seen from space. Click a country or find it by name: the globe turns to it, shows its flag and name, and a plane flies there from the country before.

Find any country on the globe: Click a country, or type its name in Find a country, and the globe turns to it and shows its flag. Each country you pick becomes the next stop on a trip, and a plane flies there from the previous one along a dotted line. The globe uses NASA’s satellite image of the Earth. Switch Satellite view off for a plain map, or turn on Country names to label the countries.

To make your own version, open it in Chart Maker and change it without code, or copy the code below.

Prompt: Create a globe covered with NASA’s satellite picture of the Earth, with the country borders over it, where clicking a country turns the globe to center it, puts a ring on it, and flies a plane there from the country clicked before along a dotted arc raised above the surface. Add the countries’ names, hidden at first, each shown only where it fits. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Find a country, Satellite view, Country names, Arc height, On the surface, Grid opacity.

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

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX", // a sideways drag spins the globe...
  panY: "rotateY", // ...and an up-down drag tilts it
  // hold Shift and drag to zoom in on a box
  boxZoom: "shift",
  minZoomLevel: 0.5,                    // can zoom out to half the size of the fitted globe
  projection: am5map.geoOrthographic(), // draws the world as a globe
  // Start (and go home) over the Atlantic, tilted towards the north
  rotationX: 20,
  rotationY: -35,
  homeRotationX: 20,
  homeRotationY: -35,
  paddingBottom: 20, // 20px of space around the globe on every side
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20,
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0
  })
}));

// Zoom control
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for background fill
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/#background-polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color, dark on light
  fillOpacity: 0.05, // at 5%, only a faint tint
  strokeOpacity: 0   // no outline
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hide the series
// (visible: false) for the plain map
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg",
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// The color of the stops and the plane: white over the satellite picture, and on the plain map the 11th theme
// color, the one the flights are drawn in, which stands out on land and sea in light and dark themes alike
function markColor() {
  return satelliteSeries.get("visible") ? am5.color(0xffffff) : colors.getIndex(10);
}

// Create graticule series
// https://docs.amcharts.com/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10 // a grid line every 10 degrees
}));

graticuleSeries.mapLines.template.setAll({
  // white over the satellite picture, the theme's contrast color on the plain map...
  stroke: satelliteSeries.get("visible") ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.08 // ...very faint
});

// Create main polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // the world's countries, low detail
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the country's name, from the map data
  toggleKey: "active",   // a click toggles the country's active state, which turns the globe
  interactive: true,     // reacts to hover and clicks
  strokeWidth: 0.5       // thin borders
});

// Hover and active fill the country in the theme's button colors (over the satellite picture they turn to outlines)
polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover"),
  fillOpacity: 1
});

// The selected country stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive"),
  fillOpacity: 1
});

// Create point series for the stops of the trip: a ring on each country picked
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/
var stopSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

stopSeries.bullets.push(function() {
  var container = am5.Container.new(root, {
    tooltipText: "{name}" // the country's name on hover
  });

  // Outer ring
  container.children.push(am5.Circle.new(root, {
    radius: 7,           // 7px...
    fillOpacity: 0,      // ...hollow...
    stroke: markColor(), // ...white or in the flights' color (see above)...
    strokeWidth: 2       // ...2px wide
  }));

  // Dot in the middle
  container.children.push(am5.Circle.new(root, {
    radius: 3, // a 3px dot
    fill: markColor()
  }));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// Create line series for the flights from stop to stop
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var flightSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

flightSeries.mapLines.template.setAll({
  stroke: colors.getIndex(10), // the 11th theme color
  strokeOpacity: 0.9,          // nearly opaque
  strokeWidth: 1.5,            // 1.5px wide
  strokeDasharray: [2, 2],     // dotted: 2px dash, 2px gap
  // raised 1,000 km off the globe; the plane flies along at the same height
  altitude: 1000000
});

// Create point series for the plane, which sits on the last flight's line
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/#points-on-a-line
var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

planeSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Graphics.new(root, {
      svgPath: "M28 15h-6.5L14.9 5.2C14.7 4.8 14.2 4.6 13.8 4.6 12.8 4.6 12.2 5.5 12.5 6.4L15.6 15H8.5c0 0 0 0-1.8-2.2C6.5 12.6 6.3 12.4 6 12.4H5.3C4.8 12.4 4.5 12.8 4.6 13.2L5.9 17.6l-1.3 4.4C4.5 22.4 4.8 22.8 5.3 22.8h.8c.3 0 .5-.2.7-.4C8.5 20.2 8.5 20.2 8.5 20.2h7.1l-3.2 8.6C12.2 29.7 12.8 30.6 13.8 30.6c.5 0 .9-.2 1.2-.6L21.5 20.2h6.5c1.4 0 2.6-1.2 2.6-2.6S29.4 15 28 15z",
      scale: 0.7,        // 70% of the icon's size
      centerX: am5.p50,  // the plane's middle...
      centerY: am5.p50,  // ...on the line
      fill: markColor(), // white or the flights' color (see above)
      // Shadow on the ground makes the plane look like it's flying above the globe: dark in light and dark mode
      shadowColor: am5.color(0x000000),
      shadowBlur: 4,     // blurred over 4px
      shadowOffsetX: 4,  // 4px to the right...
      shadowOffsetY: 6,  // ...and 6px down
      shadowOpacity: 0.7 // 70% opaque
    })
  });
});

// The trip: the countries picked, one after another. The first gets a ring; from the second on, the plane flies
var lastStop;    // where the plane is: the country's id and the point its ring sits on
var flights = 0; // flights so far, to give each its own id

// A stop at a country: a ring on it, an arc to it from the stop before, and the plane flying that arc, over
// so many milliseconds (0: it is there at once)
function addStop(dataItem, duration) {
  var id = dataItem.get("id");
  if (lastStop && lastStop.id === id) {
    return; // the plane is there already
  }
  var point = dataItem.get("mapPolygon").visualCentroid(); // the middle of the country's biggest part
  stopSeries.data.push({ name: dataItem.dataContext.name, longitude: point.longitude, latitude: point.latitude });
  if (lastStop) {
    flights++;
    flightSeries.data.push({
      id: "flight-" + flights,
      geometry: {
        type: "LineString",
        coordinates: [[lastStop.longitude, lastStop.latitude], [point.longitude, point.latitude]]
      }
    });
    // the plane moves to the new line (at its start, or at its end when there's no flying) and turns along it
    planeSeries.data.setAll([{ lineId: "flight-" + flights, positionOnLine: duration ? 0 : 1, autoRotate: true }]);
    if (duration) {
      planeSeries.dataItems[0].animate({
        key: "positionOnLine", // how far along the line, from 0 to 1
        to: 1,
        duration: duration,
        easing: am5.ease.inOut(am5.ease.cubic) // speeds up, then slows down to land
      });
    }
    // only the last ten flights stay on the globe, with their stops
    if (flightSeries.data.length > 10) {
      flightSeries.data.removeIndex(0);
      stopSeries.data.removeIndex(0);
    }
  }
  lastStop = { id: id, longitude: point.longitude, latitude: point.latitude };
}

// Rotate the globe to the country that was clicked, and fly there
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

// turn the globe so the country is in the middle, as the plane flies there from the stop before
function selectCountry(id) {
  var dataItem = polygonSeries.getDataItemById(id);
  var target = dataItem.get("mapPolygon");
  if (target) {
    var center = target.visualCentroid(); // the middle of the country's biggest part, as longitude and latitude
    // rotating by minus the country's middle brings it to the middle of the globe. rotationX can be any number of
    // degrees, so turn by the shortest difference (-180 to 180), not past the other side of the world
    var fromX = chart.get("rotationX", 0);
    var toX = fromX + ((-center.longitude - fromX) % 360 + 540) % 360 - 180;
    chart.animate({ key: "rotationX", to: toX, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    chart.animate({ key: "rotationY", to: -center.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
    addStop(dataItem, 2500); // the flight takes 2.5 seconds
  }
}

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // 12px text
  fill: am5.color(0xffffff), // white, on the dark space
  fillOpacity: 0.6,          // a little dimmed
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...measured to the label's right end...
  dx: -10,                   // ...then 10px back in
  y: 10                      // 10px from the top (it hides with the satellite picture, see below)
}));

// On a narrow chart (a phone) the globe takes the whole width and the top right corner is no longer free:
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

// Hovered and picked countries: filled on the map, only a bright outline over the satellite picture
var hoverState = landTemplate.states.lookup("hover");
var activeState = landTemplate.states.lookup("active");
var markedLook = { fillOpacity: 1, strokeOpacity: landLook.strokeOpacity, strokeWidth: landTemplate.get("strokeWidth", 1) };
var outlineLook = { fillOpacity: 0, strokeOpacity: 1, strokeWidth: 2 };

// With the satellite picture, the countries are white outlines over it, the grid lines, the stops and the plane
// are white, the credit shows and the map sits in near-black space; without it, the map has its own look. Set
// now, and again whenever the picture is shown or hidden
showSatellite(satelliteSeries.get("visible", true));
satelliteSeries.on("visible", showSatellite);

function showSatellite(visible) {
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  var look = visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook;
  landTemplate.setAll(look);
  hoverState.setAll(visible ? outlineLook : markedLook);
  activeState.setAll(visible ? outlineLook : markedLook);
  // a country hovered before kept the look it had then as its own and as its default one: give it the new look,
  // the picked country as marked, the others as plain land
  polygonSeries.mapPolygons.each(function (polygon) {
    var defaultState = polygon.states.lookup("default");
    if (defaultState) {
      defaultState.setAll(look);
    }
    polygon.setAll(polygon.get("active") ? (visible ? outlineLook : markedLook) : look);
  });
  // the grid lines white over the picture, in the theme's contrast color on the plain map
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  // each stop's ring and dot, and the plane, were drawn by their bullet functions: recolor the drawn ones (white,
  // or the flights' color; see markColor above)
  var color = visible ? am5.color(0xffffff) : colors.getIndex(10);
  stopSeries.dataItems.forEach(function (dataItem) {
    var stop = dataItem.bullets && dataItem.bullets[0].get("sprite");
    if (stop) {
      stop.children.getIndex(0).set("stroke", color); // the outer ring
      stop.children.getIndex(1).set("fill", color);   // the dot in the middle
    }
  });
  planeSeries.dataItems.forEach(function (dataItem) {
    var plane = dataItem.bullets && dataItem.bullets[0].get("sprite");
    if (plane) {
      plane.set("fill", color);
    }
  });
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

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the globe, and a screen reader names it
  role: "figure",
  ariaLabel: "Globe of the world's countries. Tab to the countries, move between them with the arrow keys, and press Enter to turn the globe to one and fly a plane there"
});
// the countries: one Tab stop (a focusable group), the arrow keys step through them
polygonSeries.mapPolygons.template.setAll({
  focusable: true,
  focusableGroup: "countries",
  hoverOnFocus: true, // a focused country shows its tooltip
  ariaLabel: "{name}"
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
