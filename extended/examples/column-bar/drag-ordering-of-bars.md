---
title: "Drag-ordering of Bars"
source: "https://www.amcharts.com/demos/drag-ordering-of-bars/"
category: "column-bar"
scraped: "2026-03-15"
---

While data visualization is the primary function of amCharts, you can also use its interactive features to let end-users adjust the charts how they see fit. In this example, viewers can re-arrange the order of bars in the chart.
Key implementation details
First, we set draggable: true on our column's template. This, as the name suggests, makes columns react to dragging. Then, when the pointer is released, we just have to sort bars based on their physical position on screen. We add an event handler for the dragstop event on the column template.
Sorting is done by getting bar's Graphics object (the one directly responsible for drawing the visual) and calling its y() function to get its vertical position in the chart at the time mouse button was released.
XY chart series
Column series
Events
Sprite events
Graphics

## JavaScript

```javascript

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


var myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 0.1
});


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "none",
    wheelY: "none",
    paddingLeft: 0
  })
);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 30,
  minorGridEnabled: true
});
yRenderer.grid.template.set("location", 1);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "country",
    renderer: yRenderer
  })
);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0,
    min: 0,
    renderer: am5xy.AxisRendererX.new(root, {
      visible: true,
      strokeOpacity: 0.1,
      minGridDistance: 80
    })
  })
);


// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "value",
    sequencedInterpolation: true,
    categoryYField: "country"
  })
);

var columnTemplate = series.columns.template;

columnTemplate.setAll({
  draggable: true,
  cursorOverStyle: "pointer",
  tooltipText: "drag to rearrange",
  cornerRadiusBR: 10,
  cornerRadiusTR: 10,
  strokeOpacity: 0
});
columnTemplate.adapters.add("fill", (fill, target) => {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

columnTemplate.adapters.add("stroke", (stroke, target) => {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

columnTemplate.events.on("dragstop", () => {
  sortCategoryAxis();
});

// Get series item by category
function getSeriesItem(category) {
  for (var i = 0; i < series.dataItems.length; i++) {
    var dataItem = series.dataItems[i];
    if (dataItem.get("categoryY") == category) {
      return dataItem;
    }
  }
}


// Axis sorting
function sortCategoryAxis() {
  // Sort by value
  series.dataItems.sort(function (x, y) {
    return y.get("graphics").y() - x.get("graphics").y();
  });

  var easing = am5.ease.out(am5.ease.cubic);

  // Go through each axis item
  am5.array.each(yAxis.dataItems, function (dataItem) {
    // get corresponding series item
    var seriesDataItem = getSeriesItem(dataItem.get("category"));

    if (seriesDataItem) {
      // get index of series data item
      var index = series.dataItems.indexOf(seriesDataItem);

      var column = seriesDataItem.get("graphics");

      // position after sorting
      var fy =
        yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
        column.height() / 2;

      // set index to be the same as series data item index
      if (index != dataItem.get("index")) {
        dataItem.set("index", index);

        // current position
        var x = column.x();
        var y = column.y();

        column.set("dy", -(fy - y));
        column.set("dx", x);

        column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
        column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
      } else {
        column.animate({ key: "y", to: fy, duration: 600, easing: easing });
        column.animate({ key: "x", to: 0, duration: 600, easing: easing });
      }
    }
  });

  // Sort axis items by index.
  // This changes the order instantly, but as dx and dy is set and animated,
  // they keep in the same places and then animate to true positions.
  yAxis.dataItems.sort(function (x, y) {
    return x.get("index") - y.get("index");
  });
}

// Set data
var data = [{
  country: "USA",
  value: 2025
}, {
  country: "China",
  value: 1882
}, {
  country: "Japan",
  value: 1809
}, {
  country: "Germany",
  value: 1322
}, {
  country: "UK",
  value: 1122
}];

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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
