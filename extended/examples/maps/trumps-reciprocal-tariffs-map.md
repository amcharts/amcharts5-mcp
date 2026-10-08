---
title: "Trump’s Reciprocal Tariffs Map"
source: "https://www.amcharts.com/demos/trumps-reciprocal-tariffs-map/"
category: "maps"
scraped: "2026-10-08"
---

A world heat map of US reciprocal tariff rates by country from April 2025, as first announced and as updated: the darker the color, the higher the rate.

One number per country: A heat map, or choropleth, colors each country by its value, so the pattern across the world shows at a glance, and the heat legend ties the colors back to numbers. Two sets of data on one map make a before-and-after view: in the updated set, every rate is 10% except China's, which rises to 125%. Countries that are not in the data stay a plain gray.

Good for:
- Rates, shares and scores by country
- Before-and-after views on one map
- Rules that differ from country to country

Think twice when:
- Big countries catch the eye whatever their value: add a ranked bar chart
- Small island countries: hard to see, list them as well
- Counts like population: bubbles suit totals better

Prompt: Create a world heat map of the US reciprocal tariff rates announced in April 2025, shading each country from light to dark by its rate, with the rate in a tooltip and a heat legend that marks the rate of the country under the pointer. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// US reciprocal tariff rates by country, in percent, from April 2025: the rates
// as first announced, and as updated
var data = [
  {
    "id": "CN",
    "announced": 34,
    "updated": 125
  },
  {
    "id": "AT",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "BE",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "BG",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "HR",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "CY",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "CZ",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "DK",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "EE",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "FI",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "FR",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "DE",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "GR",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "HU",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "IE",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "IT",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "LV",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "LT",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "LU",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "MT",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "NL",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "PL",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "PT",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "RO",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "SK",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "SI",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "ES",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "SE",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "VN",
    "announced": 46,
    "updated": 10
  },
  {
    "id": "TW",
    "announced": 32,
    "updated": 10
  },
  {
    "id": "JP",
    "announced": 24,
    "updated": 10
  },
  {
    "id": "IN",
    "announced": 26,
    "updated": 10
  },
  {
    "id": "TH",
    "announced": 36,
    "updated": 10
  },
  {
    "id": "CH",
    "announced": 31,
    "updated": 10
  },
  {
    "id": "ID",
    "announced": 32,
    "updated": 10
  },
  {
    "id": "MY",
    "announced": 24,
    "updated": 10
  },
  {
    "id": "KH",
    "announced": 49,
    "updated": 10
  },
  {
    "id": "GB",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "ZA",
    "announced": 30,
    "updated": 10
  },
  {
    "id": "BR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BD",
    "announced": 37,
    "updated": 10
  },
  {
    "id": "SG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "IL",
    "announced": 17,
    "updated": 10
  },
  {
    "id": "PH",
    "announced": 17,
    "updated": 10
  },
  {
    "id": "CL",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AU",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PK",
    "announced": 29,
    "updated": 10
  },
  {
    "id": "TR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "LK",
    "announced": 44,
    "updated": 10
  },
  {
    "id": "CO",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NI",
    "announced": 18,
    "updated": 10
  },
  {
    "id": "NO",
    "announced": 15,
    "updated": 10
  },
  {
    "id": "CR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "JO",
    "announced": 20,
    "updated": 10
  },
  {
    "id": "DO",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "EC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GT",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "HN",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MG",
    "announced": 47,
    "updated": 10
  },
  {
    "id": "MM",
    "announced": 44,
    "updated": 10
  },
  {
    "id": "TN",
    "announced": 28,
    "updated": 10
  },
  {
    "id": "KZ",
    "announced": 27,
    "updated": 10
  },
  {
    "id": "RS",
    "announced": 37,
    "updated": 10
  },
  {
    "id": "EG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SV",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BW",
    "announced": 37,
    "updated": 10
  },
  {
    "id": "TT",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "DZ",
    "announced": 30,
    "updated": 10
  },
  {
    "id": "OM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "UY",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BS",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "LS",
    "announced": 50,
    "updated": 10
  },
  {
    "id": "UA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BH",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "QA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MU",
    "announced": 40,
    "updated": 10
  },
  {
    "id": "FJ",
    "announced": 32,
    "updated": 10
  },
  {
    "id": "IS",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "LI",
    "announced": 37,
    "updated": 10
  },
  {
    "id": "GY",
    "announced": 38,
    "updated": 10
  },
  {
    "id": "HT",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BA",
    "announced": 35,
    "updated": 10
  },
  {
    "id": "NG",
    "announced": 14,
    "updated": 10
  },
  {
    "id": "NA",
    "announced": 21,
    "updated": 10
  },
  {
    "id": "BO",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "VE",
    "announced": 15,
    "updated": 10
  },
  {
    "id": "MK",
    "announced": 33,
    "updated": 10
  },
  {
    "id": "ET",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GH",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MD",
    "announced": 31,
    "updated": 10
  },
  {
    "id": "AO",
    "announced": 32,
    "updated": 10
  },
  {
    "id": "JM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MZ",
    "announced": 16,
    "updated": 10
  },
  {
    "id": "PY",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "ZM",
    "announced": 17,
    "updated": 10
  },
  {
    "id": "LB",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CD",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CI",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "IQ",
    "announced": 39,
    "updated": 10
  },
  {
    "id": "GE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SN",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CM",
    "announced": 11,
    "updated": 10
  },
  {
    "id": "UG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AL",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NP",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GA",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KW",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MW",
    "announced": 17,
    "updated": 10
  },
  {
    "id": "LR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "VG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "ZW",
    "announced": 18,
    "updated": 10
  },
  {
    "id": "BJ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BB",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "UZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "DJ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KY",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CW",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "VU",
    "announced": 22,
    "updated": 10
  },
  {
    "id": "RW",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SL",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MN",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SZ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MH",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "PM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KN",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GD",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SD",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AW",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "ME",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KG",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "YE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "VC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NE",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "LC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NR",
    "announced": 30,
    "updated": 10
  },
  {
    "id": "GQ",
    "announced": 13,
    "updated": 10
  },
  {
    "id": "LY",
    "announced": 31,
    "updated": 10
  },
  {
    "id": "WS",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GN",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TL",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MS",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TD",
    "announced": 13,
    "updated": 10
  },
  {
    "id": "ML",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MV",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TJ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CV",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BI",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GP",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "BT",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MQ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TO",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "MR",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "DM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CX",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AD",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SB",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "YT",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "AI",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CC",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "ER",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "CK",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SS",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KM",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "KI",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "NF",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GI",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TV",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "IO",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "TK",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "GW",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "SJ",
    "announced": 10,
    "updated": 10
  },
  {
    "id": "RE",
    "announced": 10,
    "updated": 10
  }
]

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// a theme of its own, for the label size below
var myTheme = am5.Theme.new(root);

myTheme.rule("Label").setAll({
  fontSize: "0.8em" // every label at 80% of the chart's text size
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme, am5themes_Responsive.new(root)]);

// Colors from the theme, so the map follows the theme: the rates and the buttons in its first color
var colors = am5.ColorSet.new(root, {});
var mainColor = colors.getIndex(0); // the theme's first color

// Button colors in the main color, for any buttons on the map (a zoom control, for one)
root.interfaceColors.setAll({
  primaryButton: mainColor, // a button at rest...
  primaryButtonHover: am5.Color.lighten(mainColor, 0.2), // ...lighter under the mouse...
  primaryButtonDown: am5.Color.lighten(mainColor, -0.2), // ...darker while pressed...
  primaryButtonActive: am5.Color.lighten(mainColor, 0.7) // ...and much lighter while switched on
});

// Every number on the map is a rate in percent: in tooltips and on the heat legend
// https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#'%'");

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  // the map can zoom out to half its fitted size
  minZoomLevel: 0.5,
  // go to the home view once the map is fitted
  autoHome: true,
  projection: am5map.geoEqualEarth() // equal-area: countries keep their true relative size
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

// Create graticule series
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {
  step: 10 // a line every 10 degrees
}));

graticuleSeries.mapLines.template.set("strokeOpacity", 0.05); // faint lines

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow, // the world's countries, in low detail
  valueField: "announced",      // the rates as first announced color the map
  // works out the lowest and highest rate, for the heat rule and the legend
  calculateAggregates: true
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}: {value}",
  // countries that are not in the data: a gray close to the background
  fill: am5.Color.interpolate(0.15, root.interfaceColors.get("background"), root.interfaceColors.get("alternativeBackground")),
  stroke: root.interfaceColors.get("background") // borders in the background color
});

// Countries that are not in the data say so
polygonSeries.mapPolygons.template.adapters.add("tooltipText", function (text, target) {
  return target.dataItem.get("value") == null ? "{name}: not in the data" : text;
});

// The higher the rate, the darker the color
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
polygonSeries.set("heatRules", [{
  target: polygonSeries.mapPolygons.template,
  dataField: "value", // by each country's value, the rate
  min: am5.Color.lighten(mainColor, 0.6), // the lowest rate in a light tint of the main color...
  max: am5.Color.brighten(mainColor, -0.5), // ...the highest in a dark shade of it
  key: "fill" // the setting the rule changes
}]);

polygonSeries.data.setAll(data);

// Create heat legend
// https://www.amcharts.com/docs/v5/charts/map-chart/#Heat_legend
var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
  orientation: "vertical",                       // a bar that runs up and down
  startColor: am5.Color.lighten(mainColor, 0.6), // the same colors as the heat rule
  endColor: am5.Color.brighten(mainColor, -0.5),
  // 8 blocks of color instead of a smooth gradient
  stepCount: 8,
  x: am5.p100, // at the right edge...
  centerX: am5.p100,
  y: am5.percent(10), // ...from 10% down
  height: am5.percent(60), // 60% of the map's height, which leaves the zoom buttons room below it
  paddingRight: 20         // a little room from the edge
}));

heatLegend.startLabel.setAll({
  fontSize: 12
});

heatLegend.endLabel.setAll({
  fontSize: 12
});

// The legend runs from the lowest rate to the highest
polygonSeries.events.on("datavalidated", function () {
  heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
  heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
});

// Point at a country to see where its rate sits on the legend
polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
  heatLegend.showValue(ev.target.dataItem.get("value"));
});

// Add zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // a button that goes back to the home view
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
