---
title: "Vertically Stacked Axes Chart"
source: "https://www.amcharts.com/demos/vertically-stacked-axes-chart/"
category: "miscellaneous"
scraped: "2026-03-15"
---

The chart above is a regular, single XY chart although it might look like a multi-panel chart with two value axes. We have a similar chart here. The only real difference is that instead of arranging Y axes side by side we stack them one above another. So the result is quite the same as a multiple-panel chart with shared x-axis.
For more gritty details about stacked, examples, and code visit this tutorial.
XY chart
Axes
Value axis
Line series
Column series

## JavaScript

```javascript
var data = [];
var value1 = 20;
var value2 = 200;
var value3 = 2000;

var names = [
  "Raina",
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
  "Maranda",
  "Briana"
];

for (var i = 0; i < names.length; i++) {
  value1 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value1 * 0.2
  );
  value2 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value2 * 0.2
  );
  value3 += Math.round(
    (Math.random() < 0.5 ? 1 : -1) * Math.random() * value3 * 0.2
  );
  data.push({
    category: names[i],
    value1: value1,
    value2: value2,
    value3: value3
  });
}

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
    panY: false,
    wheelX: "none",
    wheelY: "true",
    arrangeTooltips: false,
  pinchZoomX:true
  })
);

// make y axes stack
chart.leftAxesContainer.set("layout", root.verticalLayout);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 70 });
xRenderer.labels.template.setAll({
  multiLocation: 0.5,
  location: 0.5,
  centerY: am5.p50,
  centerX: am5.p50,
  paddingTop: 10
});

xRenderer.grid.template.set("location", 0.5);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    tooltip: am5.Tooltip.new(root, {}),
    renderer: xRenderer
  })
);

xAxis.data.setAll(data);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field, margin, column) {
  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
      tooltip: am5.Tooltip.new(root, {
        animationDuration: 0
      }),
      x: am5.p100,
      centerX: am5.p100,
      marginTop: margin // this makes gap between axes
    })
  );

 var series;
  if (column) {
    series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        categoryXField: "category",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "{valueY}"
        })
      })
    );
  } else {
    series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: field,
        categoryXField: "category",
        sequencedInterpolation: true,
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "vertical",
          labelText: "{valueY}"
        })
      })
    );
  }

  if (!column) {
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get("fill")
        })
      });
    });
  }

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("value1", 0, false);
createSeries("value2", 40, false);
createSeries("value3", 40, true);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "none",
  xAxis: xAxis
}));


// show x Axis label next to the panel on which cursor currently is
// willl move above other elements
xAxis.set("layer", 50);

cursor.events.on("cursormoved", function() {
  // get relative position of a cursor
  var position = cursor.getPrivate("positionY");
  // nearest y axis index
  var axisIndex = Math.floor(chart.yAxes.length * position)

  // nearest y axis
  var axis = chart.yAxes.getIndex(axisIndex);

  // y
  var y = axis.y() + axis.height();
  var dy = Math.round(-(chart.plotContainer.height() - y));
  var tooltip = xAxis.get("tooltip");

  // update y of x axis
  if(Math.round(xAxis.get("dy")) != dy){
    xAxis.animate({ key: "dy", to: dy, duration: 600, easing: am5.ease.out(am5.ease.cubic) });
    xAxis.set("y", 0);
    if(tooltip){
      tooltip.hide(0);
    }
  }
  else{
    tooltip.show(300);
  }
})

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
  max-width:100%;
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
