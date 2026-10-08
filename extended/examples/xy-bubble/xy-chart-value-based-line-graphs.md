---
title: "XY Chart with Value-Based Line Graphs"
source: "https://www.amcharts.com/demos/xy-chart-value-based-line-graphs/"
category: "xy-bubble"
scraped: "2026-10-08"
---

Two lines with numbers on both axes, not dates or categories; where a line has no value, it runs on to the next point. Circle and star sizes add a third value.

When x is a number: Most line charts run along dates or categories. When x is a measurement in its own right, like distance, dose or temperature, a value axis puts each point exactly where it belongs, uneven gaps included.

Good for:
- Measurements taken at uneven x values
- Two series that don’t share every x
- A third value shown as marker size

Think twice when:
- Dates along the bottom: use a date axis
- Points with no order: drop the lines and use a scatter chart
- Sizes people must read exactly: label them or use a table

Prompt: Create an XY chart with two value axes and two dashed line series, one with circle bullets and the other with star bullets, each bullet sized by a value. Some points have a value for only one series, and the lines connect across the gaps. Use the amCharts 5 library with its Responsive theme.

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
    panX: false, // no panning by dragging
    panY: false,
    wheelY: "zoomXY", // the mouse wheel zooms both axes at once
    pinchZoomX: true, // pinch on a touch screen to zoom...
    pinchZoomY: true  // ...either axis
  })
);

chart.get("colors").set("step", 2); // every second theme color, so the two series differ more

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's x value on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {}),
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's y value on the axis
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(
  am5xy.LineSeries.new(root, {
    // works out the lowest and highest value, which the heat rule sizes the circles by
    calculateAggregates: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "ay",
    valueXField: "x",
    valueField: "aValue", // the circle size, which the heat rule reads
    tooltip: am5.Tooltip.new(root, {
      labelText: "x: {valueX}, y: {valueY}, value: {value}"
    })
  })
);

// Dashed lines between the points
series0.strokes.template.setAll({
  strokeWidth: 2,         // 2px wide...
  strokeDasharray: [3, 3] // ...3px dashes with 3px gaps
});

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
// Settings shared by all circles go in a template
var circleTemplate = am5.Template.new({
  fillOpacity: 0.8 // slightly see-through, so overlapping circles show
});
series0.bullets.push(function () {
  var graphics = am5.Circle.new(
    root,
    {
      fill: series0.get("fill") // the series color
    },
    circleTemplate
  );
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series0.set("heatRules", [{
  target: circleTemplate,
  min: 4,             // the smallest value gets a 4px radius...
  max: 20,            // ...the largest 20px
  dataField: "value", // sized by the series' valueField
  key: "radius"       // the setting the rule changes
}]);

// Settings shared by all stars go in a template
var starTemplate = am5.Template.new({
  fillOpacity: 0.8 // slightly see-through, like the circles
});

// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    calculateAggregates: true, // the lowest and highest value, for this series' heat rule
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "by",
    valueXField: "x",
    valueField: "bValue", // the star size
    tooltip: am5.Tooltip.new(root, {
      labelText: "x: {valueX}, y: {valueY}, value: {value}"
    })
  })
);

series1.strokes.template.setAll({ // dashed like the first series
  strokeWidth: 2,
  strokeDasharray: [3, 3]
});

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function () {
  var graphics = am5.Star.new(root, {
    fill: series1.get("fill"),   // the series color
    spikes: 15,                  // a 15-pointed star...
    innerRadius: am5.percent(90) // ...with shallow points: inner corners at 90% of the radius
  }, starTemplate);
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add heat rule
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
series1.set("heatRules", [{
  target: starTemplate,
  min: 4,  // the stars range from a 4px radius...
  max: 26, // ...to 26px
  dataField: "value",
  key: "radius"
}]);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  // drag across the plot to zoom both axes to that area
  behavior: "zoomXY"
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

// a row can leave out one series' fields: that series has no point there, its line goes on to the next
var data = [
  {
    x: 1,
    ay: 6.5,
    by: 2.2,
    aValue: 15,
    bValue: 10
  },
  {
    x: 2,
    ay: 12.3,
    by: 4.9,
    aValue: 8,
    bValue: 3
  },
  {
    x: 3,
    ay: 12.3,
    by: 5.1,
    aValue: 16,
    bValue: 4
  },
  {
    x: 5,
    ay: 2.9,
    aValue: 9
  },
  {
    x: 7,
    by: 8.3,
    bValue: 13
  },
  {
    x: 10,
    ay: 2.8,
    by: 13.3,
    aValue: 9,
    bValue: 13
  },
  {
    x: 12,
    ay: 3.5,
    by: 6.1,
    aValue: 5,
    bValue: 2
  },
  {
    x: 13,
    ay: 5.1,
    aValue: 10
  },
  {
    x: 15,
    ay: 6.7,
    by: 10.5,
    aValue: 3,
    bValue: 10
  },
  {
    x: 16,
    ay: 8,
    by: 12.3,
    aValue: 5,
    bValue: 13
  },
  {
    x: 20,
    by: 4.5,
    bValue: 11
  },
  {
    x: 22,
    ay: 9.7,
    by: 15,
    aValue: 15,
    bValue: 10
  },
  {
    x: 23,
    ay: 10.4,
    by: 10.8,
    aValue: 1,
    bValue: 11
  },
  {
    x: 24,
    ay: 1.7,
    by: 19,
    aValue: 12,
    bValue: 3
  }
];

series0.data.setAll(data);
series1.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);

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
