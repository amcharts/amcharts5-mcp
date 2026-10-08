---
title: "Grouped Stacks"
source: "https://www.amcharts.com/demos/grouped-stacks/"
category: "column-bar"
scraped: "2026-10-08"
---

Stacked columns in groups: sales in three regions over four years, each year split into store and online sales. Each region has its own pair of colors, its name under its years and a gap before the next.

When to group stacks: Grouping stacked columns lets one chart compare totals within a group and across groups: how each region’s sales changed, and how the regions compare. Giving each group its own colors keeps the groups apart, at the cost of a longer legend. It reads best with two or three parts per stack.

Good for:
- Sales by region, split by channel
- Several years per product or team
- Totals made of two or three parts

Think twice when:
- Comparing one part across groups: give it one color everywhere
- Many groups: the legend grows by a pair each time
- Shares rather than amounts: stack to 100%

Prompt: Create a stacked column chart in three groups: sales in Europe, the Americas and Asia over four years, each year split into store and online sales, with each region’s name under its group. Give each region its own color, lighter for online, and add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,                // no dragging the plot
  panY: false,
  wheelX: "panX",             // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",            // ...and the vertical wheel zooms in on the years
  layout: root.verticalLayout // the legend goes below the chart
}));

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50, // the legend's middle...
    x: am5.p50        // ...at the middle of the chart
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

// Sales in three regions over four years, each year split into store and online sales.
// Each region has its own pair of fields, so it can have its own pair of colors; the empty
// categories between the regions leave a gap.
var data = [{
  category: "europe-2022",
  year: "2022",
  europeStores: 20,
  europeOnline: 12
}, {
  category: "europe-2023",
  year: "2023",
  europeStores: 15,
  europeOnline: 8
}, {
  category: "europe-2024",
  year: "2024",
  europeStores: 12,
  europeOnline: 16
}, {
  category: "europe-2025",
  year: "2025",
  europeStores: 9,
  europeOnline: 12
}, {
  category: "gap-1"
}, {
  category: "americas-2022",
  year: "2022",
  americasStores: 15,
  americasOnline: 16
}, {
  category: "americas-2023",
  year: "2023",
  americasStores: 20,
  americasOnline: 6
}, {
  category: "americas-2024",
  year: "2024",
  americasStores: 14,
  americasOnline: 11
}, {
  category: "americas-2025",
  year: "2025",
  americasStores: 19,
  americasOnline: 12
}, {
  category: "gap-2"
}, {
  category: "asia-2022",
  year: "2022",
  asiaStores: 5,
  asiaOnline: 10
}, {
  category: "asia-2023",
  year: "2023",
  asiaStores: 7,
  asiaOnline: 12
}, {
  category: "asia-2024",
  year: "2024",
  asiaStores: 15,
  asiaOnline: 10
}, {
  category: "asia-2025",
  year: "2025",
  asiaStores: 13,
  asiaOnline: 14
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // each column uses the middle 80% of its category, leaving gaps between the years
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  minGridDistance: 10 // labels may sit as close as 10px, so every year gets one
});

// The labels show the year from the data, not the category's id
xRenderer.labels.template.set("text", "{year}");
xRenderer.grid.template.set("forceHidden", true); // no vertical grid lines

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: xRenderer
}));

xAxis.data.setAll(data);

// A second row of labels names the regions
function addRegionLabel(name, firstCategory, lastCategory) {
  var range = xAxis.makeDataItem({});
  xAxis.createAxisRange(range);
  range.set("category", firstCategory);
  range.set("endCategory", lastCategory);
  range.get("label").setAll({
    text: name,
    dy: 25,            // 25px below the year labels
    fontWeight: "bold" // bold
  });
}

addRegionLabel("Europe", "europe-2022", "europe-2025");
addRegionLabel("Americas", "americas-2022", "americas-2025");
addRegionLabel("Asia", "asia-2022", "asia-2025");

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // the stacks start at zero
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName, color) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    stacked: true, // stacks on the series before it, in the same category
    valueYField: fieldName,
    categoryXField: "category",
    stroke: color, // in the given color
    fill: color
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {year}: {valueY}", // as "Europe, stores, 2022: 20"
    width: am5.percent(90), // 90% of the cell space set on the renderer
    tooltipY: 0             // the tooltip points at the top of the column
  });

  series.data.setAll(data);
  series.appear();
  legend.data.push(series); // a legend item for each series
}

// each region takes every third theme color, so the regions stay apart
var europeColor = chart.get("colors").getIndex(0);
var americasColor = chart.get("colors").getIndex(3);
var asiaColor = chart.get("colors").getIndex(6);

// the full color for store sales, a tint of it halfway to white for online sales
makeSeries("Europe, stores", "europeStores", europeColor);
makeSeries("Europe, online", "europeOnline", am5.Color.lighten(europeColor, 0.5));

makeSeries("Americas, stores", "americasStores", americasColor);
makeSeries("Americas, online", "americasOnline", am5.Color.lighten(americasColor, 0.5));

makeSeries("Asia, stores", "asiaStores", asiaColor);
makeSeries("Asia, online", "asiaOnline", am5.Color.lighten(asiaColor, 0.5));

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
