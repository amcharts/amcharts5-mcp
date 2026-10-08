---
title: "Stream / ThemeRiver Chart"
source: "https://www.amcharts.com/demos/stream-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A streamgraph: layers that flow around a center line instead of stacking up from zero. Here, Olympic medal counts for five countries from 1896 to 2008.

When a streamgraph works: A streamgraph trades exact values for shape: the thickness of each layer, and of the whole stream, shows how things grow, shrink and take each other’s place over time. Here the cancelled games of 1916, 1940 and 1944 pinch the stream to nothing, and the boycotts pinch single layers: the United States in 1980, the Soviet Union in 1984.

Good for:
- How shares shift over a long period
- Many categories rising and falling in turn
- Eye-catching stories in posters and long reads

Think twice when:
- Reading exact values: no layer sits on a fixed baseline
- Small changes: they get lost in the flow
- Few data points: the curves suggest more detail than there is

Prompt: Create a streamgraph of Olympic medal counts for the United Kingdom, the Soviet Union, Russia, the United States and China at each Summer Games from 1896 to 2008, drawn as smoothed layers centered on zero. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,     // a drag doesn't pan: the cursor zooms with it
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the years
  layout: root.verticalLayout
}));

// Take every second color of the theme, so neighboring layers stand apart
chart.get("colors").set("step", 2);

// Data
var data = [
	{ year: "1896", uk: 7, ussr: 0, russia: 0, usa: 20, china: 0 },
	{ year: "1900", uk: 78, ussr: 0, russia: 0, usa: 55, china: 0 },
	{ year: "1904", uk: 2, ussr: 0, russia: 0, usa: 394, china: 0 },
	{ year: "1908", uk: 347, ussr: 0, russia: 0, usa: 63, china: 0 },
	{ year: "1912", uk: 160, ussr: 0, russia: 0, usa: 101, china: 0 },
	{ year: "1916", uk: 0, ussr: 0, russia: 0, usa: 0, china: 0 },
	{ year: "1920", uk: 107, ussr: 0, russia: 0, usa: 193, china: 0 },
	{ year: "1924", uk: 66, ussr: 0, russia: 0, usa: 198, china: 0 },
	{ year: "1928", uk: 55, ussr: 0, russia: 0, usa: 84, china: 0 },
	{ year: "1932", uk: 34, ussr: 0, russia: 0, usa: 181, china: 0 },
	{ year: "1936", uk: 36, ussr: 0, russia: 0, usa: 92, china: 0 },
	{ year: "1940", uk: 0, ussr: 0, russia: 0, usa: 0, china: 0 },
	{ year: "1944", uk: 0, ussr: 0, russia: 0, usa: 0, china: 0 },
	{ year: "1948", uk: 56, ussr: 0, russia: 0, usa: 148, china: 0 },
	{ year: "1952", uk: 31, ussr: 117, russia: 0, usa: 130, china: 0 },
	{ year: "1956", uk: 45, ussr: 169, russia: 0, usa: 118, china: 0 },
	{ year: "1960", uk: 28, ussr: 169, russia: 0, usa: 112, china: 0 },
	{ year: "1964", uk: 28, ussr: 174, russia: 0, usa: 150, china: 0 },
	{ year: "1968", uk: 18, ussr: 188, russia: 0, usa: 149, china: 0 },
	{ year: "1972", uk: 29, ussr: 211, russia: 0, usa: 155, china: 0 },
	{ year: "1976", uk: 32, ussr: 285, russia: 0, usa: 155, china: 0 },
	{ year: "1980", uk: 45, ussr: 442, russia: 0, usa: 0, china: 0 },
	{ year: "1984", uk: 72, ussr: 0, russia: 0, usa: 333, china: 76 },
	{ year: "1988", uk: 53, ussr: 294, russia: 0, usa: 193, china: 53 },
	{ year: "1992", uk: 50, ussr: 0, russia: 0, usa: 224, china: 83 },
	{ year: "1996", uk: 26, ussr: 0, russia: 115, usa: 260, china: 110 },
	{ year: "2000", uk: 55, ussr: 0, russia: 188, usa: 248, china: 79 },
	{ year: "2004", uk: 57, ussr: 0, russia: 192, usa: 264, china: 94 },
	{ year: "2008", uk: 77, ussr: 0, russia: 143, usa: 315, china: 184 }
];

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  // the axis starts and ends in the middle of the first and last year, so no half cells stay empty
  startLocation: 0.5,
  endLocation: 0.5,
  renderer: am5xy.AxisRendererX.new(root, {
    pan: "zoom",            // drag along the axis to zoom it
    minorGridEnabled: true, // fainter grid lines between the labeled years
    minGridDistance: 50     // at least 50px between the labels
  }),
  tooltip: am5.Tooltip.new(root, {}) // shows the cursor's year on the axis
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {
    pan: "zoom" // drag along the axis to zoom it
  })
}));

// The layers are centered on zero, so values on this axis mean nothing:
// hide its labels and grid. Tooltips show the real numbers.
yAxis.get("renderer").labels.template.set("forceHidden", true);
yAxis.get("renderer").grid.template.set("forceHidden", true);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// adds one country's layer, filled between its low and high edges
function createSeries(field, name) {
  var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    // the layer fills between its low and high edges, set below; valueField keeps the real number
    valueField: field,
    valueYField: field + "_hi",
    openValueYField: field + "_low",
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways at the layer
      // the name in large type, then the year and the real value
      labelText: "[fontSize: 18px]{name}[/]\n{categoryX}: [bold]{" + field + "}[/]"
    })
  }));

  // Do not show tooltip for zero values
  series.get("tooltip").adapters.add("visible", function(visible, target) {
    if (target.dataItem && (target.dataItem.get("value") > 0)) {
      return true;
    }
    return false;
  });

  series.strokes.template.setAll({
    forceHidden: true // no lines along the edges, only the fill
  });

  series.fills.template.setAll({
    visible: true, // fill turned on...
    fillOpacity: 1 // ...and solid
  });

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();
}

createSeries("uk", "United Kingdom");
createSeries("ussr", "Soviet Union");
createSeries("russia", "Russia");
createSeries("usa", "United States");
createSeries("china", "China");

// Prepare data for the river-stacked series
for (var i = 0; i < data.length; i++) {
  var row = data[i];
  var sum = 0;

  // Calculate open and close values
  chart.series.each(function(series) {
    var field = series.get("valueField");
    var val = Number(row[field]);
    row[field + "_low"] = sum;      // the layer starts where the one before ended...
    row[field + "_hi"] = sum + val; // ...and ends its value higher
    sum += val;
  });

  // Adjust values so they are centered
  var offset = sum / 2; // half the stack's total
  chart.series.each(function(series) {
    var field = series.get("valueField");
    row[field + "_low"] -= offset;
    row[field + "_hi"] -= offset;
  });
}

chart.series.each(function(series) {
  series.data.setAll(data);
});

// Add cursor
chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomXY", // a drag draws a box and zooms both axes to it
  xAxis: xAxis
}));

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
