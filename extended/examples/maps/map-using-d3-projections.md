---
title: "Map Using D3 Projections"
source: "https://www.amcharts.com/demos/map-using-d3-projections/"
category: "maps"
scraped: "2026-10-08"
---

One world map, 104 projections. The Projection list holds the projections of the d3-geo-projection library: pick one, or step through them with the arrows.

Picking a projection: Every flat map distorts the globe, and the projection decides how. Equal-area ones like Mollweide keep sizes true, Mercator keeps shapes, and compromises like Robinson or Winkel Tripel balance the two. A map chart takes any d3 projection, so stepping through this list is a quick way to find the one your data needs.

Good for:
- Choosing a projection for a new map
- Teaching how projections distort the world
- Special views: polar, interrupted or regional

Think twice when:
- A finished map: the built-in projections need no extra scripts
- Comparing country sizes: avoid Mercator
- Data for one region: a projection centered on it

Prompt: Create a world map on the Airy projection from D3’s d3-geo-projection library, which offers over a hundred projections a map chart can use. Fill the ocean with a light tint so the projection’s outline shows, and let the world turn when dragged sideways. Use the amCharts 5 library with its Responsive theme.

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

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX", // dragging sideways turns the globe...
  panY: "none",    // ...but not up and down
  // the first projection of the list; the others come from d3-geo-projection
  projection: d3.geoAiry()
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for the ocean: a rectangle around the whole world shows the
// outline of each projection
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: colors.getIndex(0), // the theme's first color...
  fillOpacity: 0.12,        // ...as a light tint
  strokeOpacity: 0          // no outline
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {})); // lines every 10 degrees

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.1 // ...and faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // the world's countries, in low detail
}));
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
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://d3js.org/d3-array.v1.min.js
- https://d3js.org/d3-geo.v1.min.js
- https://d3js.org/d3-geo-projection.v2.min.js
