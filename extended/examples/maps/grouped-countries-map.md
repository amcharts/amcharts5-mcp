---
title: "Grouped Countries Map"
source: "https://www.amcharts.com/demos/grouped-countries-map/"
category: "maps"
scraped: "2026-10-08"
---

A map of the 27 countries of the European Union, grouped by when they joined. Hover a country and its whole group lights up; the legend switches groups off and on.

When to group areas: Coloring areas by a few categories answers which ones belong together: members and non-members, sales regions, voting blocs. Lighting up the whole group on hover makes the grouping hard to miss. It works best with a handful of groups; past six or seven, the colors are hard to tell apart.

Good for:
- Alliances, unions and trade blocs
- Sales or service regions
- Countries by category or status

Think twice when:
- Values on a scale: a heat map shows the order
- Many groups: the colors blur together
- Changes over time: a map with a timeline

Prompt: Create a map of Europe showing the European Union’s member countries grouped by when they joined (before 2004, in 2004, 2007 and 2013), each group in its own color. Hovering a country highlights its whole group, and a legend turns groups off and on. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Data: the 27 members of the European Union, grouped by when they joined
var groupData = [
  {
    "name": "Joined before 2004",
    "data": [
      { "id": "AT", "joined": "1995"},
      { "id": "IE", "joined": "1973"},
      { "id": "DK", "joined": "1973"},
      { "id": "FI", "joined": "1995"},
      { "id": "SE", "joined": "1995"},
      { "id": "IT", "joined": "1957"},
      { "id": "FR", "joined": "1957"},
      { "id": "ES", "joined": "1986"},
      { "id": "GR", "joined": "1981"},
      { "id": "DE", "joined": "1957"},
      { "id": "BE", "joined": "1957"},
      { "id": "LU", "joined": "1957"},
      { "id": "NL", "joined": "1957"},
      { "id": "PT", "joined": "1986"}
   ]
  }, {
    "name": "Joined in 2004",
    "data": [
      { "id": "LT", "joined": "2004" },
      { "id": "LV", "joined": "2004" },
      { "id": "CZ", "joined": "2004" },
      { "id": "SK", "joined": "2004" },
      { "id": "SI", "joined": "2004" },
      { "id": "EE", "joined": "2004" },
      { "id": "HU", "joined": "2004" },
      { "id": "CY", "joined": "2004" },
      { "id": "MT", "joined": "2004" },
      { "id": "PL", "joined": "2004" }
    ]
  }, {
    "name": "Joined in 2007",
    "data": [
      { "id": "RO", "joined": "2007" },
      { "id": "BG", "joined": "2007" }
    ]
  }, {
    "name": "Joined in 2013",
    "data": [
      { "id": "HR", "joined": "2013" }
    ]
  }
];

// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5,  // zoom out to half the fitted size at most
  // go to the home view once the map is fitted
  autoHome: true,
  homeZoomLevel: 3.5, // the home view is zoomed in on Europe...
  homeGeoPoint: { longitude: 10, latitude: 52 } // ...centered on this point
}));

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  fillOpacity: 0.05, // barely there
  strokeOpacity: 0   // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // dark on a light background, light on a dark one
  strokeOpacity: 0.08 // very faint
});

// Create world polygon series
var worldSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  exclude: ["AQ"] // no Antarctica
}));

// the other countries in a neutral gray that suits light and dark backgrounds: a solid color 30% of the way from
// the background color to the contrasting one, so a color picked for them shows as it is
worldSeries.mapPolygons.template.setAll({
  fill: am5.Color.interpolate(0.3, root.interfaceColors.get("background"), root.interfaceColors.get("alternativeBackground"))
});

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {
  // plain square markers instead of markers that copy the look of the series
  useDefaultMarker: true,
  centerX: am5.p50,  // the legend's middle...
  x: am5.p50,        // ...at the middle of the chart
  centerY: am5.p100, // its bottom edge...
  y: am5.p100,       // ...at the chart's bottom...
  dy: -20,           // ...20px up from it
  background: am5.RoundedRectangle.new(root, {
    fill: root.interfaceColors.get("background"), // a box in the background color...
    fillOpacity: 0.7 // ...slightly see-through
  })
}));

legend.valueLabels.template.set("forceHidden", true) // no value labels in the legend

// Create series for each group
var colors = am5.ColorSet.new(root, {
  step: 2 // every other palette color...
});
colors.next(); // ...skipping the first one

am5.array.each(groupData, function(group) {
  var countries = [];
  var color = colors.next();

  am5.array.each(group.data, function(country) {
    countries.push(country.id)
  });

  var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow,
    // only this group's countries, drawn over the gray world map
    include: countries,
    name: group.name,
    fill: color // in the group's color
  }));

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "[bold]{name}[/]\nMember since {joined}", // the name in bold, then the year it joined
    interactive: true, // reacts to hover
    fill: color,
    strokeWidth: 1     // 1px borders
  });

  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.Color.brighten(color, -0.3) // a darker shade of the group's color
  });

  // hovering one country highlights every country in its group
  polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
    ev.target.series.mapPolygons.each(function(polygon) {
      polygon.states.applyAnimate("hover");
    });
  });

  polygonSeries.mapPolygons.template.events.on("pointerout", function(ev) {
    ev.target.series.mapPolygons.each(function(polygon) {
      polygon.states.applyAnimate("default");
    });
  });
  polygonSeries.data.setAll(group.data);

  legend.data.push(polygonSeries); // one legend item per group
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
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
