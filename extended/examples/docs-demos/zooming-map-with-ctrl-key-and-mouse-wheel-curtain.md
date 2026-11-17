---
title: "Zooming map with CTRL key and mouse wheel + curtain"
source: "https://docs.amcharts.com/embeds/v5/zooming-map-with-ctrl-key-and-mouse-wheel-curtain/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-pan-zoom"]
---

A demo from the docs page "Panning and zooming the map" (get_doc(path: "charts/map-chart/map-pan-zoom")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    projection: am5map.geoNaturalEarth1(),
    wheelY: "none"
  })
);

// Create curtain + message to show when wheel is used over chart without CTRL
var overlay = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,
    height: am5.p100,
    layer: 100,
    visible: false
  })
);

var curtain = overlay.children.push(
  am5.Rectangle.new(root, {
    width: am5.p100,
    height: am5.p100,
    fill: am5.color(0x000000),
    fillOpacity: 0.3
  })
);

var message = overlay.children.push(
  am5.Label.new(root, {
    text: "Use CTRL + Scroll to zoom",
    fontSize: 30,
    x: am5.p50,
    y: am5.p50,
    centerX: am5.p50,
    centerY: am5.p50
  })
);

chart.events.on("wheel", function (ev) {
  if (ev.originalEvent.ctrlKey) {
    ev.originalEvent.preventDefault();
    chart.set("wheelY", "zoom");
  } else {
    chart.set("wheelY", "none");
    overlay.show();
    overlay.setTimeout(function () {
      overlay.hide();
    }, 800);
  }
});

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: am5.color(0x677935)
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
  height: 95vh;
  margin-bottom: 100vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
