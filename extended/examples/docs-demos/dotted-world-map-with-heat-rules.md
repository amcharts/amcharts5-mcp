---
title: "Dotted world map with heat rules"
source: "https://docs.amcharts.com/embeds/v5/dotted-world-map-with-heat-rules/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/pixel-map-series"]
---

A demo from the docs page "Pixel map series" (get_doc(path: "charts/map-chart/pixel-map-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoNaturalEarth1() // a rounded world map, with sizes close to true
  })
);

// Add series: countries drawn as a grid of dots
// https://docs.amcharts.com/v5/charts/map-chart/pixel-map-series/
var pixelSeries = chart.series.push(
  am5map.PixelMapSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"], // no Antarctica, which would be a long band of dots at the bottom
    pixelType: "circle", // round dots; also "square", "diamond" or "hexagon"
    step: 2, // a dot about every 2 degrees, measured at the map's center
    uniform: true, // an even grid on screen: every dot the same size, in straight rows
    valueField: "value",
    calculateAggregates: true // works out the lowest and highest value, which the heat rule needs
  })
);

// the pixels take their color from the country under them: style the countries, not the dots
pixelSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("disabled"), // countries without data stay grey
  tooltipText: "{name}: {value}" // the name comes from the map data, the value from yours
});

// Color countries by value
// https://docs.amcharts.com/v5/concepts/settings/heat-rules/
pixelSeries.set("heatRules", [
  {
    target: pixelSeries.mapPolygons.template,
    dataField: "value",
    min: am5.color(0xffd19a), // pale orange for the youngest population...
    max: am5.color(0xb3261e), // ...dark red for the oldest
    key: "fill"
  }
]);

// Set data: median age, years
pixelSeries.data.setAll([
  { id: "US", value: 38 },
  { id: "CA", value: 41 },
  { id: "MX", value: 29 },
  { id: "BR", value: 33 },
  { id: "AR", value: 32 },
  { id: "RU", value: 39 },
  { id: "KZ", value: 31 },
  { id: "CN", value: 38 },
  { id: "IN", value: 28 },
  { id: "ID", value: 30 },
  { id: "AU", value: 38 },
  { id: "EG", value: 24 },
  { id: "NG", value: 18 },
  { id: "ET", value: 19 },
  { id: "ZA", value: 28 }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
