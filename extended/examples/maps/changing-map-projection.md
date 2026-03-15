---
title: "Changing Map Projection"
source: "https://www.amcharts.com/demos/changing-map-projection/"
category: "maps"
scraped: "2026-03-15"
---

Multi-projection support
amCharts 5 supports different chart projections. Besides a solid list of built-in projections, amCharts 4 Map Chart can use any projection from D3 and related packages.
[More about map projections](https://www.amcharts.com/docs/v5/charts/map-chart/#Projections)
Changin projection on the fly
It's easy to change map's projection on the fly, even if map is already initialized. Just set its projection setting and you're all set.
Want more fun? try to pan the map!

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv"); 
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",
    panY: "none",
    projection: am5map.geoNaturalEarth1()
  })
);

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
  })
);

var graticuleSeries = chart.series.insertIndex(
  0, am5map.GraticuleSeries.new(root, {})
);

graticuleSeries.mapLines.template.setAll({
  stroke: am5.color(0x000000),
  strokeOpacity: 0.1
});

var backgroundSeries = chart.series.unshift(
  am5map.MapPolygonSeries.new(root, {})
);

backgroundSeries.mapPolygons.template.setAll({
  fill: am5.color(0xedf7fa),
  stroke: am5.color(0xedf7fa),
});

backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Add projection buttons
var buttons = chart.children.push(am5.Container.new(root, {
  x: am5.p50,
  centerX: am5.p50,
  y: am5.p100,
  dy: -10,
  centerY: am5.p100,
  layout: root.horizontalLayout,
  paddingTop: 5,
  paddingRight: 8,
  paddingBottom: 5,
  paddingLeft: 8,
  background: am5.RoundedRectangle.new(root, {
    fill: am5.color(0xffffff),
    fillOpacity: 0.3
  })
}));

function createButton(text, projection) {
  var button = buttons.children.push(am5.Button.new(root, {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 5,
    marginRight: 5,
    label: am5.Label.new(root, {
      text: text,
    })
  }));
  
  button.events.on("click", function() {
    chart.set("projection", projection);
  });
}

createButton("geoEqualEarth", am5map.geoEqualEarth());
createButton("geoEquirectangular", am5map.geoEquirectangular());
createButton("geoMercator", am5map.geoMercator());
createButton("geoNaturalEarth1", am5map.geoNaturalEarth1());
createButton("geoOrthographic", am5map.geoOrthographic());
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
