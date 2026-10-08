---
title: "Logarithmic Scale"
source: "https://www.amcharts.com/demos/logarithmic-scale/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart whose value axis climbs in multiples of ten instead of equal steps. Values from 2 to over 23,000 fit on one chart, and the small early ones stay readable.

When a log scale helps: On a logarithmic axis each step up multiplies the value by ten, so growth at a steady rate draws as a steady slope, whether the numbers are small or huge. Here the climb of the 1970s, from 2 to a few hundred, shows as clearly as the later years in the tens of thousands.

Good for:
- Compound growth: savings, users, sales
- Values that span several orders of magnitude
- Comparing rates of change rather than amounts

Think twice when:
- Zero or negative values: a log axis can’t show them
- Readers who expect equal steps: label the axis clearly
- Differences in amount: a linear axis shows them truly

Prompt: Create a line chart of yearly values from 1970 to 2025 that grow from single digits to tens of thousands, on a logarithmic value axis so the small early values and the large later ones are both readable. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// {valueX} in text holds a date: show it as a year
root.dateFormatter.setAll({
  dateFormat: "yyyy",
  dateFields: ["valueX"]
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,      // drag the plot sideways to pan through the years
  panY: true,      // and up and down
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the years
  pinchZoomX: true // pinch with two fingers to zoom on a touch screen
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // dragging the plot pans instead of selecting a range to zoom
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Data
var data = [
  { year: "1970", value: 2 },
  { year: "1971", value: 4 },
  { year: "1972", value: 15 },
  { year: "1973", value: 21 },
  { year: "1974", value: 25 },
  { year: "1975", value: 18 },
  { year: "1976", value: 33 },
  { year: "1977", value: 103 },
  { year: "1978", value: 88 },
  { year: "1979", value: 205 },
  { year: "1980", value: 333 },
  { year: "1981", value: 185 },
  { year: "1982", value: 788 },
  { year: "1983", value: 1020 },
  { year: "1984", value: 658 },
  { year: "1985", value: 201 },
  { year: "1986", value: 1054 },
  { year: "1987", value: 999 },
  { year: "1988", value: 2002 },
  { year: "1989", value: 2235 },
  { year: "1990", value: 1423 },
  { year: "1991", value: 3564 },
  { year: "1992", value: 3987 },
  { year: "1993", value: 4235 },
  { year: "1994", value: 3487 },
  { year: "1995", value: 2987 },
  { year: "1996", value: 6789 },
  { year: "1997", value: 7354 },
  { year: "1998", value: 5457 },
  { year: "1999", value: 6784 },
  { year: "2000", value: 7878 },
  { year: "2001", value: 6987 },
  { year: "2002", value: 5787 },
  { year: "2003", value: 8978 },
  { year: "2004", value: 10003 },
  { year: "2005", value: 7898 },
  { year: "2006", value: 9878 },
  { year: "2007", value: 11235 },
  { year: "2008", value: 10248 },
  { year: "2009", value: 14589 },
  { year: "2010", value: 19878 },
  { year: "2011", value: 20325 },
  { year: "2012", value: 18978 },
  { year: "2013", value: 17485 },
  { year: "2014", value: 15234 },
  { year: "2015", value: 12345 },
  { year: "2016", value: 12584 },
  { year: "2017", value: 13698 },
  { year: "2018", value: 12568 },
  { year: "2019", value: 12587 },
  { year: "2020", value: 16987 },
  { year: "2021", value: 16779 },
  { year: "2022", value: 19878 },
  { year: "2023", value: 15687 },
  { year: "2024", value: 19878 },
  { year: "2025", value: 23212 }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "year", count: 1 }, // one data point per year
  renderer: am5xy.AxisRendererX.new(root, {
    minorGridEnabled: true, // fainter grid lines between the labeled ones
    minGridDistance: 70     // at least 70px between labels; on narrow screens some are skipped
  }),
  tooltip: am5.Tooltip.new(root, {}) // a year label follows the cursor along the axis
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  logarithmic: true, // equal steps up multiply the value, so 2 and 23,212 both read clearly
  renderer: am5xy.AxisRendererY.new(root, {
    minorGridEnabled: true // fainter grid lines between the labeled ones
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  valueXField: "year",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueX}: {valueY}" // the year and the value
  })
}));

series.strokes.template.setAll({
  strokeWidth: 3 // a 3px line
});

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy",
  dateFields: ["year"]
});

series.data.setAll(data);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a bar above the plot to zoom and scroll through the years
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
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
