---
title: "Globe with Projected Circles"
source: "https://www.amcharts.com/demos/globe-with-projected-circles/"
category: "maps"
scraped: "2026-10-08"
---

Circles sized by the population of 40 countries in 2011, lying on the surface of the globe: they flatten into ovals as they near its edge, like the land under them.

Circles on the surface: Each circle is a map bullet with surfaceBullets on, so it is drawn on the globe instead of facing the viewer, and turns into an oval towards the edge. The circles sit on their countries by id, and a heat rule sizes them on a logarithmic scale, so 22 million and 1.3 billion fit on one globe. Unlike circles drawn as polygons, they keep their size on screen when the map zooms.

Good for:
- Population, sales or users by country on a globe
- Values that span a wide range
- Turning globes, where flat circles look pasted on

Think twice when:
- Exact comparisons: a logarithmic scale hides how big the gaps are, use a bar chart
- Every country at once: a flat map shows them all
- Crowded regions: circles overlap, zoom in or make them smaller

Prompt: Create a draggable globe turned to South Asia, with a circle on each of 40 countries sized by its population in 2011. The circles lie on the globe’s surface, so they flatten towards its edge, and show the country and population in a tooltip. Use the amCharts 5 library with its Responsive theme.

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

// Colors from the theme, so the globe follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // clear until the satellite view turns it on
  }),
  minZoomLevel: 0.5,                    // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX",                      // drag sideways to spin the globe...
  panY: "rotateY",                      // ...or up and down to tilt it
  projection: am5map.geoOrthographic(), // a globe: the Earth as seen from space
  // start facing longitude 80, latitude 25: India, with China beside it
  rotationX: -80,
  rotationY: -25
}));

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  fillOpacity: 0.1, // faint
  strokeOpacity: 0  // no outline
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
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
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.08 // very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  fillOpacity: 0.15, // ...a little darker than the water
  strokeWidth: 0.5,  // thin borders...
  stroke: root.interfaceColors.get("background") // ...in the background color
});

// Create point series for circles, each placed on the country with its id.
// surfaceBullets lays them on the globe, so they flatten towards its edge
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var circleSeries = chart.series.push(am5map.MapPointSeries.new(root, {
  surfaceBullets: true,
  // works out the lowest and highest value, which the heat rule sizes the circles between
  calculateAggregates: true,
  valueField: "value", // the value the heat rule sizes the circles by
  polygonIdField: "id" // places each circle on the country whose id matches
}));

// All the circles share one template: their color, and the size the heat rule
// below gives them
var circleTemplate = am5.Template.new({
  fill: colors.getIndex(10), // a palette color...
  fillOpacity: 0.7           // ...slightly see-through, so the countries show
});

circleSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      stroke: root.interfaceColors.get("background"), // an outline in the background color...
      strokeWidth: 1, // ...1px wide
      tooltipText: "{name}: {value.formatNumber('#,###')}" // as "China: 1,347,600,000"
    }, circleTemplate)
  });
});

// Size the circles by population: logarithmic, so the smaller countries still
// get circles that show
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
circleSeries.set("heatRules", [{
  target: circleTemplate,
  dataField: "value",
  key: "radius",
  min: 5,
  max: 40,
  logarithmic: true
}]);

// Set data: population by country, 2011
circleSeries.data.setAll([
  { id: "CN", name: "China", value: 1347600000 },
  { id: "IN", name: "India", value: 1241500000 },
  { id: "US", name: "United States", value: 313100000 },
  { id: "ID", name: "Indonesia", value: 242300000 },
  { id: "BR", name: "Brazil", value: 196700000 },
  { id: "PK", name: "Pakistan", value: 176700000 },
  { id: "NG", name: "Nigeria", value: 162500000 },
  { id: "BD", name: "Bangladesh", value: 150500000 },
  { id: "RU", name: "Russia", value: 142800000 },
  { id: "JP", name: "Japan", value: 126500000 },
  { id: "MX", name: "Mexico", value: 114800000 },
  { id: "PH", name: "Philippines", value: 94900000 },
  { id: "VN", name: "Vietnam", value: 88800000 },
  { id: "ET", name: "Ethiopia", value: 84700000 },
  { id: "EG", name: "Egypt", value: 82500000 },
  { id: "DE", name: "Germany", value: 82200000 },
  { id: "IR", name: "Iran", value: 74800000 },
  { id: "TR", name: "Türkiye", value: 73600000 },
  { id: "TH", name: "Thailand", value: 69500000 },
  { id: "CD", name: "DR Congo", value: 67800000 },
  { id: "FR", name: "France", value: 63100000 },
  { id: "GB", name: "United Kingdom", value: 62400000 },
  { id: "IT", name: "Italy", value: 60800000 },
  { id: "ZA", name: "South Africa", value: 50500000 },
  { id: "KR", name: "South Korea", value: 48400000 },
  { id: "MM", name: "Myanmar", value: 48300000 },
  { id: "CO", name: "Colombia", value: 46900000 },
  { id: "ES", name: "Spain", value: 46500000 },
  { id: "TZ", name: "Tanzania", value: 46200000 },
  { id: "UA", name: "Ukraine", value: 45200000 },
  { id: "KE", name: "Kenya", value: 41600000 },
  { id: "AR", name: "Argentina", value: 40800000 },
  { id: "PL", name: "Poland", value: 38300000 },
  { id: "DZ", name: "Algeria", value: 36000000 },
  { id: "SD", name: "Sudan", value: 34700000 },
  { id: "CA", name: "Canada", value: 34300000 },
  { id: "MA", name: "Morocco", value: 32300000 },
  { id: "PE", name: "Peru", value: 29400000 },
  { id: "SA", name: "Saudi Arabia", value: 28100000 },
  { id: "AU", name: "Australia", value: 22600000 }
]);

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small text...
  fill: am5.color(0xffffff), // ...in white, over the dark satellite picture...
  fillOpacity: 0.6,          // ...a little see-through
  x: am5.p100,               // at the chart's right edge...
  centerX: am5.p100,         // ...aligned by its own right edge
  dx: -10,                   // 10px in from the edge
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
