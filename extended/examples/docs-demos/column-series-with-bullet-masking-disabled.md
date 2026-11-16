---
title: "Column series with bullet masking disabled"
source: "https://docs.amcharts.com/embeds/v5/column-series-with-bullet-masking-disabled/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/bullets"]
---

A demo from the docs page "Bullets" (get_doc(path: "concepts/common-elements/bullets")).

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3.9
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      maskBullets: false
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 1,
      sprite: am5.Circle.new(root, {
        radius: 15,
        fill: am5.Color.lighten(series.get("fill"), 0.7)
      })
    });
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 0.5,
      locationY: 1,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        textAlign: "center",
        populateText: true
      })
    });
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 200px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
