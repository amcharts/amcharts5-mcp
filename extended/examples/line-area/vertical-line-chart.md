---
title: "Vertical Line Chart"
source: "https://www.amcharts.com/demos/vertical-line-chart/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart turned on its side: dates run up the left edge and values across, so the line climbs the page. Two colored zones split the values below and above 70.

When to stand a line chart up: Turning the chart puts the dates on the vertical axis, so a long run of days stacks up the page instead of across it, and a tall, narrow space is put to use. It suits phone screens, sidebars and profiles where up and down mean something, like depth or altitude.

Good for:
- Tall, narrow spaces: phone screens and sidebars
- Depth or altitude profiles
- Long runs of dates that people scroll through

Think twice when:
- Readers used to time running left to right
- Wide screens: a standard line chart uses the width better
- Many series: the lines tangle in a narrow chart

Prompt: Create a vertical line chart with the dates running up the Y axis and the values on the X axis: about five weeks of daily values as a dashed line with small markers, over two shaded value zones. Add a cursor, tooltips and a vertical scrollbar. Use the amCharts 5 library with its Responsive theme.

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

var data = [
  {
    date: "2025-12-24",
    value: 55
  },
  {
    date: "2025-12-25",
    value: 52
  },
  {
    date: "2025-12-26",
    value: 54
  },
  {
    date: "2025-12-27",
    value: 50
  },
  {
    date: "2025-12-28",
    value: 50
  },
  {
    date: "2025-12-29",
    value: 51
  },
  {
    date: "2025-12-30",
    value: 52
  },
  {
    date: "2025-12-31",
    value: 58
  },
  {
    date: "2026-01-01",
    value: 60
  },
  {
    date: "2026-01-02",
    value: 67
  },
  {
    date: "2026-01-03",
    value: 64
  },
  {
    date: "2026-01-04",
    value: 66
  },
  {
    date: "2026-01-05",
    value: 60
  },
  {
    date: "2026-01-06",
    value: 63
  },
  {
    date: "2026-01-07",
    value: 61
  },
  {
    date: "2026-01-08",
    value: 60
  },
  {
    date: "2026-01-09",
    value: 65
  },
  {
    date: "2026-01-10",
    value: 75
  },
  {
    date: "2026-01-11",
    value: 77
  },
  {
    date: "2026-01-12",
    value: 78
  },
  {
    date: "2026-01-13",
    value: 70
  },
  {
    date: "2026-01-14",
    value: 70
  },
  {
    date: "2026-01-15",
    value: 73
  },
  {
    date: "2026-01-16",
    value: 71
  },
  {
    date: "2026-01-17",
    value: 74
  },
  {
    date: "2026-01-18",
    value: 78
  },
  {
    date: "2026-01-19",
    value: 85
  },
  {
    date: "2026-01-20",
    value: 82
  },
  {
    date: "2026-01-21",
    value: 83
  },
  {
    date: "2026-01-22",
    value: 88
  },
  {
    date: "2026-01-23",
    value: 85
  },
  {
    date: "2026-01-24",
    value: 85
  },
  {
    date: "2026-01-25",
    value: 80
  },
  {
    date: "2026-01-26",
    value: 87
  },
  {
    date: "2026-01-27",
    value: 84
  },
  {
    date: "2026-01-28",
    value: 83
  },
  {
    date: "2026-01-29",
    value: 84
  },
  {
    date: "2026-01-30",
    value: 81
  }
];

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true, // the chart can be reached with the Tab key
    panX: true,      // drag the plot to pan it, in either direction
    panY: true,
    // the wheel pans and zooms the date axis, which runs up the chart here
    wheelX: "panY",
    wheelY: "zoomY",
    paddingLeft: 45 // room at the left for the cursor's date on the axis, which is wider than the labels
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1, // can be panned 10% of its length past the first or last day
    groupData: false,  // every day stays its own point, never grouped into weeks
    baseInterval: {    // one point per day
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererY.new(root, {
      minorGridEnabled: true // fainter grid lines between the labeled ones
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the cursor's date on the axis
  })
);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0, // the values don't pan past the data
    renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }) // at least 50px between value labels
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10, // dots hide when the points get closer than 10px
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    valueYField: "date", // dates up the vertical axis, values across: a vertical line
    // the text color: dark in light mode, light in dark mode, so the line
    // stands out from the colored zones in both
    stroke: root.interfaceColors.get("text"),
    fill: root.interfaceColors.get("text"),
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "vertical", // the tooltip sits above or below the point, not beside it
      dy: -3,                         // moved 3px up
      labelText: "{valueX}"           // just the value
    })
  })
);

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

// a 2px dashed line: 4px dashes with 4px gaps
series.strokes.template.setAll({ strokeDasharray: [4, 4], strokeWidth: 2 });
series.data.setAll(data);

series.bullets.push(function () {
  // in the line's color
  var circle = am5.Circle.new(root, {
    radius: 3, // a dot 6px across
    fill: series.get("stroke")
  });

  return am5.Bullet.new(root, {
    sprite: circle
  });
});

// add axis ranges
var colorSet = chart.get("colors"); // the theme's colors, for the two zones

var range0DataItem = xAxis.makeDataItem({
  value: 40, // a zone from 40 to 70 on the value axis
  endValue: 70
});
xAxis.createAxisRange(range0DataItem);

range0DataItem.get("axisFill").setAll({
  visible: true,     // axis fills are hidden until made visible
  fillOpacity: 0.35, // soft enough that the line stays the first thing you see
  fill: colorSet.getIndex(8) // the theme's 9th color
});

var range1DataItem = xAxis.makeDataItem({
  value: 70, // a second zone, from 70 to 100
  endValue: 100
});
xAxis.createAxisRange(range1DataItem);

range1DataItem.get("axisFill").setAll({
  visible: true,     // axis fills are hidden until made visible
  fillOpacity: 0.35, // soft enough that the line stays the first thing you see
  fill: colorSet.getIndex(14) // the theme's 15th color
});

// put axis ranges to back
chart.plotContainer.children.moveValue(chart.topGridContainer, 0);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    yAxis: yAxis,
    // dragging over the plot pans the chart instead of selecting a range to zoom
    behavior: "none"
  })
);
cursor.lineX.set("visible", false); // no vertical cursor line: the horizontal one marks the date

// add scrollbar
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical" }));

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
