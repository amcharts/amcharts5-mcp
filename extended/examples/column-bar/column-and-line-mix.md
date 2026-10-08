---
title: "Column and Line Mix"
source: "https://www.amcharts.com/demos/column-and-line-mix/"
category: "column-bar"
scraped: "2026-10-08"
---

Income as columns and expenses as a line on one chart, so the gap between them shows year by year. The last year is a projection, drawn faint and dashed.

When to mix columns and a line: Two measures on one chart read best when they look different: columns for the amounts, a line for what they are compared against. Here both share one axis, so the gap between income and expenses is the story, and the faint, dashed last year keeps the plan apart from the results.

Good for:
- Income against expenses, sales against target
- Actual figures with a projection
- Amounts per period with a trend on top

Think twice when:
- Two measures in different units: give each its own, clearly labeled axis
- Many years: two lines read more cleanly
- More than two measures: the mix gets hard to read

Prompt: Create a column and line chart of income and expenses over six years: income as columns, expenses as a line with circle markers, and the last year shown as a projection with a dashed, faded column and a dashed line. Add tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,     // the plot doesn't pan when dragged
    panY: false,
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans the years
    wheelY: "zoomX", // the vertical wheel zooms in on them
    paddingLeft: 0,  // the value labels sit at the chart's left edge
    layout: root.verticalLayout
  })
);

var data = [
  {
    year: "2020",
    income: 23.5,
    expenses: 21.1
  },
  {
    year: "2021",
    income: 26.2,
    expenses: 30.5
  },
  {
    year: "2022",
    income: 30.1,
    expenses: 34.9
  },
  {
    year: "2023",
    income: 29.5,
    expenses: 31.1
  },
  {
    year: "2024",
    income: 30.6,
    expenses: 28.2,
    // from this point on the line is dashed: the projected part
    strokeSettings: {
      stroke: chart.get("colors").getIndex(1),
      strokeWidth: 3,
      strokeDasharray: [5, 5]
    }
  },
  {
    year: "2025",
    income: 34.1,
    expenses: 32.9,
    // the projected year's column: faint, with a dashed outline
    columnSettings: {
      strokeWidth: 1,
      strokeDasharray: [5],
      fillOpacity: 0.2
    },
    info: "(projection)" // shown after the value in the tooltips
  }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true, // a grid line for every year, even one whose label is skipped
  minGridDistance: 60     // at least 60px between labels; on narrow screens some are skipped
});
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}) // the cursor shows the year on the axis
  })
);
xRenderer.grid.template.setAll({
  // draw each grid line at the end of its year's cell instead of at its start
  location: 1
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0, // the columns start at zero
    // 10% of room above the highest value
    extraMax: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1 // a faint axis line
    })
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Income",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "income",
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",                   // the tooltip points sideways
      labelText: "{name} in {categoryX}: {valueY} {info}" // {info} adds "(projection)" for the last year
    })
  })
);

series1.columns.template.setAll({
  tooltipY: am5.percent(10),      // the tooltip points near the top of the column
  templateField: "columnSettings" // the projected year's look from its columnSettings
});

series1.data.setAll(data);

var series2 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Expenses",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "expenses",
    categoryXField: "year",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways
      labelText: "{name} in {categoryX}: {valueY} {info}"
    })
  })
);

series2.strokes.template.setAll({
  strokeWidth: 3,                 // a 3px line
  templateField: "strokeSettings" // dashed from the point that has strokeSettings
});

series2.data.setAll(data);

// a circle on each point, filled with the background color so it looks hollow
series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      strokeWidth: 3,                // a 3px outline...
      stroke: series2.get("stroke"), // ...in the line's color
      radius: 5,                     // 5px
      fill: root.interfaceColors.get("background")
    })
  });
});

chart.set("cursor", am5xy.XYCursor.new(root, {})); // both series' tooltips show for the hovered year

// Add legend, in the top left corner of the plot area
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.plotContainer.children.push(
  am5.Legend.new(root, {
    x: 0,           // the legend's top left corner...
    y: 0,           // ...at the plot's top left corner
    paddingTop: 10, // 10px in from the corner
    paddingLeft: 10
  })
);
legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
series1.appear();
series2.appear();
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
