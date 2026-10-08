---
title: "US Heat (Choropleth) Map"
source: "https://www.amcharts.com/demos/us-heat-map/"
category: "maps"
scraped: "2026-10-08"
---

A heat map of the United States, also called a choropleth: each state is colored by its population in the 2000 census, from a light shade for the fewest people to a dark one for the most.

When a heat map works: Coloring each area by its value shows where the highs and lows cluster, here the most populous states on the coasts and in Texas. Color is hard to read exactly, so the legend and tooltips carry the numbers. Raw totals make big states stand out for their size alone, so for most data, map rates such as per person.

Good for:
- Rates and shares by state or country
- Spotting regional patterns
- Census and election results

Think twice when:
- Raw counts: big areas dominate, so map rates
- Exact comparisons: a sorted bar chart
- Tiny areas like DC: add labels or an inset

Prompt: Create a heat map of US state populations from the 2000 census, shading each state from light to dark by its population, with the state and its population in a tooltip and a heat legend that marks the hovered state’s value. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create chart
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5, // the map can zoom out to half its fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  // the Albers USA projection can't rotate: dragging moves the map
  panX: "translateX", // drag the map to move it sideways...
  panY: "translateY", // ...and up and down
  projection: am5map.geoAlbersUsa(), // Alaska and Hawaii shown below the lower 48 states
  // the heat legend, added to the chart below, sits to the right of the map
  layout: root.horizontalLayout
}));

// Create polygon series
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_usaLow, // the US states, in low detail
  valueField: "value",
  // works out the lowest and highest population, for the heat rule and the legend
  calculateAggregates: true
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value.formatNumber('#,###')}", // the population with thousands separators
  interactive: true, // the states react to the mouse
  stroke: root.interfaceColors.get("background"), // 1px borders in the background color
  strokeWidth: 1
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9) // a state under the mouse takes the theme's 10th color
});

polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value", // by each state's value, the population
  min: am5.Color.lighten(colors.getIndex(0), 0.6), // the smallest in a light tint of the theme's first color...
  max: am5.Color.brighten(colors.getIndex(0), -0.5), // ...the largest in a dark shade of it
  key: "fill" // the setting the rule changes
}]);

// point at a state to see where its population sits on the legend
polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

// Population of each state in the 2000 census
polygonSeries.data.setAll([
  { id: "US-AL", value: 4447100 },
  { id: "US-AK", value: 626932 },
  { id: "US-AZ", value: 5130632 },
  { id: "US-AR", value: 2673400 },
  { id: "US-CA", value: 33871648 },
  { id: "US-CO", value: 4301261 },
  { id: "US-CT", value: 3405565 },
  { id: "US-DE", value: 783600 },
  { id: "US-FL", value: 15982378 },
  { id: "US-GA", value: 8186453 },
  { id: "US-HI", value: 1211537 },
  { id: "US-ID", value: 1293953 },
  { id: "US-IL", value: 12419293 },
  { id: "US-IN", value: 6080485 },
  { id: "US-IA", value: 2926324 },
  { id: "US-KS", value: 2688418 },
  { id: "US-KY", value: 4041769 },
  { id: "US-LA", value: 4468976 },
  { id: "US-ME", value: 1274923 },
  { id: "US-MD", value: 5296486 },
  { id: "US-MA", value: 6349097 },
  { id: "US-MI", value: 9938444 },
  { id: "US-MN", value: 4919479 },
  { id: "US-MS", value: 2844658 },
  { id: "US-MO", value: 5595211 },
  { id: "US-MT", value: 902195 },
  { id: "US-NE", value: 1711263 },
  { id: "US-NV", value: 1998257 },
  { id: "US-NH", value: 1235786 },
  { id: "US-NJ", value: 8414350 },
  { id: "US-NM", value: 1819046 },
  { id: "US-NY", value: 18976457 },
  { id: "US-NC", value: 8049313 },
  { id: "US-ND", value: 642200 },
  { id: "US-OH", value: 11353140 },
  { id: "US-OK", value: 3450654 },
  { id: "US-OR", value: 3421399 },
  { id: "US-PA", value: 12281054 },
  { id: "US-RI", value: 1048319 },
  { id: "US-SC", value: 4012012 },
  { id: "US-SD", value: 754844 },
  { id: "US-TN", value: 5689283 },
  { id: "US-TX", value: 20851820 },
  { id: "US-UT", value: 2233169 },
  { id: "US-VT", value: 608827 },
  { id: "US-VA", value: 7078515 },
  { id: "US-WA", value: 5894121 },
  { id: "US-WV", value: 1808344 },
  { id: "US-WI", value: 5363675 },
  { id: "US-WY", value: 493782 }
]);

// the color scale, to the right of the map (the chart's horizontal layout)
var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical", // a bar that runs up and down
  startColor: am5.Color.lighten(colors.getIndex(0), 0.6), // the same colors as the heat rule
  endColor: am5.Color.brighten(colors.getIndex(0), -0.5),
  startText: "Lowest", // words at the ends instead of numbers
  endText: "Highest",
  stepCount: 5 // 5 blocks of color instead of a smooth gradient
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
  x: 0, // at the bottom left, clear of the heat legend on the right
  centerX: 0,
  paddingLeft: 10 // a small gap from the edge
}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the home view

// smaller labels on the heat legend
heatLegend.startLabel.setAll({
  fontSize: 12
});

heatLegend.endLabel.setAll({
  fontSize: 12
});

// the legend runs from the lowest value to the highest
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
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
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/usaLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
