---
title: "Element states"
source: "https://docs.amcharts.com/v5/concepts/settings/states/"
scraped: "2026-11-16"
---

A state is basically a collection of element's settings to be applied on certain events, e.g. when element is hovered.

## How states work?

A state is an object of type `State` which, like regular elements, can have a collection of key/value pairs, known as settings.

By default the state does nothing, until it is applied to the element, at which point it sets values of its settings to the target element.

State application can happen automatically for some built-in states, such as `"hover"`, or it can be initiated by custom code.

## Built-in states

amCharts will try to apply these states in certain situations automatically:

| State name   | Comment                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"hover"`    | Applied when interactive element is hovered by mouse cursor, or touched on a screen.                                                                               |
| `"hidden"`   | Applied when element is hidden.                                                                                                                                    |
| `"active"`   | Applied when element is set as active, e.g. by `active` setting, or toggle behavior.                                                                               |
| `"disabled"` | Applied when element is set as active, e.g. by `disabled` setting, or toggle behavior.                                                                             |
| `"default"`  | Applied whenever element status that applies state is removed, e.g. element is no longer hovered. Default state is also applied when element is first initialized. |

There are more built-in states that are applied in some specialized cases, like for instance on a [candlestick series](https://docs.amcharts.com/v5/charts/xy-chart/series/candlestick-series/#stroke-and-fill-colors).

## Creating or modifying

To create a state on an element, we simply use `states.create()` method on an element, or its template.

The method accepts two parameters:

* State name.
* Set of settings to apply when state is applied.

TypeScript:

```ts
columnSeries.columns.template.set("interactive", true);

columnSeries.columns.template.states.create("hover", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});
```

JavaScript:

```js
columnSeries.columns.template.set("interactive", true);

columnSeries.columns.template.states.create("hover", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});
```

The above will make all columns in a column series to change color when hovered.

Example: [Stacked column chart](https://docs.amcharts.com/embeds/v5/stacked-column-chart/)

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
    value: 1000
  },
  {
    category: "Marketing",
    value: 1200
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
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
    categoryXField: "category"
  })
);

series.columns.template.set("interactive", true);

series.columns.template.states.create("hover", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});

series.data.setAll(data);
```

> **Note:** If a state with the same name already exists on an element when `states.create()` is called, an existing state object will be returned instead, and supplied setting key/values applied to it.

## Custom states

### Creating

We can use any alphanumeric string as a name for a state when creating it, e.g.:

TypeScript:

```ts
columnSeries.columns.template.states.create("highlight", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});
```

JavaScript:

```js
columnSeries.columns.template.states.create("highlight", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});
```

These states will not be used until we explicitly apply them.

### Applying

To apply a state use `states.apply()` or `states.applyAnimate()` methods.

Both methods take state name as a first parameter.

`states.apply()` will apply its settings right way, whereas `states.applyAnimate()` will try to morph all settings from current to target values.

`states.applyAnimate()` also accepts a second parameter: duration of the animation in milliseconds.

TypeScript:

```ts
series.columns.template.states.create("highlight", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});

let selectedColumn;
series.columns.template.events.on("click", function(ev) {
  let column = ev.target;
  
  if (selectedColumn) {
    selectedColumn.states.applyAnimate("default");
    selectedColumn = undefined;
  }
  
  column.states.applyAnimate("highlight");
  selectedColumn = column;
});
```

JavaScript:

```js
series.columns.template.states.create("highlight", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});

var selectedColumn;
series.columns.template.events.on("click", function(ev) {
  var column = ev.target;
  
  if (selectedColumn) {
    selectedColumn.states.applyAnimate("default");
    selectedColumn = undefined;
  }
  
  column.states.applyAnimate("highlight");
  selectedColumn = column;
});
```

Example: [Columns with custom states](https://docs.amcharts.com/embeds/v5/columns-with-custom-states/)

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
    value: 1000
  },
  {
    category: "Marketing",
    value: 1200
  },
  {
    category: "Sales",
    value: 850
  }
];

// Craete Y-axis
let yAxis = chart.yAxes.push(
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
    categoryXField: "category"
  })
);

//series.columns.template.set("interactive", true);

series.columns.template.states.create("highlight", {
  fill: am5.color(0x297373),
  stroke: am5.color(0x297373)
});

var selectedColumn;
series.columns.template.events.on("click", function (ev) {
  var column = ev.target;

  if (selectedColumn) {
    selectedColumn.states.apply("default");
    selectedColumn = undefined;
  }

  column.states.apply("highlight");
  selectedColumn = column;
});

series.data.setAll(data);
```

## Animations

If enabled (via settings or animated theme), setting values will animate between the states.

For more information on how to control this, refer to "[Animations: Animating between the states](https://docs.amcharts.com/v5/concepts/animations/#animating-between-states)".

## Related tutorials

* [Applying custom hover/active states on legend markers](https://docs.amcharts.com/v5/tutorials/applying-custom-hover-active-states-on-legend-markers/)
