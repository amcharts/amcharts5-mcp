---
title: "Chart with Gaps in Data"
source: "https://www.amcharts.com/demos/chart-with-gaps-in-data/"
category: "line-area"
scraped: "2026-10-08"
---

A line that breaks where data is missing instead of drawing across the hole. Here, 1967 to 1970 and 1984 to 1988 have no values, and the years above zero take a second color.

Why show the gaps: A line drawn across missing data invents values nobody measured. Breaking it tells readers the record has a hole, which matters for sensor outages, closed markets or years without a survey. Switch on Connect across gaps above to see what the bridge hides.

Good for:
- Sensor or meter readings with outages
- Surveys or reports that skipped some years
- Sales over periods when a shop was closed

Think twice when:
- Gaps that are really zeros: plot the zeros
- Many short gaps: the line falls apart into dashes
- Smoothing next to a gap: the curve can swing past the real values

Prompt: Create a smoothed line chart of yearly values from 1950 to 2005 with two stretches of missing years, where the line breaks instead of joining across the gap. Color the line, its fill and its bullets differently above and below zero. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

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

root.dateFormatter.setAll({
  dateFormat: "yyyy",    // dates show as years...
  dateFields: ["valueX"] // ...in texts that use valueX
});

var data = [{
  "year": "1950",
  "value": -0.307
}, {
  "year": "1951",
  "value": -0.168
}, {
  "year": "1952",
  "value": -0.073
}, {
  "year": "1953",
  "value": -0.027
}, {
  "year": "1954",
  "value": -0.251
}, {
  "year": "1955",
  "value": -0.281
}, {
  "year": "1956",
  "value": -0.348
}, {
  "year": "1957",
  "value": -0.074
}, {
  "year": "1958",
  "value": -0.011
}, {
  "year": "1959",
  "value": -0.074
}, {
  "year": "1960",
  "value": -0.124
}, {
  "year": "1961",
  "value": -0.024
}, {
  "year": "1962",
  "value": -0.022
}, {
  "year": "1963",
  "value": 0
}, {
  "year": "1964",
  "value": -0.296
}, {
  "year": "1965",
  "value": -0.217
}, {
  "year": "1966",
  "value": -0.147
}, {
  "year": "1967" // no value: the line breaks here
}, {
  "year": "1971",
  "value": -0.19
}, {
  "year": "1972",
  "value": -0.056
}, {
  "year": "1973",
  "value": 0.077
}, {
  "year": "1974",
  "value": -0.213
}, {
  "year": "1975",
  "value": -0.17
}, {
  "year": "1976",
  "value": -0.254
}, {
  "year": "1977",
  "value": 0.019
}, {
  "year": "1978",
  "value": -0.063
}, {
  "year": "1979",
  "value": 0.05
}, {
  "year": "1980",
  "value": 0.077
}, {
  "year": "1981",
  "value": 0.12
}, {
  "year": "1982",
  "value": 0.011
}, {
  "year": "1983",
  "value": 0.177
}, {
  "year": "1984" // no value: another break
}, {
  "year": "1989",
  "value": 0.104
}, {
  "year": "1990",
  "value": 0.255
}, {
  "year": "1991",
  "value": 0.21
}, {
  "year": "1992",
  "value": 0.065
}, {
  "year": "1993",
  "value": 0.11
}, {
  "year": "1994",
  "value": 0.172
}, {
  "year": "1995",
  "value": 0.269
}, {
  "year": "1996",
  "value": 0.141
}, {
  "year": "1997",
  "value": 0.353
}, {
  "year": "1998",
  "value": 0.548
}, {
  "year": "1999",
  "value": 0.298
}, {
  "year": "2000",
  "value": 0.267
}, {
  "year": "2001",
  "value": 0.411
}, {
  "year": "2002",
  "value": 0.462
}, {
  "year": "2003",
  "value": 0.47
}, {
  "year": "2004",
  "value": 0.445
}, {
  "year": "2005",
  "value": 0.47
}];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  focusable: true, // the chart can take keyboard focus, for keyboard users
  panX: true,      // drag the plot sideways to pan...
  panY: true,      // ...or up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans
  wheelY: "zoomX", // the vertical wheel zooms in on the years
  pinchZoomX:true, // pinch to zoom on touch screens
  paddingLeft: 0   // the value labels sit at the chart's left edge
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  maxDeviation: 0.5, // pan up to half the visible range past the first and last year
  baseInterval: {    // one point per year
    timeUnit: "year",
    count: 1
  },
  renderer: am5xy.AxisRendererX.new(root, {
    minGridDistance: 50,   // at least 50px between labels; on narrow screens some are skipped
    pan:"zoom",            // drag along the year labels to zoom
    minorGridEnabled: true // fainter grid lines between the labeled years
  }),
  tooltip: am5.Tooltip.new(root, {}) // the cursor shows the year on the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 1, // pan or zoom out up to a whole visible range past the values
  renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"}) // drag along the value labels to zoom them
}));

// Hide the label at the very bottom of the value axis: it would run into
// the first date label in the corner
yAxis.get("renderer").labels.template.set("minPosition", 0.05);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
  // bullets show only while the points are at least 10px apart
  minBulletDistance: 10,
  // break the line where years are missing instead of joining across the gap
  connect: false,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "year",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal", // the tooltip points sideways at the line
    labelText: "{valueY}"             // the hovered year's value
  })
}));

series.fills.template.setAll({ fillOpacity: 0.2, visible: true }); // a faint fill under the line

// Add series axis range for a different stroke/fill
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#Series_axis_ranges
// from zero to well above the highest value: everything above zero gets the range's color
var rangeDataItem = yAxis.makeDataItem({
  value: 0,
  endValue: 1000
});

var color = chart.get("colors").getIndex(3); // the theme's fourth color

var range = series.createAxisRange(rangeDataItem);

range.strokes.template.setAll({
  stroke: color // the line above zero in that color...
});

range.fills.template.setAll({
  fill: color,  // ...and its fill too
  fillOpacity: 0.2,
  visible: true // line fills are hidden by default
});

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy",  // the years are strings like "1950"...
  dateFields: ["year"] // ...in the year field
});

series.data.setAll(data);

// All bullets share one template, so setting its radius resizes them at once
var bulletTemplate = am5.Template.new({
  radius: 4 // 4px dots
});

series.bullets.push(function() {
  var circle = am5.Circle.new(root, {
    fill: series.get("fill"), // the series color, for values below zero
    stroke: root.interfaceColors.get("background"), // an outline in the background color...
    strokeWidth: 2 // ...2px wide
  }, bulletTemplate)

  // bullets at or above zero take the range's color too
  circle.adapters.add("fill", function(fill, target) {
    var dataItem = circle.dataItem;
    if (dataItem.get("valueY") >= 0) {
      return color;
    }
    return fill
  })

  return am5.Bullet.new(root, {
    sprite: circle
  })
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis // the cursor snaps to whole years
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// add scrollbar
// drag its grips to zoom in on a range of years
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
