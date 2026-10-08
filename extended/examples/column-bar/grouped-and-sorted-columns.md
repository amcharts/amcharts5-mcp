---
title: "Grouped and Sorted Columns"
source: "https://www.amcharts.com/demos/grouped-and-sorted-columns/"
category: "column-bar"
scraped: "2026-10-08"
---

Columns grouped by provider and sorted from smallest to largest within each group, with the provider names on a second row of labels. A line marks each provider’s quantity, centered over its group.

When to group and sort: When categories belong to groups, like products to suppliers, a second row of labels keeps each group together, and sorting within it puts each group’s largest item at the end. The line adds one figure per group on an axis of its own, so one chart answers two questions.

Good for:
- Products by supplier or store
- Items within departments or teams
- One figure per group next to its parts

Think twice when:
- Comparing the same item across groups: cluster by item instead
- Groups of very different sizes: the small ones get lost
- Two value axes can confuse: label them, or draw two charts

Prompt: Create a column chart of items grouped by four providers and sorted by value within each, with each provider’s name under its group, and a line of each provider’s quantity on a second value axis. Add value labels, a cursor and tooltips. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,    // no dragging the plot
    panY: false,
    wheelX: "none", // the mouse wheel scrolls the page, not the chart
    wheelY: "none",
    paddingLeft: 0  // the value labels sit at the chart's left edge
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
cursor.lineY.set("visible", false); // no horizontal cursor line

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  minGridDistance: 30,  // at least 30px between labels; on narrow screens some are skipped
  minorGridEnabled:true // a skipped item still gets a faint grid line
});

// labels show the item name; the category itself is "provider_item", unique for each column
xRenderer.labels.template.setAll({ text: "{realName}" });

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // no panning past the first or last column
    categoryField: "category",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {
      labelText: "{realName}" // the item's name, not the unique category
    })
  })
);

// Both value axes start at zero: the quantity line on the left, the columns on the right
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    min: 0,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var yAxis2 = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    min: 0,
    // picks its steps so its grid lines fall on the left axis's grid lines
    syncWithAxis: yAxis,
    renderer: am5xy.AxisRendererY.new(root, { opposite: true }) // on the right side
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis2,
    valueYField: "value",
    sequencedInterpolation: true, // on load, the columns grow one after another
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{provider} {realName}: {valueY}" // as "Provider 1 item 2: 35"
    }),
    // Each column takes its own color from the series palette
    colorByDataItem: true
  })
);

series.columns.template.setAll({
  fillOpacity: 0.9, // slightly see-through
  strokeOpacity: 0  // no outline
});
var lineSeries = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series 2",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "quantity",
    sequencedInterpolation: true,             // on load, the line's points rise one after another
    stroke: chart.get("colors").getIndex(13), // a palette color away from the columns' colors...
    fill: chart.get("colors").getIndex(13),   // ...for the dots too
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{provider} quantity: {valueY}" // as "Provider 1 quantity: 430"
    })
  })
);

lineSeries.strokes.template.set("strokeWidth", 2); // a 2px line

lineSeries.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    locationX: undefined, // no fixed spot: each point's own locationX, set below
    sprite: am5.Circle.new(root, {
      radius: 5,                   // 5px radius
      fill: lineSeries.get("fill") // in the line's color
    })
  });
});

// when data validated, adjust location of data item based on count
lineSeries.events.on("datavalidated", function () {
  am5.array.each(lineSeries.dataItems, function (dataItem) {
    // if count divides by two, location is 0 (on the grid)
    if (
      dataItem.dataContext.count / 2 ==
      Math.round(dataItem.dataContext.count / 2)
    ) {
      dataItem.set("locationX", 0);
    }
    // otherwise location is 0.5 (middle)
    else {
      dataItem.set("locationX", 0.5);
    }
  });
});

var chartData = [];

// Set data
var data = {
  "Provider 1": {
    "item 1": 10,
    "item 2": 35,
    "item 3": 5,
    "item 4": 20,
    quantity: 430
  },
  "Provider 2": {
    "item 1": 15,
    "item 3": 21,
    quantity: 210
  },
  "Provider 3": {
    "item 2": 25,
    "item 3": 11,
    "item 4": 17,
    quantity: 265
  },
  "Provider 4": {
    "item 3": 12,
    "item 4": 15,
    quantity: 98
  }
};

// process data and prepare it for the chart
for (var providerName in data) {
  var providerData = data[providerName];

  // add data of one provider to temp array
  var tempArray = [];
  var count = 0;
  // add items
  for (var itemName in providerData) {
    if (itemName != "quantity") {
      count++;
      // we generate unique category for each column (providerName + "_" + itemName) and store realName
      tempArray.push({
        category: providerName + "_" + itemName,
        realName: itemName,
        value: providerData[itemName],
        provider: providerName
      });
    }
  }
  // sort temp array
  tempArray.sort(function (a, b) {
    if (a.value > b.value) {
      return 1;
    } else if (a.value < b.value) {
      return -1;
    } else {
      return 0;
    }
  });

  // add quantity and count to middle data item (line series uses it)
  var lineSeriesDataIndex = Math.floor(count / 2);
  tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
  tempArray[lineSeriesDataIndex].count = count;
  // push to the final data
  am5.array.each(tempArray, function (item) {
    chartData.push(item);
  });

  // create range (the additional label at the bottom)

  var range = xAxis.makeDataItem({});
  xAxis.createAxisRange(range);

  range.set("category", tempArray[0].category);
  range.set("endCategory", tempArray[tempArray.length - 1].category);

  var label = range.get("label");

  label.setAll({
    text: tempArray[0].provider,
    dy: 30, // 30px below the item names
    fontWeight: "bold",
    tooltipText: tempArray[0].provider // the provider's name on hover
  });

  // a 50px tick and a solid grid line at the start of each group divide the groups
  var tick = range.get("tick");
  tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 0 });

  var grid = range.get("grid");
  grid.setAll({ strokeOpacity: 1 });
}

// add range for the last grid
var range = xAxis.makeDataItem({});
xAxis.createAxisRange(range);
range.set("category", chartData[chartData.length - 1].category);
var tick = range.get("tick");
tick.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 }); // a tick at the very end...

var grid = range.get("grid");
grid.setAll({ strokeOpacity: 1, location: 1 }); // ...with a solid grid line

xAxis.data.setAll(chartData);
series.data.setAll(chartData);
lineSeries.data.setAll(chartData);

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
