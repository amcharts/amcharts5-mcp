---
title: "Selecting Multiple Areas Map"
source: "https://www.amcharts.com/demos/selecting-multiple-areas-map/"
category: "maps"
scraped: "2026-10-08"
---

A world map where you pick countries: click a country to select it, click it again to clear it, and select as many as you like.

When readers pick the areas: A map that remembers clicks works as an input, not just a picture: readers can mark the countries they’ve been to, the markets they serve or the regions to filter a report by. One setting, toggleKey, makes each click switch a country between selected and not, and the active state gives the selected ones their color.

Good for:
- Picking regions to filter a dashboard
- Travel maps of places visited
- Forms that ask for countries or states

Think twice when:
- Small countries are hard to hit: add a searchable list
- Long selections: list the picked names beside the map
- A single choice: zoom to the clicked country instead

Prompt: Create a world map where clicking countries selects them: each click switches a country between selected and not, so any number can be picked, and a few start selected. Show each country’s name in a tooltip. Use the amCharts 5 library with its Responsive theme.

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
  minZoomLevel: 0.5, // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  // a sideways drag turns the world around, so it wraps at the edges; up and down moves it
  panX: "rotateX",
  panY: "translateY",
  projection: am5map.geoEqualEarth() // a flat world map that keeps the countries' areas true
}));

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's text color: works in light and dark
  fillOpacity: 0.05, // a faint tint
  strokeOpacity: 0   // no outline
});

// one polygon that covers the whole Earth: the water
waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // lines in the theme's text color
  strokeOpacity: 0.08 // barely visible
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow // country shapes from the low-detail world map
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // hover a country for its name
  // a click turns a country's "active" state on or off, so any number can be selected
  toggleKey: "active",
  interactive: true // the countries react to the pointer
});

// a country under the pointer, and the selected ones, take the theme's button colors
polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover") // the button hover color
});

polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive") // the active button color
});

// a few countries start selected, once the series has drawn them
polygonSeries.events.once("datavalidated", function () {
  ["CA", "BR", "IN", "AU"].forEach(function (id) { // Canada, Brazil, India and Australia
    var dataItem = polygonSeries.getDataItemById(id);
    if (dataItem) {
      dataItem.get("mapPolygon").set("active", true); // the same as a click
    }
  });
});

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
})

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

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
