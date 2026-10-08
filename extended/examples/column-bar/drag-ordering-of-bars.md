---
title: "Drag-Ordering of Bars"
source: "https://www.amcharts.com/demos/drag-ordering-of-bars/"
category: "column-bar"
scraped: "2026-10-08"
---

A bar chart you put in order by hand: grab a bar, drag it above or below the others and let go, and the bars settle into their new order.

When people put things in order: Dragging is the quickest way to let people rank a short list themselves: priorities, favorites, the steps of a plan. The bar lengths keep the values in view while they decide, and the new order is in the axis, ready for your code to read and save.

Good for:
- Ranking priorities or favorites
- Polls that ask for an order
- Planning tools where order matters

Think twice when:
- Long lists: dragging past the edge of the chart is awkward
- An order that follows the values: sort in code instead
- Keyboard users: offer buttons to move items too

Prompt: Create a horizontal bar chart of five countries where users drag the bars up or down to reorder them, the other bars sliding into their new rows. Color the bars by position, so the colors stay in order. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// a theme of our own: its rule applies to the zero line of the value axis
var myTheme = am5.Theme.new(root);

myTheme.rule("Grid", ["base"]).setAll({
  strokeOpacity: 0.1 // the zero line, darker than the grid by default, made faint
});

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  myTheme,
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,    // no panning, so a drag moves a bar, not the plot
    panY: false,
    wheelX: "none", // the mouse wheel scrolls the page, not the chart
    wheelY: "none",
    paddingLeft: 0  // the country names sit at the chart's left edge
  })
);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {
  minGridDistance: 30,   // at least 30px between labels; on short charts some are skipped
  minorGridEnabled: true // a skipped country still gets a faint grid line
});
// grid lines at the end of each category's cell instead of at its start
yRenderer.grid.template.set("location", 1);

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last country
    categoryField: "country",
    renderer: yRenderer
  })
);

var xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0, // no panning past the ends of the value scale
    min: 0,          // bars start at zero, so their lengths compare fairly
    renderer: am5xy.AxisRendererX.new(root, {
      visible: true,
      strokeOpacity: 0.1, // a faint axis line along the bottom
      minGridDistance: 80 // at least 80px between value labels
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
    sequencedInterpolation: true, // on load, the bars grow one after another
    categoryYField: "country"
  })
);

var columnTemplate = series.columns.template;

columnTemplate.setAll({
  draggable: true,                  // a bar can be dragged to a new place (see dragstop below)
  cursorOverStyle: "pointer",       // a hand pointer over the bars
  tooltipText: "drag to rearrange", // a hint on hover
  cornerRadiusBR: 10,               // rounded right ends
  cornerRadiusTR: 10,
  strokeOpacity: 0                  // no outline
});
// each bar's color comes from its own index, so the color moves with the bar
columnTemplate.adapters.add("fill", (fill, target) => {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// the outline in the same color
columnTemplate.adapters.add("stroke", (stroke, target) => {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

// a dropped bar takes the place it was dragged to; the others shift to make room
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
  // Sort by where each bar is now, top to bottom
  series.dataItems.sort(function (x, y) {
    return y.get("graphics").y() - x.get("graphics").y();
  });

  var easing = am5.ease.out(am5.ease.cubic); // fast start, slow finish

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
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
