---
title: "Map with Dynamic Pie Charts"
source: "https://www.amcharts.com/demos/map-dynamic-pie-charts/"
category: "maps"
scraped: "2026-11-21"
---

Pie charts on a map: each of four regions gets its own pie of made-up sales by product line, sized by the region’s total sales.

When to put charts on a map: A small chart at each place shows a breakdown and its location at once: what sells in each region, and where. Each pie here is a full chart of its own, placed as a bullet of a map point series, with its area matched to the region’s total. Keep to a few places and a few slices, or the pies get too small to read.

Good for:
- Breakdowns by region, like sales by product
- Election results by area
- A few places with a few parts each

Think twice when:
- Many places: color the regions by one value
- Close comparisons: bars beside the map
- More than four or five slices: they get too thin

Prompt: Create a map of the continents with a small pie chart on each of four regions, showing made-up sales of four product lines. Size each pie by the region’s total sales, and add a legend as a key to the product lines. Use the amCharts 5 library with its ResponsiveMax theme.

The demo's page on amcharts.com adds controls that are not part of this code: Hole size, Region names, Legend, Zoom buttons.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

// ====================================
// Create map
// ====================================

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var map = root.container.children.push(
  am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "none", // no dragging sideways (up and down still pans)
    projection: am5map.geoNaturalEarth1() // a compromise world projection with rounded sides
  })
);

// Add zoom control
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = map.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create polygon series for the continents
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
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

// Add legend: a key to the product lines, which every pie shows in the same colors
// https://docs.amcharts.com/v5/concepts/legend/
var legend = map.children.push(am5.Legend.new(root, {
  centerX: am5.p50,    // the legend's middle...
  x: am5.p50,          // ...at the middle of the map
  centerY: am5.p100,   // its bottom edge...
  y: am5.p100,         // ...at the map's bottom
  clickTarget: "none", // a key only: a click would hide the slice in one pie alone
  background: am5.RoundedRectangle.new(root, {
    fill: root.interfaceColors.get("background"), // a box in the background color...
    fillOpacity: 0.7 // ...slightly see-through
  })
}));

legend.valueLabels.template.set("forceHidden", true); // no value labels in the legend

// Create point series for the pie charts
// https://docs.amcharts.com/v5/charts/map-chart/map-point-series/
var pointSeries = map.series.push(
  am5map.MapPointSeries.new(root, {})
);

// All pie charts share one template, and all region names another, so each can be changed at once
var pieTemplate = am5.Template.new({
  // the pie fills its chart's full size instead of the default 80%
  radius: am5.p100,
  centerX: am5.p50, // centered on its map point...
  centerY: am5.p50  // ...both ways
});

var titleTemplate = am5.Template.new({
  centerX: am5.p50, // the name centered over the point...
  centerY: am5.p100 // ...and anchored by its bottom edge
});

// A pie chart as a bullet: each one is a chart of its own. It goes into the root container first, so it picks up
// the themes and colors, and the bullet then moves it onto the map.
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/
pointSeries.bullets.push(function(root, series, dataItem) {
  var region = dataItem.dataContext;

  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    width: region.size, // sized by the region's total, worked out below
    height: region.size
  }, pieTemplate));

  var pieSeries = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  }));

  // every third palette color, so neighboring slices are easy to tell apart
  pieSeries.get("colors").set("step", 3);
  pieSeries.labels.template.set("forceHidden", true); // no slice labels...
  pieSeries.ticks.template.set("forceHidden", true);  // ...and no ticks: the pies are too small for them
  // keyboard and screen readers (see Accessibility below): one Tab stop per pie (a focusable group), the arrow keys
  // step through its slices, and the focused one shows its tooltip
  pieSeries.slices.template.setAll({
    focusable: true,
    focusableGroup: region.title,
    hoverOnFocus: true,
    ariaLabel: region.title + ", {category}: {value}, {valuePercentTotal.formatNumber('0.0')}%"
  });
  pieSeries.data.setAll(region.pieData);

  // the first pie's slices fill the legend
  if (!legend.data.length) {
    legend.data.setAll(pieSeries.dataItems);
  }

  return am5.Bullet.new(root, {
    sprite: chart
  });
});

// The region's name above its pie
pointSeries.bullets.push(function(root, series, dataItem) {
  var region = dataItem.dataContext;

  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: region.title,    // the region's name
      dy: region.size * -0.5 // lifted by half the pie's size, to sit above it
    }, titleTemplate)
  });
});

// ====================================
// Data
// ====================================

// Made-up sales of four product lines in four regions
var regions = [{
  title: "North America",
  latitude: 39.563353,
  longitude: -99.316406,
  pieData: [
    { category: "Phones", value: 1200 },
    { category: "Laptops", value: 765 },
    { category: "Tablets", value: 500 },
    { category: "Accessories", value: 260 }
  ]
}, {
  title: "Europe",
  latitude: 50.896104,
  longitude: 19.160156,
  pieData: [
    { category: "Phones", value: 600 },
    { category: "Laptops", value: 450 },
    { category: "Tablets", value: 200 },
    { category: "Accessories", value: 150 }
  ]
}, {
  title: "Asia",
  latitude: 47.212106,
  longitude: 103.183594,
  pieData: [
    { category: "Phones", value: 1050 },
    { category: "Laptops", value: 512 },
    { category: "Tablets", value: 266 },
    { category: "Accessories", value: 199 }
  ]
}, {
  title: "Africa",
  latitude: 11.081385,
  longitude: 21.621094,
  pieData: [
    { category: "Phones", value: 420 },
    { category: "Laptops", value: 130 },
    { category: "Tablets", value: 60 },
    { category: "Accessories", value: 90 }
  ]
}];

// Size each pie by its region's total, so that its area matches the total: the largest is 110 pixels across
var totals = regions.map(function(region) {
  return region.pieData.reduce(function(sum, slice) { return sum + slice.value; }, 0);
});
var largest = Math.max.apply(null, totals); // the biggest total

// one map point per region, with its position, name, pie size and slices
for (var i = 0; i < regions.length; i++) {
  var region = regions[i];
  pointSeries.data.push({
    geometry: { type: "Point", coordinates: [region.longitude, region.latitude] }, // longitude first
    title: region.title,
    size: Math.round(110 * Math.sqrt(totals[i] / largest)), // square root: the area grows with the total
    pieData: region.pieData
  });
}

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
map.setAll({
  focusable: true, // Tab reaches the map, and a screen reader names it
  role: "figure",
  ariaLabel: "World map with a pie chart on each of four regions, North America, Europe, Asia and Africa, of made-up sales by product line, sized by the region's total. Tab to a region's pie, then move between its slices with the arrow keys"
});
// the pies' slices: set up for the keyboard where they are made, in the bullet function above
// the legend: one Tab stop too, after the pies; the arrow keys step through its items, and Enter hides or shows one
legend.itemContainers.template.setAll({
  focusableGroup: "legend",
  tabindexOrder: 10 // the chart's parts are focused in this order, from low to high (0 if not set)
});
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
