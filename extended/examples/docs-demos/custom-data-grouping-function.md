---
title: "Custom data grouping function"
source: "https://docs.amcharts.com/embeds/v5/custom-data-grouping-function/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/xy-chart/axes/date-axis"]
---

A demo from the docs page "Date axis" (get_doc(path: "charts/xy-chart/axes/date-axis")).

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
    panY: "none",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.get("dateFormats")["day"] = "MM/dd";
xAxis.get("periodChangeDateFormats")["day"] = "MMMM";

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 100;

function generateData() {
  value = Math.round(Math.random() * 10 - 5 + value);
  am5.time.add(date, "day", 1);
  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}
var data = generateDatas(50000);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {}),
      groupDataCallback: function (dataItem, interval) {
        var originals = dataItem.get("originals");
        var high = -10000;
        for (var i = 0; i < originals.length; i++) {
          if (dataItem.get("valueY") > high) {
            high = dataItem.get("valueY");
          }
        }
        dataItem.set("valueY", high);
        dataItem.set("valueYWorking", high);
      }
    })
  );

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series", "value");

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

chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
