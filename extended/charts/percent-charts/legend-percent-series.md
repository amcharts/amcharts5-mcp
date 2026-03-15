---
title: "Legend and Pie/Sliced series"
source: "https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/"
scraped: "2026-03-15"
---

This tutorial will walk through configuration options for legend content on a pie or other percent chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of a percent chart, we will probably want to use series data items as legend items).

let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems);

var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems);

MORE INFOFor more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://www.amcharts.com/docs/v5/concepts/legend/)" tutorial.

## Legend label content

### Setting content

What goes into legend labels on a percent chart is controlled by four of the series' settings:

Setting key

Default

Comment

`legendLabelText`

`{category}`

Text for the legend item label.

`legendValueText`

`{valuePercentTotal.formatNumber('0.00p')}`

Text for the legend item value label.

To change contents of the legend, we simply need to set corresponding setting value:

let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "{category}",
    legendValueText: "{value}"
  })
);

var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "{category}",
    legendValueText: "{value}"
  })
);

Labels support [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/) (references to data item settings in curly brackets) so the text will be populated with actual data and values.

Since each legend item is constructed out of the series data items, their data will be used to populate it, e.g. `[PieSeriesDataItem](https://www.amcharts.com/docs/v5/reference/ipieseriesdataitem/)`.

### In-line formatting

Besides regular text and data placeholders, labels support square bracket [in-line formatting](https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/) blocks. E.g.:

let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "\[{fill}\]{category}\[/\]",
    legendValueText: "\[bold {fill}\]{value}\[/\]"
  })
);

var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "\[{fill}\]{category}\[/\]",
    legendValueText: "\[bold {fill}\]{value}\[/\]"
  })
);

The above will use slice's `fill` (color) for category and value, as well as make category names bold.

## Example


## Related tutorials

-   [Toggle pie slice pullout via legend](https://www.amcharts.com/docs/v5/tutorials/toggle-pie-slice-pullout-via-legend/)
-   [Applying custom formatting logic to PieChart legend values](https://www.amcharts.com/docs/v5/tutorials/applying-custom-formatting-logic-to-piechart-legend-values/)
-   [Toggle multiple pie slices via legend](https://www.amcharts.com/docs/v5/tutorials/toggle-multiple-pie-slices-via-legend/)
-   [Toggle slices of multiple nested Pie Series with a single legend](https://www.amcharts.com/docs/v5/tutorials/toggle-slices-of-multiple-nested-pie-series-with-a-single-legend/)
-   [Pie chart with a custom legend](https://www.amcharts.com/docs/v5/tutorials/pie-chart-with-a-custom-legend/)
