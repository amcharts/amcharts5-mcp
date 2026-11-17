---
title: "Line series with bullets"
source: "https://docs.amcharts.com/embeds/v5/line-series-with-bullets-2/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/images"]
---

A demo from the docs page "Images" (get_doc(path: "concepts/common-elements/images")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    value: 1,
    value2: 2.5
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3,
    value2: 2.1
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2,
    value2: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1,
    value2: 2
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5,
    value2: 0.5
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
function createSeries(name, field, bullet) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 40,
        height: 40,
        x: am5.percent(30),
        y: am5.percent(50),
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        src: bullet
      })
    });
  });

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value", "https://docs.amcharts.com/assets/icon_btc.svg");
createSeries("Series #2", "value2", "https://docs.amcharts.com/assets/icon_eth.svg");

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
  height: 250px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
