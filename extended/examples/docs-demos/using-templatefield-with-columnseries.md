---
title: "Using templateField with ColumnSeries"
source: "https://docs.amcharts.com/embeds/v5/using-templatefield-with-columnseries/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/settings/template-fields"]
---

A demo from the docs page "Template fields" (get_doc(path: "concepts/settings/template-fields")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    columnSettings: {
      fill: am5.color(0xd6e681),
      stroke: am5.color(0xd6e681)
    }
  },

  {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    columnSettings: {
      fill: am5.color(0xbabf95),
      stroke: am5.color(0xbabf95)
    }
  },

  {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    columnSettings: {
      fill: am5.color(0xc4ad83),
      stroke: am5.color(0xc4ad83)
    }
  },

  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    columnSettings: {
      fill: am5.color(0xc6b677),
      stroke: am5.color(0xc6b677)
    }
  },

  {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    columnSettings: {
      fill: am5.color(0xdbb957),
      stroke: am5.color(0xdbb957)
    }
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
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
      valueXField: "date"
    })
  );

  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2,
    templateField: "columnSettings"
  });

  series.data.setAll(data);
}

createSeries("Series with breaks", "value");
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
