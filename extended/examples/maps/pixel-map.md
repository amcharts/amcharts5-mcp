---
title: "Pixel Map"
source: "https://www.amcharts.com/demos/pixel-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map drawn as a grid of dots, each colored by its country's approximate median age: the older the population, the darker.

When a pixel map works: A pixel series draws each country as a grid of dots, squares, hexagons or diamonds in the country's color, so heat rules, hover and tooltips work as on a plain map. It trades exact borders for a clean, poster-like look. Set columnHeight and the pixels rise into 3D columns; a second heat rule sets each country's height.

Good for:
- Infographics, posters and slides
- One value per country, seen at a glance
- Landing pages that want a map with character

Think twice when:
- Small countries: they get a few pixels, or none
- Exact values: columns are hard to compare, add a table or a bar chart
- Borders that matter: a polygon map draws them exactly

Prompt: Create a world map that draws each country as a grid of dots, a pixel map, colored from light to dark by the median age of its people, with the country and its median age in a tooltip. Use the amCharts 5 library with its Responsive theme.

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
  minZoomLevel: 0.5, // can zoom out to half the size of the fitted map
  // go to the home view once the map is fitted
  autoHome: true,
  projection: am5map.geoEqualEarth(), // Equal Earth keeps the countries' true sizes against each other
  panX: "rotateX",                    // a sideways drag turns the world around, so the map wraps
  panY: "translateY"                  // an up-down drag moves the map
}));

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color, dark on light
  fillOpacity: 0.05, // at 5%, only a faint tint
  strokeOpacity: 0 // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Create the pixel series: each country drawn as a grid of dots, 2 degrees
// apart. columnHeight raises the dots into 3D columns; 0 keeps them flat
var pixelSeries = chart.series.push(am5map.PixelMapSeries.new(root, {
  geoJSON: am5geodata_worldLow, // the world's countries, low detail
  pixelType: "circle",          // round dots (or "square", "diamond", "hexagon")
  step: 2,
  pixelSize: 0.8,               // each dot 80% of the step, so there's a gap between them
  // every other row shifted by half a pixel, like bricks
  stagger: true,
  // the same number of pixels in every row, so they line up across the map
  equalArea: false,
  columnHeight: 0,
  valueField: "value",
  // works out the lowest and highest values, which the heat rules need
  calculateAggregates: true
}));

pixelSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("disabled"), // countries with no data stay gray
  tooltipText: "{name}: {value} years"        // {name} and {value} come from the map and the data
});

// Countries that are not in the data say so
pixelSeries.mapPolygons.template.adapters.add("tooltipText", function(text, target) {
  return target.dataItem.get("value") == null ? "{name}: no data" : text;
});

// Color the countries by value, and set the height of their columns
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
pixelSeries.set("heatRules", [{
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: am5.Color.lighten(colors.getIndex(0), 0.6), // the youngest: a light shade of the first theme color
  max: am5.Color.brighten(colors.getIndex(0), -0.5), // the oldest: a dark shade of it
  key: "fill"
}, {
  target: pixelSeries.mapPolygons.template,
  dataField: "value",
  min: 0.1, // the youngest country's columns are 10% of columnHeight...
  max: 1,   // ...and the oldest ones full height
  key: "pixelHeight"
}]);

// Set data: approximate median age, in years (rounded estimates for this example)
pixelSeries.data.setAll([
  { id: "US", value: 38 },
  { id: "CA", value: 41 },
  { id: "MX", value: 29 },
  { id: "BR", value: 33 },
  { id: "AR", value: 32 },
  { id: "CO", value: 31 },
  { id: "PE", value: 31 },
  { id: "VE", value: 30 },
  { id: "CL", value: 35 },
  { id: "BO", value: 26 },
  { id: "GB", value: 40 },
  { id: "FR", value: 42 },
  { id: "DE", value: 46 },
  { id: "IT", value: 47 },
  { id: "ES", value: 45 },
  { id: "PT", value: 46 },
  { id: "PL", value: 41 },
  { id: "RO", value: 43 },
  { id: "GR", value: 46 },
  { id: "SE", value: 41 },
  { id: "NO", value: 40 },
  { id: "FI", value: 43 },
  { id: "UA", value: 41 },
  { id: "RU", value: 39 },
  { id: "TR", value: 32 },
  { id: "KZ", value: 31 },
  { id: "IR", value: 32 },
  { id: "IQ", value: 21 },
  { id: "SA", value: 32 },
  { id: "AF", value: 18 },
  { id: "PK", value: 23 },
  { id: "IN", value: 28 },
  { id: "BD", value: 28 },
  { id: "CN", value: 38 },
  { id: "MN", value: 28 },
  { id: "JP", value: 48 },
  { id: "KR", value: 44 },
  { id: "MM", value: 29 },
  { id: "TH", value: 40 },
  { id: "VN", value: 32 },
  { id: "PH", value: 26 },
  { id: "ID", value: 30 },
  { id: "AU", value: 38 },
  { id: "EG", value: 24 },
  { id: "LY", value: 29 },
  { id: "DZ", value: 29 },
  { id: "MA", value: 30 },
  { id: "SD", value: 20 },
  { id: "ML", value: 16 },
  { id: "NE", value: 15 },
  { id: "TD", value: 17 },
  { id: "NG", value: 18 },
  { id: "ET", value: 19 },
  { id: "KE", value: 20 },
  { id: "TZ", value: 18 },
  { id: "CD", value: 17 },
  { id: "AO", value: 17 },
  { id: "MZ", value: 18 },
  { id: "MG", value: 20 },
  { id: "ZA", value: 28 }
]);

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
