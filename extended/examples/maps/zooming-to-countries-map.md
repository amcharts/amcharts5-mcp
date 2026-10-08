---
title: "Zooming to Countries Map"
source: "https://www.amcharts.com/demos/zooming-to-countries-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map that zooms to any country you click. Click the country again, or the sea, to zoom back out.

When click-to-zoom helps: A world map fits every country on one screen, but small ones end up a few pixels wide. Zooming to the country a reader picks lets one map be the overview and the close-up, with no second map to load. It suits maps people explore more than maps they read at a glance.

Good for:
- Pickers: choose a country, see it up close
- World overviews with small countries to reach
- Maps that lead on to details per country

Think twice when:
- Regions inside the country: a drill-down map loads them
- Comparing countries: color them by value instead
- Print and static reports: zooming needs a reader

Prompt: Create a zoomable world map of the countries, with each country’s name in a tooltip. Clicking a country zooms the map to it and highlights it; clicking it again, or clicking the ocean, zooms back out. Add zoom buttons with a home button. Use the amCharts 5 library with its Responsive theme.

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
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // invisible until the satellite view turns it on
  }),
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "translateX", // drag the map to move it sideways...
  panY: "translateY", // ...and up and down
  // hold Shift and drag to zoom into the area you draw
  boxZoom: "shift",
  minZoomLevel: 0.5,                 // the map can zoom out to half its fitted size
  projection: am5map.geoEqualEarth() // equal-area: countries keep their true relative size
}));

// Create series for the ocean
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var oceanSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

oceanSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  fillOpacity: 0.05, // ...at 5%, a faint tint
  strokeOpacity: 0 // no outline
});

oceanSeries.data.push({
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

// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10 // a line every 10 degrees
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  strokeOpacity: 0.08 // ...very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // the world's countries, in low detail
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the country's name from the map data
  // a click turns the country's "active" state on or off, which the code below zooms on
  toggleKey: "active",
  interactive: true // the countries react to the mouse
});

// Hover and active fill the country; over the satellite picture they turn to a bright outline instead (see below)
polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover"), // the theme's hover color for buttons
  fillOpacity: 1
});

// The selected country stays highlighted
polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive"), // the theme's color for a switched-on button
  fillOpacity: 1
});

// Zoom to the country that was clicked, and back out when it's clicked again
var previousPolygon;

polygonSeries.mapPolygons.template.on("active", function (active, target) {
  if (previousPolygon && previousPolygon != target) {
    previousPolygon.set("active", false); // only one country selected at a time
  }
  if (target.get("active")) {
    polygonSeries.zoomToDataItem(target.dataItem); // zoom in until the country fills the view
  }
  else {
    chart.goHome(); // back to the whole map
  }
  previousPolygon = target;
});

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the home view

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function () {
  chart.goHome();
});

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // in pixels
  fill: am5.color(0xffffff), // white, over the dark satellite picture
  fillOpacity: 0.6,          // slightly faded
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,
  dx: -10,       // ...10px in from it
  y: 10,         // 10px from the top
  visible: false // shown only with the satellite view
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// Hovered and active countries: their own look on the map, only a bright outline over the satellite picture
var outlineLook = { fillOpacity: 0, strokeOpacity: 1, strokeWidth: 2 };
var hoverState = landTemplate.states.lookup("hover");
var hoverLook = stateLook(hoverState);
var activeState = landTemplate.states.lookup("active");
var activeLook = stateLook(activeState);

// the settings of a state that the outline changes, as they are on the map
function stateLook(state) {
  return {
    fillOpacity: state.get("fillOpacity", landLook.fillOpacity),
    strokeOpacity: state.get("strokeOpacity", landLook.strokeOpacity),
    strokeWidth: state.get("strokeWidth", landTemplate.get("strokeWidth", 1))
  };
}

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  var look = visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook;
  landTemplate.setAll(look);
  hoverState.setAll(visible ? outlineLook : hoverLook);
  activeState.setAll(visible ? outlineLook : activeLook);
  // a country hovered before kept the look it had then as its own and as its default one: give it the new look
  polygonSeries.mapPolygons.each(function (polygon) {
    var defaultState = polygon.states.lookup("default");
    if (defaultState) {
      defaultState.setAll(look);
    }
    polygon.setAll(polygon.get("active") ? (visible ? outlineLook : activeLook) : look);
  });
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
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
