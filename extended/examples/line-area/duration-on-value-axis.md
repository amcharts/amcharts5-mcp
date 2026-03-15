---
title: "Duration on Value Axis"
source: "https://www.amcharts.com/demos/duration-on-value-axis/"
category: "line-area"
scraped: "2026-03-15"
---

This demo showcases several powerful concepts. Let's take a look.
Duration axis
There's a special type of axis that can reformat the values into any kind of "duration". The units and formats are fully configurable.
[More info about Duration axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/duration-axis/)
Binding properties of chart elements to data
Size of the bullets on the "Latitude" series is bound to a data, using its "template fields". This is a very powerful concept, which allows binding any setting of any object to a value in data.
In this case we bind radius of the circle bullet to the townSize field in data.
[More info about template fields](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/)

## JavaScript

```javascript
var data = [{
  "date": "2012-01-01",
  "distance": 227,
  "townName": "New York",
  "townSize": 12,
  "latitude": 40.71,
  "duration": 408
}, {
  "date": "2012-01-02",
  "distance": 371,
  "townName": "Washington",
  "townSize": 7,
  "latitude": 38.89,
  "duration": 482
}, {
  "date": "2012-01-03",
  "distance": 433,
  "townName": "Wilmington",
  "townSize": 3,
  "latitude": 34.22,
  "duration": 562
}, {
  "date": "2012-01-04",
  "distance": 345,
  "townName": "Jacksonville",
  "townSize": 3.5,
  "latitude": 30.35,
  "duration": 379
}, {
  "date": "2012-01-05",
  "distance": 480,
  "townName": "Miami",
  "townSize": 5,
  "latitude": 25.83,
  "duration": 501
}, {
  "date": "2012-01-06",
  "distance": 386,
  "townName": "Tallahassee",
  "townSize": 3.5,
  "latitude": 30.46,
  "duration": 443
}, {
  "date": "2012-01-07",
  "distance": 348,
  "townName": "New Orleans",
  "townSize": 5,
  "latitude": 29.94,
  "duration": 405
}, {
  "date": "2012-01-08",
  "distance": 238,
  "townName": "Houston",
  "townSize": 8,
  "latitude": 29.76,
  "duration": 309
}, {
  "date": "2012-01-09",
  "distance": 218,
  "townName": "Dalas",
  "townSize": 8,
  "latitude": 32.8,
  "duration": 287
}, {
  "date": "2012-01-10",
  "distance": 349,
  "townName": "Oklahoma City",
  "townSize": 5,
  "latitude": 35.49,
  "duration": 485
}, {
  "date": "2012-01-11",
  "distance": 603,
  "townName": "Kansas City",
  "townSize": 5,
  "latitude": 39.1,
  "duration": 890
}, {
  "date": "2012-01-12",
  "distance": 534,
  "townName": "Denver",
  "townSize": 9,
  "latitude": 39.74,
  "duration": 810
}, {
  "date": "2012-01-13",
  "townName": "Salt Lake City",
  "townSize": 6,
  "distance": 425,
  "duration": 670,
  "latitude": 40.75,
  "dashLength": 8,
  "alpha": 0.4
}, {
  "date": "2012-01-14",
  "latitude": 36.1,
  "duration": 470,
  "townName": "Las Vegas"
}, {
  "date": "2012-01-15"
}, {
  "date": "2012-01-16"
}, {
  "date": "2012-01-17"
}];

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
  panX: false,
  panY: false,
  wheelY: "none"
}));

chart.zoomOutButton.set("forceHidden", true);

chart.get("colors").set("step", 2);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
  baseInterval: { timeUnit: "day", count: 1 },
  renderer: am5xy.AxisRendererX.new(root, { 
    minGridDistance: 70,
    minorGridEnabled: true
  }),
  tooltip: am5.Tooltip.new(root, {})
}));


var distanceAxisRenderer = am5xy.AxisRendererY.new(root, {});
distanceAxisRenderer.grid.template.set("forceHidden", true);
var distanceAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: distanceAxisRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

var latitudeAxisRenderer = am5xy.AxisRendererY.new(root, {});
latitudeAxisRenderer.grid.template.set("forceHidden", true);
var latitudeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: latitudeAxisRenderer,
  forceHidden: true
}));

var durationAxisRenderer = am5xy.AxisRendererY.new(root, {
  opposite: true
});
durationAxisRenderer.grid.template.set("forceHidden", true);
var durationAxis = chart.yAxes.push(am5xy.DurationAxis.new(root, {
  baseUnit:"minute",
  renderer: durationAxisRenderer,
  extraMax:0.3
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var distanceSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: distanceAxis,
  valueYField: "distance",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"{valueY} miles"
  })
}));

distanceSeries.data.processor = am5.DataProcessor.new(root, {
  dateFields: ["date"],
  dateFormat: "yyyy-MM-dd"
});

var latitudeSeries = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: latitudeAxis,
  valueYField: "latitude",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"latitude: {valueY} ({townName})"
  })  
}));

latitudeSeries.strokes.template.setAll({ strokeWidth: 2 });

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
latitudeSeries.bullets.push(function() {
  var graphics = am5.Circle.new(root, {
    strokeWidth: 2,
    radius: 5,
    stroke: latitudeSeries.get("stroke"),
    fill: root.interfaceColors.get("background"),
  });

  graphics.adapters.add("radius", function(radius, target) {
    return target.dataItem.dataContext.townSize;
  })

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

var durationSeries = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: durationAxis,
  valueYField: "duration",
  valueXField: "date",
  tooltip:am5.Tooltip.new(root, {
    labelText:"duration: {valueY.formatDuration()}"
  }) 
}));

durationSeries.strokes.template.setAll({ strokeWidth: 2 });

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
durationSeries.bullets.push(function() {
  var graphics = am5.Rectangle.new(root, {
    width:10, 
    height:10,
    centerX:am5.p50,
    centerY:am5.p50,
    fill: durationSeries.get("stroke")
  });

  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: distanceAxis
}));


distanceSeries.data.setAll(data);
latitudeSeries.data.setAll(data);
durationSeries.data.setAll(data);
xAxis.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
distanceSeries.appear(1000);
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
