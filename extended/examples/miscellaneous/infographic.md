---
title: "Infographic"
source: "https://www.amcharts.com/demos/infographic/"
category: "miscellaneous"
scraped: "2026-10-08"
---

An infographic-style bar chart drawn with person icons instead of solid bars. It compares the share of men and women in six departments: men to the left of the middle, women to the right, and the empty places in gray.

When to draw bars with icons: Icons say what is being counted before anyone reads a label, which suits infographics, reports and slides made for a wide audience. Two groups that add up to 100% fit this layout well: one grows to the left, the other to the right, and the line in the middle splits them.

Good for:
- Splits between two groups, like men and women
- Infographics and posters
- A handful of rows

Think twice when:
- Exact values matter: label them, or use plain bars
- Many rows or groups: the icons get crowded
- Values far from round numbers: a partly drawn icon is hard to read

Prompt: Create an infographic comparing the share of men and women in six departments, with men as bars to the left and women to the right. Fill each bar with repeating person icons, over faint icons that show the empty places. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,                   // no dragging the plot
    panY: false,
    wheelX: "none",                // the mouse wheel scrolls the page, not the chart
    wheelY: "none",
    layout: root.horizontalLayout, // the legend goes to the right of the plot
    arrangeTooltips: false         // each tooltip stays at its own row instead of being spread apart
  })
);

// Use only absolute numbers
root.numberFormatter.set("numberFormat", "#.#s'%"); // s drops the minus sign; '%' adds a percent sign

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerY: am5.p50,           // the legend's middle...
    y: am5.p50,                 // ...halfway down...
    layout: root.verticalLayout // ...with its items stacked
  })
);

// no cursor, so no values for the legend: without the empty value labels its items stay compact
legend.valueLabels.template.set("forceHidden", true);

legend.markers.template.setAll({
  width: 50, // big 50px markers
  height: 50
})

// Data
var data = [{
  category: "Marketing",
  male: -36,
  maleMax: -100,
  female: 64,
  femaleMax: 100
}, {
  category: "Research",
  male: -58,
  maleMax: -100,
  female: 42,
  femaleMax: 100
}, {
  category: "Engineering",
  male: -59,
  maleMax: -100,
  female: 41,
  femaleMax: 100
}, {
  category: "Sales",
  male: -41,
  maleMax: -100,
  female: 59,
  femaleMax: 100
}, {
  category: "Support",
  male: -50,
  maleMax: -100,
  female: 50,
  femaleMax: 100
}, {
  category: "Other",
  male: -36,
  maleMax: -100,
  female: 64,
  femaleMax: 100
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true,
      cellStartLocation: 0.1, // the icons use the middle 80% of each row
      cellEndLocation: 0.9
    })
  })
);

var yRenderer = yAxis.get("renderer");
yRenderer.grid.template.setAll({
  visible: false // no horizontal grid lines
});

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    calculateTotals: true, // works out each department's totals, for use in labels
    min: -100,             // men from -100%...
    max: 100,              // ...women to 100%
    strictMinMax: true,    // keep exactly -100 to 100, even when the series change
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 80 // at least 80px between value labels
    })
  })
);

var xRenderer = xAxis.get("renderer");
xRenderer.grid.template.setAll({
  visible: false // no vertical grid lines
});

var rangeDataItem = xAxis.makeDataItem({
  value: 0 // at zero
});

var range = xAxis.createAxisRange(rangeDataItem);

// A faint line at zero, in the theme's alternative background color, so it shows on light and dark backgrounds
range.get("grid").setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.15,
  location: 1,
  visible: true
});

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// a series of icon rows, one per department
function createSeries(field, name, color, icon, inlegend, colorOpacity) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      name: name,
      valueXField: field,
      categoryYField: "category",
      sequencedInterpolation: true, // on load, the rows grow one after another
      fill: color,                  // in the given color
      stroke: color,
      // the faded and the colored icons share one row instead of sitting side by side
      clustered: false
    })
  );

  series.columns.template.setAll({
    height: 50,      // 50px rows, one icon tall
    fillOpacity: 0,  // no plain fill: the icon pattern draws the column
    strokeOpacity: 0 // no outline
  });

  // Only the colored series get a tooltip; the gray icons behind them stay quiet
  if (inlegend) {
    series.columns.template.set("tooltipText", "{categoryY}: {valueX} {name}"); // as "Marketing: 64% Female"
  }

  if (icon) {
    series.columns.template.set("fillPattern", am5.PathPattern.new(root, { // the icon, repeated along the bar
      color: color,
      colorOpacity: colorOpacity, // faded for the full rows, solid for the shares
      repetition: "repeat-x",     // in a row, not in a grid
      // One 50px tile per icon: the icon is scaled to fit 44x44, with a 6px gap
      width: 50,
      height: 50,
      maxWidth: 44,
      maxHeight: 44,
      gap: 6,
      fillOpacity: 0,             // no background behind the icons
      svgPath: icon               // the icon's shape
    }));
  }

  series.data.setAll(data);
  series.appear();

  if (inlegend) {
    legend.data.push(series); // only the colored series in the legend
  }

  return series;
}

// Male and female take the theme’s first two colors
var maleColor = chart.get("colors").getIndex(0);
var femaleColor = chart.get("colors").getIndex(1);
// The empty icons are in the theme's alternative background color, faded, so they show on light and dark backgrounds
var placeholderColor = root.interfaceColors.get("alternativeBackground");

var maleIcon = "M 25.1 10.7 c 2.1 0 3.7 -1.7 3.7 -3.7 c 0 -2.1 -1.7 -3.7 -3.7 -3.7 c -2.1 0 -3.7 1.7 -3.7 3.7 C 21.4 9 23 10.7 25.1 10.7 z M 28.8 11.5 H 25.1 h -3.7 c -2.8 0 -4.7 2.5 -4.7 4.8 V 27.7 c 0 2.2 3.1 2.2 3.1 0 V 17.2 h 0.6 v 28.6 c 0 3 4.2 2.9 4.3 0 V 29.3 h 0.7 h 0.1 v 16.5 c 0.2 3.1 4.3 2.8 4.3 0 V 17.2 h 0.5 v 10.5 c 0 2.2 3.2 2.2 3.2 0 V 16.3 C 33.5 14 31.6 11.5 28.8 11.5 z";
var femaleIcon = "M 18.4 15.1 L 15.5 25.5 c -0.6 2.3 2.1 3.2 2.7 1 l 2.6 -9.6 h 0.7 l -4.5 16.9 H 21.3 v 12.7 c 0 2.3 3.2 2.3 3.2 0 V 33.9 h 1 v 12.7 c 0 2.3 3.1 2.3 3.1 0 V 33.9 h 4.3 l -4.6 -16.9 h 0.8 l 2.6 9.6 c 0.7 2.2 3.3 1.3 2.7 -1 l -2.9 -10.4 c -0.4 -1.2 -1.8 -3.3 -4.2 -3.4 h -4.7 C 20.1 11.9 18.7 13.9 18.4 15.1 z M 28.6 7.2 c 0 -2.1 -1.6 -3.7 -3.7 -3.7 c -2 0 -3.7 1.7 -3.7 3.7 c 0 2.1 1.6 3.7 3.7 3.7 C 27 10.9 28.6 9.2 28.6 7.2 z";

// for each side, a full row of faded icons (100%), then the colored share drawn over it
createSeries("maleMax", "Male", placeholderColor, maleIcon, false, 0.12);
createSeries("male", "Male", maleColor, maleIcon, true, 1);
createSeries("femaleMax", "Female", placeholderColor, femaleIcon, false, 0.12);
createSeries("female", "Female", femaleColor, femaleIcon, true, 1);

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
