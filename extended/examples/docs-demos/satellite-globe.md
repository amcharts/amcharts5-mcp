---
title: "Satellite globe"
source: "https://docs.amcharts.com/embeds/v5/satellite-globe/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-raster-series"]
---

A demo from the docs page "Map raster series" (get_doc(path: "charts/map-chart/map-raster-series")).

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

// Create chart: a globe that keeps turning
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoOrthographic(), // a globe
    panX: "rotateX", // dragging sideways spins the globe...
    panY: "rotateY", // ...and dragging up or down tilts it
    animations: [
      // one full turn every 2 minutes, forever
      { key: "rotationX", from: 0, to: 360, duration: 120000, loops: 0 }
    ]
  })
);

// Add satellite image
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/
chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg" // the world by day, 2048 px wide
  })
);

// Add country borders
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

polygonSeries.mapPolygons.template.setAll({
  fillOpacity: 0, // no fill, so the satellite image shows through
  stroke: root.interfaceColors.get("background"), // borders in the background color...
  strokeWidth: 0.5, // ...thin...
  strokeOpacity: 0.6 // ...and a little see-through
});

// Add image credit
chart.children.push(
  am5.Label.new(root, {
    text: "Imagery: NASA Earth Observatory", // NASA asks to be credited for its images
    fontSize: 12,
    x: am5.p100,
    centerX: am5.p100,
    y: am5.p100,
    centerY: am5.p100
  })
);

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
