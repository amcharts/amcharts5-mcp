---
title: "Risk Heatmap"
source: "https://www.amcharts.com/demos/risk-heatmap/"
category: "column-bar"
scraped: "2026-10-08"
---

A risk matrix on two category axes: each of the 25 cells is colored from dark green to red by its rating, with a circle sized by its value and the value written inside.

When a risk matrix works: A risk matrix sorts items into a grid by two ratings, like likelihood and impact, and colors each cell by how urgent that mix is. Readers find the red corner first; the circles add a second measure, like the number of risks in each cell.

Good for:
- Risk registers: likelihood against impact
- Prioritizing issues by two ratings
- Audit and compliance reports

Think twice when:
- Precise scores: five steps per axis round them off
- Readers who can’t tell red from green: keep the labels, or pick other colors
- Measured values on both axes: a scatter chart keeps the detail

Prompt: Create a 5 by 5 risk heat map, both axes running from Very good to Critical, with the cells colored from green to red by risk, each holding a circle sized by its value and the value itself. Add tooltips. Use the amCharts 5 library with its Responsive theme.

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
    panX: false,    // no dragging...
    panY: false,
    wheelX: "none", // ...and no wheel zoom: the page scrolls past the chart
    wheelY: "none",
    paddingLeft: 0, // the row labels sit at the chart's left edge
    // a little room between the last column and the edge
    paddingRight: 15,
    layout: root.verticalLayout
  })
);

// Create axes and their renderers
var yRenderer = am5xy.AxisRendererY.new(root, {
  visible: false,      // no axis line; the labels still show
  minGridDistance: 20, // small, so every row keeps its label
  // Critical, the first category, at the top
  inversed: true,
  minorGridEnabled: true
});

yRenderer.grid.template.set("visible", false); // no grid lines: the gaps between the cells divide them

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: yRenderer,
    categoryField: "category"
  })
);

var xRenderer = am5xy.AxisRendererX.new(root, {
  visible: false,      // no axis line; the labels still show
  minGridDistance: 30, // at least 30px between the column labels
  // Critical on the right, so the riskiest cells meet in the top right corner
  inversed: true,
  minorGridEnabled: true
});

xRenderer.grid.template.set("visible", false); // no grid lines

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: xRenderer,
    categoryField: "category"
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    calculateAggregates: true, // works out the lowest and highest values, which the heat rule needs
    // gaps between the cells in the chart's background color
    stroke: root.interfaceColors.get("background"),
    clustered: false,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryXField: "x",
    categoryYField: "y",
    valueField: "value"
  })
);

series.columns.template.setAll({
  tooltipText: "{categoryY}, {categoryX}: {value}", // the row, the column and the value
  strokeOpacity: 1,  // a solid outline...
  strokeWidth: 2,    // ...2px wide, in the background color set above
  cornerRadiusTL: 5, // rounded corners, 5px
  cornerRadiusTR: 5,
  cornerRadiusBL: 5,
  cornerRadiusBR: 5,
  width: am5.percent(100),  // each cell fills its column...
  height: am5.percent(100), // ...and its row
  // each cell's fill comes from columnSettings in its data
  templateField: "columnSettings"
});

// one shared template for the bubbles, which the heat rule sizes by value
var circleTemplate = am5.Template.new({});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series.set("heatRules", [{
  target: circleTemplate,
  min: 10, // the smallest value a 10px bubble...
  max: 35, // ...the largest 35px
  dataField: "value",
  key: "radius"
}]);

// a dark see-through bubble in each cell, sized by the heat rule
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(
      root,
      {
        fill: am5.color(0x000000),
        fillOpacity: 0.5, // half see-through, so the cell color shows
        strokeOpacity: 0  // no outline
      },
      circleTemplate
    )
  });
});

// the value, on top of the bubble
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      fill: am5.color(0xffffff), // white text on the dark bubble
      populateText: true,        // fills in {value} from the cell's data
      centerX: am5.p50,          // centered on the cell
      centerY: am5.p50,
      fontSize: 10,              // small text, in pixels
      text: "{value}"
    })
  });
});

var colors = { // the cell colors, from critical red to very good green
  critical: am5.color(0xca0101),
  bad: am5.color(0xe17a2d),
  medium: am5.color(0xe1d92d),
  good: am5.color(0x5dbe24),
  verygood: am5.color(0x0b7d03)
};

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
var data = [
  {
    y: "Critical",
    x: "Very good",
    columnSettings: {
      fill: colors.medium
    },
    value: 20
  },
  {
    y: "Bad",
    x: "Very good",
    columnSettings: {
      fill: colors.good
    },
    value: 15
  },
  {
    y: "Medium",
    x: "Very good",
    columnSettings: {
      fill: colors.verygood
    },
    value: 25
  },
  {
    y: "Good",
    x: "Very good",
    columnSettings: {
      fill: colors.verygood
    },
    value: 15
  },
  {
    y: "Very good",
    x: "Very good",
    columnSettings: {
      fill: colors.verygood
    },
    value: 12
  },
  {
    y: "Critical",
    x: "Good",
    columnSettings: {
      fill: colors.bad
    },
    value: 30
  },
  {
    y: "Bad",
    x: "Good",
    columnSettings: {
      fill: colors.medium
    },
    value: 24
  },
  {
    y: "Medium",
    x: "Good",
    columnSettings: {
      fill: colors.good
    },
    value: 25
  },
  {
    y: "Good",
    x: "Good",
    columnSettings: {
      fill: colors.verygood
    },
    value: 15
  },
  {
    y: "Very good",
    x: "Good",
    columnSettings: {
      fill: colors.verygood
    },
    value: 25
  },
  {
    y: "Critical",
    x: "Medium",
    columnSettings: {
      fill: colors.bad
    },
    value: 33
  },
  {
    y: "Bad",
    x: "Medium",
    columnSettings: {
      fill: colors.bad
    },
    value: 14
  },
  {
    y: "Medium",
    x: "Medium",
    columnSettings: {
      fill: colors.medium
    },
    value: 20
  },
  {
    y: "Good",
    x: "Medium",
    columnSettings: {
      fill: colors.good
    },
    value: 19
  },
  {
    y: "Very good",
    x: "Medium",
    columnSettings: {
      fill: colors.good
    },
    value: 25
  },
  {
    y: "Critical",
    x: "Bad",
    columnSettings: {
      fill: colors.critical
    },
    value: 31
  },
  {
    y: "Bad",
    x: "Bad",
    columnSettings: {
      fill: colors.critical
    },
    value: 24
  },
  {
    y: "Medium",
    x: "Bad",
    columnSettings: {
      fill: colors.bad
    },
    value: 25
  },
  {
    y: "Good",
    x: "Bad",
    columnSettings: {
      fill: colors.medium
    },
    value: 15
  },
  {
    y: "Very good",
    x: "Bad",
    columnSettings: {
      fill: colors.good
    },
    value: 15
  },
  {
    y: "Critical",
    x: "Critical",
    columnSettings: {
      fill: colors.critical
    },
    value: 12
  },
  {
    y: "Bad",
    x: "Critical",
    columnSettings: {
      fill: colors.critical
    },
    value: 14
  },
  {
    y: "Medium",
    x: "Critical",
    columnSettings: {
      fill: colors.critical
    },
    value: 15
  },
  {
    y: "Good",
    x: "Critical",
    columnSettings: {
      fill: colors.bad
    },
    value: 25
  },
  {
    y: "Very good",
    x: "Critical",
    columnSettings: {
      fill: colors.medium
    },
    value: 19
  }
];

series.data.setAll(data);

yAxis.data.setAll([
  { category: "Critical" },
  { category: "Bad" },
  { category: "Medium" },
  { category: "Good" },
  { category: "Very good" }
]);

xAxis.data.setAll([
  { category: "Critical" },
  { category: "Bad" },
  { category: "Medium" },
  { category: "Good" },
  { category: "Very good" }
]);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
