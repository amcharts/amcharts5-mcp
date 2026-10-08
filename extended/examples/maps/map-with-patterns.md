---
title: "Map with Patterns"
source: "https://www.amcharts.com/demos/map-with-patterns/"
category: "maps"
scraped: "2026-10-08"
---

A world map of the continents, each filled with a pattern of its own over a color: stripes, checks, dots, triangles or stars.

When patterns beat colors: Patterns tell areas apart without relying on color alone, which helps readers with color blindness and survives printing in black and white. Each continent gets its pattern through its data, with a template field, so any polygon can have its own. Keep to a handful: past six or seven, patterns get busy.

Good for:
- Categories that must read in print or grayscale
- Accessible maps for color-blind readers
- Marking special areas: disputed, planned, no data

Think twice when:
- Values on a scale: shades of one color read as more or less
- Small countries: patterns need room to show
- Many categories: use colors and a legend

Prompt: Create a world map of the continents, each filled with its own color and its own pattern (stripes, checks, dots, triangles or stars), with the continent’s name in a tooltip. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "rotateX",                   // dragging sideways turns the globe
    projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
  })
);

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0.05, // ...barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
});

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.08 // ...and very faint
});

// Create polygon series
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_continentsLow // continents, not countries, in low detail
  })
);

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}", // the continent's name on hover
  interactive: true,     // reacts to the pointer, for the hover color
  // each continent's color and pattern come from "settings" in its data
  templateField: "settings"
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9) // the hovered continent turns another theme color
});


// each continent gets a theme color with a white pattern drawn over it
polygonSeries.data.setAll([{
  id: "europe",
  settings: {
    fill: colors.next(),                     // the next theme color
    fillPattern: am5.LinePattern.new(root, { // lines...
      color: am5.color(0xffffff), // ...in white...
      rotation: 45,               // ...turned 45 degrees...
      strokeWidth: 1              // ...1px thick
    })
  }
}, {
  id: "asia",
  settings: {
    fill: colors.next(), // the next theme color
    fillPattern: am5.RectanglePattern.new(root, { // squares...
      color: am5.color(0xffffff), // ...in white
      // only every second square, like a checkerboard
      checkered: true
    })
  }
}, {
  id: "africa",
  settings: {
    fill: colors.next(),                       // the next theme color
    fillPattern: am5.CirclePattern.new(root, { // dots...
      color: am5.color(0xffffff), // ...in white...
      checkered: true             // ...every second one, like a checkerboard
    })
  }
}, {
  id: "northAmerica",
  settings: {
    fill: colors.next(), // the next theme color
    fillPattern: am5.TrianglePattern.new(root, { // triangles...
      color: am5.color(0xffffff), // ...in white...
      maxWidth: 8,                // ...up to 8px wide...
      maxHeight: 8,               // ...and 8px high...
      gap: 6,                     // ...6px apart...
      rotation: 180,              // ...turned 180 degrees
      // each triangle turns on its own center (here upside down) while the grid stays put
      rotateShapes: true
    })
  }
}, {
  id: "southAmerica",
  settings: {
    fill: colors.next(),                     // the next theme color
    fillPattern: am5.LinePattern.new(root, { // lines...
      color: am5.color(0xffffff), // ...in white...
      rotation: 90,               // ...turned upright...
      strokeWidth: 2              // ...2px thick
    })
  }
}, {
  id: "oceania",
  settings: {
    fill: colors.next(),                     // the next theme color
    fillPattern: am5.StarPattern.new(root, { // stars...
      color: am5.color(0xffffff), // ...in white
    })
  }
}, {
  id: "antarctica",
  settings: {
    fill: colors.next(),                     // the next theme color
    fillPattern: am5.LinePattern.new(root, { // lines...
      color: am5.color(0xffffff), // ...in white...
      rotation: -45,              // ...turned the other way...
      strokeWidth: 1              // ...1px thick
    })
  }
}])
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
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
