---
title: "Location-Sensitive Map"
source: "https://www.amcharts.com/demos/location-sensitive-map/"
category: "maps"
scraped: "2026-10-08"
---

A map that loads the visitor’s own country: it looks up your country from your IP address, then loads that country’s map with a random value for each region. Where the lookup can’t answer, it goes by your browser’s language setting.

When to localize a map: Opening on the visitor’s own country makes a map feel personal and saves them from hunting for it on a world map. It suits store finders, regional results and sales dashboards. Keep a way to switch countries, as an IP lookup can be wrong, for example behind a VPN.

Good for:
- Store and dealer finders
- Regional results for each visitor
- Dashboards with data for each country

Think twice when:
- Visitors comparing countries: show the world map
- Privacy-minded readers: say why you guess their country
- Exact locations: ask the browser, with the visitor’s permission

Prompt: Create a map of the visitor’s own country, found from their IP address or, failing that, their browser’s language, and loaded from the amCharts geodata. Color its regions by random values as a heat map, with a heat legend and the country’s name above the map. Use the amCharts 5 library with its Responsive theme.

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

// Colors from the theme, so the map follows the theme
var colors = am5.ColorSet.new(root, {});

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  minZoomLevel: 0.5, // can zoom out to half the fitted size
  // go to the home view once the map is fitted
  autoHome: true,
  panX: "translateX",               // dragging moves the map sideways...
  panY: "translateY",               // ...and up and down (the Albers USA projection can't turn)
  projection: am5map.geoMercator(), // the starting projection; loadGeodata() may switch it
  boxZoom: "shift",                 // hold Shift and drag to zoom into a box
  layout: root.horizontalLayout,    // the map and the heat legend side by side
  // room at the top for the country's name
  paddingTop: 36
}));

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {
  position: "absolute" // + and - zoom buttons over the map, left out of the side-by-side layout
}));

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Find the visitor's country from their IP address with amCharts' lookup service. The service only answers pages
// on amcharts.com, so anywhere else (or if it fails) the map falls back to the country in the browser's language
// setting, such as "US" in "en-US".
am5.net.load("https://www.amcharts.com/tools/country/?v=xz6Z", chart).then(function (result) {
  var geo = am5.JSONParser.parse(result.response);
  loadGeodata(geo.country_code);
}).catch(function () {
  var region = (navigator.language || "").split("-")[1];
  loadGeodata(region ? region.toUpperCase() : "US");
});

// Create polygon series for the country's regions, filled by value
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  // works out the lowest and highest value, which the heat rules and the legend use
  calculateAggregates: true,
  valueField: "value"
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}", // the region's name and value on hover
  interactive: true               // reacts to the pointer, for the hover color below
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: colors.getIndex(9) // the hovered region turns another theme color
});

// the regions are shaded from light to dark by value
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value",
  min: am5.Color.lighten(colors.getIndex(0), 0.6),   // the lowest value: a light shade of the first color...
  max: am5.Color.brighten(colors.getIndex(0), -0.5), // ...the highest: a dark one
  key: "fill" // the rule sets the fill
}]);

// hovering a region marks its value on the heat legend
polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

// loads the regions map of a country (by its two-letter code) with random values
function loadGeodata(country) {

  // The country's map, or the United States where there is no map for the country
  var countryData = am5geodata_data_countries2[country];
  if (!countryData || !countryData.maps.length) {
    country = "US";
    countryData = am5geodata_data_countries2.US;
  }

  // The Albers USA projection puts Alaska and Hawaii next to the other states
  if (country == "US") {
    chart.set("projection", am5map.geoAlbersUsa());
  }
  else {
    chart.set("projection", am5map.geoMercator());
  }

  // Load the map and give each region a random value
  am5.net.load("https://cdn.amcharts.com/lib/5/geodata/json/" + countryData.maps[0] + ".json", chart).then(function (result) {
    var geodata = am5.JSONParser.parse(result.response);
    var data = [];
    for (var i = 0; i < geodata.features.length; i++) {
      data.push({
        id: geodata.features[i].id,
        value: Math.round(Math.random() * 10000) // a random value up to 10,000
      });
    }

    polygonSeries.set("geoJSON", geodata); // the regions' shapes
    polygonSeries.data.setAll(data);
  });

  // Country name above the map: "absolute" keeps it out of the layout that puts the map and heat legend side by side
  chart.children.push(am5.Label.new(root, {
    position: "absolute",
    x: 0,                     // the top left corner
    y: 0,
    fontSize: 20,             // larger text
    text: countryData.country // the country's name from the countries list
  }));
}

// a color scale beside the map, in the same colors as the heat rules
var heatLegend = chart.children.push(
  am5.HeatLegend.new(root, {
    orientation: "vertical", // standing upright
    startColor: am5.Color.lighten(colors.getIndex(0), 0.6), // the lowest color...
    endColor: am5.Color.brighten(colors.getIndex(0), -0.5), // ...and the highest, the same as in the heat rules
    startText: "Lowest", // words at the ends instead of numbers
    endText: "Highest",
    stepCount: 5         // five blocks of color instead of a smooth gradient
  })
);

// the zoom buttons keep to the left of the heat legend
heatLegend.events.on("boundschanged", function () {
  zoomControl.set("dx", -heatLegend.width());
});

// smaller labels on the heat legend
heatLegend.startLabel.setAll({
  fontSize: 12
});

heatLegend.endLabel.setAll({
  fontSize: 12
});

// the legend runs from the lowest value to the highest
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/geodata/data/countries2.js
