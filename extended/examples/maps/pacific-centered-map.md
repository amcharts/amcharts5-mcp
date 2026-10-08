---
title: "Pacific-Centered Map"
source: "https://www.amcharts.com/demos/pacific-centered-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map turned to put the Pacific Ocean in the middle, so Asia, Australia and the Americas sit side by side. Each country takes the next color of the palette.

When to move the center: Most world maps are cut through the Pacific, which splits the ocean and puts Asia and the Americas at opposite edges. Setting rotationX to about -155 centers the map on 155° east and moves the cut to the Atlantic instead. It is the natural view for the Pacific Rim, and for readers in Asia and Oceania.

Good for:
- Trade and travel around the Pacific Rim
- Readers in Asia, Australia and New Zealand
- Routes that cross the date line

Think twice when:
- Data around Europe or Africa: keep the usual center
- Comparing areas: Mercator swells the poles, Equal Earth keeps areas true
- Only the ocean matters: a globe centered on it

Prompt: Create a world map centered on the Pacific Ocean that turns when dragged sideways, with each country in its own soft color that brightens on hover and the country’s name in a tooltip. Add zoom buttons with a home button. Use the amCharts 5 library with its Responsive theme.

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
// setting rotationX to -155 makes the map Pacific-centered
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0
  }),
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "rotateX",                    // dragging sideways turns the globe...
  panY: "none",                       // ...but not up and down
  boxZoom: "shift",                   // hold Shift and drag to zoom into a box
  projection: am5map.geoEqualEarth(), // a projection that keeps the countries' areas true
  rotationX: -155                     // centered on longitude 155 degrees east, in the Pacific
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

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // the world's countries, in low detail
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",           // the country's name on hover
  fillOpacity: 0.8,                // slightly see-through, solid on hover
  templateField: "polygonSettings" // each country's color from polygonSettings in the data
});

// Give the countries colors from the palette in turn, muted to 30% saturation
var colorSet = am5.ColorSet.new(root, {});

polygonSeries.data.setAll(am5geodata_worldLow.features.map(function (feature, i) {
  return {
    id: feature.id,
    polygonSettings: {
      fill: am5.Color.saturate(colorSet.getIndex(i % 11), 0.3) // cycling through the first 11 colors
    }
  };
}));

polygonSeries.mapPolygons.template.states.create("hover", { fillOpacity: 1 }); // a hovered country turns solid

// grid lines every 10 degrees
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.1 // ...and faint
});

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons
zoomControl.homeButton.set("visible", true); // and a home button, hidden by default

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
})

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

// Hovered countries: their own look on the map, only a bright outline over the satellite picture
var outlineLook = { fillOpacity: 0, strokeOpacity: 1, strokeWidth: 2 };
var hoverState = landTemplate.states.lookup("hover");
var hoverLook = stateLook(hoverState);

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
  // a country hovered before kept the look it had then as its own and as its default one: give it the new look
  polygonSeries.mapPolygons.each(function (polygon) {
    var defaultState = polygon.states.lookup("default");
    if (defaultState) {
      defaultState.setAll(look);
    }
    polygon.setAll(look);
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
