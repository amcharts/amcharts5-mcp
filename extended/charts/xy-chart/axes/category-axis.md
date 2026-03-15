---
title: "Category axis"
source: "https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-axis/"
scraped: "2026-03-15"
---

Category axis type allows plotting data attached to string-based names (categories).

## Relation to data

Category axis is the only axis type that requires its own data as well as data field set up.

It's needed because the axis needs to know what categories to plot.

It can be the same data we use for the actual series, e.g.:

let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.data.setAll(data);

let series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.data.setAll(data);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.data.setAll(data);

var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.data.setAll(data);

Or it can be a subset of data.

IMPORTANTThe order of categories needs to be the same in both series' and axis' data.

Having different data for category axis makes sense in the situations where we want to have only specific categories displayed:

let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.data.setAll(\[{
  category: "Research"
}, {
  category: "Marketing"
}, {
  category: "Sales"
}\]);

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.data.setAll(\[{
  category: "Research"
}, {
  category: "Marketing"
}, {
  category: "Sales"
}\]);

NOTESeries will display only those data items with categories that are in the category axis' data.

IMPORTANTIt's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

## Zooming

### Zooming to category range

We can use value axis' method `zoomToCategories()` to zoom the axis to specific range between two categories:

xAxis.zoomToCategories("Mike", "Dorothy");

xAxis.zoomToCategories("Mike", "Dorothy");

### Zooming to index range

We can also make category axis zoom to specific indexes via `zoomToIndexes()`:

xAxis.zoomToIndexes(10, 20);

xAxis.zoomToIndexes(10, 20);

### Pre-zooming

Category axis uses own data, so we can use its own `datavalidated` event to invoke zooming functions:

xAxis.events.once("datavalidated", function(ev) {
  ev.target.zoomToIndexes(10, 20);
});

xAxis.events.once("datavalidated", function(ev) {
  ev.target.zoomToIndexes(10, 20);
});

Read more about pre-zooming using series events in "[Zoom and pan: Pre-zooming axes](https://www.amcharts.com/docs/v5/charts/xy-chart/zoom-and-pan/#Pre_zooming_axes)".

## Related tutorials

-   [Using adapters on category axis labels](https://www.amcharts.com/docs/v5/tutorials/using-adapters-on-category-axis-labels/)
-   [Auto-wrapping category axis labels](https://www.amcharts.com/docs/v5/tutorials/auto-wrapping-category-axis-labels/)
-   [Column labels as categories](https://www.amcharts.com/docs/v5/tutorials/column-labels-as-categories/)
-   [Handling long category axis labels](https://www.amcharts.com/docs/v5/tutorials/handling-long-category-axis-labels/)
