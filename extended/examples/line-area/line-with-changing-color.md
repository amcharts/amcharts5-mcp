---
title: "Line with Changing Color"
source: "https://www.amcharts.com/demos/line-with-changing-color/"
category: "line-area"
scraped: "2026-10-08"
---

One line in three colors: each stretch of years gets its own color for the line, the area under it and the points. The colors are set in the data, so you choose where each stretch begins.

When to change a line’s color: Changing color along a line splits one series into chapters without breaking it: before and after a launch, a new policy or a new owner. The line stays one line, so the trend still reads across the change.

Good for:
- Before and after an event
- Phases of a project or a market
- Actual figures followed by a forecast

Think twice when:
- Colors nobody can decode: label each phase
- More than three or four phases
- Different measures: use separate series with a legend

Prompt: Create a line chart of yearly values from 2015 to 2025, split into three phases, each with its own color for the line, the fill under it and the bullets, set in the data. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
  panX: true,                  // drag the plot sideways to pan through the years
  panY: true,                  // and up and down
  wheelX: "panX",              // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX",             // ...and the vertical wheel zooms in on the years
  layout: root.verticalLayout, // the chart's parts are stacked top to bottom
  pinchZoomX: true,            // pinch with two fingers to zoom on a touch screen
  paddingLeft: 0               // the value labels sit at the chart's left edge
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none" // dragging the plot pans instead of selecting a range to zoom
}));
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

var colorSet = am5.ColorSet.new(root, {}); // the theme's colors; getIndex(n) picks one of them

// The data
var data = [
  {
    year: "2015",
    value: 23.5,
    strokeSettings: {
      stroke: colorSet.getIndex(0)
    },
    fillSettings: {
      fill: colorSet.getIndex(0),
    },
    bulletSettings: {
      fill: colorSet.getIndex(0)
    }
  },
  {
    year: "2016",
    value: 26,
    bulletSettings: {
      fill: colorSet.getIndex(0)
    }
  },
  {
    year: "2017",
    value: 30,
    bulletSettings: {
      fill: colorSet.getIndex(0)
    }
  },
  {
    year: "2018",
    value: 20,
    bulletSettings: {
      fill: colorSet.getIndex(0)
    }
  },
  {
    year: "2019",
    value: 30,
    strokeSettings: {
      stroke: colorSet.getIndex(3)
    },
    fillSettings: {
      fill: colorSet.getIndex(3),
    },
    bulletSettings: {
      fill: colorSet.getIndex(3)
    }
  },
  {
    year: "2020",
    value: 30,
    bulletSettings: {
      fill: colorSet.getIndex(3)
    }
  },
  {
    year: "2021",
    value: 31,
    bulletSettings: {
      fill: colorSet.getIndex(3)
    }
  },
  {
    year: "2022",
    value: 34,
    strokeSettings: {
      stroke: colorSet.getIndex(6)
    },
    fillSettings: {
      fill: colorSet.getIndex(6),
    },
    bulletSettings: {
      fill: colorSet.getIndex(6)
    }
  },
  {
    year: "2023",
    value: 33,
    bulletSettings: {
      fill: colorSet.getIndex(6)
    }
  },
  {
    year: "2024",
    value: 34,
    bulletSettings: {
      fill: colorSet.getIndex(6)
    }
  },
  {
    year: "2025",
    value: 36,
    bulletSettings: {
      fill: colorSet.getIndex(6)
    }
  }
];

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true, // fainter grid lines between the labeled ones
  minGridDistance: 80     // at least 80px between labels; on narrow screens some are skipped
});
// grid lines and labels in the middle of each year, under the line's points
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "year",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // a year label follows the cursor along the axis
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxPrecision: 0, // whole numbers only on the value labels
  renderer: am5xy.AxisRendererY.new(root, {})
}));

var series = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "year",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}", // the tooltip shows the point's value
    dy: -5                 // and sits 5px above it
  })
}));

// a data item with strokeSettings or fillSettings starts a new segment in those colors
series.strokes.template.setAll({
  templateField: "strokeSettings",
  strokeWidth: 2 // a 2px line
});

series.fills.template.setAll({
  visible: true,                // fill the area under the line...
  fillOpacity: 0.5,             // ...half see-through...
  templateField: "fillSettings" // ...in each segment's color from the data
});

// a dot on every point, colored from the data item's bulletSettings
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      templateField: "bulletSettings",
      radius: 5 // 5px radius
    })
  });
});

series.data.setAll(data);
series.appear(1000);


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
