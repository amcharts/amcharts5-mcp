---
title: "Line with Custom Bullets"
source: "https://www.amcharts.com/demos/line-with-custom-bullets/"
category: "line-area"
scraped: "2026-03-15"
---

Anything can be a bullet
Besides pre-defined shapes, bullet can be anything in amCharts 5 - an SVG image or path, static image, another complex shape - even another chart.
Bullets
Images as bullets

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout,
    pinchZoomX: true,
    paddingLeft: 0
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "none"
  })
);
cursor.lineY.set("visible", false);

var colorSet = am5.ColorSet.new(root, {});

// The data
var data = [
  {
    date: "2021-12-31 18:00",
    value: 0
  },
  {
    date: "2021-12-31 19:00",
    value: 0
  },
  {
    date: "2021-12-31 20:00",
    value: 0
  },
  {
    date: "2021-12-31 21:00",
    value: 0.3
  },
  {
    date: "2021-12-31 22:00",
    value: 0.8
  },
  {
    date: "2021-12-31 23:00",
    value: 1.2
  },
  {
    date: "2022-01-01 00:00",
    value: 2.2
  },
  {
    date: "2022-01-01 01:00",
    value: 2.5
  },
  {
    date: "2022-01-01 02:00",
    value: 2.2
  }
];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minorGridEnabled: true,
  minGridDistance: 70
});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({
  location: 0.5,
  multiLocation: 0.5
});

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "hour", count: 1 },
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yRenderer = am5xy.AxisRendererY.new(root, {});
yRenderer.grid.template.set("forceHidden", true);
yRenderer.labels.template.set("minPosition", 0.05);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0,
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
    maskBullets: false,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "vertical",
      dy: -20,
      labelText: "{valueY}"
    })
  })
);

// Set up data processor to parse string dates
// https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd HH:mm",
  dateFields: ["date"]
});

series.strokes.template.setAll({ strokeDasharray: [3, 3], strokeWidth: 2 });


var i = -1;
series.bullets.push(function () {
  i++;

  if (i > 7) {
    i = 0;
  }

  var container = am5.Container.new(root, {
    centerX: am5.p50,
    centerY: am5.p50
  });

  container.children.push(
    am5.Circle.new(root, { radius: 20, fill: series.get("fill") })
  );

  container.children.push(
    am5.Picture.new(root, {
      centerX: am5.p50,
      centerY: am5.p50,
      width: 23,
      height: 23,
      src: "https://amcharts.com/wp-content/uploads/assets/timeline/timeline" + i + ".svg"
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
