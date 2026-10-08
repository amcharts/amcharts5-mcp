---
title: "Maps and Charts Dashboard"
source: "https://www.amcharts.com/demos/maps-and-charts-dashboard/"
category: "dashboards"
scraped: "2026-10-08"
---

Five charts in one dashboard: a world heat map of sample rates for 200 countries, a donut, a radar chart, a line and a column chart. The donut and the radar chart sum up the map; point at a country and its continent lights up.

When a dashboard works: A dashboard puts the big picture and its details on one screen: the map shows where, the small charts show how much and how it changes. It works best when the parts answer each other, through a shared switch, a shared color or a highlight that runs across them, so readers never have to match things up by hand.

Good for:
- A one-screen overview for a team
- One data set seen several ways
- Switches and highlights that run across charts

Think twice when:
- A single question: one chart answers it better
- Small screens: stack the charts instead
- Many small charts: each gets too small to read

Prompt: Create a five-chart dashboard around a world heat map of a sample rate by country: a donut of the share of countries above 10%, a radial chart of the average per continent, a line and a column chart. Pointing at a country highlights its continent in the radial chart; pointing at a continent there fades the rest of the map. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// the projection switch, set once the map is made (see below)
var setProjection;

// A rate (in percent) for each country
var data = [
  { id: "CN", initial: 34 },
  { id: "AT", initial: 20 },
  { id: "BE", initial: 20 },
  { id: "BG", initial: 20 },
  { id: "HR", initial: 20 },
  { id: "CY", initial: 20 },
  { id: "CZ", initial: 20 },
  { id: "DK", initial: 20 },
  { id: "EE", initial: 20 },
  { id: "FI", initial: 20 },
  { id: "FR", initial: 20 },
  { id: "DE", initial: 20 },
  { id: "GR", initial: 20 },
  { id: "HU", initial: 20 },
  { id: "IE", initial: 20 },
  { id: "IT", initial: 20 },
  { id: "LV", initial: 20 },
  { id: "LT", initial: 20 },
  { id: "LU", initial: 20 },
  { id: "MT", initial: 20 },
  { id: "NL", initial: 20 },
  { id: "PL", initial: 20 },
  { id: "PT", initial: 20 },
  { id: "RO", initial: 20 },
  { id: "SK", initial: 20 },
  { id: "SI", initial: 20 },
  { id: "ES", initial: 20 },
  { id: "SE", initial: 20 },
  { id: "VN", initial: 46 },
  { id: "TW", initial: 32 },
  { id: "JP", initial: 24 },
  { id: "IN", initial: 26 },
  { id: "TH", initial: 36 },
  { id: "CH", initial: 31 },
  { id: "ID", initial: 32 },
  { id: "MY", initial: 24 },
  { id: "KH", initial: 49 },
  { id: "GB", initial: 10 },
  { id: "ZA", initial: 30 },
  { id: "BR", initial: 10 },
  { id: "BD", initial: 37 },
  { id: "SG", initial: 10 },
  { id: "IL", initial: 17 },
  { id: "PH", initial: 17 },
  { id: "CL", initial: 10 },
  { id: "AU", initial: 10 },
  { id: "PK", initial: 29 },
  { id: "TR", initial: 10 },
  { id: "LK", initial: 44 },
  { id: "CO", initial: 10 },
  { id: "PE", initial: 10 },
  { id: "NI", initial: 18 },
  { id: "NO", initial: 15 },
  { id: "CR", initial: 10 },
  { id: "JO", initial: 20 },
  { id: "DO", initial: 10 },
  { id: "AE", initial: 10 },
  { id: "NZ", initial: 10 },
  { id: "AR", initial: 10 },
  { id: "EC", initial: 10 },
  { id: "GT", initial: 10 },
  { id: "HN", initial: 10 },
  { id: "MG", initial: 47 },
  { id: "MM", initial: 44 },
  { id: "TN", initial: 28 },
  { id: "KZ", initial: 27 },
  { id: "RS", initial: 37 },
  { id: "EG", initial: 10 },
  { id: "SA", initial: 10 },
  { id: "SV", initial: 10 },
  { id: "BW", initial: 37 },
  { id: "TT", initial: 10 },
  { id: "MA", initial: 10 },
  { id: "DZ", initial: 30 },
  { id: "OM", initial: 10 },
  { id: "UY", initial: 10 },
  { id: "BS", initial: 10 },
  { id: "LS", initial: 50 },
  { id: "UA", initial: 10 },
  { id: "BH", initial: 10 },
  { id: "QA", initial: 10 },
  { id: "MU", initial: 40 },
  { id: "FJ", initial: 32 },
  { id: "IS", initial: 10 },
  { id: "KE", initial: 10 },
  { id: "LI", initial: 37 },
  { id: "GY", initial: 38 },
  { id: "HT", initial: 10 },
  { id: "BA", initial: 35 },
  { id: "NG", initial: 14 },
  { id: "NA", initial: 21 },
  { id: "BO", initial: 10 },
  { id: "PA", initial: 10 },
  { id: "VE", initial: 15 },
  { id: "MK", initial: 33 },
  { id: "ET", initial: 10 },
  { id: "GH", initial: 10 },
  { id: "MD", initial: 31 },
  { id: "AO", initial: 32 },
  { id: "JM", initial: 10 },
  { id: "MZ", initial: 16 },
  { id: "PY", initial: 10 },
  { id: "ZM", initial: 17 },
  { id: "LB", initial: 10 },
  { id: "CD", initial: 10 },
  { id: "BF", initial: 10 },
  { id: "CI", initial: 10 },
  { id: "TZ", initial: 10 },
  { id: "IQ", initial: 39 },
  { id: "GE", initial: 10 },
  { id: "SN", initial: 10 },
  { id: "AZ", initial: 10 },
  { id: "CM", initial: 11 },
  { id: "UG", initial: 10 },
  { id: "AL", initial: 10 },
  { id: "AM", initial: 10 },
  { id: "NP", initial: 10 },
  { id: "GA", initial: 10 },
  { id: "KW", initial: 10 },
  { id: "TG", initial: 10 },
  { id: "SR", initial: 10 },
  { id: "BZ", initial: 10 },
  { id: "PG", initial: 10 },
  { id: "MW", initial: 17 },
  { id: "LR", initial: 10 },
  { id: "VG", initial: 10 },
  { id: "AF", initial: 10 },
  { id: "ZW", initial: 18 },
  { id: "BJ", initial: 10 },
  { id: "BB", initial: 10 },
  { id: "MC", initial: 10 },
  { id: "UZ", initial: 10 },
  { id: "CG", initial: 10 },
  { id: "DJ", initial: 10 },
  { id: "PF", initial: 10 },
  { id: "KY", initial: 10 },
  { id: "CW", initial: 10 },
  { id: "VU", initial: 22 },
  { id: "RW", initial: 10 },
  { id: "SL", initial: 10 },
  { id: "MN", initial: 10 },
  { id: "SM", initial: 10 },
  { id: "AG", initial: 10 },
  { id: "BM", initial: 10 },
  { id: "SZ", initial: 10 },
  { id: "MH", initial: 10 },
  { id: "PM", initial: 10 },
  { id: "KN", initial: 10 },
  { id: "TM", initial: 10 },
  { id: "GD", initial: 10 },
  { id: "SD", initial: 10 },
  { id: "TC", initial: 10 },
  { id: "AW", initial: 10 },
  { id: "ME", initial: 10 },
  { id: "KG", initial: 10 },
  { id: "YE", initial: 10 },
  { id: "VC", initial: 10 },
  { id: "NE", initial: 10 },
  { id: "LC", initial: 10 },
  { id: "NR", initial: 30 },
  { id: "GQ", initial: 13 },
  { id: "LY", initial: 31 },
  { id: "WS", initial: 10 },
  { id: "GN", initial: 10 },
  { id: "TL", initial: 10 },
  { id: "MS", initial: 10 },
  { id: "TD", initial: 13 },
  { id: "ML", initial: 10 },
  { id: "MV", initial: 10 },
  { id: "TJ", initial: 10 },
  { id: "CV", initial: 10 },
  { id: "BI", initial: 10 },
  { id: "GP", initial: 10 },
  { id: "BT", initial: 10 },
  { id: "MQ", initial: 10 },
  { id: "TO", initial: 10 },
  { id: "MR", initial: 10 },
  { id: "DM", initial: 10 },
  { id: "GM", initial: 10 },
  { id: "GF", initial: 10 },
  { id: "CX", initial: 10 },
  { id: "AD", initial: 10 },
  { id: "CF", initial: 10 },
  { id: "SB", initial: 10 },
  { id: "YT", initial: 10 },
  { id: "AI", initial: 10 },
  { id: "CC", initial: 10 },
  { id: "ER", initial: 10 },
  { id: "CK", initial: 10 },
  { id: "SS", initial: 10 },
  { id: "KM", initial: 10 },
  { id: "KI", initial: 10 },
  { id: "NF", initial: 10 },
  { id: "GI", initial: 10 },
  { id: "TV", initial: 10 },
  { id: "IO", initial: 10 },
  { id: "TK", initial: 10 },
  { id: "GW", initial: 10 },
  { id: "SJ", initial: 10 },
  { id: "RE", initial: 10 }
];

// the continents in the radar chart, in this order
var continents = ["Europe", "Asia", "North America", "South America", "Oceania", "Africa"];

// The continent of a country, from the countries2 geodata file
function continentOf(id) {
  var country = am5geodata_data_countries2[id];
  return country ? country.continent : undefined;
}

// Create root element: one root holds the whole dashboard, so its charts share a theme and can react to each other
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

var myTheme = am5.Theme.new(root); // a theme of our own, for the two rules below

myTheme.rule("Label").setAll({
  fontSize: "0.8em" // all text a little smaller, to fit the small charts
});

myTheme.rule("AxisLabel", ["minor"]).setAll({
  dy: 1 // minor axis labels sit 1px lower
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme, am5themes_Responsive.new(root)]);

// Colors from the theme, so the dashboard follows the theme: a main color and a pale one for the rest
var colors = am5.ColorSet.new(root, {});
var mainColor = colors.getIndex(0);                     // the theme's first color...
var secondaryColor = am5.Color.lighten(mainColor, 0.7); // ...and a pale version of it

// Buttons and switches in the main color
root.interfaceColors.setAll({
  primaryButton: mainColor,
  primaryButtonHover: am5.Color.lighten(mainColor, 0.2), // a little lighter on hover
  primaryButtonDown: am5.Color.lighten(mainColor, -0.2), // a little darker when pressed
  primaryButtonActive: secondaryColor                    // the pale color when switched on
});

// The layout: a row of three small charts on top, the map and a column chart below
root.container.set("layout", root.verticalLayout);

var topRow = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,              // full width...
  height: am5.percent(40),      // ...40% of the height...
  layout: root.horizontalLayout // ...charts side by side
}));

var bottomRow = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,              // full width...
  height: am5.percent(60),      // ...the other 60% of the height...
  layout: root.horizontalLayout // ...the map, its heat legend and the column chart side by side
}));

// What the donut and the radar chart show:
// the share of countries above 10%, and the average in each continent
function summarize() {
  var above = 0;
  var sums = {};
  var counts = {};
  am5.array.each(data, function (item) {
    if (item.initial > 10) { // count the countries above 10%...
      above++;
    }
    var continent = continentOf(item.id); // ...and add each rate to its continent's total
    if (continent) {
      sums[continent] = (sums[continent] || 0) + item.initial;
      counts[continent] = (counts[continent] || 0) + 1;
    }
  });
  var averages = {};
  am5.array.each(continents, function (continent) {
    averages[continent] = sums[continent] / counts[continent]; // the average of each continent
  });
  return { share: above / data.length, averages: averages }; // the share as a fraction from 0 to 1
}

var summary = summarize();
var donut = makePieChart(topRow, summary.share); // the donut, top left
makeLineSeriesChart(topRow); // the line chart, top middle
var gaugeSeries = makeRadarGauge(topRow, summary.averages); // the radar chart, top right
var polygonSeries = makeMapChart(bottomRow); // the map, bottom left
makeColumnChart(bottomRow); // the column chart, bottom right

// The text in the middle of the donut
function donutText(share) {
  // [fontSize: 2em] makes the percentage twice as big
  return "[fontSize: 2em]" + Math.round(share * 100) + "%[/]\nof countries\nabove 10%";
}

// Pointing at a country picks out its continent in the radar chart
function highlightContinent(continent) {
  gaugeSeries.dataItems.forEach(function (dataItem) {
    var column = dataItem.get("graphics");
    if (!continent) { // nothing picked: every column back to normal
      column.states.applyAnimate("default");
      column.hideTooltip();
    }
    else if (dataItem.get("categoryY") === continent) { // the picked continent: normal, with its tooltip
      column.states.applyAnimate("default");
      column.showTooltip();
    }
    else { // the others fade
      column.states.applyAnimate("dimm");
      column.hideTooltip();
    }
  });
}

// Pointing at a continent in the radar chart picks out its countries on the map
function highlightCountries(continent) {
  polygonSeries.mapPolygons.each(function (polygon) {
    // true if nothing is picked or the country is in that continent
    var inside = !continent || continentOf(polygon.dataItem.get("id")) === continent;
    polygon.states.applyAnimate(inside ? "default" : "dimm");
  });
}

// income and expenses by year as two lines; the last year is a dashed projection
function makeLineSeriesChart(parent) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = parent.children.push(
    am5xy.XYChart.new(root, {
      width: am5.percent(50),     // half the top row's width
      panX: false,                // no dragging to pan...
      panY: false,                // ...in either direction
      wheelX: "panX",             // a horizontal wheel or trackpad swipe pans...
      wheelY: "zoomX",            // ...and the vertical wheel zooms in on the years
      paddingLeft: 0,             // the value labels sit at the chart's left edge
      layout: root.verticalLayout // the chart's parts are stacked top to bottom
    })
  );

  var data = [
    {
      year: "2021",
      income: 18.5,
      expenses: 12.1
    },
    {
      year: "2022",
      income: 22.2,
      expenses: 30.5
    },
    {
      year: "2023",
      income: 39.1,
      expenses: 34.9
    },
    {
      year: "2024",
      income: 45.5,
      expenses: 31.1
    },
    {
      year: "2025",
      income: 30.6,
      expenses: 22.2,
      // the line from here on is dashed: a projection
      strokeSettings: {
        strokeWidth: 3,
        strokeDasharray: [5, 5]
      }
    },
    {
      year: "2026",
      income: 34.1,
      expenses: 32.9,
      info: "(projection)" // added to the tooltip text by {info}
    }
  ];

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled ones
    minGridDistance: 60     // at least 60px between labels; on narrow screens some are skipped
  });
  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}) // a year label follows the cursor along the axis
    })
  );
  // grid at the end of each year, so the last line closes the plot's right edge
  xRenderer.grid.template.setAll({
    location: 1
  })

  xAxis.data.setAll(data);

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      min: 0, // start at zero
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1 // a faint axis line
      })
    })
  );

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series1 = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Income",
      xAxis: xAxis,
      yAxis: yAxis,
      stroke: secondaryColor, // the pale color...
      fill: secondaryColor,   // ...for the line and its fill
      valueYField: "income",
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",    // the tooltip sits beside the point
        labelText: "{name}: {valueY} {info}" // the series name, the value, and (projection) for the last year
      })
    })
  );

  series1.data.setAll(data);

  series1.strokes.template.setAll({
    strokeWidth: 3,                 // a 3px line...
    templateField: "strokeSettings" // ...dashed from 2025 on, by the data's strokeSettings
  });

  var series2 = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: "Expenses",
      xAxis: xAxis,
      yAxis: yAxis,
      stroke: mainColor, // the main color...
      fill: mainColor,   // ...for the line and its fill
      valueYField: "expenses",
      categoryXField: "year",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",    // the tooltip sits beside the point
        labelText: "{name}: {valueY} {info}" // the series name, the value, and (projection) for the last year
      })
    })
  );

  series2.strokes.template.setAll({
    strokeWidth: 3,                 // a 3px line...
    templateField: "strokeSettings" // ...dashed from 2025 on, by the data's strokeSettings
  });

  series2.data.setAll(data);

  chart.set("cursor", am5xy.XYCursor.new(root, {})); // the cursor shows the tooltips of both lines

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  chart.appear(1000, 100);
  series1.appear(1000, 500);
  series2.appear(1000, 1500);
}

// the average of each continent as a ring of a radar chart, top right
function makeRadarGauge(parent, averages) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/radar-chart/
  var radarGauge = parent.children.push(am5radar.RadarChart.new(root, {
    width: am5.percent(25),       // a quarter of the top row's width
    radius: am5.percent(90),      // the rings fill 90% of the space
    panX: false,                  // no dragging to pan...
    panY: false,                  // ...in either direction...
    wheelX: "none",               // ...and no wheel zooming...
    wheelY: "none",               // ...at all
    innerRadius: am5.percent(20), // an empty middle, 20% of the radius
    startAngle: -90,              // the rings start at the top...
    endAngle: 180                 // ...and run three quarters around to the left
  }));

  // A caption in the empty quarter of the chart
  radarGauge.children.push(am5.Label.new(root, {
    text: "Average\nby continent",
    x: 0, // the top left corner...
    y: 0  // ...of the chart
  }));

  // One ring per continent, with the average of the map's values there
  var data = continents.map(function (continent) {
    return {
      category: continent,
      value: averages[continent],
      full: 30 // a full ring is 30%
    };
  });

  // Create axes and their renderers
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
  var xRenderer = am5radar.AxisRendererCircular.new(root, {
    minGridDistance: 40 // at least 40px between the percent labels around the circle
  });

  xRenderer.labels.template.setAll({
    radius: 10 // labels 10px further out from the rings
  });

  xRenderer.grid.template.setAll({
    forceHidden: true // no grid lines out from the center
  });

  var xAxis = radarGauge.xAxes.push(am5xy.ValueAxis.new(root, {
    renderer: xRenderer,
    min: 0,  // the scale runs from 0...
    max: 30, // ...to 30
    // the scale ends at exactly 30%, the value of a full ring
    strictMinMax: true,
    numberFormat: "#'%'" // whole numbers with a percent sign
  }));

  var yRenderer = am5radar.AxisRendererRadial.new(root, {
    minGridDistance: 20
  });

  yRenderer.labels.template.setAll({
    forceHidden: true // no continent labels (the tooltips name them)...
  });

  yRenderer.grid.template.setAll({
    forceHidden: true // ...and no grid rings
  });

  var yAxis = radarGauge.yAxes.push(am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: yRenderer
  }));

  yAxis.data.setAll(data);

  // Create series
  // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
  // The full ring, faint, behind each value
  var series1 = radarGauge.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false, // the full rings and the values sit on top of each other, not side by side
    valueXField: "full",
    categoryYField: "category",
    fill: root.interfaceColors.get("alternativeBackground") // the contrast color, faded below
  }));

  series1.columns.template.setAll({
    width: am5.p100,  // each ring fills its whole row
    fillOpacity: 0.1, // faint
    strokeOpacity: 0, // no outline
    cornerRadius: 10  // rounded ends
  });

  series1.data.setAll(data);

  // The values, with a tooltip of their own, so it can show next to the map's
  var gaugeSeries = radarGauge.series.push(am5radar.RadarColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    clustered: false,  // drawn over the full ring, not beside it
    valueXField: "value",
    fill: mainColor,   // in the main color...
    stroke: mainColor, // ...fill and outline
    categoryYField: "category",
    tooltip: am5.Tooltip.new(root, {})
  }));

  gaugeSeries.columns.template.setAll({
    width: am5.p100,            // each ring fills its whole row
    strokeOpacity: 0,           // no outline
    cornerRadius: 10,           // rounded ends
    cursorOverStyle: "pointer", // a hand pointer: pointing at a ring picks out its countries
    tooltipText: "{category}: {valueX.formatNumber('#.#')}% on average" // the continent's average, one decimal
  });

  // the other continents fade while one is picked out
  gaugeSeries.columns.template.states.create("dimm", {
    opacity: 0.3
  });

  // pointing at a ring picks out its continent's countries on the map; pointing away shows all again
  gaugeSeries.columns.template.events.on("pointerover", function (ev) {
    highlightCountries(ev.target.dataItem.get("categoryY"));
  });

  gaugeSeries.columns.template.events.on("pointerout", function () {
    highlightCountries();
  });

  gaugeSeries.data.setAll(data);

  // Animate chart and series in
  // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
  gaugeSeries.appear(2000);

  return gaugeSeries;
}

// the share of countries above 10% as a donut, top left
function makePieChart(parent, share) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  var startAngle = -90; // the donut starts at the top
  var chart = parent.children.push(am5percent.PieChart.new(root, {
    width: am5.percent(25),       // a quarter of the top row's width
    innerRadius: am5.percent(70), // a hole 70% of the radius, for the text
    radius: am5.percent(90)       // the donut fills 90% of the space
  }));

  // Create series
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    startAngle: startAngle,    // the slices start at the top...
    endAngle: startAngle + 360 // ...and go all the way around
  }));

  series.ticks.template.setAll({
    forceHidden: true // no ticks
  })

  series.slices.template.setAll({
    templateField: "settings", // each slice's color from its settings in the data
    cornerRadius: 10,          // rounded slice ends
    strokeOpacity: 0,          // no outline
    tooltipText: undefined,    // no tooltips...
    interactive: false         // ...and no hover or click effects
  });

  series.labels.template.setAll({
    forceHidden: true // no slice labels: the text in the middle says it all
  });

  // Set data: the share of countries above 10%, and the rest
  // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  series.data.setAll([
    { value: share, category: "Above 10%", settings: { fill: mainColor } },
    { value: 1 - share, category: "The rest", settings: { fill: root.interfaceColors.get("alternativeBackground"), fillOpacity: 0.1 } }
  ]);

  // Play initial series animation
  // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
  series.appear(2000);

  // The share, in the middle
  var label = chart.seriesContainer.children.push(am5.Label.new(root, {
    text: donutText(share),
    textAlign: "center", // lines centered...
    centerX: am5.p50,    // ...in the middle of the donut...
    centerY: am5.p50     // ...both ways
  }));

  return { series: series, label: label };
}

// a column per day for 30 days, bottom right
function makeColumnChart(parent) {
  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = parent.children.push(am5xy.XYChart.new(root, {
    width: am5.percent(40), // 40% of the bottom row's width
    panX: false,            // no dragging to pan...
    panY: false,            // ...in either direction
    wheelX: "panX",         // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",        // ...and the vertical wheel zooms in on the days
    paddingLeft: 0          // the value labels sit at the chart's left edge
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomX" // drag across the plot to zoom in on those days
  }));
  cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var value = 100; // the values start near 100

  // one day's point: the value moves randomly by up to 5 from the day before
  function generateData() {
    value = Math.round((Math.random() * 10 - 5) + value);
    am5.time.add(date, "day", 1);
    return {
      date: date.getTime(),
      value: value
    };
  }

  // an array of count daily points
  function generateDatas(count) {
    var data = [];
    for (var i = 0; i < count; ++i) {
      data.push(generateData());
    }
    return data;
  }

  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last day
    baseInterval: {  // one column per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,  // fainter grid lines between the labeled ones...
      minorLabelsEnabled: true // ...with labels of their own
    }),
    tooltip: am5.Tooltip.new(root, {}) // a date label follows the cursor along the axis
  }));

  xAxis.set("minorDateFormats", { // the minor labels show just a number:
    "day": "dd",  // the day of the month...
    "month": "MM" // ...or the month
  });

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));

  // Add series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    fill: mainColor,   // the main color...
    stroke: mainColor, // ...fill and outline
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}" // the tooltip shows the value
    })
  }));

  series.columns.template.setAll({
    strokeOpacity: 0,      // no outline
    cornerRadiusTL: 10,    // rounded top corners
    cornerRadiusTR: 10,
    width: am5.percent(40) // each column takes 40% of its day's width
  })

  // Add scrollbar
  // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
  var scrollbar = chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal" // a bar above the plot to zoom and scroll through the days
  }));

  // move the scrollbar below the date axis
  chart.bottomAxesContainer.children.push(scrollbar);

  var data = generateDatas(30);
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000);
  chart.appear(1000, 100);

  // start zoomed in on the second half of the days
  xAxis.set("start", 0.5);
}

function makeMapChart(parent) {
  // Create the map chart
  // https://www.amcharts.com/docs/v5/charts/map-chart/
  var chart = parent.children.push(am5map.MapChart.new(root, {
    minZoomLevel: 0.5, // can zoom out to half the fitted size
    // go to the home view once the map is fitted
    autoHome: true,
    width: am5.percent(60), // 60% of the bottom row's width
    // the map shares the root with the other charts, so it keeps its countries within its own area
    maskContent: true,
    projection: am5map.geoEqualEarth() // a projection that keeps the countries' areas true
  }));

  var graticuleSeries = chart.series.unshift( // first in the series list, so it's drawn under the others
    am5map.GraticuleSeries.new(root, {
      step: 10 // grid lines every 10 degrees
    })
  );

  graticuleSeries.mapLines.template.setAll({
    strokeOpacity: 0.05 // very faint
  });

  // Switch between a globe and a flat map: "globe", "mercator" or "equalEarth"
  var rotation; // the globe's turning animation, kept so it can be stopped

  setProjection = function (name) {
    if (name !== "globe") {
      // back to the flat map, unturned
      if (rotation) {
        rotation.stop();
      }
      chart.setAll({
        // Mercator, or Equal Earth for any other name
        projection: name === "mercator" ? am5map.geoMercator() : am5map.geoEqualEarth(),
        panX: "translateX", // dragging moves the map sideways...
        panY: "translateY", // ...and up and down
        rotationX: 0,
        rotationY: 0
      });
    } else {
      // a globe that turns once around
      chart.setAll({
        projection: am5map.geoOrthographic(), // a globe
        panX: "rotateX",                      // dragging turns the globe sideways...
        panY: "rotateY"                       // ...and up and down
      });
      rotation = chart.animate({ key: "rotationX", to: chart.get("rotationX") + 360, duration: 15000, easing: am5.ease.inOut(am5.ease.cubic) });
    }
  };

  // Create series for the water: a faint fill behind the countries
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
  var waterSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
    // the map fits the countries, not this rectangle around the whole world
    affectsBounds: false
  }));

  waterSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"), // the color that contrasts with the background...
    fillOpacity: 0.05, // ...barely there
    strokeOpacity: 0   // no outline
  });

  waterSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180) // a rectangle over the whole globe
  });

  // the countries, colored by their rate
  // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow, // the world's countries, in low detail
      valueField: "initial",        // the rate in the data colors the country
      calculateAggregates: true     // works out the lowest and highest rate, for the heat rule and legend
    })
  );

  // Pointing at a country shows its value on the heat legend and picks out its continent in the radar chart
  polygonSeries.mapPolygons.template.events.on("pointerover", function (ev) {
    var value = ev.target.dataItem.get("value");
    if (value != null) { // a country with a rate shows it on the legend...
      heatLegend.showValue(value);
    }
    else { // ...one without hides the legend's tooltip
      heatLegend.get("tooltip").hide();
    }
    highlightContinent(continentOf(ev.target.dataItem.get("id")));
  });

  polygonSeries.mapPolygons.template.events.on("pointerout", function () {
    highlightContinent(); // pointing away brings every continent back
  });

  // the countries are shaded from light to dark by rate
  // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
  polygonSeries.set("heatRules", [{
    target: polygonSeries.mapPolygons.template,
    dataField: "value",
    min: am5.Color.lighten(mainColor, 0.6),   // the lowest rate: a light shade of the main color...
    max: am5.Color.brighten(mainColor, -0.5), // ...the highest: a dark one
    key: "fill" // the rule sets the fill
  }]);

  polygonSeries.mapPolygons.template.setAll({
    tooltipText: "{name}: {value}%", // the country and its rate
    fill: secondaryColor,            // the pale color, for countries without data
    stroke: root.interfaceColors.get("background") // borders in the background color
  });

  // countries with no value say so
  polygonSeries.mapPolygons.template.adapters.add("tooltipText", function (text, target) {
    return target.dataItem && target.dataItem.get("value") != null ? text : "{name}: no data";
  });

  // the other continents fade while one is picked out in the radar chart
  polygonSeries.mapPolygons.template.states.create("dimm", {
    fillOpacity: 0.25
  });

  polygonSeries.data.setAll(data);

  // The heat legend, in the row next to the map, so it never covers a country
  // https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
  var heatLegend = parent.children.push(am5.HeatLegend.new(root, {
    orientation: "vertical",                       // standing upright
    startColor: am5.Color.lighten(mainColor, 0.6), // the same colors...
    endColor: am5.Color.brighten(mainColor, -0.5), // ...as the heat rule
    startText: "Lowest", // words at the ends instead of numbers
    endText: "Highest",
    stepCount: 8,        // eight blocks of color instead of a smooth gradient
    paddingRight: 20,    // room around it
    paddingTop: 20,
    paddingBottom: 20
  }));

  heatLegend.startLabel.setAll({
    fontSize: 12 // small labels at the ends
  });

  heatLegend.endLabel.setAll({
    fontSize: 12 // small labels at the ends
  });

  // the legend runs from the lowest to the highest value in the data
  polygonSeries.events.on("datavalidated", function () {
    heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
    heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
  });

  chart.appear(2000);

  return polygonSeries;
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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/geodata/worldLow.js
- https://cdn.amcharts.com/lib/5/geodata/data/countries2.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
