---
title: "Map with Sized Pin Bullets"
source: "https://www.amcharts.com/demos/map-with-sized-pin-bullets/"
category: "maps"
scraped: "2026-10-08"
---

Pins on a map, each sized by its value: a head with the number on it, on a pole that fades toward the ground. Here, made-up yearly sales growth in four markets.

When to use pins: A pin says “here” more clearly than a dot, and sizing its head adds a value without a legend: the bigger the head, the bigger the number written on it. Pins stand up from the map, so they suit a handful of places that don’t crowd each other.

Good for:
- A few headline numbers by market or region
- Offices or events with a figure each
- Infographics and slides

Think twice when:
- Many places: bubbles or clusters take less room
- Places close together: the pins overlap
- Precise comparisons: a bar chart

Prompt: Create a map of the continents with pin-shaped markers on four regions, showing made-up yearly sales growth: each pin is a pole with a round head that carries the value, and bigger values make bigger, taller pins. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// ====================================
// Create map
// ====================================

var map = root.container.children.push(
  am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "none",                       // no dragging sideways (up and down still pans)
    projection: am5map.geoEqualEarth(), // a projection that keeps the countries' areas true
    // room for the tallest pins above the map
    paddingTop: 50
  })
);

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = map.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create polygon series for the continents
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = map.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow // continents, not countries, in low detail
  })
);

// gray land in light and dark themes: the theme's text color, mostly see-through
polygonSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.15
});

// Create point series for the pins
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {})
);

// every second palette color, so neighboring pins differ more
var colorSet = am5.ColorSet.new(root, { step: 2 });

// All pin titles share this template, so they can be shown or hidden together
var titleTemplate = am5.Template.new({
  fontWeight: "500", // medium-weight text...
  centerY: am5.p50   // ...centered on the head's middle height
});

// A pin is a container of a pole, a head sized by the value, the value on the head and a title next to it
// https://www.amcharts.com/docs/v5/concepts/common-elements/containers/
pointSeries.bullets.push(function(root, series, dataItem) {
  var value = dataItem.dataContext.value; // the market's growth in percent

  var container = am5.Container.new(root, {});
  var color = colorSet.next(); // the next color of the set
  // the head's radius: 15px plus a pixel for each percent
  var radius = 15 + value;

  // the pole runs from the point up to the middle of the head, fading out at the bottom
  container.children.push(am5.Line.new(root, {
    stroke: color,       // the pin's color
    height: -radius * 2, // drawn upward, two radii tall
    strokeGradient: am5.LinearGradient.new(root, {
      stops: [
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 0 }
      ]
    })
  }));

  container.children.push(am5.Circle.new(root, {
    radius: radius, // sized by the value
    fill: color,    // the pin's color
    // the head's center is at the top of the pole, two radii above the point
    dy: -radius * 2
  }));

  container.children.push(am5.Label.new(root, {
    text: value + "%",         // the value with a percent sign
    fill: am5.color(0xffffff), // white...
    fontWeight: "400",         // ...regular-weight text...
    centerX: am5.p50,          // ...centered on the head...
    centerY: am5.p50,          // ...both ways...
    dy: -radius * 2            // ...at the head's height
  }));

  container.children.push(am5.Label.new(root, {
    text: dataItem.dataContext.title, // the market's name...
    dy: -radius * 2,                  // ...at the head's height...
    dx: radius + 4                    // ...4px past the head's right edge
  }, titleTemplate));

  return am5.Bullet.new(root, {
    sprite: container
  });
});

// ====================================
// Create pins
// ====================================

// Made-up yearly sales growth in four markets, in percent
var data = [{
  title: "United States",
  latitude: 39.563353,
  longitude: -99.316406,
  value: 12
}, {
  title: "European Union",
  latitude: 50.896104,
  longitude: 19.160156,
  value: 15
}, {
  title: "Asia",
  latitude: 47.212106,
  longitude: 103.183594,
  value: 8
}, {
  title: "Africa",
  latitude: 11.081385,
  longitude: 21.621094,
  value: 5
}];

// one map point per market, with its position, name and value
for (var i = 0; i < data.length; i++) {
  var d = data[i];
  pointSeries.data.push({
    geometry: { type: "Point", coordinates: [d.longitude, d.latitude] }, // longitude first, then latitude
    title: d.title,
    value: d.value
  });
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
