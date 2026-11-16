---
title: "Labels"
source: "https://docs.amcharts.com/v5/concepts/common-elements/labels/"
scraped: "2026-11-16"
---

## Creating labels

To create a label, we simply call `new()` method on a `Label` class.

The following code creates a title on a chart:

TypeScript:

```ts
chart.children.unshift(am5.Label.new(root, {
  text: "This is a chart title",
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

JavaScript:

```js
chart.children.unshift(am5.Label.new(root, {
  text: "This is a chart title",
  fontSize: 25,
  fontWeight: "500",
  textAlign: "center",
  x: am5.percent(50),
  centerX: am5.percent(50),
  paddingTop: 0,
  paddingBottom: 0
}));
```

Example: [Chart with title and sub-title](https://docs.amcharts.com/embeds/v5/chart-with-title-and-sub-title/)

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
    value1: 1000,
    value2: 588
  },
  {
    category: "Marketing",
    value1: 1200,
    value2: 1800
  },
  {
    category: "Sales",
    value1: 850,
    value2: 1230
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
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series1.data.setAll(data);

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series #2",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);

// Add titles
chart.children.unshift(
  am5.Label.new(root, {
    text: "And this is a smaller sub-title",
    fontSize: 14,
    textAlign: "center",
    x: am5.percent(50),
    centerX: am5.percent(50)
  })
);

chart.children.unshift(
  am5.Label.new(root, {
    text: "This is a chart title",
    fontSize: 25,
    fontWeight: "500",
    textAlign: "center",
    x: am5.percent(50),
    centerX: am5.percent(50),
    paddingTop: 0,
    paddingBottom: 0
  })
);
```

Refer to [`Label` settings](https://docs.amcharts.com/v5/reference/label/#settings) list for more options.

## In-line styling

Text within the label can be formatted using in-line style blocks: instructions enclosed in square brackets:

TypeScript:

```ts
label.set("text", "[#888]This is gray[/]. [bold]And this is bold[/]!");
```

JavaScript:

```js
label.set("text", "[#888]This is gray[/]. [bold]And this is bold[/]!");
```

For more information, refer to "[Text styling](https://docs.amcharts.com/v5/concepts/formatters/text-styling/)" tutorial.

## Data placeholders

Labels that have access to actual data items (e.g. axis labels, series bullets, tooltips), can use data placeholders in curly brackets to refer to actual data.

TypeScript:

```ts
label.set("text", "[#888]{categoryX}[/]: [bold]{valueY}[/]");
```

JavaScript:

```js
label.set("text", "[#888]{categoryX}[/]: [bold]{valueY}[/]");
```

For more information, refer to "[Data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/)" tutorial.

In order for data placeholders to work, labels also need to have they `populateText` setting set to `true`.

In places where labels are likely use placeholders that would already be set, e.g. in axes, tooltips, node labels, legend, etc.

Other places, like labels in bullets, will need their `populateText` set manually.

## Oversized text

An oversized label is considered one that does not fit into its `maxWidth` setting, if it's set.

You can set it manually. Some elements will do it for you, like for example labels on a Treemap will have their `maxWidth` set automatically to the node width they're for.

> **Important:** This setting currently does not work with `RadialLabel`.

### Behavior

Normally, oversized labels won't do anything, they'd just go out of bounds.

We can control that using label's setting: `oversizedBehavior`.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxWidth: 150
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxWidth: 150
});
```

Available values for `oversizedBehavior`:

| Setting value     | Comment                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"none"`          | Text will be shown as is, even if it does not fit into `maxWidth`.                                                                               |
| `"hide"`          | Label will be hidden completely if it does not fit.                                                                                              |
| `"fit"`           | Label will be scaled down to fit into `maxWidth`.                                                                                                |
| `"wrap"`          | Label text will be auto-wrapped into lines no longer than `maxWidth`.                                                                            |
| `"wrap-no-break"` | Label text will be auto-wrapped into lines to fit within `maxWidth`, but will not break words, which means labels can be longer than `maxWidth`. |
| `"truncate"`      | Label text will be truncated with an ellipsis to fit into `maxWidth`.                                                                            |

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/label_oversized.png "`oversizedBehavior: 'none'` (default)")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/label_truncate.png "`oversizedBehavior: 'truncate'`")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/label_wrap.png "`oversizedBehavior: 'wrap'`")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/label_fit.png "`oversizedBehavior: 'fit'`")

Example: [Chart with oversized labels](https://docs.amcharts.com/embeds/v5/chart-with-oversized-labels/)

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
    category: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
    value: 1000
  },
  {
    category: "Morbi id ex eros ut ut commodo diam eu auctor",
    value: 1200
  },
  {
    category: "Nullam libero odio convallis eget leo at vehicula finibus ipsum",
    value: 850
  }
];

// Craete Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis.get("renderer").labels.template.setAll({
  visible: false
});

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.2,
    renderer: am5xy.AxisRendererX.new(root, {}),

    categoryField: "category"
  })
);

xAxis.data.setAll(data);

xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "wrap",
  textAlign: "center",
  maxWidth: 150
});

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

series.data.setAll(data);
```

### Rotated or vertical labels

Normally, rotated labels will still use `maxWidth` to apply truncation just like it was horizontal, that is not actual width of a rotated label, but its actual length.

The exception is completely vertical labels (`rotation` set to `90` or `-90`). For vertical labels, their `maxHeight` setting will be used instead of `maxWidth`.

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxHeight: 50,
  rotation: -90
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxHeight: 50,
  rotation: -90
});
```

### Additional options

There are some additional options that relate to specific values of `oversizedBehavior`.

#### Additional settings for "fit"

If `oversizedBehavior` is set to `"fit"`, label will try to scale down itself to fit. To avoid microscopic unreadable labels, there's another setting - `minScale`. If set it will not allow labels to shrink beyond certain point.

For example, if we set `minScale` to `0.4` label will be allowed to get to 40% of its original size. If it still doesn't fit, it will be hidden.

Some series, like force-directed and treemap, have `oversizedBehavior` and `minScale` by default.

#### Additional settings for "truncate"

When text is truncated, label adds a Unicode ellipsis symbol (`…`) at the end.

Since not all fonts support it, we might want to change it using label's `ellipsis` setting:

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxWidth: 150,
  ellipsis: "..."
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "truncate",
  maxWidth: 150,
  ellipsis: "..."
});
```

## Line breaks

If we need a line to break in some place, all we need to do is insert a new line symbol (`"\n"`) into text:

TypeScript:

```ts
chart.children.unshift(am5.Label.new(root, {
  text: "This is the first line\nAnd this is the second"
}));
```

JavaScript:

```js
chart.children.unshift(am5.Label.new(root, {
  text: "This is the first line\nAnd this is the second"
}));
```

## Alignment

Multi-line labels, or auto-wrapped labels, will align their lines to the left.

We can set labels' `textAlign` setting to something else, if we can them to be aligned differently:

TypeScript:

```ts
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "wrap",
  maxWidth: 150,
  textAlign: "center"
});
```

JavaScript:

```js
xAxis.get("renderer").labels.template.setAll({
  oversizedBehavior: "wrap",
  maxWidth: 150,
  textAlign: "center"
});
```

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/label_wrap.png "`texAlign: 'left'` (default)")

![](https://docs.amcharts.com/v5/images/concepts/common-elements/labels/textalign_center.png "`textAlign: 'center'`")

## Background

Labels are containers, so can have a background. We can use its `background` setting for that.

For more information and examples, refer to "[Containers: Background](https://docs.amcharts.com/v5/concepts/common-elements/containers/#background)" tutorial.

## Labels as interactive elements

### Enabling label interactivity

Labels as interactive elements in amCharts 5 are tricky. Basically, it's super hard to determine hover/click over just text because it's impossible to completely eradicate antialising, and the actual colored area is super tiny.

Therefore, if we need tooltip to be interactive - have a hover tooltip or handle click events - we need to add a background to it.

The background does not necessarily have to be visible: we can just set its `fillOpacity: 0` to make it completely transparent.

TypeScript:

```ts
let label = chart.children.unshift(am5.Label.new(root, {
  text: "I am clickable!",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

label.events.on("click", function(ev) {
  console.log("Clicked!");
});
```

JavaScript:

```js
var label = chart.children.unshift(am5.Label.new(root, {
  text: "I am clickable!",
  background: am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  })
}));

label.events.on("click", function(ev) {
  console.log("Clicked!");
});
```

### Label templates

For labels produces from a template (e.g. axis labels), we may need to add a "[setup function](https://docs.amcharts.com/v5/concepts/settings/list-templates/#setup-handler)" which adds a background to all newly-created labels.

TypeScript:

```ts
yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  }));
}
```

JavaScript:

```js
yAxis.get("renderer").labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  }));
}
```

### Interactive axis labels

If we need interactivity on axis labels, we can enable them by setting `interactive: true` or `tooltipText` on a label template as well as setting up a `setup` function for template which adds a background, as per above code.

If we would also like to configure tooltip which is displayed, we will need to create a new `Tooltip` object on labels' parent, i.e. `axis.labelsContainer`:

TypeScript:

```ts
xAxis.labelsContainer.set("tooltip", am5.Tooltip.new(root, {
  pointerOrientation: "down"
}));

let xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  tooltipText: "{category}",
  oversizedBehavior: "truncate",
  maxWidth: 100
});

xRenderer.labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  }));
};
```

JavaScript:

```js
xAxis.labelsContainer.set("tooltip", am5.Tooltip.new(root, {
  pointerOrientation: "down"
}));

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  tooltipText: "{category}",
  oversizedBehavior: "truncate",
  maxWidth: 100
});

xRenderer.labels.template.setup = function(target) {
  target.set("background", am5.Rectangle.new(root, {
    fill: am5.color(0x000000),
    fillOpacity: 0
  }));
};
```

Example: [Tooltips on axis labels](https://docs.amcharts.com/embeds/v5/tooltips-on-axis-labels/)

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
    category: "This is a very long label",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4
  },
  {
    category: "And this one is even longer",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3
  },
  {
    category: "No, this one leaves the other two in the dust",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.labelsContainer.set(
  "tooltip",
  am5.Tooltip.new(root, {
    pointerOrientation: "down"
  })
);

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  tooltipText: "{category}",
  oversizedBehavior: "truncate",
  maxWidth: 100
});

xRenderer.labels.template.setup = function (target) {
  target.set(
    "background",
    am5.Rectangle.new(root, {
      fill: am5.color(0x000000),
      fillOpacity: 0
    })
  );
};

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
      categoryXField: "category"
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
makeSeries("Africa", "africa");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
```

## Related tutorials

* [Clickable circular labels](https://docs.amcharts.com/v5/tutorials/clickable-circular-labels/)
