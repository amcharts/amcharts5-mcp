---
title: "Using d3 curve factories"
source: "https://docs.amcharts.com/embeds/v5/using-d3-curve-factories/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["charts/xy-chart/series/smoothed-series"]
---

A demo from the docs page "Smoothed line series" (get_doc(path: "charts/xy-chart/series/smoothed-series")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  })
);

cursor.lineY.set("visible", false);

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

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 40
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    curveFactory: d3.curveBasis
  })
);

series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.2
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 0,
    sprite: am5.Circle.new(root, {
      radius: 4,
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2,
      fill: series.get("fill")
    })
  });
});

var tooltip = series.set("tooltip", am5.Tooltip.new(root, {}));
tooltip.label.set("text", "{valueY}");

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = generateDatas(50);
series.data.setAll(data);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);

function setCurveFactory(factory) {
  series.set("curveFactory", d3[factory]);
  setButtonState();
}

function setIndex(offset) {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex + offset;
  if (index < 0) {
    index = 0;
  }
  if (index > selector.options.length - 1) {
    index = selector.options.length - 1;
  }
  selector.selectedIndex = index;
  setCurveFactory(selector.options[index].value);
  setButtonState();
}

function setButtonState() {
  var selector = document.getElementById("selector");
  var index = selector.selectedIndex;
  if (index == 0) {
    document.getElementById("selector-prev").disabled = "disabled";
    document.getElementById("selector-next").disabled = "";
  } else if (index >= selector.options.length - 1) {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "disabled";
  } else {
    document.getElementById("selector-prev").disabled = "";
    document.getElementById("selector-next").disabled = "";
  }
}
```

## HTML

```html
<div class="tools">
  <input id="selector-prev" type="button" value="&lt;" onclick="setIndex(-1)" disabled="disabled" />
  <select id="selector" onchange="setCurveFactory(this.options[this.selectedIndex].value)">
    <option value="curveBasis">curveBasis</option>
    <option value="curveBumpX">curveBumpX</option>
    <option value="curveBumpY">curveBumpY</option>
    <option value="curveCardinal">curveCardinal</option>
    <option value="curveCatmullRom">curveCatmullRom</option>
    <option value="curveMonotoneX">curveMonotoneX</option>
    <option value="curveMonotoneY">curveMonotoneY</option>
    <option value="curveNatural">curveNatural</option>
    <option value="curveStep">curveStep</option>
    <option value="curveStepAfter">curveStepAfter</option>
    <option value="curveStepBefore">curveStepBefore</option>
  </select>
  <input id="selector-next" type="button" value="&gt;" onclick="setIndex(1)" />
</div>

<div id="chartdiv"></div>
```

## CSS

```css
.tools {
  text-align: center;
}

.tools select,
.tools input {
  font-size: 1.2em;
  padding: 0.2em 0.4em;
}

#chartdiv {
  width: 100%;
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.jsdelivr.net/npm/d3-shape@3
