---
title: "Legend and hierarchy series"
source: "https://docs.amcharts.com/v5/charts/hierarchy/legend-hierarchy-series/"
scraped: "2026-11-16"
---

This tutorial will walk through configuration options for legend content on a hierarchy chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of a percent chart, we will probably want to use series data items as legend items).

Since hierarchy charts use tree-like data item structure, we will need to choose what data items to use to feed the legend.

The most common scenario is to use second level data items, that can be accessed via top-level data item's (which is always one) `children` setting: `series.dataItems[0].get("children")`.

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems[0].get("children"));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems[0].get("children"));
```

> **More info:** For more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://docs.amcharts.com/v5/concepts/legend/)" tutorial.

## Legend label content

### Setting content

What goes into legend labels on a percent chart is controlled by four of the series' settings:

| Setting key       | Default      | Comment                               |
| ----------------- | ------------ | ------------------------------------- |
| `legendLabelText` | `{category}` | Text for the legend item label.       |
| `legendValueText` | `{value}`    | Text for the legend item value label. |

To change contents of the legend, we simply need to set corresponding setting value:

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "{category}",
    legendValueText: "{value}"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "{category}",
    legendValueText: "{value}"
  })
);
```

Labels support [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (references to data item settings in curly brackets) so the text will be populated with actual data and values.

Since each legend item is constructed out of the series data items, their data will be used to populate it, e.g. `ForceDirectedDataItem`.

### In-line formatting

Besides regular text and data placeholders, labels support square bracket [in-line formatting](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) blocks. E.g.:

TypeScript:

```ts
let series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "[{fill}]{category}[/]",
    legendValueText: "[bold {fill}]{value}[/]"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    categoryField: "country",
    valueField: "sales",
    legendLabelText: "[{fill}]{category}[/]",
    legendValueText: "[bold {fill}]{value}[/]"
  })
);
```

The above will use slice's `fill` (color) for category and value, as well as make category names bold.

## Example

Example: [Force-directed chart with legend](https://docs.amcharts.com/embeds/v5/force-directed-chart-with-legend/). Its code: get_example(path: "examples/docs-demos/force-directed-chart-with-legend").

## Related tutorials

* [Toggling multi-level Sunburst nodes with legend](https://docs.amcharts.com/v5/tutorials/toggling-multi-level-sunburst-nodes-with-legend/)
* [Sunburst chart with a legend including all nodes](https://docs.amcharts.com/v5/tutorials/sunburst-chart-with-a-legend-including-all-nodes/)
