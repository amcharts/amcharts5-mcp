---
title: "Pictogram"
source: "https://www.amcharts.com/demos/pictogram/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A pictogram shows a share as a grid of small figures, one for each person in a hundred, so a number becomes something you can see. Here, 58 of 100 men and 67 of 100 women, the counted figures in color over gray ones.

When a pictogram works: A pictogram turns a percentage into people, or products, or whatever is being counted, so "58 of 100" reads at a glance and stays in memory. It works for one or two shares told as part of a story, in reports, posters and infographics, rather than for comparing many numbers.

Good for:
- One or two shares, like survey answers
- Infographics, posters and reports
- Readers who don’t read charts every day

Think twice when:
- Many groups to compare: a bar chart is more exact
- Shares that aren’t whole numbers of 100: the last figure can’t show a fraction
- Small differences, like 58 and 59: they look the same

Prompt: Create a pictogram comparing men and women: each group is a grid of 100 person icons with the counted ones colored, and a large label beside each grid with the count out of 100. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
var rowSize = 20; // 20 icons per row...
var colSize = 5;  // ...and 5 rows per group: 100 icons

// one grid cell per icon: a row of rowSize cells, then the next row
function generateData(count) {
  var row = 1;
  var col = 1;
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      x: col + "",
      y: row + ""
    });
    col++;
    if (col > rowSize) {
      row++;
      col = 1;
    }
  }
  return data;
}

// the axis categories "1", "2" and so on, up to count
function generateCategories(count) {
  var data = [];
  for(var i = 0; i < count; i++) {
    data.push({
      cat: (i + 1) + ""
    });
  }
  return data;
}

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
  panX: false,                // no dragging to pan...
  panY: false,                // ...in either direction...
  wheelX: "none",             // ...and no wheel zooming...
  wheelY: "none",             // ...at all
  layout: root.verticalLayout // the chart's parts are stacked top to bottom
}));

// Male and female take the theme’s first two colors
var maleColor = chart.get("colors").getIndex(0);
var femaleColor = chart.get("colors").getIndex(1);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererX.new(root, {})
}));
var xRenderer = xAxis.get("renderer");
xRenderer.labels.template.set("forceHidden", true); // no labels...
xRenderer.grid.template.set("forceHidden", true);   // ...and no grid lines: the axis only lays out the icons
xAxis.data.setAll(generateCategories(rowSize));     // 20 columns

var yAxis1 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {})
}));
var yRenderer1 = yAxis1.get("renderer");
yRenderer1.labels.template.set("forceHidden", true); // no labels...
yRenderer1.grid.template.set("forceHidden", true);   // ...and no grid lines
yAxis1.data.setAll(generateCategories(colSize));     // 5 rows

// the group's title, left of its icons: the name and the count, in the group's color
yAxis1.children.unshift(
  am5.Label.new(root, {
    text: "[" + maleColor.toCSSHex() + "]Male[/]\n[" + maleColor.toCSSHex() + "]58[/][#999999]/100[/]",
    fontSize: 32,    // large text...
    y: am5.p50,      // ...halfway down the group...
    centerY: am5.p50 // ...centered on that point
  })
);

var yAxis2 = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "cat",
  renderer: am5xy.AxisRendererY.new(root, {}),
  marginTop: 20 // a 20px gap between the two groups
}));
var yRenderer2 = yAxis2.get("renderer");
yRenderer2.labels.template.set("forceHidden", true);
yRenderer2.grid.template.set("forceHidden", true);
yAxis2.data.setAll(generateCategories(colSize));

// the same kind of title for the second group
yAxis2.children.unshift(
  am5.Label.new(root, {
    text: "[" + femaleColor.toCSSHex() + "]Female[/]\n[" + femaleColor.toCSSHex() + "]67[/][#999999]/100[/]",
    fontSize: 32,    // large text...
    y: am5.p50,      // ...halfway down the group...
    centerY: am5.p50 // ...centered on that point
  })
);

// stack the two Y axes, one group above the other
chart.leftAxesContainer.set("layout", root.verticalLayout);

// All icons share one template, so their size can change together (see the end)
var iconTemplate = am5.Template.new({
  centerX: am5.p50, // each icon centered in its cell...
  centerY: am5.p50, // ...both ways...
  scale: 0.8        // ...at 80% size to start
});

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// A colored series gets a tooltip with its count, e.g. "Male: 58 of 100"
function makeSeries(name, yAxis, data, color, path, withTooltip) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryYField: "y",
    openCategoryYField: "y", // each column covers just this row...
    categoryXField: "x",
    openCategoryXField: "x", // ...and this column: one cell
    clustered: false         // the gray and the colored icons share a cell, not side by side
  }));

  // each column is an invisible cell of the grid; only its icon bullet shows
  series.columns.template.setAll({
    width: am5.percent(100),
    height: am5.percent(100),
    fillOpacity: 0,
    strokeOpacity: 0
  });

  series.bullets.push(function(root) {
    return am5.Bullet.new(root, {
      locationX: 0.5, // the icon in the middle of its cell...
      locationY: 0.5, // ...both ways
      sprite: am5.Graphics.new(root, {
        fill: color,   // gray, or the group's color
        svgPath: path, // the person icon
        tooltipText: withTooltip ? name + ": " + data.length + " of 100" : undefined
      }, iconTemplate)
    });
  });

  series.data.setAll(data);

  series.appear();
  return series;
}

var placeholderColor = am5.color(0x999999); // the gray of the 100 background icons

// the icons as SVG paths, drawn in a 50px box
var maleIcon = "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z";
var femaleIcon = "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z";

// Each group is two series on the same grid: 100 gray icons, with the colored ones drawn over them
var maleSeriesMax = makeSeries("Male", yAxis1, generateData(100), placeholderColor, maleIcon, false);
var maleSeries = makeSeries("Male", yAxis1, generateData(58), maleColor, maleIcon, true);

var femaleSeriesMax = makeSeries("Female", yAxis2, generateData(100), placeholderColor, femaleIcon, false);
var femaleSeries = makeSeries("Female", yAxis2, generateData(67), femaleColor, femaleIcon, true);

// The icons are drawn in a 50px box: scale them to the height of a row, with
// some room to spare and at most 80%, so they never touch on a short chart
yAxis1.events.on("boundschanged", function() {
  iconTemplate.set("scale", Math.min(0.8, yAxis1.height() / colSize / 60));
});

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
