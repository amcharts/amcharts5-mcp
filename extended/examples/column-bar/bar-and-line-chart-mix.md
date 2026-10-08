---
title: "Bar and Line Chart Mix"
source: "https://www.amcharts.com/demos/bar-and-line-chart-mix/"
category: "column-bar"
scraped: "2026-10-08"
---

Bars and a line on one chart, turned on its side: income as horizontal bars, expenses as a line that climbs through the years. In 2025, expenses overtook income.

When to turn the mix on its side: Turning a combined chart on its side lets the categories run down the page, which suits a narrow panel on a dashboard or long category names. The line still links one measure across the categories, so it needs an order, like years, to mean anything.

Good for:
- Narrow spaces, like a dashboard side panel
- Plan against actual per year or quarter
- Seeing where one measure overtakes the other

Think twice when:
- Years in a report: most readers expect time from left to right, as columns
- Categories with no order: a line between them means nothing, so use two bars
- Many categories: the line zigzags

Prompt: Create a horizontal bar and line chart of income and expenses over five years: income as bars, expenses as a line with circle markers through the middle of each row. Add a cursor, tooltips and a legend. Use the amCharts 5 library with its Responsive theme.

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
  panX: false,     // the plot doesn't pan when dragged
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans the values
  wheelY: "zoomX", // the vertical wheel zooms in on the values
  // room on the left for the year axis tooltip
  paddingLeft: 15,
  layout: root.verticalLayout
}));

var data = [{
  "year": "2021",
  "income": 23.5,
  "expenses": 18.1
}, {
  "year": "2022",
  "income": 26.2,
  "expenses": 22.8
}, {
  "year": "2023",
  "income": 30.1,
  "expenses": 23.9
}, {
  "year": "2024",
  "income": 29.5,
  "expenses": 25.1
}, {
  "year": "2025",
  "income": 24.6,
  "expenses": 25
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  // the gap between years: each year's bar takes the middle 80% of its row
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  minorGridEnabled: true // a grid line for every year, even one whose label is skipped
});

// draw each grid line at the end of its year's row instead of at its start
yRenderer.grid.template.set("location", 1);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: yRenderer,
    tooltip: am5.Tooltip.new(root, {}) // the cursor shows the year on the axis
  })
);

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0, // the bars start at zero
    renderer: am5xy.AxisRendererX.new(root, {
      strokeOpacity: 0.1, // a faint axis line
      minGridDistance:70  // at least 70px between labels; on narrow screens some are skipped
    })
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Income",
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "income",
  categoryYField: "year",
  sequencedInterpolation: true, // the bars grow one after another
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal",                   // the tooltip points sideways at the bar
    labelText: "[bold]{name}[/]\n{categoryY}: {valueX}" // the series name in bold, then the year and the value
  })
}));

series1.columns.template.setAll({
  height: am5.percent(70) // each bar takes 70% of its year's cell
});

var series2 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Expenses",
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "expenses",
  categoryYField: "year",
  sequencedInterpolation: true, // the line's points animate one after another
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal",
    labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
  })
}));

series2.strokes.template.setAll({
  strokeWidth: 2, // a 2px line
});

// a circle on each point of the line
series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0.5, // in the middle of the year's row
    sprite: am5.Circle.new(root, {
      radius: 5, // 5px
      stroke: series2.get("stroke"), // outlined in the line's color...
      strokeWidth: 2, // ...2px wide
      fill: root.interfaceColors.get("background") // filled with the background color, so it looks hollow
    })
  });
});

// Add legend, in the bottom right corner of the plot area, its items one under the other
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.plotContainer.children.push(am5.Legend.new(root, {
  x: am5.p100,
  centerX: am5.p100,
  y: am5.p100,
  centerY: am5.p100,
  layout: root.verticalLayout,
  paddingRight: 10, // 10px in from the corner
  paddingBottom: 10
}));

legend.data.setAll(chart.series.values);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag up or down across the plot to zoom into those years
  behavior: "zoomY"
}));
cursor.lineX.set("visible", false); // no vertical cursor line, only the horizontal one

series1.data.setAll(data);
series2.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series1.appear();
series2.appear();
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
