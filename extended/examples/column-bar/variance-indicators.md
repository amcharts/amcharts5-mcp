---
title: "Variance Indicators"
source: "https://www.amcharts.com/demos/variance-indicators/"
category: "column-bar"
scraped: "2026-10-08"
---

A column chart that shows the change from each year to the next: an arrow runs from one column’s height to the next one’s, with the change in percent, green for a rise and red for a fall.

When to show the change: The columns show each year’s level; the arrows answer the next question, by how much it changed. Writing the percent on the chart saves readers from working it out, and the color tells rises from falls at a glance. It suits a handful of periods, where every arrow has room.

Good for:
- Year-over-year revenue or sales
- This year’s budget against last year’s
- A handful of periods

Think twice when:
- Many periods: the arrows crowd, so chart the change on its own
- Changes that build on each other: a waterfall adds them up
- Small base values: a big percent can mislead, so show the amounts too

Prompt: Create a column chart of seven yearly values with variance indicators between neighboring years: a thin line from each value to the next, topped by an arrow and the percent change, green and pointing up for a rise, red and pointing down for a fall. Add tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: false, // no panning or zooming: every year stays in view
  panY: false,
  wheelX: "none",
  wheelY: "none",
  layout: root.verticalLayout,
  paddingLeft: 0 // the value labels sit at the chart's left edge
}));

// Data
var data = [{
  year: "2019",
  value: 600000
}, {
  year: "2020",
  value: 900000
}, {
  year: "2021",
  value: 180000
}, {
  year: "2022",
  value: 600000
}, {
  year: "2023",
  value: 350000
}, {
  year: "2024",
  value: 600000
}, {
  year: "2025",
  value: 670000
}];

// Work out the change from each year to the next. The labels and arrows take their text, color and
// direction from these fields: a rise gets a green label over an arrow pointing up, a fall a red label
// under an arrow pointing down (the theme's positive and negative colors)
var positiveColor = root.interfaceColors.get("positive");
var negativeColor = root.interfaceColors.get("negative");
// the fall labels: the theme's dark red reads poorly on a dark background, so there they take a lighter red
var negativeLabelColor = am5.Color.alternative(root.interfaceColors.get("background"), am5.Color.lighten(negativeColor, 0.4), negativeColor);

for (var i = 0; i < (data.length - 1); i++) {
  // the change in percent, rounded
  var change = Math.round((data[i + 1].value - data[i].value) / data[i].value * 100);
  data[i].valueNext = data[i + 1].value; // where the indicator line ends
  data[i].change = change;
  if (change < 0) {
    data[i].labelSettings = { fill: negativeLabelColor, centerY: 0 }; // red, hanging below the end of the line
    data[i].arrowSettings = { rotation: 180, dy: -4 }; // pointing down, 4px up so its tip meets the line's end
  }
  else {
    data[i].labelSettings = { fill: positiveColor, centerY: am5.p100 }; // green, sitting above it
    data[i].arrowSettings = { rotation: 0, dy: 4 }; // pointing up, 4px down so its tip meets the line's end
  }
}

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // the gap between years: each year's columns get the middle 80% of its cell
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  minGridDistance: 30, // years can be 30px apart before labels are skipped
  minorGridEnabled: true
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines between the years, not through the middle of each
})

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // start at zero, so the column heights compare fairly
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// Column series
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "year"
}));

series.columns.template.setAll({
  tooltipText: "{categoryX}: {valueY}",
  width: am5.percent(90), // columns fill 90% of the year's space
  tooltipY: 0             // the tooltip points at the top of the column
});

series.data.setAll(data);

// Variance indicator series: a thin column from each year's value to the next one's
var series2 = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "valueNext", // each line runs up or down to the next year's value...
  openValueYField: "value", // ...from this year's
  categoryXField: "year",
  fill: root.interfaceColors.get("text"), // in the text color, so it shows on light and dark
  stroke: root.interfaceColors.get("text")
}));

series2.columns.template.setAll({
  width: 1 // 1px wide: a line
});

series2.data.setAll(data);

// The percent change at the end of the line
series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1, // at the end of the line, the next year's value
    sprite: am5.Label.new(root, {
      text: "{change}%",
      fontWeight: "500",             // medium weight
      centerX: am5.p50,              // centered over the line
      populateText: true,            // fills in {change} from the data
      templateField: "labelSettings" // color and side (above or below) from the data
    })
  });
});

// The arrowhead, turned down for a fall
series2.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1, // also at the end of the line
    sprite: am5.Triangle.new(root, {
      width: 7, // a small 7x8px triangle
      height: 8,
      fill: root.interfaceColors.get("text"), // in the text color, like the line
      templateField: "arrowSettings"          // direction from the data
    })
  });
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
