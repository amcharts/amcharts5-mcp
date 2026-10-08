---
title: "Map with Bubbles"
source: "https://www.amcharts.com/demos/map-bubbles/"
category: "maps"
scraped: "2026-10-08"
---

A bubble map of world population in 2011: each country gets a bubble at its center, sized by its population and colored by continent.

When a bubble map works: Bubbles show amounts at places without coloring whole countries, so a big country with few people gets a small bubble, not a big patch of color. The map finds the visual center of each country and puts its bubble there. In crowded regions the bubbles overlap; zoom in to separate them.

Good for:
- Population, sales or users by country
- Totals that have nothing to do with area
- A few big values at a glance

Think twice when:
- Rates and shares: color the countries instead
- Exact values: a sorted bar chart
- Small countries packed together: zoom in or cluster

Prompt: Create a world bubble map of population by country in 2011, with a bubble at the center of each country sized by its population and colored by continent, and the country and population in a tooltip. Use the amCharts 5 library with its Responsive theme.

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
    // near-black space behind the satellite picture, shown only with it
    background: am5.Rectangle.new(root, {
      fill: am5.color(0x101318),
      fillOpacity: 0
    }),
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    panX: "rotateX",                   // dragging sideways turns the globe...
    panY: "translateY",                // ...and up and down moves the map
    boxZoom: "shift",                  // hold Shift and drag to zoom into a box
    projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
  }));

// Zoom control
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {})); // + and - zoom buttons

// the home button is hidden by default
zoomControl.homeButton.set("visible", true);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
// it covers the whole sphere, so it doesn't count when the map is fitted to the countries
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  affectsBounds: false
}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
  fillOpacity: 0,  // ...but clear; raise this to color the oceans
  strokeOpacity: 0 // no outline
});
// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
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
  stroke: root.interfaceColors.get("alternativeBackground"), // contrasting with the background...
  strokeOpacity: 0.08 // ...and very faint
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow // the world's countries, in low detail
  })
);

polygonSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"), // the countries in the contrast color...
  fillOpacity: 0.15, // ...faded to a light tint...
  strokeWidth: 0.5,  // ...with thin borders...
  stroke: root.interfaceColors.get("background") // ...in the background color
});

// All bubbles share this template, so they can be changed at once
var circleTemplate = am5.Template.new({
  tooltipText: "{name}: {value.formatNumber('#,###')}", // the name and the population with thousands separators
  stroke: root.interfaceColors.get("background"),       // a ring in the background color...
  strokeWidth: 1.5, // ...1.5px wide...
  strokeOpacity: 0  // ...hidden; raise this to outline the bubbles
});

// Create point series for the bubbles
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var bubbleSeries = chart.series.push(
  am5map.MapPointSeries.new(root, {
    // works out the lowest and highest value, which the heat rule needs
    calculateAggregates: true,
    valueField: "value",
    // each bubble goes to the middle of the country with the same id
    polygonIdField: "id"
  })
);

// a circle on each country, sized by the heat rule below
bubbleSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 10,                     // a starting size; the heat rule sets the real one
      templateField: "circleTemplate" // the fill color from the data's circleTemplate
    }, circleTemplate)
  });
});

// bubble radius from 3px for the smallest population to 30px for the largest
bubbleSeries.set("heatRules", [{
  target: circleTemplate,
  min: 3,
  max: 30,
  key: "radius",
  dataField: "value"
}]);

// the theme's colors; the data picks one per continent, three apart in the list so they don't look alike
var colors = am5.ColorSet.new(root, {});

// Population of each country in 2011, with a color for each continent
bubbleSeries.data.setAll([
  {
    id: "AF",
    name: "Afghanistan",
    value: 32358260,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "AL",
    name: "Albania",
    value: 3215988,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "DZ",
    name: "Algeria",
    value: 35980193,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "AO",
    name: "Angola",
    value: 19618432,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "AR",
    name: "Argentina",
    value: 40764561,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "AM",
    name: "Armenia",
    value: 3100236,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "AU",
    name: "Australia",
    value: 22605732,
    circleTemplate: { fill: colors.getIndex(15) }
  },
  {
    id: "AT",
    name: "Austria",
    value: 8413429,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "AZ",
    name: "Azerbaijan",
    value: 9306023,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "BH",
    name: "Bahrain",
    value: 1323535,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BD",
    name: "Bangladesh",
    value: 150493658,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BY",
    name: "Belarus",
    value: 9559441,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "BE",
    name: "Belgium",
    value: 10754056,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "BJ",
    name: "Benin",
    value: 9099922,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "BT",
    name: "Bhutan",
    value: 738267,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BO",
    name: "Bolivia",
    value: 10088108,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "BA",
    name: "Bosnia and Herzegovina",
    value: 3752228,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "BW",
    name: "Botswana",
    value: 2030738,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "BR",
    name: "Brazil",
    value: 196655014,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "BN",
    name: "Brunei",
    value: 405938,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "BG",
    name: "Bulgaria",
    value: 7446135,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "BF",
    name: "Burkina Faso",
    value: 16967845,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "BI",
    name: "Burundi",
    value: 8575172,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "KH",
    name: "Cambodia",
    value: 14305183,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "CM",
    name: "Cameroon",
    value: 20030362,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CA",
    name: "Canada",
    value: 34349561,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "CV",
    name: "Cape Verde",
    value: 500585,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CF",
    name: "Central African Rep.",
    value: 4486837,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "TD",
    name: "Chad",
    value: 11525496,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CL",
    name: "Chile",
    value: 17269525,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "CN",
    name: "China",
    value: 1347565324,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "CO",
    name: "Colombia",
    value: 46927125,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "KM",
    name: "Comoros",
    value: 753943,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CD",
    name: "Congo, Dem. Rep.",
    value: 67757577,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CG",
    name: "Congo, Rep.",
    value: 4139748,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "CR",
    name: "Costa Rica",
    value: 4726575,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "CI",
    name: "Cote d'Ivoire",
    value: 20152894,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "HR",
    name: "Croatia",
    value: 4395560,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "CU",
    name: "Cuba",
    value: 11253665,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "CY",
    name: "Cyprus",
    value: 1116564,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "CZ",
    name: "Czechia",
    value: 10534293,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "DK",
    name: "Denmark",
    value: 5572594,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "DJ",
    name: "Djibouti",
    value: 905564,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "DO",
    name: "Dominican Rep.",
    value: 10056181,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "EC",
    name: "Ecuador",
    value: 14666055,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "EG",
    name: "Egypt",
    value: 82536770,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "SV",
    name: "El Salvador",
    value: 6227491,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "GQ",
    name: "Equatorial Guinea",
    value: 720213,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "ER",
    name: "Eritrea",
    value: 5415280,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "EE",
    name: "Estonia",
    value: 1340537,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "ET",
    name: "Ethiopia",
    value: 84734262,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "FJ",
    name: "Fiji",
    value: 868406,
    circleTemplate: { fill: colors.getIndex(15) }
  },
  {
    id: "FI",
    name: "Finland",
    value: 5384770,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "FR",
    name: "France",
    value: 63125894,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "GA",
    name: "Gabon",
    value: 1534262,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "GM",
    name: "Gambia",
    value: 1776103,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "GE",
    name: "Georgia",
    value: 4329026,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "DE",
    name: "Germany",
    value: 82162512,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "GH",
    name: "Ghana",
    value: 24965816,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "GR",
    name: "Greece",
    value: 11390031,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "GT",
    name: "Guatemala",
    value: 14757316,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "GN",
    name: "Guinea",
    value: 10221808,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "GW",
    name: "Guinea-Bissau",
    value: 1547061,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "GY",
    name: "Guyana",
    value: 756040,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "HT",
    name: "Haiti",
    value: 10123787,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "HN",
    name: "Honduras",
    value: 7754687,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "HK",
    name: "Hong Kong, China",
    value: 7122187,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "HU",
    name: "Hungary",
    value: 9966116,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "IS",
    name: "Iceland",
    value: 324366,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "IN",
    name: "India",
    value: 1241491960,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ID",
    name: "Indonesia",
    value: 242325638,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IR",
    name: "Iran",
    value: 74798599,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IQ",
    name: "Iraq",
    value: 32664942,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IE",
    name: "Ireland",
    value: 4525802,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "IL",
    name: "Israel",
    value: 7562194,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "IT",
    name: "Italy",
    value: 60788694,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "JM",
    name: "Jamaica",
    value: 2751273,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "JP",
    name: "Japan",
    value: 126497241,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "JO",
    name: "Jordan",
    value: 6330169,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KZ",
    name: "Kazakhstan",
    value: 16206750,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KE",
    name: "Kenya",
    value: 41609728,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "KP",
    name: "North Korea",
    value: 24451285,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KR",
    name: "Korea, Rep.",
    value: 48391343,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KW",
    name: "Kuwait",
    value: 2818042,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "KG",
    name: "Kyrgyzstan",
    value: 5392580,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LA",
    name: "Laos",
    value: 6288037,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LV",
    name: "Latvia",
    value: 2243142,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "LB",
    name: "Lebanon",
    value: 4259405,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "LS",
    name: "Lesotho",
    value: 2193843,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "LR",
    name: "Liberia",
    value: 4128572,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "LY",
    name: "Libya",
    value: 6422772,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "LT",
    name: "Lithuania",
    value: 3307481,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "LU",
    name: "Luxembourg",
    value: 515941,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "MK",
    name: "North Macedonia",
    value: 2063893,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "MG",
    name: "Madagascar",
    value: 21315135,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MW",
    name: "Malawi",
    value: 15380888,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MY",
    name: "Malaysia",
    value: 28859154,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ML",
    name: "Mali",
    value: 15839538,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MR",
    name: "Mauritania",
    value: 3541540,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MU",
    name: "Mauritius",
    value: 1306593,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MX",
    name: "Mexico",
    value: 114793341,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "MD",
    name: "Moldova",
    value: 3544864,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "MN",
    name: "Mongolia",
    value: 2800114,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ME",
    name: "Montenegro",
    value: 632261,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "MA",
    name: "Morocco",
    value: 32272974,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MZ",
    name: "Mozambique",
    value: 23929708,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "MM",
    name: "Myanmar",
    value: 48336763,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "NA",
    name: "Namibia",
    value: 2324004,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "NP",
    name: "Nepal",
    value: 30485798,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "NL",
    name: "Netherlands",
    value: 16664746,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "NZ",
    name: "New Zealand",
    value: 4414509,
    circleTemplate: { fill: colors.getIndex(15) }
  },
  {
    id: "NI",
    name: "Nicaragua",
    value: 5869859,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "NE",
    name: "Niger",
    value: 16068994,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "NG",
    name: "Nigeria",
    value: 162470737,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "NO",
    name: "Norway",
    value: 4924848,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "OM",
    name: "Oman",
    value: 2846145,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PK",
    name: "Pakistan",
    value: 176745364,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PA",
    name: "Panama",
    value: 3571185,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "PG",
    name: "Papua New Guinea",
    value: 7013829,
    circleTemplate: { fill: colors.getIndex(15) }
  },
  {
    id: "PY",
    name: "Paraguay",
    value: 6568290,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "PE",
    name: "Peru",
    value: 29399817,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "PH",
    name: "Philippines",
    value: 94852030,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "PL",
    name: "Poland",
    value: 38298949,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "PT",
    name: "Portugal",
    value: 10689663,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "PR",
    name: "Puerto Rico",
    value: 3745526,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "QA",
    name: "Qatar",
    value: 1870041,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "RO",
    name: "Romania",
    value: 21436495,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "RU",
    name: "Russia",
    value: 142835555,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "RW",
    name: "Rwanda",
    value: 10942950,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "SA",
    name: "Saudi Arabia",
    value: 28082541,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SN",
    name: "Senegal",
    value: 12767556,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "RS",
    name: "Serbia",
    value: 9853969,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "SL",
    name: "Sierra Leone",
    value: 5997486,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "SG",
    name: "Singapore",
    value: 5187933,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SK",
    name: "Slovak Republic",
    value: 5471502,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "SI",
    name: "Slovenia",
    value: 2035012,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "SB",
    name: "Solomon Islands",
    value: 552267,
    circleTemplate: { fill: colors.getIndex(15) }
  },
  {
    id: "SO",
    name: "Somalia",
    value: 9556873,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "ZA",
    name: "South Africa",
    value: 50459978,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "ES",
    name: "Spain",
    value: 46454895,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "LK",
    name: "Sri Lanka",
    value: 21045394,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "SD",
    name: "Sudan",
    value: 34735288,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "SR",
    name: "Suriname",
    value: 529419,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "SZ",
    name: "Eswatini",
    value: 1203330,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "SE",
    name: "Sweden",
    value: 9440747,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "CH",
    name: "Switzerland",
    value: 7701690,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "SY",
    name: "Syria",
    value: 20766037,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TW",
    name: "Taiwan",
    value: 23072000,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TJ",
    name: "Tajikistan",
    value: 6976958,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TZ",
    name: "Tanzania",
    value: 46218486,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "TH",
    name: "Thailand",
    value: 69518555,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "TG",
    name: "Togo",
    value: 6154813,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "TT",
    name: "Trinidad and Tobago",
    value: 1346350,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "TN",
    name: "Tunisia",
    value: 10594057,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "TR",
    name: "Türkiye",
    value: 73639596,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "TM",
    name: "Turkmenistan",
    value: 5105301,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "UG",
    name: "Uganda",
    value: 34509205,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "UA",
    name: "Ukraine",
    value: 45190180,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "AE",
    name: "United Arab Emirates",
    value: 7890924,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "GB",
    name: "United Kingdom",
    value: 62417431,
    circleTemplate: { fill: colors.getIndex(6) }
  },
  {
    id: "US",
    name: "United States",
    value: 313085380,
    circleTemplate: { fill: colors.getIndex(9) }
  },
  {
    id: "UY",
    name: "Uruguay",
    value: 3380008,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "UZ",
    name: "Uzbekistan",
    value: 27760267,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "VE",
    name: "Venezuela",
    value: 29436891,
    circleTemplate: { fill: colors.getIndex(12) }
  },
  {
    id: "PS",
    name: "West Bank and Gaza",
    value: 4152369,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "VN",
    name: "Vietnam",
    value: 88791996,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "YE",
    name: "Yemen, Rep.",
    value: 24799880,
    circleTemplate: { fill: colors.getIndex(0) }
  },
  {
    id: "ZM",
    name: "Zambia",
    value: 13474959,
    circleTemplate: { fill: colors.getIndex(3) }
  },
  {
    id: "ZW",
    name: "Zimbabwe",
    value: 12754378,
    circleTemplate: { fill: colors.getIndex(3) }
  }
]);

// The image credit
var credit = chart.children.push(am5.Label.new(root, {
  text: "Imagery: NASA Earth Observatory",
  fontSize: 12,              // small...
  fill: am5.color(0xffffff), // ...white...
  fillOpacity: 0.6,          // ...slightly faded text
  x: am5.p100,               // at the right edge...
  centerX: am5.p100,         // ...anchored by its right end...
  dx: -10,                   // ...10px in from it
  y: 10,                     // 10px from the top
  visible: false             // shown only with the satellite picture
}));

// The countries' own look, to go back to
var landTemplate = polygonSeries.mapPolygons.template;
var landLook = {
  fillOpacity: landTemplate.get("fillOpacity", 1),
  stroke: landTemplate.get("stroke", root.interfaceColors.get("background")),
  strokeOpacity: landTemplate.get("strokeOpacity", 1)
};

// The picture loads the first time it shows. Then the countries turn to white outlines over it, the grid lines
// turn white, the credit shows and the map sits in near-black space
satelliteSeries.on("visible", function(visible) {
  if (visible) {
    satelliteSeries.set("src", "https://cdn.amcharts.com/lib/5/geodata/images/earthDay2048.jpg");
  }
  credit.set("visible", visible);
  chart.get("background").set("fillOpacity", visible ? 1 : 0);
  landTemplate.setAll(visible ? { fillOpacity: 0, stroke: am5.color(0xffffff), strokeOpacity: 0.6 } : landLook);
  graticuleSeries.mapLines.template.set("stroke", visible ? am5.color(0xffffff) : root.interfaceColors.get("alternativeBackground"));
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
  height: 600px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
