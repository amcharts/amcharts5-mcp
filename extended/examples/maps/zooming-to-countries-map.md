---
title: "Zooming to Countries Map"
source: "https://www.amcharts.com/demos/zooming-to-countries-map/"
category: "maps"
scraped: "2026-09-29"
---

Click any country on this world map to zoom in on it, then click the ocean or the home button to see the whole world again. Hover over a country to see its name.
Click a country to zoom to it; click it again, or click the ocean, to zoom back out
Scroll, double-click or use the + and − buttons to zoom (Shift + double-click zooms out)
Drag to move the map, or hold Shift and drag to zoom into an area
The home button shows the whole world again
More to explore on DataViz Dojo
Spot the CountryHow fast can you find it? A world map geography quiz with five difficulty levels.
SVG Map GeneratorNeed a world or country map for a document or a website? Pick a projection and colors, then download a clean SVG.
Day & Night World MapSee where the sun is shining right now, with live sun and moon positions and a globe view.
Make it your own
Want your own version of this map? Click Edit this chart to open it in the amCharts Editor. Change the colors, highlight countries, add pins and labels, or map your own data, then export it or share it with a link. No coding needed.
For developers
This is an amCharts 5 MapChart with the Equal Earth projection (am5map.geoEqualEarth()), and minZoomLevel: 0.5 lets it zoom out below its normal size. The sandy look comes from a parchment background with a faint GrainPattern, a beige ocean polygon, a graticule, and a small custom theme that recolors the buttons. Countries use toggleKey: "active", so a click selects them. When a country becomes active, the code deselects the previous one and calls polygonSeries.zoomToDataItem() to zoom to it; when it is deselected, chart.goHome() zooms back out. A click on the map background calls goHome() too, and the zoom control has its home button switched on. The full JavaScript, TypeScript and JSON source is below.
Related demos
Drill-Down to Countries
Rotate Globe to a Selected Country
Capitals Map
Zooming to clicked object
Map chart
Events

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Warm, sandy buttons and text to match the map
root.interfaceColors.setAll({
  primaryButton: am5.color(0xede4d8),
  primaryButtonHover: am5.color(0xe0d4c0),
  primaryButtonDown: am5.color(0xd4c4a8),
  primaryButtonActive: am5.color(0xd4c4a8),
  primaryButtonStroke: am5.color(0x9a8468),
  primaryButtonText: am5.color(0x9a8468),
  text: am5.color(0x3c2e1e)
});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "translateX",
  panY: "translateY",
  boxZoom: "shift",
  minZoomLevel: 0.5,
  projection: am5map.geoEqualEarth(),
  // Parchment background with a faint paper grain
  background: am5.Rectangle.new(root, {
    fill: am5.color(0xf6efe7),
    fillOpacity: 1,
    fillPattern: am5.GrainPattern.new(root, {
      colors: [am5.color(0x3c2e1e)],
      size: 1,
      density: 0.6,
      maxOpacity: 0.05
    })
  })
}));


// Create series for the ocean
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var oceanSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

oceanSeries.mapPolygons.template.setAll({
  fill: am5.color(0xe0d4c0),
  fillOpacity: 1,
  strokeOpacity: 0
});

oceanSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});


// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0xd0c0a8),
  strokeOpacity: 0.6
});


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true,
  fill: am5.color(0xf5ece0),
  stroke: am5.color(0xd8c8b0),
  strokeWidth: 0.5
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0xeadcc8),
  stroke: am5.color(0xc8b498)
});

// The selected country stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: am5.color(0xd49020),
  stroke: am5.color(0xc8b498)
});


// Zoom to the country that was clicked, and back out when it's clicked again
var previousPolygon;

polygonSeries.mapPolygons.template.on("active", function (active, target) {
  if (previousPolygon && previousPolygon != target) {
    previousPolygon.set("active", false);
  }
  if (target.get("active")) {
    polygonSeries.zoomToDataItem(target.dataItem);
  }
  else {
    chart.goHome();
  }
  previousPolygon = target;
});


// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true);

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function () {
  chart.goHome();
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
  max-width:100%;
  height: 500px;
}

.single-demo .demo-background{background:#f6efe7;}
.single-demo .demo-body.extended{background:#f6efe7;padding:0;border-radius:0;border-top:none;}

```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
