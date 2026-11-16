---
title: "Day and night satellite map"
source: "https://docs.amcharts.com/embeds/v5/day-and-night-satellite-map/"
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

// Create chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    projection: am5map.geoEqualEarth() // a rounded world map that keeps areas true
  })
);

// Add satellite images: day where the sun is up now, night where it is down
// https://docs.amcharts.com/v5/charts/map-chart/map-raster-series/#day-and-night
chart.series.push(
  am5map.MapRasterSeries.new(root, {
    src: "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg", // the world by day, 2048 px wide
    nightSrc: "https://cdn.amcharts.com/lib/5/geodata/images/earthNight2048.jpg", // city lights at night
    sunDate: "now" // where the sun is up right now, moved on every minute
  })
);

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
