---
title: "Map with Pulsating Bullets"
source: "https://www.amcharts.com/demos/map-with-pulsating-bullets/"
category: "maps"
scraped: "2026-10-08"
---

Eighteen capital cities marked with pulsing dots: a ring grows out of each dot and fades, again and again at random moments, to draw the eye.

When to make markers pulse: The pulse is declared as data: the ring's size and opacity loop forever, with a random start and length for each city, so the rings pulse out of step, and the pulse goes with the chart's JSON. Motion pulls the eye harder than color or size, so it suits a few markers that need attention: live events, alerts, new places. On many markers at once it turns into noise.

Good for:
- Live events or alerts on a map
- A few new or active places to point out
- Landing pages that want some motion

Think twice when:
- A value for each place: size the markers instead
- Dozens of points: pulse only the ones that matter
- Readers sensitive to motion: offer a still version

Prompt: Create a world map of 18 capital cities marked with pulsing dots: a ring grows out of each dot and fades, again and again, each city at its own random pace. Clicking a marker opens the city’s Wikipedia page. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    // near-black space behind the satellite picture, shown only with it
    background: am5.Rectangle.new(root, {
      fill: am5.color(0x101318),
      fillOpacity: 0
    }),
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "rotateX",                   // dragging sideways turns the globe...
    panY: "translateY",                // ...and up and down moves the map
    boxZoom: "shift",                  // hold Shift and drag to zoom into a box
    projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
  })
);

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0,  // ...but clear; raise this to color the oceans
  strokeOpacity: 0 // no outline
});

// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.08 // ...and very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow // the world's countries, in low detail
  })
);

// Create point series for markers
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
var colorset = am5.ColorSet.new(root, {}); // the theme's colors; each city takes the next one

// The pulsing rings and the dots share templates, so one change reaches every city
var pulseTemplate = am5.Template.new({
  radius: 4 // the ring starts at the dot's size
});

var dotTemplate = am5.Template.new({
  radius: 4 // 4px radius
});

// each city is a container with a ring and a dot
pointSeries.bullets.push(function() {
  var container = am5.Container.new(root, {
    tooltipText: "{title}",    // the city's name on hover
    cursorOverStyle: "pointer" // a hand pointer: the cities can be clicked
  });

  // Click a city to read about it, in a new tab
  container.events.on("click", function(e) {
    window.open(e.target.dataItem.dataContext.url, "_blank");
  });

  // The ring grows out of the dot and fades: its color and pulse come from the city's data
  container.children.push(
    am5.Circle.new(root, {
      tooltipY: 0,                  // the tooltip points at the top of the circle
      strokeOpacity: 0,             // no outline
      templateField: "ringSettings" // color and pulse from the city's ringSettings
    }, pulseTemplate)
  );

  // The dot in the middle stays put
  container.children.push(
    am5.Circle.new(root, {
      tooltipY: 0,                 // the tooltip points at the top of the dot
      strokeOpacity: 0,            // no outline
      tooltipText: "{title}",      // the city's name on hover
      templateField: "dotSettings" // fill color from the city's dotSettings
    }, dotTemplate)
  );

  return am5.Bullet.new(root, {
    sprite: container
  });
});

var cities = [
  {
    title: "Brussels",
    latitude: 50.8371,
    longitude: 4.3676,
    url: "https://en.wikipedia.org/wiki/Brussels"
  },
  {
    title: "Copenhagen",
    latitude: 55.6763,
    longitude: 12.5681,
    url: "https://en.wikipedia.org/wiki/Copenhagen"
  },
  {
    title: "Paris",
    latitude: 48.8567,
    longitude: 2.351,
    url: "https://en.wikipedia.org/wiki/Paris"
  },
  {
    title: "Reykjavik",
    latitude: 64.1353,
    longitude: -21.8952,
    url: "https://en.wikipedia.org/wiki/Reykjavik"
  },
  {
    title: "Moscow",
    latitude: 55.7558,
    longitude: 37.6176,
    url: "https://en.wikipedia.org/wiki/Moscow"
  },
  {
    title: "Madrid",
    latitude: 40.4167,
    longitude: -3.7033,
    url: "https://en.wikipedia.org/wiki/Madrid"
  },
  {
    title: "London",
    latitude: 51.5002,
    longitude: -0.1262,
    url: "https://en.wikipedia.org/wiki/London"
  },
  {
    title: "Beijing",
    latitude: 39.9056,
    longitude: 116.3958,
    url: "https://en.wikipedia.org/wiki/Beijing"
  },
  {
    title: "New Delhi",
    latitude: 28.6353,
    longitude: 77.225,
    url: "https://en.wikipedia.org/wiki/New_Delhi"
  },
  {
    title: "Tokyo",
    latitude: 35.6785,
    longitude: 139.6823,
    url: "https://en.wikipedia.org/wiki/Tokyo"
  },
  {
    title: "Ankara",
    latitude: 39.9439,
    longitude: 32.856,
    url: "https://en.wikipedia.org/wiki/Ankara"
  },
  {
    title: "Buenos Aires",
    latitude: -34.6118,
    longitude: -58.4173,
    url: "https://en.wikipedia.org/wiki/Buenos_Aires"
  },
  {
    title: "Brasilia",
    latitude: -15.7801,
    longitude: -47.9292,
    url: "https://en.wikipedia.org/wiki/Brasilia"
  },
  {
    title: "Ottawa",
    latitude: 45.4235,
    longitude: -75.6979,
    url: "https://en.wikipedia.org/wiki/Ottawa"
  },
  {
    title: "Washington",
    latitude: 38.8921,
    longitude: -77.0241,
    url: "https://en.wikipedia.org/wiki/Washington,_D.C."
  },
  {
    title: "Kinshasa",
    latitude: -4.3369,
    longitude: 15.3271,
    url: "https://en.wikipedia.org/wiki/Kinshasa"
  },
  {
    title: "Cairo",
    latitude: 30.0571,
    longitude: 31.2272,
    url: "https://en.wikipedia.org/wiki/Cairo"
  },
  {
    title: "Pretoria",
    latitude: -25.7463,
    longitude: 28.1876,
    url: "https://en.wikipedia.org/wiki/Pretoria"
  }
];

// add every city to the map
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  addCity(city.longitude, city.latitude, city.title, city.url);
}

// Each city gets the next color of the theme and a pulse of its own, as data: the ring's scale and opacity loop
// forever, each city with a random start and length, so the rings pulse out of step. The easing ("exp", out) makes
// the ring grow and fade fast, so it is gone long before the loop ends: a pause before the next pulse
// https://www.amcharts.com/docs/v5/concepts/animations/
function addCity(longitude, latitude, title, url) {
  var color = colorset.next();                // the next theme color
  var duration = 1500 + Math.random() * 2500; // one pulse lasts 1.5 to 4 seconds...
  var delay = Math.random() * 3000;           // ...and the first starts within 3 seconds
  pointSeries.data.push({
    url: url,
    geometry: { type: "Point", coordinates: [longitude, latitude] }, // longitude first, then latitude
    title: title,
    dotSettings: { fill: color }, // the dot's color
    ringSettings: {
      fill: color,
      animations: [
        { key: "scale", from: 1, to: 5, duration: duration, delay: delay, loops: 0, easing: "exp", ease: "out" },
        { key: "opacity", from: 1, to: 0, duration: duration, delay: delay, loops: 0, easing: "exp", ease: "out" }
      ]
    }
  });
}

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small...
  fill: am5.color(0xffffff), // ...white...
  fillOpacity: 0.6,          // ...slightly faded text
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...anchored by its right end...
  dx: -10,                   // ...10px in from it
  y: 10,                     // 10px from the top
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
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
  overflow: hidden;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
