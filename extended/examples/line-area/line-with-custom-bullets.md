---
title: "Line with Custom Bullets"
source: "https://www.amcharts.com/demos/line-with-custom-bullets/"
category: "line-area"
scraped: "2026-10-08"
---

A line chart where each point carries its own icon, so the line tells a story. Here, New Year’s Eve hour by hour: water and coffee early on, then beer, cocktails and the midnight toast.

When pictures help a line: Icons on the points turn a line into a story people can follow without reading the axis: what happened at each step, not just how much. They work for a handful of points with clear moments; with dozens, the pictures crowd each other out.

Good for:
- Timelines of an event, hour by hour or day by day
- Infographics and slides for a general audience
- Marking what caused each change, like a launch or a sale

Think twice when:
- Dozens of points: the icons overlap
- Icons that need explaining: add labels or a key
- Reading exact values: plain markers and gridlines are clearer

Prompt: Create a dashed line chart of hourly values over New Year’s Eve, from 6 pm to 2 am, where each point’s bullet is a circle with its own icon inside, picked in the data. Add a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

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
    panX: true,                  // drag the plot sideways to pan through the hours
    panY: true,                  // and up and down
    wheelX: "panX",              // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX",             // ...and the vertical wheel zooms in on the hours
    layout: root.verticalLayout, // the chart's parts are stacked top to bottom
    pinchZoomX: true,            // pinch with two fingers to zoom on a touch screen
    paddingLeft: 0               // the value labels sit at the chart's left edge
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "none" // dragging the plot pans instead of selecting a range to zoom
  })
);
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// The data
var data = [
  {
    date: "2025-12-31 18:00",
    value: 0,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline0.svg" }
  },
  {
    date: "2025-12-31 19:00",
    value: 0,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline1.svg" }
  },
  {
    date: "2025-12-31 20:00",
    value: 0,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline2.svg" }
  },
  {
    date: "2025-12-31 21:00",
    value: 0.3,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline3.svg" }
  },
  {
    date: "2025-12-31 22:00",
    value: 0.8,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline4.svg" }
  },
  {
    date: "2025-12-31 23:00",
    value: 1.2,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline5.svg" }
  },
  {
    date: "2026-01-01 00:00",
    value: 2.2,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline6.svg" }
  },
  {
    date: "2026-01-01 01:00",
    value: 2.5,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline7.svg" }
  },
  {
    date: "2026-01-01 02:00",
    value: 2.2,
    iconSettings: { src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline0.svg" }
  }
];

// Add scrollbar, hidden at first
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", forceHidden: true }));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true, // fainter grid lines between the labeled ones
  minGridDistance: 70     // at least 70px between labels; on narrow screens some are skipped
});
// grid lines and labels in the middle of each hour, where the points are
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "hour", count: 1 }, // one data point per hour
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})            // a time label follows the cursor along the axis
  })
);

var yRenderer = am5xy.AxisRendererY.new(root, {});
yRenderer.grid.template.set("forceHidden", true); // no horizontal grid lines
yRenderer.labels.template.set("minPosition", 0.05); // hide a value label in the bottom 5% of the axis

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0, // whole numbers only on the value labels
    // 10% extra room below the lowest value, so the icons at zero fit
    extraMin: 0.1,
    renderer: yRenderer
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    // icons near the plot edges may draw past them instead of being cut off
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "vertical", // the tooltip sits above or below the point, not beside it
      dy: -20,              // 20px higher, clear of the icon
      labelText: "{valueY}" // the tooltip shows the point's value
    })
  })
);

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd HH:mm", // how the dates in the data are written
  dateFields: ["date"]            // the data fields to turn into dates
});

series.strokes.template.setAll({ strokeDasharray: [3, 3], strokeWidth: 2 }); // 2px wide, 3px dashes and gaps

// Each bullet takes its icon from the data item's "iconSettings"
// All bullets share one template, so setting its scale resizes them at once
var bulletTemplate = am5.Template.new({
  scale: 1
});

// each bullet is an icon on a circle in the line's color
series.bullets.push(function () {
  var container = am5.Container.new(root, {
    centerX: am5.p50, // the container is centered on the point...
    centerY: am5.p50  // ...horizontally and vertically
  }, bulletTemplate);

  container.children.push(
    am5.Circle.new(root, { radius: 20, fill: series.get("fill") }) // a 20px-radius circle in the line's color
  );

  container.children.push(
    am5.Picture.new(root, {
      centerX: am5.p50,             // the icon is centered in the circle...
      centerY: am5.p50,             // ...both ways
      width: 23,                    // 23px wide...
      height: 23,                   // ...and 23px high
      templateField: "iconSettings" // the image src comes from the data item's iconSettings
    })
  );

  return am5.Bullet.new(root, {
    sprite: container
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
