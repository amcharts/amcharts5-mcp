---
title: "Multi-Series Map"
source: "https://www.amcharts.com/demos/multi-series-map/"
category: "maps"
scraped: "2026-10-08"
---

One map, two layers: a polygon series of world countries, and a second one of US states drawn on top in a color of its own.

Why layer polygon series: A map chart can stack any number of polygon series, each from its own geodata, with its own colors, tooltips and events. That is how a world map gets state-level detail for one country without loading states for all of them. The layers stay separate, so one can be hidden, restyled or given data of its own.

Good for:
- Detail for one country on a world map
- Sales territories over a base map
- Layers that readers switch on and off

Think twice when:
- Detail for many countries: a drill-down loads each on demand
- Two layers colored by value: give each its own color scale
- A single country: load its own map

Prompt: Create a zoomable world map with two layers: the world’s countries, and the US states drawn over the United States in their own color. Both layers show the region’s name in a tooltip, and a click highlights a country or state until clicked again. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "translateX",                // dragging moves the map sideways...
  panY: "translateY",                // ...and up and down
  boxZoom: "shift",                  // hold Shift and drag to zoom into a box
  projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
}));

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0.05, // ...barely there
  strokeOpacity: 0 // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
});

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
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // the world's countries, in low detail
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the country's name on hover
  // a click switches the "active" state on or off, which keeps the country highlighted
  toggleKey: "active",
  interactive: true // reacts to the pointer and to clicks
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover") // the theme's button hover color
});

polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonHover") // the same color while active
});

// US Series
// Create a polygon series for the US states
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeriesUS = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the states, added after the world, so they draw over its United States
  geoJSON: am5geodata_usaLow
}));

polygonSeriesUS.mapPolygons.template.setAll({
  tooltipText: "{name}", // the state's name on hover
  toggleKey: "active",   // a click keeps the state highlighted
  interactive: true      // reacts to the pointer and to clicks
});

var colors = am5.ColorSet.new(root, {}); // the theme's colors

polygonSeriesUS.mapPolygons.template.set("fill", colors.getIndex(3)); // the states in another theme color

polygonSeriesUS.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover") // the theme's button hover color
});

polygonSeriesUS.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonHover") // the same color while active
});

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons
zoomControl.homeButton.set("visible", true); // and a home button, hidden by default

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function () {
  chart.goHome();
})

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
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
