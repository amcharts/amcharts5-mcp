---
title: "Legend and XY series"
source: "https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/"
scraped: "2026-11-14"
---

This tutorial will walk through configuration options for legend content on an XY chart.

## Adding legend

To add a legend, we simply need to create an instance of a `Legend` class (which is a part of "index" package), push it to chart's children (or any other place we want it to be), as well as set its data (in case of XY chart, we will probably want to use series as legend items).

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

> **More info:** For more information on how to configure legend, its items, and layout, please visit our dedicated "[Legend](https://docs.amcharts.com/v5/concepts/legend/)" tutorial.

## Legend label content

### Setting content

What goes into legend labels on an XY chart is controlled by four of the series' settings:

| Setting key            | Default  | Comment                                                                                              |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `legendLabelText`      | `{name}` | Text for the legend item label when specific series data item is selected with a chart cursor.       |
| `legendValueText`      | -        | Text for the legend item value label when specific series data item is selected with a chart cursor. |
| `legendRangeLabelText` | `{name}` | Text for the legend item label when no specific data item is selected.                               |
| `legendRangeValueText` | -        | Text for the legend item value label when no specific data item is selected.                         |

To change contents of the legend, we simply need to set corresponding setting value:

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

### Specific data item vs range

By default, series will use `legendRangeLabelText` to fill its legend item label.

If our chart has a cursor, moving it over plot area will grab closest data item from the series, and will use `legendLabelText` for the legend item label.

Let's take an example:

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

When chart loads it will show `"Cursor inactive"` text in series' legend label.

As soon as we move cursor of chart's plot area, it will be replaced with a `"Cursor over plot area"` text.

When cursor leaves the plot area again, the text will be replaced back with the `"Cursor inactive"` text.

### Dynamic values

Since labels support [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/) (references to data item settings in curly brackets), text will be populated with actual data and values.

When there is no data cursor on chart, or cursor is not over plot area, labels will be populated from series' settings, e.g. `LineSeries` [settings](https://docs.amcharts.com/v5/reference/lineseries/#settings) or [private settings](https://docs.amcharts.com/v5/reference/lineseries/#Private_settings).

If cursor is hovering on plot area, closest data item will be used to populate the label, e.g. `LineSeriesDataItem`.

TypeScript:

```ts
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
```

JavaScript:

```js
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
```

Let's examine what happens in the above config.

#### Cursor is outside plot area

In this case, `legendRangeLabelText` is used and is populated by series data.

Text formatter, when populating text `"{name}"` looks for the placeholders in a number of places.

It finds `name` in `LineSeries`' [settings](https://docs.amcharts.com/v5/reference/lineseries/#name_setting).

The result is a text with a text with series name, e.g.: `"Sales"`.

#### Cursor over plot area

Now, legend label text is replaced with a `"{name}: {categoryX}"`.

Now, instead of series' object, a specific series data item is used. In case of line series, it's an `ILineSeriesDataItem`.

It does not have a `name` in it, so text formatter looks in a parent, which is series, so it finds `name` in series' settings.

Then it looks up `categoryX` which [does exist](https://docs.amcharts.com/v5/reference/ilineseriesdataitem/#categoryX_property) in series data item.

Depending on which category cursor is closest to, we'll end up with a legend label similar to this: `Sales: Q3`.

As we move cursor over plot area and the closest data item changes, so does label in legend gets repopulated.

Example: [Cursor and legend labels with category axis](https://docs.amcharts.com/embeds/v5/cursor-and-legend-labels-with-category-axis/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    category: "Q1",
    value: 1
  },
  {
    category: "Q2",
    value: 3
  },
  {
    category: "Q3",
    value: 2
  },
  {
    category: "Q4",
    value: 1
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

xAxis.data.setAll(data);

// Create series

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

series.data.setAll(data);

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

### In-line formatting

Besides regular text and data placeholders, labels support square bracket [in-line formatting](https://docs.amcharts.com/v5/concepts/formatters/text-styling/) blocks. E.g.:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
    legendRangeLabelText: "[{stroke}]{name}[/]"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
    legendRangeLabelText: "[{stroke}]{name}[/]"
  })
);
```

The above will use series' `stroke` (color) for series name, as well as make category names bold and gray.

## Value labels

Value labels are additional set of labels placed next to regular labels.

They are usually used to display value of the item, hence the name "value labels".

Value labels function exactly the same way as regular labels, including support for data placeholders and in-line formatting.

The content for value labels is supplied via `legendValueText` and `legendRangeValueText` settings:

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    calculateAggregates: true,
    tooltip: am5.Tooltip.new(root, {}),
    legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
    legendRangeLabelText: "[{stroke}]{name}[/]",
    legendValueText: "[bold {stroke}]{valueY}[/]",
    legendRangeValueText: "[{stroke}]{valueYClose}[/]"
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    calculateAggregates: true,
    tooltip: am5.Tooltip.new(root, {}),
    legendLabelText: "[{stroke}]{name}[/]: [bold #888]{categoryX}[/]",
    legendRangeLabelText: "[{stroke}]{name}[/]",
    legendValueText: "[bold {stroke}]{valueY}[/]",
    legendRangeValueText: "[{stroke}]{valueYClose}[/]"
  })
);
```

Example: [Cursor and legend labels](https://docs.amcharts.com/embeds/v5/cursor-and-legend-labels/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 95vh;
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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1,
    value2: 2.5
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3,
    value2: 2.1
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2,
    value2: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1,
    value2: 2
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5,
    value2: 0.5
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 1.1,
    value2: 1.5
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 1.1,
    value2: 1.8
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      calculateAggregates: true,
      tooltip: am5.Tooltip.new(root, {}),
      legendLabelText: "[bold {stroke}]{name}:[/]",
      legendRangeLabelText: "[{stroke}]{name}:[/]",
      legendValueText: "[bold {stroke}]{valueY}[/]",
      legendRangeValueText: "[{stroke}]{valueYClose}[/]"
    })
  );

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

var legend = chart.children.push(am5.Legend.new(root, {}));

legend.data.setAll(chart.series.values);
```

### Values without a cursor

`legendRangeValueText` is shown while the cursor isn't over the plot area, or when the chart has no cursor. No data item is selected then, so use the series' aggregate values, e.g. `{valueYClose}` for the last value.

Aggregates are calculated only when the series has `calculateAggregates: true`. Without it, placeholders such as `{valueYClose}` are empty, and there's no warning.

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    calculateAggregates: true,
    legendValueText: "{valueY}",
    legendRangeValueText: "{valueYClose}"
  })
);
```

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Sales",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    calculateAggregates: true,
    legendValueText: "{valueY}",
    legendRangeValueText: "{valueYClose}"
  })
);
```

| Placeholder       | Value            |
| ----------------- | ---------------- |
| `{valueYOpen}`    | First value      |
| `{valueYClose}`   | Last value       |
| `{valueYLow}`     | Lowest value     |
| `{valueYHigh}`    | Highest value    |
| `{valueYSum}`     | Sum              |
| `{valueYAverage}` | Average          |
| `{valueYCount}`   | Number of values |

These cover all of the series' data. Add `Selection` for the part in view, e.g. `{valueYCloseSelection}`, which updates as the chart is zoomed. Other value fields work the same way, e.g. `{valueXSum}`.

## Related tutorials

* [Aligning a legend with plot container](https://docs.amcharts.com/v5/tutorials/aligning-a-legend-with-plot-container/)
