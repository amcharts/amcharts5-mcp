---
title: "Line Chart with Horizontal Target"
source: "https://www.amcharts.com/demos/line-chart-with-horizontal-target/"
category: "line-area"
scraped: "2026-03-15"
---

It is very common to have a target value line on a chart and it is also common to display the parts of the chart that fall below and above that target line differently. Achieving this effect is very easy with amCharts.
Key implementation details
To get the effect we use the axis range feature but we do it with a twist. Commonly axis ranges are created on axes (hence the name) but we can also create a range on the series. In this setup the range settings affect the look of parts of the series where values fall into our range.
Axis ranges
Series axis ranges

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
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true,
    paddingLeft: 0
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineX.set("forceHidden", true);
cursor.lineY.set("forceHidden", true);

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);

var value = 20;
function generateData() {
    value = am5.math.round(Math.random() * 10 - 4.8 + value, 1);
    if (value < 0) {
        value = Math.random() * 10;
    }

    if (value > 100) {
        value = 100 - Math.random() * 10;
    }
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
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    baseInterval: {
        timeUnit: "day",
        count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 80
    })
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
    })
}));

series.fills.template.setAll({
    fillOpacity: 0.2,
    visible: true
});


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
    orientation: "horizontal"
}));


// Set data
var data = generateDatas(300);
series.data.setAll(data);


var rangeDate = new Date();
am5.time.add(rangeDate, "day", Math.round(series.dataItems.length / 2));
var rangeTime = rangeDate.getTime();

// add series range
var seriesRangeDataItem = yAxis.makeDataItem({ value: 40, endValue: 0 });
var seriesRange = series.createAxisRange(seriesRangeDataItem);
seriesRange.fills.template.setAll({
    visible: true,
    opacity: 0.3
});

seriesRange.fills.template.set("fill", am5.color(0x000000));
seriesRange.strokes.template.set("stroke", am5.color(0x000000));

seriesRangeDataItem.get("grid").setAll({
    strokeOpacity: 1,
    visible: true,
    stroke: am5.color(0x000000),
    strokeDasharray: [2, 2]
})

seriesRangeDataItem.get("label").setAll({
    location:0,
    visible:true,
    text:"Target",
    inside:true,
    centerX:0,
    centerY:am5.p100,
    fontWeight:"bold"
})

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
  height: 500px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
