---
title: "Legend"
source: "https://docs.amcharts.com/v5/concepts/legend/"
scraped: "2026-11-16"
---

Legend is a universal control that can be used on virtually any chart type, fed by series or other sources. This tutorial will cover common techniques of using a legend.

## Adding

We create a legend just like any other visual element: by calling its class' `new()` method and pushing it to some sore of container, most commonly a chart:

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

## Legend data

As per code snipped above, legend data is set via its `data` property.

It has a number of methods to add single or a few data items at once.

For more information, refer to the "[Data](https://docs.amcharts.com/v5/concepts/data/)" tutorial.

Now, let's take a look at two types of data we can set on legend.

### Data item list

The most common and convenient way is to pass in an array of `DataItem` objects.

The good news is that most things that may be represented by legend already have such list readily available.

For example, chart's `series` property is a list, which has `values` property, which is an array of data items representing each series.

We can use that to automatically feed the legend:

TypeScript:

```ts
legend.data.setAll(chart.series.values);
```

JavaScript:

```js
legend.data.setAll(chart.series.values);
```

Or, if we would like each data item in series to have its own legend item, we can use series' `dataItems` property, which too is an array of data items:

TypeScript:

```ts
legend.data.setAll(series.dataItems);
```

JavaScript:

```js
legend.data.setAll(series.dataItems);
```

Please note, that non-standard setups might need a little extra configuration.

For example if we would try to use column series' data items as data for the legend, we would need to specify which data field holds the name to use in legend:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  nameField: "categoryX"
}));

legend.data.setAll(series.dataItems);
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "categoryX"
})); 

legend.data.setAll(series.dataItems);
```

Here's an example of legend feed its items from actual columns in a column series:

Example: [Legend with column series data items](https://docs.amcharts.com/embeds/v5/legend-with-column-series-data-items/)

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
  height: 250px;
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
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 1000,
    settings: {
      fill: chart.get("colors").getIndex(4)
    }
  },

  {
    category: "Marketing",
    value: 1200,
    settings: {
      fill: chart.get("colors").getIndex(2)
    }
  },

  {
    category: "Sales",
    value: 850,
    settings: {
      fill: chart.get("colors").getIndex(4)
    }
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.setAll({
  templateField: "settings"
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    nameField: "categoryX",
    centerX: am5.percent(50),
    x: am5.percent(50)
  })
);

legend.data.setAll(series.dataItems);
```

> **Note:** Not all series types support passing in their data items as data for the legend. For example, `LineSeries` does not have notion of fill for each individual data item, so it won't work for legend.

For a more advanced version of the above demo (with hover support), check out "[Individual legend item for each column in series](https://docs.amcharts.com/v5/tutorials/individual-legend-item-for-each-column-in-series/)".

### Standalone data

Another option to supply data to legend is via plain array of objects, e.g.:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  nameField: "name",
  fillField: "color",
  strokeField: "color",
  centerX: am5.percent(50),
  x: am5.percent(50)
}));

legend.data.setAll([{
  name: "Under budget",
  color: am5.color(0x297373)
}, {
  name: "Over budget",
  color: am5.color(0xff621f)
}]);
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  nameField: "name",
  fillField: "color",
  strokeField: "color",
  centerX: am5.percent(50),
  x: am5.percent(50)
}));

legend.data.setAll([{
  name: "Under budget",
  color: am5.color(0x297373)
}, {
  name: "Over budget",
  color: am5.color(0xff621f)
}]);
```

Since we are supplying completely custom data, we will need to specify which keys in data hold item name and colors using `nameField`, `fillField`, and `strokeField` respectively.

Example: [Legend with custom data](https://docs.amcharts.com/embeds/v5/legend-with-custom-data/)

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
  height: 250px;
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
    layout: root.verticalLayout
  })
);

// Define data
var data = [
  {
    category: "Research",
    value: 1000,
    settings: {
      fill: am5.color(0x297373)
    }
  },

  {
    category: "Marketing",
    value: 1200,
    settings: {
      fill: am5.color(0xff621f)
    }
  },

  {
    category: "Sales",
    value: 850,
    settings: {
      fill: am5.color(0x297373)
    }
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

// Create series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series.columns.template.setAll({
  templateField: "settings"
});

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    nameField: "name",
    fillField: "color",
    strokeField: "color",
    centerX: am5.percent(50),
    x: am5.percent(50)
  })
);

legend.itemContainers.template.events.on("click", function (e) {
  console.log(e.target.dataItem.dataContext.name);
});

legend.data.setAll([
  {
    name: "Under budget",
    color: am5.color(0x297373)
  },
  {
    name: "Over budget",
    color: am5.color(0xff621f)
  }
]);
```

## Positioning

Legend does not have any specific position setting.

Where it is placed is determined by the `layout` setting of parent container.

In most chart setups, legend container will be chart itself.

By default, chart does not have any layout, so pushing a legend will just plop it on the top. It will also not affect size of the plot itself.

If we need to arrange chart and legend neatly, in a non-overlapping, orderly way, we need to add a `layout` setting to the chart.

TypeScript:

```ts
let chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);

let legend = chart.children.push(am5.Legend.new(root, {}));
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);

var legend = chart.children.push(am5.Legend.new(root, {}));
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_bottom-1024x590.png "`layout: root.verticalLayout`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_right-1024x590.png "`layout: root.horizontalLayout`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_unpositioned-1024x590.png "`layout` not set")

The legend appears on the bottom (or right) because it's the last element we've added to the chart.

If we'd like the legend to appear on top (or left), we'd need to ensure it's the first child of the chart by using `children.unshift()` method instead of `push()`.

TypeScript:

```ts
let chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);

let legend = chart.children.unshift(am5.Legend.new(root, {}));
```

JavaScript:

```js
var chart = root.container.children.push( 
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
  }) 
);

var legend = chart.children.unshift(am5.Legend.new(root, {}));
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_top-1024x590.png "`layout: root.verticalLayout`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_left-1024x590.png "`layout: root.horizontalLayout`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_unpositioned-1024x590.png "`layout` not set")

> **More info:** For more information about layouts, visit our "[Containers: Layout](https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout)" tutorial.

## Aligning

We can also fine-tune legend's position by specifying `x` and/or `y` values as well as using `centerX` and `centerY` settings to indicate what should be considered the center of the legend.

The following will align the legend vertically to the middle of the chart:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  y: am5.percent(50),
  centerY: am5.percent(50)
}));
```

JavaScript:

```js
legend = chart.children.push(am5.Legend.new(root, {
  y: am5.percent(50),
  centerY: am5.percent(50)
}));
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_top_align.png "`y: am5.percent(0)` | `centerY: am5.percent(0)`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_bottom_align.png "`y: am5.percent(50)` | `centerY: am5.percent(50)`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_center_align.png "`y: am5.percent(100)` | `centerY: am5.percent(100)`")

## Layout

### Setting layout

Legend's items can be arranged horizontally, vertically, or as a grid (default).

Just like with any container, e.g. chart, it is controlled by the `layout` setting.

In legend, it's set to `root.gridLayout` by default, which means that legend items are arranged horizontally in rows, wrapping to new lines when they don't fit, as well as aligned into columns.

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  x: am5.percent(50),
  centerX: am5.percent(50),
  layout: root.verticalLayout
}));
```

JavaScript:

```js
legend = chart.children.push(am5.Legend.new(root, {
  x: am5.percent(50),
  centerX: am5.percent(50),
  layout: root.verticalLayout
}));
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_grid_layout.png "`layout: root.gridLayout` (default)")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_horizontal_layout.png "`layout: root.horizontalLayout`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_vertical_layout.png "`layout: root.verticalLayout`")

Obviously, when choosing layout, we need to think of the place the legend will appear in, as well as a number of potential items in it.

> **More info:** For more information about layouts, visit our "[Containers: Layout](https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout)" tutorial.

### Grid layout

Grid layout can also be tweaked with a couple of settings of its own:

* `maxColumns` - maximum number of columns to allow in the grid.
* `fixedWidthGrid` - if set to `true` will make all columns equal in width, as opposed to best fit.

Since we don't want to modify a global instance of the grid layout (it may be used by other chart elements), we will need to create a unique instance of `GridLayout` specifically for the legend:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: am5.GridLayout.new(root, {
    maxColumns: 3,
    fixedWidthGrid: true
  })
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: am5.GridLayout.new(root, {
    maxColumns: 3,
    fixedWidthGrid: true
  })
}));
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_grid_layout.png "`fixedWidthGrid: false` (default)")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_fixedwidthcolumns.png "`fixedWidthGrid: true`")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_maxcolumns_2.png "`maxColumns: 2`")

Example: [Pie chart legend alignment](https://docs.amcharts.com/embeds/v5/pie-chart-legend-alignment/)

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

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
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
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: am5.GridLayout.new(root, {
      maxColumns: 3,
      fixedWidthGrid: true
    })
  })
);

legend.data.setAll(series.dataItems);
```

> **More info:** For more information about grid layout, visit our "[Containers: Grid](https://docs.amcharts.com/v5/concepts/common-elements/containers/#layout)" tutorial.

## Markers

There are a few ways a legend can build its markers:

* Markers that resemble actual look of the item, e.g. series.
* Default square markers.
* Completely custom markers.

### Marker size

Markers are 18 x18 pixels by default.

We can change that using `markers.template`:

TypeScript:

```ts
legend.markers.template.setAll({
  width: 24,
  height: 24
});
```

JavaScript:

```js
legend.markers.template.setAll({
  width: 24,
  height: 24
});
```

Note that marker template is just a container but not actual element, so there's not much we can do here besides the size, and some other settings like padding.

### Look-resembling markers

By default legend will try to build a marker that resembles its items, e.g. series.

For example, marker for line series will look like line with the same color.

Since the markers are build by each target, e.g. series, and can contain a number of elements, there's little we can do about configuring the look for those.

### Default markers

If we want to have more control on look of the markers, we can enable default markers by setting legend's setting `useDefaultMarker` to `true`.

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  useDefaultMarker: true
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  useDefaultMarker: true
}));
```

Now the legend will create its own markers for each item, using `RoundedRectangle` elements.

We can configure those rectangles using `markerRectangles.template`. It accepts all [`RoundedRectangle` settings](https://docs.amcharts.com/v5/reference/roundedrectangle/#settings).

TypeScript:

```ts
legend.markerRectangles.template.setAll({
  cornerRadiusTL: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusBR: 10
});
```

JavaScript:

```js
legend.markerRectangles.template.setAll({
  cornerRadiusTL: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusBR: 10
});
```

The above will make all legend markers round:

Example: [Pie chart legend alignment](https://docs.amcharts.com/embeds/v5/pie-chart-legend-alignment-2/)

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
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
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

legend.markerRectangles.template.setAll({
  cornerRadiusTL: 10,
  cornerRadiusTR: 10,
  cornerRadiusBL: 10,
  cornerRadiusBR: 10
});

legend.data.setAll(series.dataItems);
```

> **Note:** Some series like pie, column, and similar do not have their own custom look of the marker and will use default markers regardless of the `useDefaultMarker` setting.

### Images as markers

Markers can also be completely customized.

After we insert an item into legend's data, it creates a related data item and all the marker elements - such as rectangles.

We can grab that data item, use it to access visual elements, then modify them.

The following code will remove built-in marker elements and will replace them with an image.

TypeScript:

```ts
let legendDataItem = legend.dataItems[legend.dataItems.length - 1];
let marker = legendDataItem.get("marker")
marker.children.push(am5.Picture.new(root, {
  width: 20,
  height: 20,
  src: "/myImage.svg"
}));
legendDataItem.get("markerRectangle").set("forceHidden", true);
```

JavaScript:

```js
var legendDataItem = legend.dataItems[legend.dataItems.length - 1];
var marker = legendDataItem.get("marker")
marker.children.push(am5.Picture.new(root, {
  width: 20,
  height: 20,
  src: "/myImage.svg"
}));
legendDataItem.get("markerRectangle").set("forceHidden", true);
```

Example: [Images as legend markers](https://docs.amcharts.com/embeds/v5/images-as-legend-markers/)

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = [
  {
    year: "2021",
    canada: 2.5,
    germany: 2.5,
    india: 2.1
  },
  {
    year: "2022",
    canada: 2.6,
    germany: 2.7,
    india: 2.2
  },
  {
    year: "2023",
    canada: 2.8,
    germany: 2.9,
    india: 2.4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 100,
    numberFormat: "#'%'",
    strictMinMax: true,
    calculateTotals: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName, icon) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      valueYShow: "valueYTotalPercent",
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
    tooltipY: am5.percent(10)
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueYTotalPercent.formatNumber('#.#')}%",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);

  // Get the last inserted legend data item
  // Modify its contents
  var legendDataItem = legend.dataItems[legend.dataItems.length - 1];
  var marker = legendDataItem.get("marker");
  var picture = marker.children.push(
    am5.Picture.new(root, {
      width: 20,
      height: 20,
      src: icon,
      saturate: 1
    })
  );

  picture.states.create("disabled", {
    saturate: 0,
    opacity: 0.5
  });

  legendDataItem.get("markerRectangle").set("forceHidden", true);

  var tooltip = series.set(
    "tooltip",
    am5.Tooltip.new(root, {
      layout: root.horizontalLayout
    })
  );

  tooltip.children.unshift(
    am5.Picture.new(root, {
      width: 20,
      height: 20,
      marginRight: 5,
      src: icon
    })
  );

  tooltip.label.set("paddingTop", 2);
}

makeSeries("Canada", "canada", "https://www.amcharts.com/wp-content/uploads/flags/canada.svg");
makeSeries("Germany", "germany", "https://www.amcharts.com/wp-content/uploads/flags/germany.svg");
makeSeries("India", "india", "https://www.amcharts.com/wp-content/uploads/flags/india.svg");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

Another way to modify legend markers is to use template's [setup function](https://docs.amcharts.com/v5/concepts/settings/list-templates/#setup-handler).

Same result, different approach.

TypeScript:

```ts
legend.markers.template.setup = function(marker) {
  marker.events.on("dataitemchanged", function() {
    let dataItem = marker._dataItem
    let series = dataItem.dataContext;
    marker.children.push(am5.Picture.new(root, {
      width: 20,
      height: 20,
      src: "https://www.amcharts.com/wp-content/uploads/flags/" + series.get("name").toLowerCase() + ".svg"
    }));
    
    dataItem.on("markerRectangle", function(rectangle) {
      rectangle.set("forceHidden", true);
    })
  });
};
```

JavaScript:

```js
legend.markers.template.setup = function(marker) {
  marker.events.on("dataitemchanged", function() {
    var dataItem = marker._dataItem
    var series = dataItem.dataContext;
    marker.children.push(am5.Picture.new(root, {
      width: 20,
      height: 20,
      src: "https://www.amcharts.com/wp-content/uploads/flags/" + series.get("name").toLowerCase() + ".svg"
    }));
    
    dataItem.on("markerRectangle", function(rectangle) {
      rectangle.set("forceHidden", true);
    })
  });
};
```

Example: [Images as legend markers](https://docs.amcharts.com/embeds/v5/images-as-legend-markers-2/)

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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

var data = [
  {
    year: "2021",
    canada: 2.5,
    germany: 2.5,
    india: 2.1
  },
  {
    year: "2022",
    canada: 2.6,
    germany: 2.7,
    india: 2.2
  },
  {
    year: "2023",
    canada: 2.8,
    germany: 2.9,
    india: 2.4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {}),
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 100,
    numberFormat: "#'%'",
    strictMinMax: true,
    calculateTotals: true,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

legend.markers.template.setup = function (marker) {
  marker.events.on("dataitemchanged", function () {
    var dataItem = marker._dataItem;
    var series = dataItem.dataContext;
    marker.children.push(
      am5.Picture.new(root, {
        width: 20,
        height: 20,
        src:
          "https://www.amcharts.com/wp-content/uploads/flags/" +
          series.get("name").toLowerCase() +
          ".svg"
      })
    );

    dataItem.on("markerRectangle", function (rectangle) {
      rectangle.set("forceHidden", true);
    });
  });
};

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName, icon) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      stacked: true,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      valueYShow: "valueYTotalPercent",
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
    tooltipY: am5.percent(10)
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://docs.amcharts.com/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueYTotalPercent.formatNumber('#.#')}%",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);

  var tooltip = series.set("tooltip", am5.Tooltip.new(root, { layout: root.horizontalLayout }));
  tooltip.children.unshift(
    am5.Picture.new(root, {
      width: 20,
      height: 20,
      marginRight: 5,
      src: icon
    })
  );

  tooltip.label.set("paddingTop", 2);
}

makeSeries("Canada", "canada", "https://www.amcharts.com/wp-content/uploads/flags/canada.svg");
makeSeries("Germany", "germany", "https://www.amcharts.com/wp-content/uploads/flags/germany.svg");
makeSeries("India", "india", "https://www.amcharts.com/wp-content/uploads/flags/india.svg");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Labels

### Configuring labels

Legend has two properties related to labels: `labels` and `valueLabels`.

One contains all instances of name labels, the other - value labels.

Both are "list templates", meaning that we can use their `template` property to specify any setting for those labels.

`template` accepts any [`Label` setting](https://docs.amcharts.com/v5/reference/label/#settings).

TypeScript:

```ts
legend.labels.template.setAll({
  fontSize: 16,
  fontWeight: "300"
});

legend.valueLabels.template.setAll({
  fontSize: 16,
  fontWeight: "400"
});
```

JavaScript:

```js
legend.labels.template.setAll({
  fontSize: 16,
  fontWeight: "300"
});

legend.valueLabels.template.setAll({
  fontSize: 16,
  fontWeight: "400"
});
```

### Disabling value labels

Legend comes with both labels and value labels, with space reserved for both of them.

If you are not using the latter, you might consider disabling them, so that the legend becomes more compact, possibly freeing up more space for the chart itself.

TypeScript:

```ts
legend.valueLabels.template.set("forceHidden", true);
```

JavaScript:

```js
legend.valueLabels.template.set("forceHidden", true);
```

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_with_valuelabels.png "Value labels enabled (default)")

![](https://docs.amcharts.com/v5/images/concepts/legend/index/legend_without_valuelabels.png.png "Value labels disabled")

### Dynamic label content

In most charts legend's labels will be populated by its series.

The content of labels will depend on whether legend is displaying list of series, or series data items, and how those series are set up.

For series-specific configuration options refer to these tutorials:

* [Legend and XY series](https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/).
* [Legend and Pie/Sliced series](https://docs.amcharts.com/v5/charts/percent-charts/legend-percent-series/).
* [Legend and Hierarchy series](https://docs.amcharts.com/v5/charts/hierarchy/legend-hierarchy-series/).

## Altering functionality

### Disabling toggling

Legend items are togglable by default.

To disable toggling, we need to set legend's `clickTarget` setting to `"none"`:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  y: am5.percent(50),
  centerY: am5.percent(50),
  clickTarget: "none"
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  y: am5.percent(50),
  centerY: am5.percent(50),
  clickTarget: "none"
}));
```

Example: [Spectrum chart](https://docs.amcharts.com/embeds/v5/spectrum-chart/)

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
  height: 120px;
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

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    layout: root.verticalLayout
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [
  {
    category: "",
    from: new Date(2019, 0, 1, 11, 0).getTime(),
    to: new Date(2019, 0, 1, 12, 30).getTime(),
    columnSettings: {
      fill: am5.color(0x69a74f)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 12, 30).getTime(),
    to: new Date(2019, 0, 1, 12, 45).getTime(),
    columnSettings: {
      fill: am5.color(0xfb9900)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 12, 45).getTime(),
    to: new Date(2019, 0, 1, 14, 3).getTime(),
    columnSettings: {
      fill: am5.color(0x69a74f)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 14, 3).getTime(),
    to: new Date(2019, 0, 1, 14, 14).getTime(),
    columnSettings: {
      fill: am5.color(0x664ea6)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 14, 14).getTime(),
    to: new Date(2019, 0, 1, 14, 38).getTime(),
    columnSettings: {
      fill: am5.color(0xcc0c00)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 14, 38).getTime(),
    to: new Date(2019, 0, 1, 15, 1).getTime(),
    columnSettings: {
      fill: am5.color(0xfb9900)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 15, 1).getTime(),
    to: new Date(2019, 0, 1, 16, 37).getTime(),
    columnSettings: {
      fill: am5.color(0x69a74f)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 16, 37).getTime(),
    to: new Date(2019, 0, 1, 16, 55).getTime(),
    columnSettings: {
      fill: am5.color(0x9900ff)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 16, 55).getTime(),
    to: new Date(2019, 0, 1, 17, 7).getTime(),
    columnSettings: {
      fill: am5.color(0x69a74f)
    }
  },

  {
    category: "",
    from: new Date(2019, 0, 1, 17, 7).getTime(),
    to: new Date(2019, 0, 1, 17, 30).getTime(),
    columnSettings: {
      fill: am5.color(0xfb9900)
    }
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis.data.setAll([{ category: "" }]);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "minute", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

xAxis.get("renderer").labels.template.set("forceHidden", true);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: "to",
    openValueXField: "from",
    categoryYField: "category"
  })
);

series.columns.template.setAll({
  strokeWidth: 0,
  strokeOpacity: 0,
  height: am5.percent(100),
  templateField: "columnSettings"
});

series.data.setAll(data);

// Create axis ranges for each column
// https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
for (var i = 0; i < data.length; i++) {
  var rangeDataItem = xAxis.makeDataItem({
    value: data[i].from
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("forceHidden", true);

  rangeDataItem.get("tick").setAll({
    visible: true,
    length: 18,
    strokeOpacity: 0.2
  });

  rangeDataItem.get("label").setAll({
    //fill: am5.color(0xffffff),
    centerX: am5.p0,
    forceHidden: false,
    fontSize: 10,
    text: root.dateFormatter.format(new Date(data[i].from), "HH:mm")
  });
}

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    nameField: "name",
    fillField: "color",
    strokeField: "color",
    centerX: am5.percent(50),
    x: am5.percent(50),
    clickTarget: "none"
  })
);

legend.data.setAll([
  {
    name: "Normal operation",
    color: am5.color("#69a74f")
  },
  {
    name: "Minor alarm",
    color: am5.color("#fb9900")
  },
  {
    name: "Anomaly",
    color: am5.color("#664ea6")
  },
  {
    name: "Critical error",
    color: am5.color("#cc0c00")
  }
]);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear();
chart.appear(1000, 100);
```

### Disabling hovers

To disable just hover effects, like when hovering on legend item triggers hover on a related object, like a slice of a pie chart, we will need to explicitly disable `pointerover` event of all created items.

TypeScript:

```ts
legend.itemContainers.template.setup = function(item) {
  item.events.disableType("pointerover")
};
```

JavaScript:

```js
legend.itemContainers.template.setup = function(item) {
  item.events.disableType("pointerover")
};
```

Example: [Disabling hovers in PieChart legend](https://docs.amcharts.com/embeds/v5/disabling-hovers-in-piechart-legend/)

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
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout
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
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);

// Add legend
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: root.horizontalLayout
  })
);

legend.itemContainers.template.setup = function (item) {
  item.events.disableType("pointerover");
};

legend.data.setAll(series.dataItems);
```

### Disabling graying out

To disable graying out of legend items when they are toggled off, simply disable propagation of a `disabled` state on item containers:

TypeScript:

```ts
legend.itemContainers.template.set("setStateOnChildren", false);
```

JavaScript:

```js
legend.itemContainers.template.set("setStateOnChildren", false);
```

## Fitting into the chart

Since version 5.22.0, `autoFit` fits the legend into the chart, a step at a time as room runs out:

TypeScript:

```ts
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  autoFit: true
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  autoFit: true
}));
```

1. Empty value labels give their room back.
2. The legend gets smaller, down to three quarters of its size.
3. A name still too wide is shortened, and a legend still too tall scrolls.
4. When not even one row fits, the legend is hidden.

Above or below the chart, the legend takes at most 30% of the chart's height. Beside it, at most 40% of its width. A `width`, `height`, `maxWidth`, `maxHeight`, `scale` or `verticalScrollbar` set on the legend is kept.

The [`ResponsiveMax` theme](https://docs.amcharts.com/v5/concepts/responsive-max/) turns it on.

## Scrollable legend

If legend's contents do not fit into its height, we can enable scrolling by setting its `verticalScrollbar` instance of a `Scrollbar`:

TypeScript:

```ts
var legend = chart.children.push(am5.Legend.new(root, {
  centerY: am5.percent(50),
  y: am5.percent(50),
  layout: root.verticalLayout,
  height: am5.percent(100),
  verticalScrollbar: am5.Scrollbar.new(root, {
    orientation: "vertical"
  })
}));
```

JavaScript:

```js
var legend = chart.children.push(am5.Legend.new(root, {
  centerY: am5.percent(50),
  y: am5.percent(50),
  layout: root.verticalLayout,
  height: am5.percent(100),
  verticalScrollbar: am5.Scrollbar.new(root, {
    orientation: "vertical"
  })
}));
```

> **Note:** Please note that `height` needs to be set for this to work properly.

Example: [Pie chart with scrollable legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-scrollable-legend/)

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
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
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
    layout: root.verticalLayout,
    height: am5.percent(100),
    verticalScrollbar: am5.Scrollbar.new(root, {
      orientation: "vertical"
    })
  })
);

legend.data.setAll(series.dataItems);
```

## External container

### Separate Root element

Creating a legend in an external container is as easy as creating another root element, then pushing legend into its children:

TypeScript:

```ts
let legendRoot = am5.Root.new("legenddiv");

let legend = legendRoot.container.children.push( 
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: legendRoot.grid
  })
);

legend.data.setAll(series.dataItems);
```

JavaScript:

```js
var legendRoot = am5.Root.new("legenddiv");

var legend = legendRoot.container.children.push( 
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50),
    layout: legendRoot.grid
  })
);

legend.data.setAll(series.dataItems);
```

Example: [Pie chart with external legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-external-legend/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<h2>Chart</h2>
<div id="chartdiv"></div>

<h2>Legend</h2>
<div id="legenddiv"></div>
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
  border: 1px dotted #888;
}

#legenddiv {
  width: 100%;
  height: 100px;
  border: 1px dotted #888;
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

// Create chartRoot and chart
var chartRoot = am5.Root.new("chartdiv");

chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var chart = chartRoot.container.children.push(
  am5percent.PieChart.new(chartRoot, {
    layout: chartRoot.horizontalLayout
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
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(chartRoot, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

/**
 * Legend
 */

// Create chartRoot and chart
var legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var legend = legendRoot.container.children.push(
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
    //layout: legendRoot.grid
  })
);

legend.data.setAll(series.dataItems);
```

> **Note:** For information on how to include external legend when exporting chart to an image, refer to "Exporting to image formats: [Combining multiple images](https://docs.amcharts.com/v5/concepts/exporting/exporting-images/#combining-multiple-images)" tutorial.

### External legend on XY charts

> **Note:** If you are using external legend on an XY chart, make sure you apply XY [default theme](https://docs.amcharts.com/v5/concepts/themes/#default-themes) to the legend's root element as well as use proper `root` element reference for XY series bullets.

TypeScript:

```ts
let legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([
  am5themes_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
]);
```

JavaScript:

```js
var legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([
  am5themes_Animated.new(legendRoot),
  am5xy.DefaultTheme.new(legendRoot)
]);
```

### Sizing external legend container

If we'd like our external legend to auto-size according to its actual contents, we could use its `boundschanged` event:

TypeScript:

```ts
legend.events.on("boundschanged", function() {
  document.getElementById("legenddiv").style.height = legend.height() + "px"
});
```

JavaScript:

```js
legend.events.on("boundschanged", function() {
  document.getElementById("legenddiv").style.height = legend.height() + "px"
});
```

Example: [Pie chart with external legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-external-legend-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<h2>Chart</h2>
<div id="chartdiv"></div>

<h2>Legend</h2>
<div id="legendwrapper">
  <div id="legenddiv"></div>
</div>
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
  border: 1px dotted #888;
}

#legendwrapper {
  width: 100%;
  height: 80px;
  overflow-y: scroll;
  border: 1px dotted #888;
}

#legenddiv {
  width: 100%;
  height: 80px;
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

// Create chartRoot and chart
var chartRoot = am5.Root.new("chartdiv");

chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var chart = chartRoot.container.children.push(
  am5percent.PieChart.new(chartRoot, {
    layout: chartRoot.horizontalLayout
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
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(chartRoot, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

/**
 * Legend
 */

// Create chartRoot and chart
var legendRoot = am5.Root.new("legenddiv");

legendRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var legend = legendRoot.container.children.push(
  am5.Legend.new(legendRoot, {
    width: am5.percent(100),
    centerX: am5.percent(50),
    x: am5.percent(50)
  })
);

legend.data.setAll(series.dataItems);

// Resize legend to actual height of its content
legend.events.on("boundschanged", function () {
  document.getElementById("legenddiv").style.height = legend.height() + "px";
});
```

And here's another example which creates a horizontally-scrollable external legend:

Example: [Pie chart with external horizontally-scrollable legend](https://docs.amcharts.com/embeds/v5/pie-chart-with-external-horizontally-scrollable-legend/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<h2>Chart</h2>
<div id="chartdiv"></div>

<h2>Legend</h2>
<div id="legendwrapper">
  <div id="legenddiv"></div>
</div>
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
  border: 1px dotted #888;
}

#legendwrapper {
  width: 100%;
  height: 70px;
  overflow-x: scroll;
  overflow-y: hidden;
  border: 1px dotted #888;
}

#legenddiv {
  width: 100%;
  height: 60px;
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

// Create chartRoot and chart
var chartRoot = am5.Root.new("chartdiv");

chartRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var chart = chartRoot.container.children.push(
  am5percent.PieChart.new(chartRoot, {
    layout: chartRoot.horizontalLayout
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
  },
  {
    country: "Switzerland",
    sales: 90000
  },
  {
    country: "Italy",
    sales: 70000
  },
  {
    country: "Greece",
    sales: 45000
  },
  {
    country: "Czechia",
    sales: 40000
  }
];

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(chartRoot, {
    name: "Series",
    valueField: "sales",
    categoryField: "country"
  })
);

series.data.setAll(data);
series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

/**
 * Legend
 */

// Create chartRoot and chart
var legendRoot = am5.Root.new("legenddiv");

legendRoot.container.setAll({
  width: am5.p100,
  height: am5.p100
});

legendRoot.setThemes([am5themes_Animated.new(chartRoot)]);

var legend = legendRoot.container.children.push(
  am5.Legend.new(legendRoot, {
    centerY: am5.percent(50),
    y: am5.percent(50),
    layout: legendRoot.horizontalLayout
  })
);

legend.data.setAll(series.dataItems);

// Resize legend to actual height of its content
legend.events.on("boundschanged", function () {
  console.log(legend.height());
  document.getElementById("legendwrapper").style.height = legend.height() + 17 + "px";
  document.getElementById("legenddiv").style.height = legend.height() + "px";
  document.getElementById("legenddiv").style.width = legend.width() + "px";
});
```

## Related tutorials

* [Right-to-left legend](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/#legend)
* [Adding check marks to legend markers](https://docs.amcharts.com/v5/tutorials/adding-check-marks-to-legend-markers/)
* [Auto-wrapping legend labels](https://docs.amcharts.com/v5/tutorials/auto-wrapping-legend-labels/)
* [Individual legend item for each column in series](https://docs.amcharts.com/v5/tutorials/individual-legend-item-for-each-column-in-series/)
* [Grouping legend items](https://docs.amcharts.com/v5/tutorials/grouping-legend-items/)
* [Dynamically changing legend position](https://docs.amcharts.com/v5/tutorials/dynamically-changing-legend-position/)
* [Aligning a legend with plot container](https://docs.amcharts.com/v5/tutorials/aligning-a-legend-with-plot-container/)
* [Pie chart with right-aligned labels](https://docs.amcharts.com/v5/tutorials/pie-chart-with-right-aligned-labels/)
* [Toggling all series but one using legend](https://docs.amcharts.com/v5/tutorials/toggling-all-series-but-one-using-legend/)
* [Toggle multiple pie slices via legend](https://docs.amcharts.com/v5/tutorials/toggle-multiple-pie-slices-via-legend/)
* [Using series color for legend labels](https://docs.amcharts.com/v5/tutorials/using-series-color-for-legend-labels/)
* [Applying custom hover/active states on legend markers](https://docs.amcharts.com/v5/tutorials/applying-custom-hover-active-states-on-legend-markers/)
