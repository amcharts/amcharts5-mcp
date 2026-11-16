---
title: "Legend and Pie/Sliced series"
source: "https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/"
scraped: "2026-11-16"
---

This tutorial will walk through configuration options for legend content on a pie or other percent chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of a percent chart, we will probably want to use series data items as legend items).

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems);
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(series.dataItems);
```

> **More info:** For more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://docs.amcharts.com/v5/concepts/legend/)" tutorial.

## Legend label content

### Setting content

What goes into legend labels on a percent chart is controlled by four of the series' settings:

| Setting key       | Default                                     | Comment                               |
| ----------------- | ------------------------------------------- | ------------------------------------- |
| `legendLabelText` | `{category}`                                | Text for the legend item label.       |
| `legendValueText` | `{valuePercentTotal.formatNumber('0.00p')}` | Text for the legend item value label. |

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

Since each legend item is constructed out of the series data items, their data will be used to populate it, e.g. `PieSeriesDataItem`.

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

Example: [Pie chart with custom legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-custom-legend/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 300px;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

/**
 * Chart
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.horizontalLayout
  })
);

// Define data
var data = [
  {
    country: "France",
    sales: 100000
  },
  {
    country: "Spain",
    sales: 160000
  },
  {
    country: "United Kingdom",
    sales: 80000
  },
  {
    country: "Netherlands",
    sales: 90000
  },
  {
    country: "Portugal",
    sales: 25000
  },
  {
    country: "Germany",
    sales: 70000
  },
  {
    country: "Austria",
    sales: 75000
  },
  {
    country: "Belgium",
    sales: 40000
  },
  {
    country: "Poland",
    sales: 60000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country",
    legendLabelText: "[{fill}]{category}[/]",
    legendValueText: "[bold {fill}]{value}[/]"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerY: am5.percent(50),
    y: am5.percent(50),
    layout: root.verticalLayout
  })
);

legend.data.setAll(series.dataItems);
```

## Related tutorials

* [Toggle pie slice pullout via legend](https://docs.amcharts.com/v5/tutorials/toggle-pie-slice-pullout-via-legend/)
* [Applying custom formatting logic to PieChart legend values](https://docs.amcharts.com/v5/tutorials/applying-custom-formatting-logic-to-piechart-legend-values/)
* [Toggle multiple pie slices via legend](https://docs.amcharts.com/v5/tutorials/toggle-multiple-pie-slices-via-legend/)
* [Toggle slices of multiple nested Pie Series with a single legend](https://docs.amcharts.com/v5/tutorials/toggle-slices-of-multiple-nested-pie-series-with-a-single-legend/)
* [Pie chart with a custom legend](https://docs.amcharts.com/v5/tutorials/pie-chart-with-a-custom-legend/)
