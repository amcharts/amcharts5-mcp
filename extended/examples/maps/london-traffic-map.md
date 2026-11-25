---
title: "London's Busiest Roads"
source: "https://www.amcharts.com/demos/london-traffic-map/"
category: "maps"
scraped: "2026-11-25"
---

Every motorway and A road in Greater London, drawn wider and redder the more vehicles use it: the average day in 2025, from the Department for Transport's road traffic counts. The M25 and the M4 near Heathrow and the North Circular carry the most, up to 212,000 vehicles a day.

Lines that carry a value: A map line series can do more than connect places: each line can carry a number, and heat rules turn it into the line's width and color, so the busiest roads stand out at a glance. The lines come straight from GeoJSON, here 1,824 stretches of road, each with the traffic the Department for Transport puts on it. About 30% of the figures are counted each year; the rest are its estimates.

Good for:
- Traffic on roads, rails or shipping lanes
- Flows along rivers, pipes or power lines
- Any network where some links carry more

Think twice when:
- Exact comparisons: a sorted bar chart
- Thousands of short lines: thin ones are hard to point at

Prompt: Create a map of Greater London's motorways and A roads, each drawn wider and redder the more vehicles use it a day. Load the roads from https://www.amcharts.com/static/demo-data/london-main-roads-2025.js, a script that defines londonRoads: a GeoJSON FeatureCollection of MultiLineStrings with the properties road (as "A40") and value (average vehicles a day in 2025). Add them as data rows of a map line series (geometry, road, value), with heat rules on the lines' width (0.6 to 7 px) and stroke color (amber #f2c14e to deep red #b2182b), both from 0 to 220,000. Under the roads, draw the River Thames from the same file (londonThames, a GeoJSON MultiLineString) as a 5 px translucent blue line. Use a Mercator projection, with a zoom control, a home button and zooming out to half size. Show the road and its traffic with thousands separators in a tooltip. Put the title "London's busiest roads" with the subtitle "Average vehicles a day on motorways and A roads, 2025" over the map in its top left corner, a horizontal heat legend that marks the hovered road's value in its bottom right corner, and a small credits line in its bottom left corner: "Contains OS data © Crown copyright and database right 2025. Contains public sector information licensed under the Open Government Licence v3.0 (DfT road traffic statistics)." Use the amCharts 5 library with its ResponsiveMax theme.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
// A theme for this chart's own responsive rule, added at the end, once the legend and the credits exist
// https://docs.amcharts.com/v5/concepts/responsive/
var responsive = am5themes_ResponsiveMax.newEmpty(root);

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root),
  responsive
]);

// The traffic scale: from no traffic to 220,000 vehicles a day, just above the busiest road (212,636). The heat
// rules and the legend below share it. Every value stays inside it, as values past the end would get colors and
// widths past the end too
var MAX_VALUE = 220000;
var LOW_COLOR = am5.color(0xf2c14e);  // quiet roads in amber...
var HIGH_COLOR = am5.color(0xb2182b); // ...the busiest in deep red

// Create chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoMercator(), // a city map: Mercator keeps the streets' shapes
  panX: "translateX",               // drag the map to move it sideways...
  panY: "translateY",               // ...and up and down
  paddingTop: 20,                   // the map fitted with a little room above and below
  paddingBottom: 20,
  minZoomLevel: 0.5                 // can zoom out to half the fitted size, so the - button works from the start
}));

// Add zoom control
// https://docs.amcharts.com/v5/charts/map-chart/map-pan-zoom/#zoom-control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
  y: 0,          // at the top right, clear of the legend under the map
  centerY: 0,
  paddingTop: 10
}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the whole city

// The River Thames under the roads, for a sense of place: its center line from london-main-roads-2025.js, loaded
// before this code
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var riverSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));

riverSeries.mapLines.template.setAll({
  stroke: am5.color(0x6baed6), // a water blue that shows on light and dark backgrounds
  strokeOpacity: 0.6,
  strokeWidth: 5,              // about as wide as the river at this scale
  tooltipText: "{name}"        // "River Thames"
});

riverSeries.data.setAll([{ geometry: londonThames, name: "River Thames" }]);

// The roads: one line per stretch of road the Department for Transport counts, its width and color from the
// vehicles a day
// https://docs.amcharts.com/v5/charts/map-chart/map-line-series/
var roadSeries = chart.series.push(am5map.MapLineSeries.new(root, {
  valueField: "value", // each line's value: its vehicles a day, for the heat rules
  // the map fits itself to the roads: a line series is left out of the fit unless asked, and there is no country or
  // region shape here to fit to
  affectsBounds: true
}));

roadSeries.mapLines.template.setAll({
  strokeOpacity: 0.9,
  // the road and its traffic, with thousands separators, as "A406: 149,848 vehicles a day"
  tooltipText: "{road}: {value.formatNumber('#,###')} vehicles a day"
});

// Busier roads drawn wider and redder
// https://docs.amcharts.com/v5/concepts/settings/heat-rules/
roadSeries.set("heatRules", [{
  target: roadSeries.mapLines.template,
  dataField: "value",
  key: "strokeWidth",
  min: 0.6,          // the quietest roads as hairlines...
  max: 7,            // ...the busiest 7px wide
  minValue: 0,       // over the whole traffic scale, so the widths match the legend
  maxValue: MAX_VALUE
}, {
  target: roadSeries.mapLines.template,
  dataField: "value",
  key: "stroke",
  min: LOW_COLOR,    // from amber...
  max: HIGH_COLOR,   // ...to deep red
  minValue: 0,
  maxValue: MAX_VALUE
}]);

// Point at a road to see where its traffic sits on the legend
roadSeries.mapLines.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

// The roads come from london-main-roads-2025.js, loaded before this code: a GeoJSON collection of the counted
// stretches, each with its road and value. They go in as data rows, each with its line as geometry
roadSeries.data.setAll(londonRoads.features.map(function(feature) {
  return {
    geometry: feature.geometry,
    road: feature.properties.road,
    value: feature.properties.value
  };
}));

// The title, over the map in its top left corner. It's the chart's first label, which Chart Maker's Title switch
// takes as the title
var title = chart.children.push(am5.Label.new(root, {
  text: "London's busiest roads",
  fontSize: 20,
  fontWeight: "600",
  x: 0,
  y: 0,
  paddingLeft: 10 // a little in from the edge
}));

// What the map shows, just under the title
var subtitle = chart.children.push(am5.Label.new(root, {
  text: "Average vehicles a day on motorways and A roads, 2025",
  fontSize: 13,
  fill: root.interfaceColors.get("text"),
  fillOpacity: 0.7, // a little fainter than the title
  x: 0,
  y: 0,
  dy: 30,           // moved down below the title
  paddingLeft: 10
}));

// The traffic scale, in the heat rules' colors, over the map in its bottom right corner, where the roads thin out
// https://docs.amcharts.com/v5/concepts/legend/heat-legend/
var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "horizontal",
  startColor: LOW_COLOR,
  endColor: HIGH_COLOR,
  startValue: 0,
  endValue: MAX_VALUE,
  startText: "0",
  endText: "220,000 vehicles a day",
  width: 260,
  x: am5.p100,       // at the right...
  centerX: am5.p100,
  y: am5.p100,       // ...bottom corner
  centerY: am5.p100,
  paddingRight: 10   // a little in from the edge
}));

// The data's sources, as their licences ask, in small faint text in the bottom left corner
var credits = chart.children.push(am5.Label.new(root, {
  text: "Contains OS data © Crown copyright and database right 2025. Contains public sector information licensed under the Open Government Licence v3.0 (DfT road traffic statistics).",
  fontSize: 11,
  fill: root.interfaceColors.get("text"),
  fillOpacity: 0.6,
  maxWidth: 330,              // on a few lines...
  oversizedBehavior: "wrap",
  x: 0,                       // ...at the left...
  y: am5.p100,                // ...bottom corner
  centerY: am5.p100,
  paddingLeft: 10             // a little in from the edge
}));

// The ResponsiveMax theme draws the titles and the credits smaller on a small chart by itself. On one as narrow as a
// phone's (400px or less), the subtitle and the credits also wrap onto more lines and the legend gets shorter, so
// they cover less of the map; back as above on a wider one
responsive.addRule({
  relevant: am5themes_ResponsiveMax.widthM,
  applying: function() {
    subtitle.setAll({ dy: 22, maxWidth: 220, oversizedBehavior: "wrap" });
    heatLegend.setAll({ width: 140, endText: "220,000 a day" });
    credits.set("maxWidth", 235);
  },
  removing: function() {
    subtitle.setAll({ dy: 30, maxWidth: null, oversizedBehavior: "none" });
    heatLegend.setAll({ width: 260, endText: "220,000 vehicles a day" });
    credits.set("maxWidth", 330);
  }
});

// Accessibility: keyboard and screen reader support
// https://docs.amcharts.com/v5/concepts/accessibility/
chart.setAll({
  focusable: true, // Tab reaches the map, and a screen reader names it
  ariaLabel: "Map of London's motorways and A roads, drawn wider and redder the more vehicles use them, average vehicles a day in 2025. The busiest are the M25, the M4 near Heathrow and the North Circular, up to 212,000 vehicles a day"
});
// the 1,824 roads are not made focusable: that many focusable lines slow the map down (about 20 seconds more to load)

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
riverSeries.appear(1000);
roadSeries.appear(1000);
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js
- https://www.amcharts.com/static/demo-data/london-main-roads-2025.js
