---
title: "World Time Zone Map"
source: "https://www.amcharts.com/demos/world-time-zone-map/"
category: "maps"
scraped: "2026-10-08"
---

The world's time zones in two layers: colored areas show the zone each piece of land keeps, and faint bands run from pole to pole, with each whole-hour offset from UTC labeled along the bottom.

Two layers of time zones: Time zones follow borders on land but run straight across the sea, so this map uses two geodata files: the zone areas on land, colored apart, and the full bands. The whole-hour offsets are labeled in a row along the bottom; the zones that are off by half or three quarters of an hour show theirs in the tooltip. The map shows standard time, without daylight saving.

Good for:
- Scheduling across regions
- Travel and logistics pages
- Teams spread over several time zones

Think twice when:
- The time right now in a few cities: a list of clocks is clearer
- Daylight saving matters: offsets change during the year
- Current offsets: a few countries have changed zones since this geodata was made

Prompt: Create a world time zone map from the amCharts time zone geodata: the zone areas on land in soft colors, the zone bands over them with the zone in a tooltip, and each whole-hour offset from UTC labeled along the bottom. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // the map can zoom out to half its fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "translateX", // drag the map to move it sideways...
    panY: "translateY", // ...and up and down
    // hold Shift and drag to zoom into the area you draw
    boxZoom: "shift",
    projection: am5map.geoEqualEarth() // equal-area: countries keep their true relative size
  })
);

var colorSet = am5.ColorSet.new(root, {}); // the theme's colors, for the time zone areas

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

// Create graticule series: grid lines every 10 degrees
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10
}));

graticuleSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  strokeOpacity: 0.08 // ...very faint
});

// Create main polygon series for time zone areas: the land of each time zone,
// in a color of its own
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var areaSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldTimeZoneAreasLow // the land, cut up by time zone
  })
);

var areaPolygonTemplate = areaSeries.mapPolygons.template;
areaPolygonTemplate.setAll({ fillOpacity: 0.6 }); // slightly see-through
// each area takes the next color of the set, at half saturation for softer tones
areaPolygonTemplate.adapters.add("fill", function (fill, target) {
  return am5.Color.saturate(
    colorSet.getIndex(areaSeries.mapPolygons.indexOf(target)),
    0.5
  );
});

areaPolygonTemplate.states.create("hover", { fillOpacity: 0.8 }); // stronger under the mouse

// Create main polygon series for time zones: bands from pole to pole, shaded
// lightly, that run over the sea too
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var zoneSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldTimeZonesLow, // the time zone bands
    // the map fits the land, not the bands, which run from pole to pole
    affectsBounds: false
  })
);

var zonePolygonTemplate = zoneSeries.mapPolygons.template;
zonePolygonTemplate.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the theme's contrast color...
  fillOpacity: 0.08, // ...very faint
  interactive: true, // the bands react to the mouse
  tooltipText: "{id}" // the zone's id from the map data
});
zonePolygonTemplate.states.create("hover", { fillOpacity: 0.3 }); // a band under the mouse shows stronger

// Create point series for the labels: a row of whole-hour offsets along the
// bottom of the map, one under each band
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var labelSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
labelSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "{offset}",
      populateText: true, // fills in {offset} from the data
      centerX: am5.p50,   // centered on its point
      centerY: am5.p50,
      fontSize: "0.7em" // 70% of the chart's text size
    })
  });
});

for (var hours = -12; hours <= 12; hours++) {
  labelSeries.data.push({
    offset: hours > 0 ? "+" + hours : String(hours), // a plus sign before positive hours
    // the bands of UTC-12 and UTC+12 are half as wide, at the date line
    longitude: Math.max(-176, Math.min(176, hours * 15)),
    latitude: -50 // 50 degrees south, below most of the land
  });
}

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the home view

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
- https://cdn.amcharts.com/lib/5/geodata/worldTimeZonesLow.js
- https://cdn.amcharts.com/lib/5/geodata/worldTimeZoneAreasLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
