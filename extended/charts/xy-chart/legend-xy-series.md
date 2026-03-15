---
title: "Legend and XY series"
source: "https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/"
scraped: "2026-03-15"
---

This tutorial will walk through configuration options for legend content on an XY chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of XY chart, we will probably want to use series as legend items).

let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

MORE INFO For more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://www.amcharts.com/docs/v5/concepts/legend/)" tutorial.

## Legend label content

### Setting content

What goes into legend labels on an XY chart is controlled by four of the series' settings:

Setting key

Default

Comment

`legendLabelText`

`{name}`

Text for the legend item label when specific series data item is selected with a chart cursor.

`legendValueText`

\-

Text for the legend item value label when specific series data item is selected with a chart cursor.

`legendRangeLabelText`

`{name}`

Text for the legend item label when no specific data item is selected.

`legendRangeValueText`

\-

Text for the legend item value label when no specific data item is selected.

To change contents of the legend, we simply need to set corresponding setting value:

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    legendLabelText: "Series: {name}",
    legendRangeLabelText: "Series: {name}"
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    legendLabelText: "Series: {name}",
    legendRangeLabelText: "Series: {name}"
  })
);

### Specific data item vs range

By default, series will use `legendRangeLabelText` to fill its legend item label.

If our chart has a cursor, moving it over plot area will grab closest data item from the series, and will use `legendLabelText` for the legend item label.

Let's take an example:

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    legendLabelText: "Cursor over plot area",
    legendRangeLabelText: "Cursor inactive"
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    legendLabelText: "Cursor over plot area",
    legendRangeLabelText: "Cursor inactive"
  })
);

When chart loads it will show `"Cursor inactive"` text in series' legend label.

As soon as we move cursor of chart's plot area, it will be replaced with a `"Cursor over plot area"` text.

When cursor leaves the plot area again, the text will be replaced back with the `"Cursor inactive"` text.

### Dynamic values

Since labels support [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (references to data item settings in curly brackets), text will be populated with actual data and values.

When there is no data cursor on chart, or cursor is not over plot area, labels will be populated from series' settings, e.g. `LineSeries` [settings](https://www.amcharts.com/docs/v5/reference/lineseries/#settings) or [private settings](https://www.amcharts.com/docs/v5/reference/lineseries/#Private_settings).

If cursor is hovering on plot area, closest data item will be used to populate the label, e.g. `[LineSeriesDataItem](https://www.amcharts.com/docs/v5/reference/ilineseriesdataitem/)`.

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "{name}: {categoryX}",
    legendRangeLabelText: "{name}"
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "{name}: {categoryX}",
    legendRangeLabelText: "{name}"
  })
);

Let's examine what happens in the above config.

#### Cursor is outside plot area

In this case, `legendRangeLabelText` is used and is populated by series data.

Text formatter, when populating text `"{name}"` looks for the placeholders in a number of places.

It finds `name` in `LineSeries`' [settings](https://www.amcharts.com/docs/v5/reference/lineseries/#name_setting).

The result is a text with a text with series name, e.g.: `"Sales"`.

#### Cursor over plot area

Now, legend label text is replaced with a `"{name}: {categoryX}"`.

Now, instead of series' object, a specific series data item is used. In case of line series, it's an `[ILineSeriesDataItem](https://www.amcharts.com/docs/v5/reference/ilineseriesdataitem/)`.

It does not have a `name` in it, so text formatter looks in a parent, which is series, so it finds `name` in series' settings.

Then it looks up `categoryX` which [does exist](https://www.amcharts.com/docs/v5/reference/ilineseriesdataitem/#categoryX_property) in series data item.

Depending on which category cursor is closest to, we'll end up with a legend label similar to this: `Sales: Q3`.

As we move cursor over plot area and the closest data item changes, so does label in legend gets repopulated.


### In-line formatting

Besides regular text and data placeholders, labels support square bracket [in-line formatting](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) blocks. E.g.:

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "\[{stroke}\]{name}\[/\]: \[bold #888\]{categoryX}\[/\]",
    legendRangeLabelText: "\[{stroke}\]{name}\[/\]"
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "\[{stroke}\]{name}\[/\]: \[bold #888\]{categoryX}\[/\]",
    legendRangeLabelText: "\[{stroke}\]{name}\[/\]"
  })
);

The above will use series' `stroke` (color) for series name, as well as make category names bold and gray.

## Value labels

Value labels are additional set of labels placed next to regular labels.

They are usually used to display value of the item, hence the name "value labels".

Value labels function exactly the same way as regular labels, including support for data placeholders and in-line formatting.

The content for value labels is supplied via `legendValueText` and `legendRangeValueText` settings:

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    calculateAggregates: true,
    tooltip: am5.Tooltip.new(root, {}),
    legendLabelText: "\[{stroke}\]{name}\[/\]: \[bold #888\]{categoryX}\[/\]",
    legendRangeLabelText: "\[{stroke}\]{name}\[/\]",
    legendValueText: "\[bold {stroke}\]{valueY}\[/\]",
    legendRangeValueText: "\[{stroke}\]{valueYClose}\[/\]"
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    calculateAggregates: true,
    tooltip: am5.Tooltip.new(root, {}),
    legendLabelText: "\[{stroke}\]{name}\[/\]: \[bold #888\]{categoryX}\[/\]",
    legendRangeLabelText: "\[{stroke}\]{name}\[/\]",
    legendValueText: "\[bold {stroke}\]{valueY}\[/\]",
    legendRangeValueText: "\[{stroke}\]{valueYClose}\[/\]"
  })
);


## Related tutorials

-   [Aligning a legend with plot container](https://www.amcharts.com/docs/v5/tutorials/aligning-a-legend-with-plot-container/)
