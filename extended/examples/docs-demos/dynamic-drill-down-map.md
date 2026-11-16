---
title: "Dynamic drill-down map"
source: "https://docs.amcharts.com/embeds/v5/dynamic-drill-down-map/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/map-chart/map-drill-down"]
---

A demo from the docs page "Map drill-down" (get_doc(path: "charts/map-chart/map-drill-down")).

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

// Create the map chart
// https://docs.amcharts.com/v5/charts/map-chart/
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX"
  })
);

// Create polygon series for world
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var worldSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    exclude: ["AQ"]
  })
);

worldSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

worldSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("secondaryButton"),
  templateField: "columnSettings"
});

// Set up zooming in on clicked continent
worldSeries.mapPolygons.template.events.on("click", function (ev) {
  var country = ev.target.dataItem.get("id");
  var map;
  switch (country) {
    case "US":
      map = "usaLow.json";
      break;
    case "CA":
      map = "canadaLow.json";
      break;
    case "MX":
      map = "mexicoLow.json";
      break;
  }

  worldSeries.zoomToDataItem(ev.target.dataItem);
  homeButton.show();

  if (map) {
    am5.net
      .load("https://cdn.amcharts.com/lib/5/geodata/json/" + map, chart)
      .then(function (result) {
        var geodata = am5.JSONParser.parse(result.response);
        countrySeries.setAll({
          geoJSON: geodata
        });

        countrySeries.show();
        worldSeries.hide();
      });
  }
});

worldSeries.data.setAll([
  {
    id: "US",
    columnSettings: { fill: root.interfaceColors.get("primaryButton") }
  },
  {
    id: "CA",
    columnSettings: { fill: root.interfaceColors.get("primaryButton") }
  },
  {
    id: "MX",
    columnSettings: { fill: root.interfaceColors.get("primaryButton") }
  }
]);

// Create polygon series for countries
// https://docs.amcharts.com/v5/charts/map-chart/map-polygon-series/
var countrySeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    visible: false
  })
);

countrySeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  interactive: true
});

countrySeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonActive")
});

// Add a button to go back to continents view
var homeButton = chart.children.push(
  am5.Button.new(root, {
    paddingTop: 10,
    paddingBottom: 10,
    x: am5.percent(100),
    centerX: am5.percent(100),
    opacity: 0,
    interactiveChildren: false,
    icon: am5.Graphics.new(root, {
      svgPath: "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
      fill: am5.color(0xffffff)
    })
  })
);

homeButton.events.on("click", function () {
  chart.goHome();
  worldSeries.show();
  countrySeries.hide();
  homeButton.hide();
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
