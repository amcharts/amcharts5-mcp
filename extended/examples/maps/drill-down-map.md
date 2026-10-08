---
title: "Drill-Down Map"
source: "https://www.amcharts.com/demos/drill-down-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map of the continents that drills down to countries: click a continent to zoom in and see its countries, then click the house to go back.

When to drill down: A drill-down map starts with a few big areas that are easy to read and lets readers open the one they care about, for example sales by continent, then by country. The first view stays clean and the detail is a click away. Show a clear way back, like the house button here.

Good for:
- Sales or users by region, then by country
- Exploring large geographic data step by step
- Store and office finders

Think twice when:
- Comparing countries across continents: show them all at once
- Readers who won’t click: put the key detail in the first view
- Only a few areas: one flat map is enough

Prompt: Create a two-level drill-down world map: it starts with the continents, and clicking one zooms to it and shows the countries. A back button with a house icon, or the home button, zooms out and brings the continents back. Use the amCharts 5 library with its Responsive theme.

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
  minZoomLevel: 0.5,                 // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX",                   // dragging sideways turns the world, so the map wraps around
  projection: am5map.geoEqualEarth() // a world map that keeps the countries' areas true to size
}));

// Zoom control, at the bottom right, away from the house button
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
  fill: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  fillOpacity: 0.05, // barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.08 // very faint
});

// Create polygon series for continents
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var continentSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_continentsLow
}));

continentSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the continent's name on hover
  interactive: true      // reacts to hover and clicks
});

continentSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonActive") // the hovered continent takes the theme's button color
});

// Set up zooming in on clicked continent
continentSeries.mapPolygons.template.events.on("click", function (ev) {
  continentSeries.zoomToDataItem(ev.target.dataItem); // zoom in to fit the clicked continent...
  continentSeries.hide(); // ...swap the continents...
  countrySeries.show();   // ...for its countries
  homeButton.show();      // and show the way back
});

// Create polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var countrySeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  visible: false // hidden until a continent is clicked
}));

countrySeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the country's name on hover
  interactive: true      // reacts to hover
});

countrySeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonActive")
});

// Add a button to go back to continents view
var homeButton = chart.children.push(am5.Button.new(root, {
  paddingTop: 10,            // 10px above and below the icon
  paddingBottom: 10,
  x: am5.percent(100),       // at the chart's right edge...
  centerX: am5.percent(100), // ...aligned by its own right edge
  visible: false,            // hidden until a continent is clicked
  // the button takes the click itself, not its icon
  interactiveChildren: false,
  icon: am5.Graphics.new(root, {
    // a house icon, as SVG path data
    svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
    fill: am5.color(0xffffff) // a white icon
  })
}));

// back to the continents: zoom out and swap the countries for the continents
function goBack() {
  chart.goHome();
  continentSeries.show();
  countrySeries.hide();
  homeButton.hide();
}

homeButton.events.on("click", goBack);

// the zoom control's home button goes back to the continents too
zoomControl.homeButton.events.on("click", goBack);
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
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
