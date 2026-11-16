---
title: "Creating themes"
source: "https://docs.amcharts.com/v5/concepts/themes/creating-themes/"
scraped: "2026-11-16"
---

Custom themes is a really powerful way to create a functional reusable sets of settings, events, and adapters to apply to specific elements of the chart.

## Creating a theme

To create a theme, we need to create an object that extends built-in `Theme` class.

The basic structure of the theme class looks like this:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    // Set theme rules here
    // ...
  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    // Set theme rules here
    // ...
  }
}
```

As per above, a a custom theme class needs to only define single method: `setupDefaultRules()`.

## Rules

A theme works via collection of objects - rules - that target specific elements to automatically set their settings, events, and adapters.

### Creating rules

To create a rule we use theme's `rule()` method.

It accepts one or two parameters that define a range of elements this rule is applicable for, and returns a [template](https://docs.amcharts.com/v5/concepts/settings/list-templates/#templates) object which we can use to set setting values, define events, and adapters. E.g.:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label").setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label").setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

The above will create a theme which, when applied, would make all `Label` elements on chart use 12-size font and grey color.

### Using templates

`rule()` method returns a template object. We can use it to:

* Settings
* Events
* Adapters
* States
* Object setup function

We can use its `set()` or `setAll()` methods to set single or several settings.

TypeScript:

```ts
this.rule("AxisRenderer").setAll({
  minGridDistance: 30
});
```

JavaScript:

```js
this.rule("AxisRenderer").setAll({
  minGridDistance: 30
});
```

Use rule's `events` object to add [event handlers](https://docs.amcharts.com/v5/concepts/events/):

TypeScript:

```ts
this.rule("Bullet").events.on("pointerover", function(event) {
  console.log("Pointer over bullet!", event.target);
});
```

JavaScript:

```js
this.rule("Bullet").events.on("pointerover", function(event) {
  console.log("Pointer over bullet!", event.target);
});
```

Or, use rules `adapters` to add an [adapter](https://docs.amcharts.com/v5/concepts/settings/adapters/) to targeted elements:

TypeScript:

```ts
this.rule("LineSeries").adapters.add("stroke", function(stroke, target) {
  return am5.color(0x881133);
});
```

JavaScript:

```js
this.rule("LineSeries").adapters.add("stroke", function(stroke, target) {
  return am5.color(0x881133);
});
```

And we can also use `states` to create element [states](https://docs.amcharts.com/v5/concepts/settings/states/):

TypeScript:

```ts
this.rule("AxisLabel").states.create("hover", {
  fontWeight: "bold"
});
```

JavaScript:

```js
this.rule("AxisLabel").states.create("hover", {
  fontWeight: "bold"
});
```

Finally, we can add a `setup` function that will be run when new element is created:

TypeScript:

```ts
this.rule("AxisLabel").setup = function(target) {
  target.set("background", am5.Rectangle.new(this._root, {
    fill: am5.color(0xffffff),
    fillOpacity: 0.5
  });
};
```

JavaScript:

```js
this.rule("AxisLabel").setup = function(target) {
  target.set("background", am5.Rectangle.new(this._root, {
    fill: am5.color(0xffffff),
    fillOpacity: 0.5
  });
};
```

> **More info:** For more information on how templates work, refer to "[Templates](https://docs.amcharts.com/v5/concepts/settings/list-templates/#templates)" tutorial.

## Targeting elements

### Class names

The most basic way to target an element by a theme rule is by its class name or by a class name of one of its ascendants.

Each element will come with a pre-defined list of its class names that we can use to target it. In most cases, the list will contain its own class name, as well as a list of all its ancestors, so that we can broaden our targeting as needed.

The class name of the element is represented by its class' `className` and `classNames` static properties.

Let's take a look at reference for the `AxisRendererY`:

![](https://docs.amcharts.com/v5/images/concepts/themes/creating-themes/image.png)

As per above, we can target renderers for vertical axes using `AxisRendererY` name, or all renderers using `AxisRenderer`.

> **Note:** Class name must always be specified as a first parameter when creating a theme rule.

### Theme tags

Theme tags is a way to narrow down elements targeted by a class name.

The above example targeted all of the labels across the chart. If we would like to target labels just for an axis, we could use second parameter to the `rule()` method to specify it:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label", ["axis"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label", ["axis"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

Furthermore, we could narrow it down even further by setting axis orientation as a second theme tag:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label", ["axis", "x"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("Label", ["axis", "x"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}
```

Now the rule will target labels on a horizontal axis only.

When multiple theme tags are specified in the rule, only those elements will be targeted that have **all** of the listed tags.

> **Note:** Theme tags are inheritable. This means that element will inherit theme tags set on any of their ascendants. As per above example, axis does have `"axis"` theme tag set. Since axis labels are descendants of the axis, they will have `"axis"` tag set as well, enabling us to target just axis labels.

Below is another example that targets line segments of the line series, as well as sets up bullets via theme:

Example: [Creating bullets via theme](https://docs.amcharts.com/embeds/v5/creating-bullets-via-theme/)

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

// Define custom theme
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("Graphics", ["line", "series", "stroke"]).setAll({
      strokeWidth: 2,
      strokeDasharray: [10, 5]
    });

    this.rule("Bullet").setup = function (target) {
      target.setAll({
        sprite: am5.Circle.new(target.root, {
          radius: 5,
          fill: am5.color(0xff0000),
          fillOpacity: 1
        })
      });
    };
  }
}

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root), MyTheme.new(root)]);

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
    am5xy.SmoothedXLineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {});
  });

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
```

### Custom tags

We can add our own custom tags to any element via its `themeTags` setting, then target those via our custom theme.

It accepts an array of string names:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("AxisLabel", ["my-axis-label"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}

xAxis.get("renderer").labels.template.setAll({
  themeTags: ["my-axis-label"]
});
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("AxisLabel", ["my-axis-label"]).setAll({
      fontSize: 12,
      fill: am5.color(0x777777)
    });

  }
}

xAxis.get("renderer").labels.template.setAll({
  themeTags: ["my-axis-label"]
});
```

### Non-inheritable tags

While generally tags are inheritable from parents, some elements will have special non-inheritable tags set on them.

For example, item containers in legend have `"itemcontainer"` non-inheritable tag set on them. If we create a rule targeting a `Container` (which is an item container class in legend) and refine it with an `"itemcontainer"` tag, it wil be applied to the item container, and not any of its children that might happen to be `Container` classes, too.

If we would like to set a non-inheritable custom theme tag on an element, instead of `themeTags`, we can use `themeTagsSelf`:

TypeScript:

```ts
am5.Container.new(root, {
  themeTagsSelf: ["non-inheritable-tag"]
});
```

JavaScript:

```js
am5.Container.new(root, {
  themeTagsSelf: ["non-inheritable-tag"]
});
```

## Built-in tags

A quick reminder: theme tags are inheritable.

For example, if axis renderer does have `"x"` tag, it will apply to all its descendants, i.e. labels, grid, ticks, etc.

TypeScript:

```ts
this.rule("AxisTick", ["x"]).setAll({
  visible: true,
  length: 5
});
```

JavaScript:

```js
this.rule("AxisTick", ["x"]).setAll({
  visible: true,
  length: 5
});
```

### XY and radar charts

#### XY chart

| Class                                                                                  | Theme tags                                      | Targets                                                                     |
| -------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| ***Axes***                                                                             |                                                 |                                                                             |
| `AxisRenderer` + children (e.g. `AxisTick`) + extending classes (e.g. `AxisRendererX`) | `"x"`                                           | Horizontal axis elements.                                                   |
|                                                                                        | `"y"`                                           | Vertical axis elements.                                                     |
|                                                                                        |                                                 |                                                                             |
| `Container`                                                                            | `"axis"`, `"header"`                            | [Axis header](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-headers/) container.            |
| `Rectangle`                                                                            | `"axis"`, `"header"`, `"background"`            | Axis header background.                                                     |
| ***Series***                                                                           |                                                 |                                                                             |
| `Graphics`                                                                             | `"xy"`, `"line"`, `"series"`, `"stroke"`        | Line segments of a `LineSeries`, `StepLineSeries`, `Smoothed*LineSeries`.   |
| `Graphics`                                                                             | `"xy"`,`"line"`, `"series"`, `"fill"`           | Fill elements of a `LineSeries` , `StepLineSeries`, `Smoothed*LineSeries` . |
| `RoundedRectangle`                                                                     | `"xy"`, `"series"`, `"column"`                  | Columns in a `ColumnSeries`.                                                |
| `Candlestick`                                                                          | `"xy"`, `"candlestick"`, `"series"`, `"column"` | Candles in a `CandlestickSeries`.                                           |
| `OHLC`                                                                                 | `"xy"`, `"ohlc"`, `"series"`, `"column"`        | An OHLC column in an `OHLCSeries`.                                          |

#### Radar chart

| Class                                                                                       | Theme tags                                  | Targets                                                             |
| ------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| ***Axes***                                                                                  |                                             |                                                                     |
| `AxisRenderer` + children (e.g. `AxisTick`) + extending classes (e.g. `AxisRendererRadial`) | `"radial"`                                  | Radial axis elements on a radar chart.                              |
|                                                                                             | `"circular"`                                | Circular axis elements on a radar chart.                            |
| ***Series***                                                                                |                                             |                                                                     |
| `Graphics`                                                                                  | `"radar"`, `"line"`, `"series"`, `"stroke"` | Line segments of a `RadarLineSeries`, and `SmoothedStepLineSeries`. |
| `Graphics`                                                                                  | `"radar"`, `"line"`, `"series"`, `"fill"`   | Fill elements of a `RadarLineSeries`, and `SmoothedStepLineSeries`. |
| `Slice`                                                                                     | `"radar"`, `"series"`, `"column"`           | Columns in a `RadarColumnSeries`.                                   |

### Pie and sliced charts

#### Pie

| Class         | Theme tags          | Targets         |
| ------------- | ------------------- | --------------- |
| `PieChart`    | `"pie"`             | Pie chart.      |
| `PieSeries`   | `"pie"`, `"series"` | Pie series.     |
| `Slice`       | `"pie"`, `"series"` | Slice elements. |
| `RadialLabel` | `"pie"`, `"series"` | Slice labels.   |
| `Tick`        | `"pie"`, `"series"` | Slice ticks.    |

#### Funnel

| Class                                          | Theme tags                                                         | Targets                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| `FunnelSeries` + children (e.g. `FunnelSlice`) | `"vertical"`, `"funnel"`                                           | Vertical funnel series (`orientation: "vertical"`).     |
|                                                | `"horizontal"`, `"funnel"`                                         | Horizontal funnel series (`orientation: "horizontal"`). |
|                                                |                                                                    |                                                         |
| `FunnelSlice`                                  | `"funnel"`, `"series"`, `"slice"` + `"vertical"` or `"horizontal"` | Funnel series slices.                                   |
| `Label`                                        | `"funnel"`, `"series"`, `"label"` + `"vertical"` or `"horizontal"` | Funnel series labels.                                   |
| `Tick`                                         | `"funnel"`, `"series"`, `"tick"` + `"vertical"` or `"horizontal"`  | Funnel series ticks.                                    |
|                                                |                                                                    |                                                         |
| `Tick`                                         | `"pyramid"`, `"series"`, `"tick"` + `"vertical"` or `"horizontal"` | Pyramid series ticks.                                   |

#### Pyramid

| Class                                           | Theme tags                                                          | Targets                                                  |
| ----------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| `PyramidSeries` + children (e.g. `FunnelSlice`) | `"vertical"`, `"pyramid"`                                           | Vertical pyramid series (`orientation: "vertical"`).     |
|                                                 | `"horizontal"`, `"pyramid"`                                         | Horizontal pyramid series (`orientation: "horizontal"`). |
|                                                 |                                                                     |                                                          |
| `FunnelSlice`                                   | `"pyramid"`, `"series"`, `"slice"` + `"vertical"` or `"horizontal"` | Pyramid series slices.                                   |
| `Label`                                         | `"pyramid"`, `"series"`, `"label"` + `"vertical"` or `"horizontal"` | Pyramid series labels.                                   |
| `Tick`                                          | `"pyramid"`, `"series"`, `"tick"` + `"vertical"` or `"horizontal"`  | Pyramid series ticks.                                    |

#### Pictorial stacked

| Class                                                    | Theme tags                                                            | Targets                                                    |
| -------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| `PictorialStackedSeries` + children (e.g. `FunnelSlice`) | `"vertical"`, `"pictorial"`                                           | Vertical pictorial series (`orientation: "vertical"`).     |
|                                                          | `"horizontal"`, `"pictorial"`                                         | Horizontal pictorial series (`orientation: "horizontal"`). |
|                                                          |                                                                       |                                                            |
| `FunnelSlice`                                            | `"pictorial"`, `"series"`, `"slice"` + `"vertical"` or `"horizontal"` | Pictorial series slices.                                   |
| `Label`                                                  | `"pictorial"`, `"series"`, `"label"` + `"vertical"` or `"horizontal"` | Pictorial series labels.                                   |
| `Tick`                                                   | `"pictorial"`, `"series"`, `"tick"` + `"vertical"` or `"horizontal"`  | Pictorial series ticks.                                    |

### Flow charts

#### Sankey

| Class                                   | Theme tags                                                       | Targets                                                 |
| --------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| `Sankey` + children (e.g. `SankeyLink`) | `"vertical"`, `"sankey"`                                         | Vertical Sankey series (`orientation: "vertical"`).     |
|                                         | `"horizontal"`, `"sankey"`                                       | Horizontal Sankey series (`orientation: "horizontal"`). |
| `SankeyLink`                            | `"sankey"`, `"link"`, `"shape"` + `"vertical"` or `"horizontal"` | Sankey link.                                            |
| `RoundedRectangle`                      | `"sankey"`, `"shape"` + `"vertical"` or `"horizontal"`           | Sankey node rectangle.                                  |

#### Chord

| Class                                 | Theme tags                     | Targets       |
| ------------------------------------- | ------------------------------ | ------------- |
| `Chord` + children (e.g. `ChordLink`) | `"chord"`                      | Chord series. |
| `ChordLink`                           | `"chord"`, `"link"`, `"shape"` | Link.         |
| `Slice`                               | `"chord"`, `"shape"`           | Node.         |

#### Chord directed

| Class                                                 | Theme tags                                   | Targets                |
| ----------------------------------------------------- | -------------------------------------------- | ---------------------- |
| `ChordDirected` + children (e.g. `ChordDirectedLink`) | `"directed"`                                 | Chord directed series. |
| `ChordDirectedLink`                                   | `"chord"`, `"directed"`, `"link"`, `"shape"` | Link.                  |
| `Slice`                                               | `"chord"`, `"directed"`, `"shape"`           | Node.                  |

#### Chord directed

| Class                                                   | Theme tags                                 | Targets                  |
| ------------------------------------------------------- | ------------------------------------------ | ------------------------ |
| `ChordNonRibbon` + children (e.g. `ChordNonRibbonLink`) | `"chord"`, `"simple"`                      | Chord non-ribbon series. |
| `ChordNonRibbonLink`                                    | `"chord"`, `"simple"`, `"link"`, `"shape"` | Link.                    |
| `Slice`                                                 | `"chord"`, `"simple"`, `"shape"`           | Node.                    |

### Hierarchy charts

#### Force-directed

| Class                 | Theme tags                                                                            | Targets                |
| --------------------- | ------------------------------------------------------------------------------------- | ---------------------- |
| `ForceDirected`       | `"forcedirected"`                                                                     | Force-directed series. |
| `LinkedHierarchyNode` | `"forcedirected"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`                       | Node.                  |
| `Circle`              | `"forcedirected"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`, `"shape"`            | Inner node circle.     |
| `Circle`              | `"forcedirected"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`, `"shape"`, `"outer"` | Outer node circle.     |
| `HierarchyLink`       | `"forcedirected"`, `"linkedhierarchy"`, `"hierarchy"`, `"link"`                       | Link.                  |
| `Label`               | `"forcedirected"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`                       | Node label.            |

#### Pack

| Class           | Theme tags                                   | Targets       |
| --------------- | -------------------------------------------- | ------------- |
| `Pack`          | `"pack"`                                     | Chord series. |
| `HierarchyNode` | `"pack"`, `"hierarchy"`, `"node"`            | Node.         |
| `Circle`        | `"pack"`, `"hierarchy"`, `"node"`, `"shape"` | Node circle.  |
| `Label`         | `"pack"`, `"hierarchy"`, `"node"`            | Node label.   |

#### Partition

| Class              | Theme tags                                                                       | Targets                      |
| ------------------ | -------------------------------------------------------------------------------- | ---------------------------- |
| `Partition`        | `"vertical"`, `"partition"`                                                      | Vertical partition series.   |
|                    | `"horizontal"`, `"partition"`                                                    | Horizontal partition series. |
| `HierarchyNode`    | `"partition"`, `"hierarchy"`, `"node"` + `"vertical"` or `"horizontal"`          | Node.                        |
| `RoundedRectangle` | `"partition"`, `"hierarchy"`, `"node"`, `"shape"` + `"vertical" or "horizontal"` | Node rectangle.              |
| `Label`            | `"partition"`, `"hierarchy"`, `"node"` + `"vertical"` or `"horizontal"`          | Node label.                  |

#### Sunburst

| Class           | Theme tags                                       | Targets          |
| --------------- | ------------------------------------------------ | ---------------- |
| `Sunburst`      | `"sunburst"`                                     | Sunburst series. |
| `HierarchyNode` | `"sunburst"`, `"hierarchy"`, `"node"`            | Node.            |
| `Slice`         | `"sunburst"`, `"hierarchy"`, `"node"`, `"shape"` | Node slice.      |
| `RadialLabel`   | `"sunburst"`, `"hierarchy"`, `"node"`            | Node label.      |

#### Tree

| Class                 | Theme tags                                                                                                    | Targets            |
| --------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Tree`                | `"vertical"`, `"tree"`                                                                                        | Vertical tree.     |
|                       | `"horizontal"`, `"tree"`                                                                                      | Horizontal tree.   |
| `LinkedHierarchyNode` | `"tree"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"` + `"vertical"` or `"horizontal"`                       | Node.              |
| `Circle`              | `"tree"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`, `"shape"` + `"vertical"` or `"horizontal"`            | Inner node circle. |
| `Circle`              | `"tree"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"`, `"shape"`, `"outer"` + `"vertical"` or `"horizontal"` | Outer node circle. |
| `HierarchyLink`       | `"tree"`, `"linkedhierarchy"`, `"hierarchy"`, `"link"` + `"vertical"` or `"horizontal"`                       | Link.              |
| `Label`               | `"tree"`, `"linkedhierarchy"`, `"hierarchy"`, `"node"` + `"vertical"` or `"horizontal"`                       | Node label.        |

#### Treemap

| Class              | Theme tags                                      | Targets         |
| ------------------ | ----------------------------------------------- | --------------- |
| `Treemap`          | `"treemap"`                                     | Treemap series. |
| `HierarchyNode`    | `"treemap"`, `"hierarchy"`, `"node"`            | Node.           |
| `RoundedRectangle` | `"treemap"`, `"hierarchy"`, `"node"`, `"shape"` | Node rectangle. |
| `Label`            | `"treemap"`, `"hierarchy"`, `"node"`            | Node label.     |

### Map chart

| Class                           | Theme tags              | Targets                           |
| ------------------------------- | ----------------------- | --------------------------------- |
| `MapChart` + all child elements | `"map"`                 | Map chart.                        |
| `Rectangle`                     | `"map"`, `"background"` | Map chart background.             |
|                                 |                         |                                   |
| `Button`                        | `"plus"`                | "Plus" button of a zoom control.  |
| `Button`                        | `"minus"`               | "Minus" button of a zoom control. |

### Common elements

#### Scrollbar

| Class                            | Theme tags                                                                       | Targets                                             |
| -------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- |
| `Scrollbar` + all child elements | `"scrollbar"`, `"vertical"`                                                      | Vertical scrollbar (`orientation: "vertical"`).     |
|                                  | `"scrollbar"`, `"horizontal"`                                                    | Horizontal scrollbar (`orientation: "horizontal"`). |
| `Rectangle`                      | `"scrollbar"`, `"background"`                                                    | Scrollbar background.                               |
|                                  |                                                                                  |                                                     |
| `Button`                         | `"scrollbar"`, `"resize"`, `"button"` + `"vertical"` or `"horizontal"`           | Scrollbar grip buttons.                             |
| `Graphics`                       | `"scrollbar"`, `"resize"`, `"button"`, `"icon"` + `"vertical"` or `"horizontal"` | A grip button icon.                                 |
| `RoundedRectangle`               | `"thumb" + "vertical" or "horizontal"`                                           | Scrollbar thumb element.                            |

### Legend

| Class                         | Theme tags                                                                 | Targets                                          |
| ----------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| `Legend` + all child elements | `"legend"`                                                                 | Legend.                                          |
| `Container`                   | `"legend"`, `"item"` + `"itemcontainer"` (non-inheritable)                 | Item containers (contain marker and labels).     |
| `Rectangle`                   | `"legend"`, `"item"`, `"background"` + `"itemcontainer"` (non-inheritable) | Item container background.                       |
|                               |                                                                            |                                                  |
| `Label`                       | `"legend"`, `"label"`                                                      | Legend labels.                                   |
| `Label`                       | `"legend"`, `"label"`, `"value"`                                           | Legend value labels.                             |
| `RoundedRectangle`            | `"legend"`, `"marker"`, `"rectangle"`                                      | Default legend marker.                           |
| `Graphics`                    | `"line"`, `"series"`, `"legend"`, `"marker"`, `"stroke"`                   | Line part of the legend marker for `LineSeries`. |
| `Graphics`                    | `"line"`, `"series"`, `"legend"`, `"marker"`, `"fill"`                     | Fill part of the legend marker for `LineSeries`. |

#### Tooltip

| Class                          | Theme tags                  | Targets                                |
| ------------------------------ | --------------------------- | -------------------------------------- |
| `Tooltip` + all child elements | `"tooltip"`                 | Tooltip.                               |
| `PointedRectangle`             | `"tooltip"`, `"background"` | Tooltip background (balloon graphics). |

## Colors in themes

There are two classes that control two aspects of coloring chart elements:

1. `ColorSet` - which controls a list of colors that are used to assign to elements, e.g. slices on a Pie chart, or series on an XY chart.
2. `InterfaceColors` - Which defines colors for UI elements like buttons, grid, etc.

### Color lists

We can specify list of auto-assignable colors via ColorSet's `colors` setting:

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("ColorSet").setAll({
      colors: [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06)
      ],
      reuse: true
    });

  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("ColorSet").setAll({
      colors: [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06)
      ],
      reuse: true
    });

  }
}
```

Example: [Color set via theme](https://docs.amcharts.com/embeds/v5/color-set-via-theme/)

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

// Custom theme
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    this.rule("ColorSet").setAll({
      colors: [
        am5.color(0x095256),
        am5.color(0x087f8c),
        am5.color(0x5aaa95),
        am5.color(0x86a873),
        am5.color(0xbb9f06)
      ],

      reuse: true
    });
  }
}

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), MyTheme.new(root)]);

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
    year: "2021",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8
  },
  {
    year: "2022",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4
  },
  {
    year: "2023",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "year"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  series.data.setAll(data);
  series.appear();
  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

### UI colors

Colors for common user interface colors are set via various `InterfaceColors` settings, like `primaryButton`, `secondaryButton`, etc.

For a complete list of available UI settings, refer to "Colors, gradients, and patterns: [Interface colors](https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#interface-colors)".

TypeScript:

```ts
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("InterfaceColors").setAll({
      stroke: Color.fromHex(0xffffff),
      fill: Color.fromHex(0x2b2b2b),
      primaryButton: Color.lighten(Color.fromHex(0xc3cdbd), -0.2),
      primaryButtonHover: Color.lighten(Color.fromHex(0x6771dc), -0.2),
      primaryButtonDown: Color.lighten(Color.fromHex(0x68dc75), -0.2),
      primaryButtonActive: Color.lighten(Color.fromHex(0x68dc76), -0.2),
      primaryButtonText: Color.fromHex(0x11120F),
      primaryButtonStroke: Color.lighten(Color.fromHex(0xc3cdbd), -0.2),

      secondaryButton: Color.fromHex(0xd8ded4),
      secondaryButtonHover: Color.lighten(Color.fromHex(0xd8ded4), 0.1),
      secondaryButtonDown: Color.lighten(Color.fromHex(0xd8ded4), 0.15),
      secondaryButtonActive: Color.lighten(Color.fromHex(0xd8ded4), 0.2),
      secondaryButtonText: Color.fromHex(0x161814),
      secondaryButtonStroke: Color.lighten(Color.fromHex(0xd8ded4), -0.2),

      grid: Color.fromHex(0x161814),
      background: Color.fromHex(0xffffff),
      alternativeBackground: Color.fromHex(0x000000),
      text: Color.fromHex(0x000000),
      alternativeText: Color.fromHex(0xffffff),
      disabled: Color.fromHex(0xadadad),
      positive: Color.fromHex(0x50b300),
      negative: Color.fromHex(0xb30000)
    });

  }
}
```

JavaScript:

```js
class MyTheme extends am5.Theme {
  setupDefaultRules() {
    
    this.rule("InterfaceColors").setAll({
      stroke: Color.fromHex(0xffffff),
      fill: Color.fromHex(0x2b2b2b),
      primaryButton: Color.lighten(Color.fromHex(0xc3cdbd), -0.2),
      primaryButtonHover: Color.lighten(Color.fromHex(0x6771dc), -0.2),
      primaryButtonDown: Color.lighten(Color.fromHex(0x68dc75), -0.2),
      primaryButtonActive: Color.lighten(Color.fromHex(0x68dc76), -0.2),
      primaryButtonText: Color.fromHex(0x11120F),
      primaryButtonStroke: Color.lighten(Color.fromHex(0xc3cdbd), -0.2),

      secondaryButton: Color.fromHex(0xd8ded4),
      secondaryButtonHover: Color.lighten(Color.fromHex(0xd8ded4), 0.1),
      secondaryButtonDown: Color.lighten(Color.fromHex(0xd8ded4), 0.15),
      secondaryButtonActive: Color.lighten(Color.fromHex(0xd8ded4), 0.2),
      secondaryButtonText: Color.fromHex(0x161814),
      secondaryButtonStroke: Color.lighten(Color.fromHex(0xd8ded4), -0.2),

      grid: Color.fromHex(0x161814),
      background: Color.fromHex(0xffffff),
      alternativeBackground: Color.fromHex(0x000000),
      text: Color.fromHex(0x000000),
      alternativeText: Color.fromHex(0xffffff),
      disabled: Color.fromHex(0xadadad),
      positive: Color.fromHex(0x50b300),
      negative: Color.fromHex(0xb30000)
    });

  }
}
```

## Related tutorials

* [Using custom theme to apply patterns to pie chart slices](https://docs.amcharts.com/v5/tutorials/using-custom-theme-to-apply-patterns-to-pie-chart-slices/)
