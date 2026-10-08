---
title: "XY Chart with Fills to the Axis"
source: "https://www.amcharts.com/demos/xy-chart-fills-axis/"
category: "xy-bubble"
scraped: "2026-10-08"
---

An area chart on two number axes, where the shading can face either way: the lower line fills down to the X axis, the upper one across to the Y axis.

When to fill toward an axis: Shading under a line turns its values into an area, and the direction of the fill tells the reader which axis the values are measured from. Filling to the Y axis suits profiles where height runs up the side, like temperature by altitude, and one fill each way lets two curves share a chart without their areas piling up.

Good for:
- Two curves on number axes, shaded in different directions
- Profiles by depth or altitude, filled to the Y axis
- Showing how much ground each curve covers

Think twice when:
- Values over time: an area chart on a date axis reads better
- Fills that cross each other: lower the opacity or drop one
- Many series: shade one or two and draw the rest as lines

Prompt: Create an XY chart with two value axes and two line series with semi-transparent area fills: one fills down to the X axis and the other across to the Y axis, so the shaded areas face different directions. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Data
var data = [
  {
    ax: 1,
    ay: 0.5,
    bx: 1,
    by: 2.2
  },
  {
    ax: 2,
    ay: 1.3,
    bx: 2,
    by: 4.9
  },
  {
    ax: 3,
    ay: 2.3,
    bx: 3,
    by: 5.1
  },
  {
    ax: 4,
    ay: 2.8,
    bx: 4,
    by: 5.3
  },
  {
    ax: 5,
    ay: 3.5,
    bx: 5,
    by: 6.1
  },
  {
    ax: 6,
    ay: 5.1,
    bx: 6,
    by: 8.3
  },
  {
    ax: 7,
    ay: 6.7,
    bx: 7,
    by: 10.5
  },
  {
    ax: 8,
    ay: 8,
    bx: 8,
    by: 12.3
  },
  {
    ax: 9,
    ay: 8.9,
    bx: 9,
    by: 14.5
  },
  {
    ax: 10,
    ay: 9.7,
    bx: 10,
    by: 15
  },
  {
    ax: 11,
    ay: 10.4,
    bx: 11,
    by: 18.8
  },
  {
    ax: 12,
    ay: 11.7,
    bx: 12,
    by: 25
  }
];

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
    wheelY: "none" // the mouse wheel doesn't zoom
  })
);

// every second color of the palette, so the two series stand apart
chart.get("colors").set("step", 2);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    // the axis ends exactly at the lowest and highest values, not at rounded numbers
    strictMinMax: true,
    maxDeviation: 0, // no panning past the data
    renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }), // at least 50px between labels
    tooltip: am5.Tooltip.new(root, {
      animationDuration: 300 // the axis tooltip glides to the cursor in 300ms
    })
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    strictMinMax: true,
    maxDeviation: 0,
    renderer: am5xy.AxisRendererY.new(root, {}),
    tooltip: am5.Tooltip.new(root, {
      animationDuration: 300
    })
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "ay",
    valueXField: "ax",
    baseAxis: xAxis, // the fill goes down to the X axis
    tooltip: am5.Tooltip.new(root, {
      labelText: "x: {valueX}, y: {valueY}"
    })
  })
);

series0.fills.template.setAll({
  fillOpacity: 0.5, // half see-through, so the fills show where they overlap
  visible: true     // a line series' fill is hidden until shown
});

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "by",
    valueXField: "bx",
    baseAxis: yAxis, // the fill goes across to the Y axis
    tooltip: am5.Tooltip.new(root, {
      labelText: "x: {valueX}, y: {valueY}"
    })
  })
);

series1.fills.template.setAll({
  fillOpacity: 0.5, // half see-through, so the fills show where they overlap
  visible: true     // a line series' fill is hidden until shown
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series0, series1] // the cursor jumps to the nearest point of either series
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

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
