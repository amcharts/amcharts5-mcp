---
title: "Map Timeline"
source: "https://www.amcharts.com/demos/map-timeline/"
category: "maps"
scraped: "2026-03-15"
---

This is a demo visualizing event timeline on a map. Drag the year slider below the map and countries on a map light up as the slider crosses the year when that country joined a [fictional] treaty.
Key implementation details
We create a Slider with year range from our data. Then when the value (range) of the slider changes we update our country polygons and set active on the countries that joined the treaty that year or earlier.
SliderMapChart

## JavaScript

```javascript
// Country data
var data = [
	{ year: 2004, country: "AF" },
	{ year: 2001, country: "AL" },
	{ year: 1989, country: "DZ" },
	{ year: 2015, country: "AD" },
	{ year: 2017, country: "AO" },
	{ year: 1989, country: "AG" },
	{ year: 1989, country: "AR" },
	{ year: 1997, country: "AM" },
	{ year: 1975, country: "AU" },
	{ year: 1961, country: "AT" },
	{ year: 2000, country: "AZ" },
	{ year: 2006, country: "BS" },
	{ year: 1988, country: "BH" },
	{ year: 1992, country: "BD" },
	{ year: 1993, country: "BB" },
	{ year: 1960, country: "BY" },
	{ year: 1975, country: "BE" },
	{ year: 2021, country: "BZ" },
	{ year: 1974, country: "BJ" },
	{ year: 2014, country: "BT" },
	{ year: 1995, country: "BO" },
	{ year: 1993, country: "BA" },
	{ year: 1971, country: "BW" },
	{ year: 2002, country: "BR" },
	{ year: 1996, country: "BN" },
	{ year: 1961, country: "BG" },
	{ year: 1987, country: "BF" },
	{ year: 2014, country: "BI" },
	{ year: 2018, country: "CV" },
	{ year: 1960, country: "KH" },
	{ year: 1988, country: "CM" },
	{ year: 1986, country: "CA" },
	{ year: 1962, country: "CF" },
	{ year: 1975, country: "CL" },
	{ year: 1987, country: "CN" },
	{ year: 1979, country: "CO" },
	{ year: 2015, country: "KM" },
	{ year: 2009, country: "CK" },
	{ year: 1987, country: "CR" },
	{ year: 1991, country: "CI" },
	{ year: 1993, country: "HR" },
	{ year: 1974, country: "CU" },
	{ year: 1980, country: "CY" },
	{ year: 1993, country: "CZ" },
	{ year: 2014, country: "CD" },
	{ year: 1972, country: "DK" },
	{ year: 1983, country: "DJ" },
	{ year: 1988, country: "DM" },
	{ year: 2002, country: "DO" },
	{ year: 1962, country: "EC" },
	{ year: 1959, country: "EG" },
	{ year: 1998, country: "SV" },
	{ year: 1993, country: "EE" },
	{ year: 2020, country: "ET" },
	{ year: 2010, country: "FJ" },
	{ year: 1962, country: "FI" },
	{ year: 1959, country: "FR" },
	{ year: 2006, country: "GA" },
	{ year: 1994, country: "GE" },
	{ year: 1975, country: "DE" },
	{ year: 1968, country: "GH" },
	{ year: 1962, country: "GR" },
	{ year: 1984, country: "GT" },
	{ year: 1991, country: "GN" },
	{ year: 2014, country: "GY" },
	{ year: 1983, country: "HT" },
	{ year: 1975, country: "VA" },
	{ year: 2000, country: "HN" },
	{ year: 1962, country: "HU" },
	{ year: 2002, country: "IS" },
	{ year: 1960, country: "IN" },
	{ year: 1981, country: "ID" },
	{ year: 2001, country: "IR" },
	{ year: 2021, country: "IQ" },
	{ year: 1981, country: "IE" },
	{ year: 1959, country: "IL" },
	{ year: 1969, country: "IT" },
	{ year: 2002, country: "JM" },
	{ year: 1961, country: "JP" },
	{ year: 1979, country: "JO" },
	{ year: 1995, country: "KZ" },
	{ year: 1989, country: "KE" },
	{ year: 1978, country: "KW" },
	{ year: 1996, country: "KG" },
	{ year: 1998, country: "LA" },
	{ year: 1992, country: "LV" },
	{ year: 1998, country: "LB" },
	{ year: 1989, country: "LS" },
	{ year: 2005, country: "LR" },
	{ year: 2011, country: "LI" },
	{ year: 1995, country: "LT" },
	{ year: 1983, country: "LU" },
	{ year: 1962, country: "MG" },
	{ year: 2021, country: "MW" },
	{ year: 1985, country: "MY" },
	{ year: 2019, country: "MV" },
	{ year: 1994, country: "ML" },
	{ year: 2000, country: "MT" },
	{ year: 2006, country: "MH" },
	{ year: 1997, country: "MR" },
	{ year: 1996, country: "MU" },
	{ year: 1971, country: "MX" },
	{ year: 1982, country: "MC" },
	{ year: 1994, country: "MN" },
	{ year: 2006, country: "ME" },
	{ year: 1959, country: "MA" },
	{ year: 1998, country: "MZ" },
	{ year: 2013, country: "MM" },
	{ year: 1998, country: "NP" },
	{ year: 1964, country: "NL" },
	{ year: 1983, country: "NZ" },
	{ year: 2003, country: "NI" },
	{ year: 1964, country: "NE" },
	{ year: 1970, country: "NG" },
	{ year: 1994, country: "MK" },
	{ year: 1961, country: "NO" },
	{ year: 1999, country: "OM" },
	{ year: 2005, country: "PK" },
	{ year: 2020, country: "PW" },
	{ year: 1984, country: "PA" },
	{ year: 2019, country: "PG" },
	{ year: 1997, country: "PY" },
	{ year: 1988, country: "PE" },
	{ year: 1967, country: "PH" },
	{ year: 1961, country: "PL" },
	{ year: 1994, country: "PT" },
	{ year: 2002, country: "QA" },
	{ year: 1973, country: "KR" },
	{ year: 1998, country: "MD" },
	{ year: 1961, country: "RO" },
	{ year: 1960, country: "RU" },
	{ year: 2008, country: "RW" },
	{ year: 1979, country: "SM" },
	{ year: 2012, country: "ST" },
	{ year: 1994, country: "SA" },
	{ year: 1994, country: "SN" },
	{ year: 2001, country: "RS" },
	{ year: 2020, country: "SC" },
	{ year: 2020, country: "SL" },
	{ year: 1986, country: "SG" },
	{ year: 1993, country: "SK" },
	{ year: 1992, country: "SI" },
	{ year: 1976, country: "ZA" },
	{ year: 1977, country: "ES" },
	{ year: 1962, country: "LK" },
	{ year: 2000, country: "VC" },
	{ year: 2015, country: "PS" },
	{ year: 2018, country: "SD" },
	{ year: 1972, country: "SE" },
	{ year: 1965, country: "CH" },
	{ year: 1959, country: "SY" },
	{ year: 2012, country: "TJ" },
	{ year: 1959, country: "TH" },
	{ year: 2020, country: "TO" },
	{ year: 1966, country: "TT" },
	{ year: 1967, country: "TN" },
	{ year: 1992, country: "TR" },
	{ year: 1992, country: "UG" },
	{ year: 1960, country: "UA" },
	{ year: 2006, country: "AE" },
	{ year: 1975, country: "GB" },
	{ year: 1964, country: "TZ" },
	{ year: 1970, country: "US" },
	{ year: 1983, country: "UY" },
	{ year: 1996, country: "UZ" },
	{ year: 1995, country: "VE" },
	{ year: 1995, country: "VN" },
	{ year: 2002, country: "ZM" },
	{ year: 1994, country: "ZW" }
];

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "translateY",
  projection: am5map.geoNaturalEarth1()
}));

// Title
chart.children.unshift(am5.Label.new(root, {
  text: "A timeline of countries joining treaty X",
  fontSize: 22,
  fontWeight: "400",
  textAlign: "center",
  x: am5.percent(50),
  centerX: am5.percent(50)
}));


// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow,
  exclude: ["AQ"]
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  toggleKey: "active",
  interactive: true
});

polygonSeries.mapPolygons.template.states.create("hover", {
  fill: root.interfaceColors.get("primaryButtonHover")
});

polygonSeries.mapPolygons.template.states.create("active", {
  fill: root.interfaceColors.get("primaryButtonActive")
});

// Set clicking on "water" to zoom out
chart.chartContainer.get("background").events.on("click", function() {
  chart.goHome();
})

// Make stuff animate on load
chart.appear(1000, 100);

// Aggregate data
var years = {};
var firstYear = 99999;
var lastYear = 0;
for(var i = 0; i < data.length; i++) {
  var row = data[i];
  var year = row.year;
  if (years[year] == undefined) {
    years[year] = [];
  }
  years[year].push(row.country);
  
  if (firstYear > year) {
    firstYear = year;
  }
  if (lastYear < year) {
    lastYear = year;
  }
}

// Create controls
var container = chart.children.push(am5.Container.new(root, {
  y: am5.p100,
  centerX: am5.p50,
  centerY: am5.p100,
  x: am5.p50,
  width: am5.percent(90),
  layout: root.horizontalLayout,
  paddingBottom: 10
}));

var playButton = container.children.push(am5.Button.new(root, {
  themeTags: ["play"],
  centerY: am5.p50,
  marginRight: 40,
  icon: am5.Graphics.new(root, {
    themeTags: ["icon"]
  })
}));

playButton.events.on("click", function () {
  if (playButton.get("active")) {
    slider.set("start", slider.get("start") + 0.0001);
  } else {
    slider.animate({
      key: "start",
      to: 1,
      duration: 15000 * (1 - slider.get("start"))
    });
  }
});

var slider = container.children.push(am5.Slider.new(root, {
  //width: am5.percent(80),
  orientation: "horizontal",
  start: 0,
  centerY: am5.p50
}));

slider.startGrip.get("icon").set("forceHidden", true);
slider.startGrip.set("label", am5.Label.new(root, {
  text: firstYear + "",
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0
}));


updateCountries(firstYear);

slider.events.on("rangechanged", function () {
  var year = firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear));
  slider.startGrip.get("label").set("text", year + "");
  updateCountries(year);
  console.log(year)
  // updateSeriesData(
  //   firstYear + Math.round(slider.get("start", 0) * (lastYear - firstYear))
  // );
});

function updateCountries(year) {
  am5.object.each(years, function(joinYear, countries) {
    //console.log(countries)
    am5.array.each(countries, function(country) {
      var dataItem = polygonSeries.getDataItemById(country);
      if (dataItem) {
        dataItem.get("mapPolygon").set("active", joinYear <= year)
      }
    })
  })
}
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 900px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
