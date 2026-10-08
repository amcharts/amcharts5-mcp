---
title: "Motion Chart"
source: "https://www.amcharts.com/demos/motion-chart/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A Gapminder-style motion chart of made-up data: each bubble is a country, colored by continent and sized by a third value. Press play for 1903 to 2025.

When a motion chart works: A motion chart is a bubble chart with time added: two values on the axes, a third in the size, and the years played as an animation. It shows how whole groups move together and which items break away. Nobody can follow 245 bubbles at once, so give people ways to pick some out, like the paths and the map here.

Good for:
- Income, health and population by country over decades
- Talks and presentations that walk through the change
- Showing groups that move together, or drift apart

Think twice when:
- Exact values for one year: a still chart or a table is clearer
- Print and PDF reports, where nothing moves
- Two or three items: a line chart shows every year at once

Prompt: Create a Gapminder-style motion chart of the world’s countries as bubbles with made-up data from 1903 to 2025, colored by continent, with a play button and a slider for the years. Clicking a bubble draws its path through the years, and a small world map filters the bubbles by continent. Use the amCharts 5 library with its Responsive theme.

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

var colorSet = am5.ColorSet.new(root, { step: 2 }); // every second theme color, so the continents differ more

var colors = { // one color per continent
  EU: colorSet.getIndex(0),
  NA: colorSet.getIndex(2),
  SA: colorSet.getIndex(4),
  AS: colorSet.getIndex(6),
  AF: colorSet.getIndex(8),
  OC: colorSet.getIndex(10),
}

var countries = { // every country's name and continent
  "AF": { "name": "Afghanistan", "continent": "AS" },
  "AX": { "name": "Aland Islands", "continent": "EU" },
  "AL": { "name": "Albania", "continent": "EU" },
  "DZ": { "name": "Algeria", "continent": "AF" },
  "AS": { "name": "American Samoa", "continent": "OC" },
  "AD": { "name": "Andorra", "continent": "EU" },
  "AO": { "name": "Angola", "continent": "AF" },
  "AI": { "name": "Anguilla", "continent": "NA" },
  "AG": { "name": "Antigua and Barbuda", "continent": "NA" },
  "AR": { "name": "Argentina", "continent": "SA" },
  "AM": { "name": "Armenia", "continent": "AS" },
  "AW": { "name": "Aruba", "continent": "NA" },
  "AU": { "name": "Australia", "continent": "OC" },
  "AT": { "name": "Austria", "continent": "EU" },
  "AZ": { "name": "Azerbaijan", "continent": "AS" },
  "BS": { "name": "Bahamas", "continent": "NA" },
  "BH": { "name": "Bahrain", "continent": "AS" },
  "BD": { "name": "Bangladesh", "continent": "AS" },
  "BB": { "name": "Barbados", "continent": "NA" },
  "BY": { "name": "Belarus", "continent": "EU" },
  "BE": { "name": "Belgium", "continent": "EU" },
  "BZ": { "name": "Belize", "continent": "NA" },
  "BJ": { "name": "Benin", "continent": "AF" },
  "BM": { "name": "Bermuda", "continent": "NA" },
  "BT": { "name": "Bhutan", "continent": "AS" },
  "BO": { "name": "Bolivia", "continent": "SA" },
  "BQ": { "name": "Bonaire, Sint Eustatius and Saba", "continent": "NA" },
  "BA": { "name": "Bosnia and Herzegovina", "continent": "EU" },
  "BW": { "name": "Botswana", "continent": "AF" },
  "BR": { "name": "Brazil", "continent": "SA" },
  "IO": { "name": "British Indian Ocean Territory", "continent": "AS" },
  "BN": { "name": "Brunei Darussalam", "continent": "AS" },
  "BG": { "name": "Bulgaria", "continent": "EU" },
  "BF": { "name": "Burkina Faso", "continent": "AF" },
  "BI": { "name": "Burundi", "continent": "AF" },
  "KH": { "name": "Cambodia", "continent": "AS" },
  "CM": { "name": "Cameroon", "continent": "AF" },
  "CA": { "name": "Canada", "continent": "NA" },
  "CV": { "name": "Cape Verde", "continent": "AF" },
  "KY": { "name": "Cayman Islands", "continent": "NA" },
  "CF": { "name": "Central African Republic", "continent": "AF" },
  "TD": { "name": "Chad", "continent": "AF" },
  "CL": { "name": "Chile", "continent": "SA" },
  "CN": { "name": "China", "continent": "AS" },
  "CX": { "name": "Christmas Island", "continent": "AS" },
  "CC": { "name": "Cocos (Keeling) Islands", "continent": "AS" },
  "CO": { "name": "Colombia", "continent": "SA" },
  "KM": { "name": "Comoros", "continent": "AF" },
  "CG": { "name": "Congo", "continent": "AF" },
  "CD": { "name": "Congo, Democratic Republic of the Congo", "continent": "AF" },
  "CK": { "name": "Cook Islands", "continent": "OC" },
  "CR": { "name": "Costa Rica", "continent": "NA" },
  "CI": { "name": "Cote D'Ivoire", "continent": "AF" },
  "HR": { "name": "Croatia", "continent": "EU" },
  "CU": { "name": "Cuba", "continent": "NA" },
  "CW": { "name": "Curacao", "continent": "NA" },
  "CY": { "name": "Cyprus", "continent": "AS" },
  "CZ": { "name": "Czechia", "continent": "EU" },
  "DK": { "name": "Denmark", "continent": "EU" },
  "DJ": { "name": "Djibouti", "continent": "AF" },
  "DM": { "name": "Dominica", "continent": "NA" },
  "DO": { "name": "Dominican Republic", "continent": "NA" },
  "EC": { "name": "Ecuador", "continent": "SA" },
  "EG": { "name": "Egypt", "continent": "AF" },
  "SV": { "name": "El Salvador", "continent": "NA" },
  "GQ": { "name": "Equatorial Guinea", "continent": "AF" },
  "ER": { "name": "Eritrea", "continent": "AF" },
  "EE": { "name": "Estonia", "continent": "EU" },
  "SZ": { "name": "Eswatini", "continent": "AF" },
  "ET": { "name": "Ethiopia", "continent": "AF" },
  "FK": { "name": "Falkland Islands (Malvinas)", "continent": "SA" },
  "FO": { "name": "Faroe Islands", "continent": "EU" },
  "FJ": { "name": "Fiji", "continent": "OC" },
  "FI": { "name": "Finland", "continent": "EU" },
  "FR": { "name": "France", "continent": "EU" },
  "GF": { "name": "French Guiana", "continent": "SA" },
  "PF": { "name": "French Polynesia", "continent": "OC" },
  "GA": { "name": "Gabon", "continent": "AF" },
  "GM": { "name": "Gambia", "continent": "AF" },
  "GE": { "name": "Georgia", "continent": "AS" },
  "DE": { "name": "Germany", "continent": "EU" },
  "GH": { "name": "Ghana", "continent": "AF" },
  "GI": { "name": "Gibraltar", "continent": "EU" },
  "GR": { "name": "Greece", "continent": "EU" },
  "GL": { "name": "Greenland", "continent": "NA" },
  "GD": { "name": "Grenada", "continent": "NA" },
  "GP": { "name": "Guadeloupe", "continent": "NA" },
  "GU": { "name": "Guam", "continent": "OC" },
  "GT": { "name": "Guatemala", "continent": "NA" },
  "GG": { "name": "Guernsey", "continent": "EU" },
  "GN": { "name": "Guinea", "continent": "AF" },
  "GW": { "name": "Guinea-Bissau", "continent": "AF" },
  "GY": { "name": "Guyana", "continent": "SA" },
  "HT": { "name": "Haiti", "continent": "NA" },
  "VA": { "name": "Holy See (Vatican City State)", "continent": "EU" },
  "HN": { "name": "Honduras", "continent": "NA" },
  "HK": { "name": "Hong Kong", "continent": "AS" },
  "HU": { "name": "Hungary", "continent": "EU" },
  "IS": { "name": "Iceland", "continent": "EU" },
  "IN": { "name": "India", "continent": "AS" },
  "ID": { "name": "Indonesia", "continent": "AS" },
  "IR": { "name": "Iran, Islamic Republic of", "continent": "AS" },
  "IQ": { "name": "Iraq", "continent": "AS" },
  "IE": { "name": "Ireland", "continent": "EU" },
  "IM": { "name": "Isle of Man", "continent": "EU" },
  "IL": { "name": "Israel", "continent": "AS" },
  "IT": { "name": "Italy", "continent": "EU" },
  "JM": { "name": "Jamaica", "continent": "NA" },
  "JP": { "name": "Japan", "continent": "AS" },
  "JE": { "name": "Jersey", "continent": "EU" },
  "JO": { "name": "Jordan", "continent": "AS" },
  "KZ": { "name": "Kazakhstan", "continent": "AS" },
  "KE": { "name": "Kenya", "continent": "AF" },
  "KI": { "name": "Kiribati", "continent": "OC" },
  "KP": { "name": "Korea, Democratic People's Republic of", "continent": "AS" },
  "KR": { "name": "Korea, Republic of", "continent": "AS" },
  "XK": { "name": "Kosovo", "continent": "EU" },
  "KW": { "name": "Kuwait", "continent": "AS" },
  "KG": { "name": "Kyrgyzstan", "continent": "AS" },
  "LA": { "name": "Lao People's Democratic Republic", "continent": "AS" },
  "LV": { "name": "Latvia", "continent": "EU" },
  "LB": { "name": "Lebanon", "continent": "AS" },
  "LS": { "name": "Lesotho", "continent": "AF" },
  "LR": { "name": "Liberia", "continent": "AF" },
  "LY": { "name": "Libya", "continent": "AF" },
  "LI": { "name": "Liechtenstein", "continent": "EU" },
  "LT": { "name": "Lithuania", "continent": "EU" },
  "LU": { "name": "Luxembourg", "continent": "EU" },
  "MO": { "name": "Macao", "continent": "AS" },
  "MG": { "name": "Madagascar", "continent": "AF" },
  "MW": { "name": "Malawi", "continent": "AF" },
  "MY": { "name": "Malaysia", "continent": "AS" },
  "MV": { "name": "Maldives", "continent": "AS" },
  "ML": { "name": "Mali", "continent": "AF" },
  "MT": { "name": "Malta", "continent": "EU" },
  "MH": { "name": "Marshall Islands", "continent": "OC" },
  "MQ": { "name": "Martinique", "continent": "NA" },
  "MR": { "name": "Mauritania", "continent": "AF" },
  "MU": { "name": "Mauritius", "continent": "AF" },
  "YT": { "name": "Mayotte", "continent": "AF" },
  "MX": { "name": "Mexico", "continent": "NA" },
  "FM": { "name": "Micronesia, Federated States of", "continent": "OC" },
  "MD": { "name": "Moldova, Republic of", "continent": "EU" },
  "MC": { "name": "Monaco", "continent": "EU" },
  "MN": { "name": "Mongolia", "continent": "AS" },
  "ME": { "name": "Montenegro", "continent": "EU" },
  "MS": { "name": "Montserrat", "continent": "NA" },
  "MA": { "name": "Morocco", "continent": "AF" },
  "MZ": { "name": "Mozambique", "continent": "AF" },
  "MM": { "name": "Myanmar", "continent": "AS" },
  "NA": { "name": "Namibia", "continent": "AF" },
  "NR": { "name": "Nauru", "continent": "OC" },
  "NP": { "name": "Nepal", "continent": "AS" },
  "NL": { "name": "Netherlands", "continent": "EU" },
  "NC": { "name": "New Caledonia", "continent": "OC" },
  "NZ": { "name": "New Zealand", "continent": "OC" },
  "NI": { "name": "Nicaragua", "continent": "NA" },
  "NE": { "name": "Niger", "continent": "AF" },
  "NG": { "name": "Nigeria", "continent": "AF" },
  "NU": { "name": "Niue", "continent": "OC" },
  "NF": { "name": "Norfolk Island", "continent": "OC" },
  "MK": { "name": "North Macedonia", "continent": "EU" },
  "MP": { "name": "Northern Mariana Islands", "continent": "OC" },
  "NO": { "name": "Norway", "continent": "EU" },
  "OM": { "name": "Oman", "continent": "AS" },
  "PK": { "name": "Pakistan", "continent": "AS" },
  "PW": { "name": "Palau", "continent": "OC" },
  "PS": { "name": "Palestinian Territory, Occupied", "continent": "AS" },
  "PA": { "name": "Panama", "continent": "NA" },
  "PG": { "name": "Papua New Guinea", "continent": "OC" },
  "PY": { "name": "Paraguay", "continent": "SA" },
  "PE": { "name": "Peru", "continent": "SA" },
  "PH": { "name": "Philippines", "continent": "AS" },
  "PN": { "name": "Pitcairn", "continent": "OC" },
  "PL": { "name": "Poland", "continent": "EU" },
  "PT": { "name": "Portugal", "continent": "EU" },
  "PR": { "name": "Puerto Rico", "continent": "NA" },
  "QA": { "name": "Qatar", "continent": "AS" },
  "RE": { "name": "Reunion", "continent": "AF" },
  "RO": { "name": "Romania", "continent": "EU" },
  "RU": { "name": "Russian Federation", "continent": "AS" },
  "RW": { "name": "Rwanda", "continent": "AF" },
  "BL": { "name": "Saint Barthelemy", "continent": "NA" },
  "SH": { "name": "Saint Helena", "continent": "AF" },
  "KN": { "name": "Saint Kitts and Nevis", "continent": "NA" },
  "LC": { "name": "Saint Lucia", "continent": "NA" },
  "MF": { "name": "Saint Martin", "continent": "NA" },
  "PM": { "name": "Saint Pierre and Miquelon", "continent": "NA" },
  "VC": { "name": "Saint Vincent and the Grenadines", "continent": "NA" },
  "WS": { "name": "Samoa", "continent": "OC" },
  "SM": { "name": "San Marino", "continent": "EU" },
  "ST": { "name": "Sao Tome and Principe", "continent": "AF" },
  "SA": { "name": "Saudi Arabia", "continent": "AS" },
  "SN": { "name": "Senegal", "continent": "AF" },
  "RS": { "name": "Serbia", "continent": "EU" },
  "SC": { "name": "Seychelles", "continent": "AF" },
  "SL": { "name": "Sierra Leone", "continent": "AF" },
  "SG": { "name": "Singapore", "continent": "AS" },
  "SX": { "name": "Sint Maarten", "continent": "NA" },
  "SK": { "name": "Slovakia", "continent": "EU" },
  "SI": { "name": "Slovenia", "continent": "EU" },
  "SB": { "name": "Solomon Islands", "continent": "OC" },
  "SO": { "name": "Somalia", "continent": "AF" },
  "ZA": { "name": "South Africa", "continent": "AF" },
  "SS": { "name": "South Sudan", "continent": "AF" },
  "ES": { "name": "Spain", "continent": "EU" },
  "LK": { "name": "Sri Lanka", "continent": "AS" },
  "SD": { "name": "Sudan", "continent": "AF" },
  "SR": { "name": "Suriname", "continent": "SA" },
  "SJ": { "name": "Svalbard and Jan Mayen", "continent": "EU" },
  "SE": { "name": "Sweden", "continent": "EU" },
  "CH": { "name": "Switzerland", "continent": "EU" },
  "SY": { "name": "Syrian Arab Republic", "continent": "AS" },
  "TW": { "name": "Taiwan, Province of China", "continent": "AS" },
  "TJ": { "name": "Tajikistan", "continent": "AS" },
  "TZ": { "name": "Tanzania, United Republic of", "continent": "AF" },
  "TH": { "name": "Thailand", "continent": "AS" },
  "TL": { "name": "Timor-Leste", "continent": "AS" },
  "TG": { "name": "Togo", "continent": "AF" },
  "TK": { "name": "Tokelau", "continent": "OC" },
  "TO": { "name": "Tonga", "continent": "OC" },
  "TT": { "name": "Trinidad and Tobago", "continent": "NA" },
  "TN": { "name": "Tunisia", "continent": "AF" },
  "TR": { "name": "Türkiye", "continent": "AS" },
  "TM": { "name": "Turkmenistan", "continent": "AS" },
  "TC": { "name": "Turks and Caicos Islands", "continent": "NA" },
  "TV": { "name": "Tuvalu", "continent": "OC" },
  "UG": { "name": "Uganda", "continent": "AF" },
  "UA": { "name": "Ukraine", "continent": "EU" },
  "AE": { "name": "United Arab Emirates", "continent": "AS" },
  "GB": { "name": "United Kingdom", "continent": "EU" },
  "US": { "name": "United States", "continent": "NA" },
  "UM": { "name": "United States Minor Outlying Islands", "continent": "NA" },
  "UY": { "name": "Uruguay", "continent": "SA" },
  "UZ": { "name": "Uzbekistan", "continent": "AS" },
  "VU": { "name": "Vanuatu", "continent": "OC" },
  "VE": { "name": "Venezuela", "continent": "SA" },
  "VN": { "name": "Viet Nam", "continent": "AS" },
  "VG": { "name": "Virgin Islands, British", "continent": "NA" },
  "VI": { "name": "Virgin Islands, U.S.", "continent": "NA" },
  "WF": { "name": "Wallis and Futuna", "continent": "OC" },
  "EH": { "name": "Western Sahara", "continent": "AF" },
  "YE": { "name": "Yemen", "continent": "AS" },
  "ZM": { "name": "Zambia", "continent": "AF" },
  "ZW": { "name": "Zimbabwe", "continent": "AF" }
};

var yearData = {};           // each year's data, by year
var firstYear = 1903;        // the slider runs from the first year...
var lastYear = 2025;         // ...to the last
var currentYear = firstYear; // the year on screen

// random data for each year: every country drifts a little from where it was the year before
for (var year = firstYear; year <= lastYear; year++) {
  var data = [];
  yearData[year] = data;

  var i = 0;
  am5.object.each(countries, function(id, country) {
    if (year == firstYear) { // the first year: a random spot and size
      var dObj = {
        id: id,
        name: country.name,
        continent: country.continent,
        settings: { fill: colors[country.continent] },
        x: Math.random() * 100 * Math.random() * 2 + 1 + i * 2,
        y: Math.random() * 40 * Math.random() + 1 + i / 10,
        value: Math.round(Math.random() * 500) + Math.random() * 500
      }

      data.push(dObj);

      country.data = [dObj]; // the country's own list of years, for its trail

    } else { // later years: a small step from the year before
      var previous = yearData[year - 1][i];
      var dObj = {
        id: id,
        name: country.name,
        continent: country.continent,
        settings: { fill: colors[country.continent] },
        x: previous.x + (Math.random() * 10 - 3),                    // x moves by -3 to +7, so it tends to grow
        y: previous.y + (Math.random() * 2 - 0.6),                   // y moves by -0.6 to +1.4
        value: Math.abs(previous.value + (Math.random() * 100 - 40)) // size moves by -40 to +60, never negative
      }
      data.push(dObj);
      country.data.push(dObj); // the country's trail gets this year too
    }
    i++;
  })
}

// main container
var mainContainer = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,            // full width...
  height: am5.p100,           // ...and height
  layout: root.verticalLayout // the chart above the slider
}))

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = mainContainer.children.push(am5xy.XYChart.new(root, {
  panX: true,       // drag the plot to pan sideways...
  panY: true,       // ...and up and down
  wheelY: "zoomXY", // the mouse wheel zooms both axes
  pinchZoomX:true,  // pinch to zoom on a touch screen...
  pinchZoomY:true   // ...in both directions
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // metric X runs from 0...
  max: 1000, // ...to 1000
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
  tooltip: am5.Tooltip.new(root, {}) // a value label follows the cursor along the axis
}));

// the axis title, centered under the axis
xAxis.children.push(am5.Label.new(root, { text: "Hypothetical metric X", x: am5.p50, centerX: am5.p50 }));

// Skip the last label, which the vertical scrollbar would cover
xAxis.get("renderer").labels.template.set("maxPosition", 0.98);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // metric Y runs from 0...
  max: 120, // ...to 120
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // a value label follows the cursor along the axis
}));

// the axis title, turned upright; moveValue(..., 0) puts it before the labels, at the left
yAxis.children.moveValue(am5.Label.new(root, { text: "Hypothetical metric Y", rotation: -90, y: am5.p50, centerX: am5.p50 }), 0);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var bubbleSeries = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true, // works out the lowest and highest values, for the heat rule
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  valueField: "value" // the bubble size comes from value
}));

// a line series with its line hidden, so only the bubbles show
bubbleSeries.strokes.template.set("visible", false);

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
var circleTemplate = am5.Template.new({ tooltipY: 0 }); // shared by all bubbles; the tooltip points at the top
circleTemplate.states.create("transparent", { opacity: 0.15 }); // a faded look for the bubbles not pointed at

circleTemplate.events.on("pointerover", handleOver); // pointing at a bubble fades the others...
circleTemplate.events.on("pointerout", handleOut);   // ...pointing away brings them back...
circleTemplate.events.on("click", handleClick);      // ...and a click shows the country's trail

// fades every bubble but the one under the pointer
function handleOver(e) {
  var target = e.target;
  am5.array.each(bubbleSeries.dataItems, function(dataItem) {
    if (dataItem.bullets) {
      var bullet = dataItem.bullets[0];
      if (bullet) {
        var sprite = bullet.get("sprite");
        if (sprite && sprite != target) {
          sprite.states.applyAnimate("transparent");
        }
      }
    }
  })
}

// brings every bubble back to normal
function handleOut(e) {
  am5.array.each(bubbleSeries.dataItems, function(dataItem) {
    if (dataItem.bullets) {
      var bullet = dataItem.bullets[0];
      if (bullet) {
        var sprite = bullet.get("sprite");
        if (sprite) {
          sprite.states.applyAnimate("default");
        }
      }
    }
  })
}

var selectedDataItem; // the clicked bubble, whose trail is shown
// a click selects a bubble and shows its trail; a second click deselects it
function handleClick(e) {
  if (selectedDataItem == e.target.dataItem) {
    // the same bubble again: deselect it, hide its trail and bring the others back
    selectedDataItem = undefined;
    am5.array.each(bubbleSeries.dataItems, function(dataItem) {
      var bullet = dataItem.bullets[0];
      var sprite = bullet.get("sprite");
      sprite.set("fillOpacity", 0.9); // every bubble back to almost solid
    })
    lineSeries.data.clear(); // no trail
  }
  else {
    selectedDataItem = e.target.dataItem;

    // the trail: the country's data for every year
    lineSeries.data.setAll(countries[selectedDataItem.dataContext.id].data);
    lineSeries.show();

    am5.array.each(bubbleSeries.dataItems, function(dataItem) {
      var bullet = dataItem.bullets[0];
      var sprite = bullet.get("sprite");
      if (dataItem != selectedDataItem) {
        sprite.set("fillOpacity", 0.15); // the others fade...
      }
      else {
        sprite.set("fillOpacity", 1); // ...the selected one is solid
      }
    })
  }
}

// a bubble on each point, colored by continent and sized by the heat rule
bubbleSeries.bullets.push(function() {
  var bulletCircle = am5.Circle.new(root, {
    radius: 5,                 // a starting size; the heat rule sets the real one
    templateField: "settings", // the continent color from settings in the data
    fillOpacity: 0.9,          // almost solid
    // the name in large bold type, then the metrics, formatted
    tooltipText: "[fontSize:18px; bold]{name}[/]\nMetric X: {valueX.formatNumber('#,###.')}\nMetric Y: {valueY.formatNumber('#.0')}\nBubble size: {value.formatNumber('#,###.')}"
  }, circleTemplate);
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
// maxValue fixes the top of the scale, so bubble sizes compare from year to year
bubbleSeries.set("heatRules", [{
  target: circleTemplate,
  min: 3,  // the radius goes from 3px...
  max: 35, // ...to 35px
  dataField: "value",
  key: "radius", maxValue: 4000
}]);

// line series: the trail of the clicked country, in the text color so it shows on light and dark backgrounds
var lineSeries = chart.series.push(am5xy.LineSeries.new(root, {
  valueXField: "x",
  valueYField: "y",
  xAxis: xAxis,
  yAxis: yAxis,
  stroke: root.interfaceColors.get("text")
}))

lineSeries.strokes.template.set("strokeOpacity", 0.3); // a faint trail line

// a small dot for each year on the trail
lineSeries.bullets.push(function() {
  var bulletCircle = am5.Circle.new(root, {
    radius: 2,                     // 2px radius
    fill: lineSeries.get("stroke") // in the trail's color
  });
  return am5.Bullet.new(root, {
    sprite: bulletCircle
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [bubbleSeries] // the cursor jumps to the nearest bubble
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  exportable:false // left out of exported images
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical",
  exportable:false // left out of exported images
}));

// Label: the year, faint, in the bottom right corner of the plot behind the bubbles, in the text color so it shows
// in dark mode too
var yearLabel = chart.plotContainer.children.push(am5.Label.new(root, {
  text: currentYear.toString(),
  fontSize: "4em", // four times the normal text size
  fill: root.interfaceColors.get("text"),
  opacity: 0.15,
  x: am5.p100,
  y: am5.p100,
  fontFamily: "Courier New", // a typewriter font, so all digits are the same width
  textAlign: "right",
  centerY: am5.p100,
  centerX: am5.p100,
  paddingRight: 10, // 10px in from the right edge
  paddingBottom: 0
}));

// Create controls
var yearSliderContainer = mainContainer.children.push(am5.Container.new(root, {
  width: am5.percent(100),       // full width
  layout: root.horizontalLayout, // the play button and the slider side by side
  paddingLeft: 70,
  paddingRight: 40,
  exportable:false // left out of exported images
}));

var playButton = yearSliderContainer.children.push(am5.Button.new(root, {
  themeTags: ["play"], // the theme's round play button, which toggles active on each click
  centerY: am5.p50,    // centered vertically
  marginRight: 20,     // a 20px gap before the slider
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"] // the theme draws a play icon, or pause when active
  })
}));

// the play button pauses the slider's animation, or plays it on to the last year
playButton.events.on("click", function() {
  if (playButton.get("active")) {
    slider.set("start", slider.get("start") + 0.0001); // setting start stops the running animation
  } else {
    slider.animate({
      key: "start",
      to: 1,
      duration: 15000 * (1 - slider.get("start")) // 15 seconds for all the years
    });
  }
});

var slider = yearSliderContainer.children.push(am5.Slider.new(root, {
  orientation: "horizontal",
  start: 0,        // the grip starts at the first year
  centerY: am5.p50 // centered vertically
}));

// at the last year, the button goes back to play
slider.on("start", function(start) {
  if (start === 1) {
    playButton.set("active", false);
  }
});

// moving the slider shows the year it points at
slider.events.on("rangechanged", function() {
  updateSeriesData(
    // the slider's position, 0 to 1, as a year
    firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
  );
});

// Create the map chart: a small world map in the top left corner, where the bubbles don't go
// https://www.amcharts.com/docs/v5/charts/map-chart/
var navMap = chart.plotContainer.children.push(am5map.MapChart.new(root, {
  projection: am5map.geoNaturalEarth1(), // a compromise world projection
  rotationX: -11, // centered on longitude 11 degrees east
  width: 200, // 200px wide...
  height: 110, // ...110px tall...
  x: 10, // ...10px from the left...
  y: 10, // ...and from the top of the plot
  panY: "none", // the little map can't be dragged up and down...
  panX: "none" // ...or sideways
}));

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = navMap.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_continentsLow, // continents, not countries, in low detail
  exclude: ["antarctica"]            // Antarctica left out, to save room
}));

var polygonTemplate = polygonSeries.mapPolygons.template;

polygonTemplate.setAll({
  templateField: "settings", // each continent's color from settings in the data
  tooltipText: "{name}",     // the continent's name on hover
  interactive: true          // reacts to the pointer and to clicks
});

polygonTemplate.states.create("disabled", {
  fill: root.interfaceColors.get("disabled") // the theme's gray for the continents not picked
});

// pointing at a continent fades the other continents' bubbles; a click shows only its bubbles
polygonTemplate.events.on("pointerover", handleContinentOver);
polygonTemplate.events.on("click", handleContinentClick);
polygonTemplate.events.on("pointerout", handleOut); // pointing away brings all bubbles back

// fades the bubbles of every other continent
function handleContinentOver(e) {
  var target = e.target;
  am5.array.each(bubbleSeries.dataItems, function(dataItem) {
    if (dataItem.bullets) {
      var bullet = dataItem.bullets[0];
      if (bullet) {
        var sprite = bullet.get("sprite");
        if (sprite) {
          if (target.dataItem.dataContext.code == sprite.dataItem.dataContext.continent) {
            sprite.states.applyAnimate("default");
          }
          else {
            sprite.states.applyAnimate("transparent");
          }
        }
      }
    }
  })
}

var selectedContinent;

// a click keeps only that continent's bubbles and grays the rest of the map; again to undo
function handleContinentClick(e) {
  var target = e.target;
  if (target.dataItem == selectedContinent) { // the same continent again: show everything
    selectedContinent = undefined;

    am5.array.each(polygonSeries.dataItems, function(dataItem) {
      var mapPolygon = dataItem.get("mapPolygon");
      mapPolygon.states.applyAnimate("default");
    })

    am5.array.each(bubbleSeries.dataItems, function(dataItem) {
      var bullet = dataItem.bullets[0];
      if (bullet) {
        var sprite = bullet.get("sprite");
        if (sprite) {
          sprite.set("forceHidden", false);
        }
      }
    })
  }
  else { // a new continent: gray the others and hide their bubbles
    selectedContinent = target.dataItem;

    am5.array.each(polygonSeries.dataItems, function(dataItem) {
      var mapPolygon = dataItem.get("mapPolygon");
      if (dataItem != selectedContinent) {
        mapPolygon.states.applyAnimate("disabled");
      }
      else {
        mapPolygon.states.applyAnimate("default");
      }
    })

    am5.array.each(bubbleSeries.dataItems, function(dataItem) {
      if (dataItem.bullets) {
        var bullet = dataItem.bullets[0];
        var sprite = bullet.get("sprite");
        if (target.dataItem.dataContext.code == sprite.dataItem.dataContext.continent) {
          sprite.set("forceHidden", false);
        }
        else {
          sprite.set("forceHidden", true);
        }
      }
    })
  }
}

polygonSeries.data.setAll([
  { id: "europe", code: "EU", settings: { fill: colors.EU } },
  { id: "northAmerica", code: "NA", settings: { fill: colors.NA } },
  { id: "southAmerica", code: "SA", settings: { fill: colors.SA } },
  { id: "asia", code: "AS", settings: { fill: colors.AS } },
  { id: "africa", code: "AF", settings: { fill: colors.AF } },
  { id: "oceania", code: "OC", settings: { fill: colors.OC } }
])

// shows the given year: the bubbles move and the year label changes
function updateSeriesData(year) {
  if (currentYear != year) {
    currentYear = year;
    var data = yearData[year];

    var i = 0;
    am5.array.each(data, function(item) {
      // setIndex updates each bubble in place, so it glides to its new spot and size
      bubbleSeries.data.setIndex(i, item);
      i++;
    });

    yearLabel.set("text", year.toString());
  }
}

bubbleSeries.data.setAll(yearData[currentYear]);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
bubbleSeries.appear(1000);
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
  height: 700px;
  max-width: 100%;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/continentsLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
