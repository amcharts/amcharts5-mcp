---
title: "Legend and hierarchy series"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/legend-hierarchy-series/"
scraped: "2026-03-15"
---

This tutorial will walk through configuration options for legend content on a hierarchy chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of a percent chart, we will probably want to use series data items as legend items).

Since hierarchy charts use tree-like data item structure, we will need to choose what data items to use to feed the legend.

The most common scenario is to use second level data items, that can be accessed via top-level data item's (which is always one) `children` setting: `series.dataItems[0].get("children")`.

let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems\[0\].get("children"));

var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems\[0\].get("children"));

MORE INFO For more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://www.amcharts.com/docs/v5/concepts/legend/)" tutorial.

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

`{value}`

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

Since each legend item is constructed out of the series data items, their data will be used to populate it, e.g. `[ForceDirectedDataItem](https://www.amcharts.com/docs/v5/reference/iforcedirecteddataitem/)`.

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

-   [Toggling multi-level Sunburst nodes with legend](https://www.amcharts.com/docs/v5/tutorials/toggling-multi-level-sunburst-nodes-with-legend/)
-   [Sunburst chart with a legend including all nodes](https://www.amcharts.com/docs/v5/tutorials/sunburst-chart-with-a-legend-including-all-nodes/)
