---
title: "Weather Map"
source: "https://www.amcharts.com/demos/weather-map/"
category: "maps"
scraped: "2026-10-08"
---

A weather map of Europe: an animated icon and the temperature for seven capitals, picked from the data through template fields. The weather is made up.

Icons on a map: Pictures read faster than numbers: a sun or a storm cloud tells the weather before anyone reads the temperature. Here each city’s icon and label come from its data, so a new forecast only means new data. Keep the icons few and far apart, or they cover the map.

Good for:
- Weather and forecasts
- Status at each place, like open or closed
- Points of interest by type

Think twice when:
- Many places close together: small symbols or clusters
- Exact values: a table or a chart
- Icons that need explaining: add labels or a legend

Prompt: Create a weather map of Europe with seven cities, each showing an animated weather icon (sun, clouds, rain or thunder) and a label with the city and its temperature, using made-up weather. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // near-black space behind the satellite picture, shown only with it
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x101318),
    fillOpacity: 0 // invisible until the satellite view turns it on
  }),
  minZoomLevel: 0.5, // the map can zoom out to half its fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "translateX",               // drag the map to move it sideways...
  panY: "translateY",               // ...and up and down
  projection: am5map.geoMercator(), // the Mercator projection, as on most web maps
  // the home view: central Europe, zoomed in 6 times
  homeGeoPoint: { longitude: 10, latitude: 51 },
  homeZoomLevel: 6
}));

// Create series for the water: a faint fill behind the countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // the map fits the countries, not this rectangle around the whole world
  affectsBounds: false
}));

waterSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  fillOpacity: 0.05, // ...at 5%, a faint tint
  strokeOpacity: 0 // no outline
});

waterSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // north, east, south and west edges: the whole world
});

// Satellite view: NASA's picture of the Earth by day, under the grid lines and the countries. Hidden at first
// (visible: false): make it visible for the satellite view
// https://www.amcharts.com/docs/v5/charts/map-chart/map-raster-series/
var satelliteSeries = chart.series.push(am5map.MapRasterSeries.new(root, {
  visible: false,
  // the map fits the countries, not the whole picture
  affectsBounds: false
}));

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  strokeOpacity: 0.08 // ...very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow, // the world's countries, in low detail...
  exclude: ["AQ"]               // ...without Antarctica
}));

// gray land in light and dark themes, so the weather icons stand out
polygonSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0.15
});

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the home view

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
})

// Create point series for the cities
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

// All icons share one template and all labels another, so each can be changed at once.
// The icon and the text come from the data, through template fields.
var iconTemplate = am5.Template.new({
  width: 50, // 50px icons...
  height: 50,
  centerX: am5.p50, // ...centered on the city
  centerY: am5.p50
});

var labelTemplate = am5.Template.new({
  centerX: am5.p50, // the city's name centered...
  dy: 10            // ...and 10px lower than the city's point
});

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Picture.new(root, {
      templateField: "pictureSettings"
    }, iconTemplate)
  });
});

pointSeries.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      templateField: "labelSettings"
    }, labelTemplate)
  });
});

// Made-up weather in seven cities
pointSeries.data.setAll([{
  geometry: { type: "Point", coordinates: [-3.703790, 40.416775] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/rainy-1.svg"
  },
  labelSettings: {
    text: "Madrid: +22°C"
  }
},
{
  geometry: { type: "Point", coordinates: [2.352222, 48.856614] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/thunder.svg"
  },
  labelSettings: {
    text: "Paris: +18°C"
  }
},
{
  geometry: { type: "Point", coordinates: [13.404954, 52.520007] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/cloudy-day-1.svg"
  },
  labelSettings: {
    text: "Berlin: +13°C"
  }
},
{
  geometry: { type: "Point", coordinates: [21.012229, 52.229676] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/day.svg"
  },
  labelSettings: {
    text: "Warsaw: +22°C"
  }
},
{
  geometry: { type: "Point", coordinates: [12.480180, 41.872389] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/day.svg"
  },
  labelSettings: {
    text: "Rome: +29°C"
  }
},
{
  geometry: { type: "Point", coordinates: [-0.127758, 51.507351] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/rainy-7.svg"
  },
  labelSettings: {
    text: "London: +10°C"
  }
},
{
  geometry: { type: "Point", coordinates: [18.068581, 59.329323] },
  pictureSettings: {
    src: "https://www.amcharts.com/wp-content/uploads/assets/weather/animated/rainy-1.svg"
  },
  labelSettings: {
    text: "Stockholm: +8°C"
  }
}
])

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // in pixels
  fill: am5.color(0xffffff), // white, over the dark satellite picture
  fillOpacity: 0.6,          // slightly faded
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,
  dx: -10,       // ...10px in from it
  y: 10,         // 10px from the top
  visible: false // shown only with the satellite view
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines and
// the city labels turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
  labelTemplate.set("fill", visible ? am5.color(0xffffff) : root.interfaceColors.get("text"));
});

// Make stuff animate on load
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
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
