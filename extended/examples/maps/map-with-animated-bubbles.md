---
title: "Map with Animated Bubbles"
source: "https://www.amcharts.com/demos/map-with-animated-bubbles/"
category: "maps"
scraped: "2026-10-08"
---

Bubbles on eight countries that grow and shrink as their values change every two seconds, with the value inside each bubble and the country's name beside it.

Bubbles that update live: Heat rules tie a bubble's size to its value, and when new data arrives, the bubbles animate to their new size instead of jumping. That keeps changes easy to follow on a live dashboard. The values here are random, to show the motion; in a real map they would come from a data feed.

Good for:
- Live dashboards: sales, visitors or sensors by country
- A handful of places whose values change
- Values that need a number as well as a size

Think twice when:
- Many countries: bubbles overlap, color the countries instead
- Exact comparisons: bubble sizes are hard to judge, a bar chart is easier
- Values that change once a day: a still map is calmer

Prompt: Create a world map with bubbles on eight countries, each with its value inside and the country’s name beside it. Every two seconds each country gets a new random value, and the bubbles grow and shrink smoothly to match. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// the countries that get a bubble; updateData() replaces the values at random
var data = [
  {
    id: "US",
    name: "United States",
    value: 100
  }, {
    id: "GB",
    name: "United Kingdom",
    value: 100
  }, {
    id: "CN",
    name: "China",
    value: 100
  }, {
    id: "IN",
    name: "India",
    value: 100
  }, {
    id: "AU",
    name: "Australia",
    value: 100
  }, {
    id: "CA",
    name: "Canada",
    value: 100
  }, {
    id: "BR",
    name: "Brazil",
    value: 100
  }, {
    id: "ZA",
    name: "South Africa",
    value: 100
  }
];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0
  }),
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  projection: am5map.geoEqualEarth(), // a projection that keeps the countries' areas true
  panX: "rotateX",                    // dragging sideways turns the globe
  boxZoom: "shift"                    // hold Shift and drag to zoom into a box
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0.05, // ...barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
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

// Create point series for the bubbles; each sits in the middle of its country
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    valueField: "value",
    calculateAggregates: true, // works out the series' lowest and highest values
    polygonIdField: "id"
  })
);

// The bubbles and the country names share templates, so one change reaches them all
var circleTemplate = am5.Template.new({
  fill: colors.getIndex(9), // a theme color...
  fillOpacity: 0.7          // ...slightly see-through
});

var labelTemplate = am5.Template.new({}); // empty for now; settings put here reach every name

// A bubble with the country name next to it
bubbleSeries.bullets.push(function(root, series, dataItem) {
  var container = am5.Container.new(root, {});

  var circle = container.children.push(
    am5.Circle.new(root, {
      radius: 20,                 // a starting size; the heat rule sets the real one
      cursorOverStyle: "pointer", // a hand pointer over the bubble
      tooltipText: `{name}: [bold]{value}[/]` // the country and its value on hover
    }, circleTemplate)
  );

  var countryLabel = container.children.push(
    am5.Label.new(root, {
      text: "{name}",     // the country's name...
      paddingLeft: 5,     // ...5px from the bubble's edge...
      populateText: true, // ...filled in from the data item
      fontWeight: "bold", // bold...
      fontSize: 13,       // ...13px text...
      centerY: am5.p50    // ...centered on the bubble's middle height
    }, labelTemplate)
  );

  // keep the name just outside the bubble as it grows and shrinks
  circle.on("radius", function(radius) {
    countryLabel.set("x", radius);
  });

  return am5.Bullet.new(root, {
    sprite: container,
    dynamic: true // redrawn whenever the series changes, so it keeps up with the data
  });
});

// The value in the middle of the bubble
bubbleSeries.bullets.push(function(root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{value.formatNumber('#.')}", // the value, as a whole number
      fill: am5.color(0xffffff),          // white text...
      populateText: true,                 // ...filled in from the data item...
      centerX: am5.p50,                   // ...centered in the bubble...
      centerY: am5.p50,                   // ...both ways...
      textAlign: "center"                 // ...and line by line
    }),
    // redrawn whenever the series' data changes, so the number stays current
    dynamic: true
  });
});

// The bubble size follows the value. minValue and maxValue must be set for
// the animations to work
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
bubbleSeries.set("heatRules", [
  {
    target: circleTemplate,
    dataField: "value",
    min: 10,       // the radius goes from 10px...
    max: 50,       // ...to 50px...
    minValue: 0,   // ...for values from 0...
    maxValue: 100, // ...to 100
    key: "radius"
  }
]);

bubbleSeries.data.setAll(data);

// New random values every 2 seconds
updateData(); // the first new values right away
setInterval(function() {
  updateData();
}, 2000);

// gives every bubble a random value from 0 to 100
function updateData() {
  for (var i = 0; i < bubbleSeries.dataItems.length; i++) {
    // setIndex updates the existing data item, so its bubble animates to the new size
    bubbleSeries.data.setIndex(i, { value: Math.round(Math.random() * 100), id: data[i].id, name: data[i].name })
  }
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
// and the country names turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  labelTemplate.set("fill", visible ? am5.color(0xffffff) : root.interfaceColors.get("text")); // names readable on the picture
});
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
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
