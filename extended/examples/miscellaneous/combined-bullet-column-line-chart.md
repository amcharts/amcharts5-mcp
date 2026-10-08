---
title: "Combined Bullet/Column and Line Graphs with Multiple Value Axes"
source: "https://www.amcharts.com/demos/combined-bullet-column-line-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

Columns and lines on two value axes: daily sales on the left, a narrow actual over a wide, pale target like a bullet graph, and two market lines on the right.

When to mix columns and lines: Columns suit amounts per period, like sales per day, and lines suit rates or levels that run on between them. Putting both on one chart, each with its own value axis, shows whether they move together, as long as the reader can tell which axis belongs to which series.

Good for:
- Actual against target per day or month
- An amount and a rate on one time line
- Spotting days where two measures part ways

Think twice when:
- Two value axes can suggest links that aren’t there
- More than two measures on each side: split into two charts
- Readers who print in gray: give the lines distinct dash patterns

Prompt: Create a chart of two weeks of daily sales: target sales as wide faint columns with actual sales as narrower columns in front, like a bullet graph, and two smoothed lines of market figures with bullets on a second value axis. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Data
var data = [
  {
    date: "2026-01-14",
    market0: 71,
    market1: 75,
    sales0: 5,
    sales1: 9
  },
  {
    date: "2026-01-15",
    market0: 74,
    market1: 78,
    sales0: 4,
    sales1: 6
  },
  {
    date: "2026-01-16",
    market0: 78,
    market1: 88,
    sales0: 5,
    sales1: 2
  },
  {
    date: "2026-01-17",
    market0: 85,
    market1: 89,
    sales0: 8,
    sales1: 9
  },
  {
    date: "2026-01-18",
    market0: 82,
    market1: 89,
    sales0: 9,
    sales1: 6
  },
  {
    date: "2026-01-19",
    market0: 83,
    market1: 85,
    sales0: 3,
    sales1: 5
  },
  {
    date: "2026-01-20",
    market0: 88,
    market1: 92,
    sales0: 5,
    sales1: 7
  },
  {
    date: "2026-01-21",
    market0: 85,
    market1: 90,
    sales0: 7,
    sales1: 6
  },
  {
    date: "2026-01-22",
    market0: 85,
    market1: 91,
    sales0: 9,
    sales1: 5
  },
  {
    date: "2026-01-23",
    market0: 80,
    market1: 84,
    sales0: 5,
    sales1: 8
  },
  {
    date: "2026-01-24",
    market0: 87,
    market1: 92,
    sales0: 4,
    sales1: 8
  },
  {
    date: "2026-01-25",
    market0: 84,
    market1: 87,
    sales0: 3,
    sales1: 4
  },
  {
    date: "2026-01-26",
    market0: 83,
    market1: 88,
    sales0: 5,
    sales1: 7
  },
  {
    date: "2026-01-27",
    market0: 84,
    market1: 87,
    sales0: 5,
    sales1: 8
  },
  {
    date: "2026-01-28",
    market0: 81,
    market1: 85,
    sales0: 4,
    sales1: 7
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

root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd", // dates in texts look like 2026-01-14...
  dateFields: ["valueX"]    // ...in the ones that use valueX
});

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,                // the plot doesn't pan when dragged
    panY: false,
    wheelX: "panX",             // a horizontal wheel or trackpad swipe pans the days
    wheelY: "zoomX",            // the vertical wheel zooms in on them
    layout: root.verticalLayout // the plot on top, the legend under it
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  // drag across the plot to zoom into those days
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false); // no horizontal cursor line, only the vertical one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 }, // one point per day
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true // fainter grid lines between the labeled dates
    }),
    tooltip: am5.Tooltip.new(root, {}), // the cursor shows the date on the axis...
    tooltipDateFormat: "yyyy-MM-dd"     // ...written out in full
  })
);

// Sales on the left; columns start at zero, so their heights compare fairly
var yAxis0 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      pan: "zoom" // drag along the value labels to zoom them
    })
  })
);

var yRenderer1 = am5xy.AxisRendererY.new(root, {
  opposite: true // its labels on the right side of the plot
});
// no grid lines of its own, so they don't clash with the left axis's
yRenderer1.grid.template.set("forceHidden", true);

// Market days on the right
var yAxis1 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: yRenderer1
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
// Target sales: a wide, pale column behind
var columnSeries1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Target sales",
    xAxis: xAxis,
    yAxis: yAxis0,
    valueYField: "sales1",
    valueXField: "date",
    // both column series stand on the same spot, one behind the other, not side by side
    clustered: false,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal", // the tooltip points sideways
      labelText: "{name}: {valueY}"     // the series name and its value
    })
  })
);

columnSeries1.columns.template.setAll({
  width: am5.percent(60), // 60% of the day's width...
  fillOpacity: 0.5,       // ...and pale
  strokeOpacity: 0        // no outline
});

// turns the date strings into timestamps in the data itself, so the other series get them too
columnSeries1.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd"
});

// Actual sales: a narrow column in front, like the bar of a bullet graph
var columnSeries0 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Actual sales",
    xAxis: xAxis,
    yAxis: yAxis0,
    valueYField: "sales0",
    valueXField: "date",
    clustered: false, // on the same spot as the target column
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{name}: {valueY}"
    })
  })
);

columnSeries0.columns.template.set("width", am5.percent(40)); // narrower than the target column, in front of it

// market days: a smoothed line on the right axis
var series0 = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Market days",
    xAxis: xAxis,
    yAxis: yAxis1,
    valueYField: "market0",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{name}: {valueY}"
    })
  })
);

series0.strokes.template.setAll({
  strokeWidth: 2 // a 2px line
});

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series0.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      stroke: series0.get("fill"), // an outline in the line's color...
      strokeWidth: 2, // ...2px wide
      fill: root.interfaceColors.get("background"), // filled with the background color, so it looks hollow
      radius: 5 // 5px
    })
  });
});

// all market days: a dotted line on the same axis
var series1 = chart.series.push(
  am5xy.SmoothedXLineSeries.new(root, {
    name: "Market days all",
    xAxis: xAxis,
    yAxis: yAxis1,
    valueYField: "market1",
    valueXField: "date"
  })
);

series1.strokes.template.setAll({
  strokeWidth: 2,
  strokeDasharray: [2, 2] // dotted: 2px dash, 2px gap
});

var tooltip1 = series1.set("tooltip", am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
}));
// the text goes on the tooltip's label here, instead of labelText
tooltip1.label.set("text", "{name}: {valueY}");

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      stroke: series1.get("fill"),
      strokeWidth: 2,
      fill: root.interfaceColors.get("background"),
      radius: 5
    })
  });
});

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal", // drag its grips to zoom in on a range of days
  height: 60                 // 60px tall, with a preview of sales and market days
}));

// the scrollbar has a chart of its own: these axes and series draw the preview inside it
var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis0 = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbValueAxis1 = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries0 = scrollbar.chart.series.push(
  am5xy.ColumnSeries.new(root, {
    valueYField: "sales0",
    valueXField: "date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis0
  })
);

sbSeries0.columns.template.setAll({ fillOpacity: 0.5, strokeOpacity: 0 }); // pale columns, no outline

var sbSeries1 = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "market0",
    valueXField: "date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis1
  })
);

var legend = chart.children.push(
  am5.Legend.new(root, {
    x: am5.p50, // the legend's middle at the middle of the chart
    centerX: am5.p50
  })
);
legend.data.setAll(chart.series.values);

columnSeries1.data.setAll(data);
columnSeries0.data.setAll(data);

series0.data.setAll(data);
series1.data.setAll(data);

sbSeries0.data.setAll(data);
sbSeries1.data.setAll(data);

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
