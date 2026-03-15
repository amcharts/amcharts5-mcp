---
title: "Horizontal Dumbbell Plot"
source: "https://www.amcharts.com/demos/horizontal-dumbbell-plot/"
category: "column-bar"
scraped: "2026-03-15"
---

Dumbbell plot (also known as Dumbbell chart, Connected dot plot) is great for displaying changes between two points in time, two conditions or differences between two groups.
Key implementation details
We set baseAxis of ColumnSeries to our Y-axis to make columns horizontal. Then we utilize the "floating columns" feature to make columns start off-axis by setting openValueXField to one of our fields in the data set. Finally, we set column's height (since it's horizontal) to 0.5 pixels to make them look like lines. And then we just add circles as bullets on the ends of the column.
Column series: floating columns
ColumnSeries class
Also see Vertical dumbbell plot demo.

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelX: "panY",
  wheelY: "zoomY",
  pinchZoomY: true,
  paddingLeft: 0
}));

chart.get("colors").set("step", 3);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 20,
  minorGridEnabled: true
});

var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0.3,
  categoryField: "category",
  renderer: yRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

yRenderer.labels.template.setAll({
  multiLocation: 0.5
})

yRenderer.grid.template.setAll({
  location: 1
})

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 60
  })
}));


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  baseAxis: yAxis,
  valueXField: "close",
  openValueXField: "open",
  categoryYField: "category",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{openValueX} - {valueX}"
  })
}));

series.columns.template.setAll({
  height: 0.5
});

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 0,
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill")
    })
  })
})

var nextColor = chart.get("colors").getIndex(1);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationX: 1,
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: nextColor
    })
  })
})

// Set data
var data = [];
var open = 100;
var close = 120;

var names = ["Raina",
  "Demarcus",
  "Carlo",
  "Jacinda",
  "Richie",
  "Antony",
  "Amada",
  "Idalia",
  "Janella",
  "Marla",
  "Curtis",
  "Shellie",
  "Meggan",
  "Nathanael",
  "Jannette",
  "Tyrell",
  "Sheena",
  "Maranda"
];

for (var i = 0; i < names.length; i++) {
  open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 5);
  close = open + Math.round(Math.random() * 10) + 3;
  data.push({
    category: names[i],
    open: open,
    close: close
  });
}

yAxis.data.setAll(data);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
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
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
