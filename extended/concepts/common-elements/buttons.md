---
title: "Buttons"
source: "https://docs.amcharts.com/v5/concepts/common-elements/buttons/"
scraped: "2026-11-16"
---

> This tutorials takes a brief look at Button elements, and ways to configure them.

This tutorials takes a brief look at `Button` elements, and ways to configure them.

## Button element

Buttons are elements of class `Button` or one of its derivate classes, such as `ResizeButton`.

They are highly configurable. We can change colors, borders, rounding, text, and icons in them.

## Standalone buttons

We can create buttons by instantiating `Button` object and pushing it into `children` of the target container.

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));
```

And, since we probably want it to do something, we should attach a `click` event to it as well:

TypeScript:

```ts
button.events.on("click", function(ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  })
});
```

JavaScript:

```js
button.events.on("click", function(ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  })
});
```

The above code will add a button to the corner of chart's plot container, which upon click will add a new data item to the series data.

Example: [Custom button to add data items](https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items/)

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

var data = [
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    label: am5.Label.new(root, {
      text: "Add data"
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});
```

## Built-in buttons

Some controls in charts come with pre-created buttons. We usually can access them via property and configure just like any other regular button.

Below is a list of such pre-created buttons.

| Element class | Property        | Button class | Comment                                                 |
| ------------- | --------------- | ------------ | ------------------------------------------------------- |
| `XYChart`     | `zoomOutButton` | `Button`     | A zoom-out button that appears when chart is zoomed in. |
| `Scrollbar`   | `startGrip`     | `Button`     | Start grip of a scrollbar.                              |
| `Scrollbar`   | `endGrip`       | `Button`     | End grip of a scrollbar.                                |
| `ZoomControl` | `plusButton`    | `Button`     | Zoom-in button.                                         |
| `ZoomControl` | `minusButton`   | `Button`     | Zoom-out button.                                        |

## Customizing buttons

### Layer

Since buttons are controls that need unobstructive access, we may want to put them in a higher layer than the rest of the chart.

Most of the buttons and related interactive controls are put in layer 40. It makes sense to use the same layer for custom buttons as well.

To set a layer, we use button's `layer` setting:

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data"
  })
}));
```

### Body/background

The button body can be configured via its `background` setting which holds an instance of `RoundedRectangle`.

We can set various settings like colors, corner radius, transparency, etc.

TypeScript:

```ts
button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.7
});
```

JavaScript:

```js
button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.7
});
```

In some cases we might want to disable body/background altogether.

Perhaps we will use an image as button icon and do not need additional elements. In such case we can use `forceHidden` on button's background to completely hide it.

TypeScript:

```ts
button.get("background").setAll({
  forceHidden: true
});
```

JavaScript:

```js
button.get("background").setAll({
  forceHidden: true
});
```

### Label

Buttons start without any labels, so it's up to us to create a `Label` object and set it to button's `label` setting. That is if we need a textual label on our button.

To configure the label, we can use any setting that is available on `Label`.

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  label: am5.Label.new(root, {
    text: "Add data",
    fontSize: 15,
    fontWeight: "600",
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4
  })
}));
```

Note, that all padding on button comes from default label padding.

Example: [Custom button to add data items](https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items-2/)

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

var data = [
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    label: am5.Label.new(root, {
      text: "Add data",
      fontSize: 15,
      fontWeight: "600",
      paddingTop: 2,
      paddingRight: 4,
      paddingBottom: 2,
      paddingLeft: 4
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.7
});
```

### Icon

Save for some of the built-in ones, buttons do not have an icon by default.

If we need some graphical element to be shown instead or next to the label, we will need to create it and pass it in via `icon` setting.

#### External image

An icon can be any `Graphics` element, including basic built in shapes as `Rectangle` or `Picture` which allows using any external or in-line image to be used in button.

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  icon: am5.Picture.new(root, {
    interactive: true,
    src: "https://assets.codepen.io/t-160/icon_add.png",
    cursorOverStyle: "pointer"
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  layer: 40,
  icon: am5.Picture.new(root, {
    interactive: true,
    src: "https://assets.codepen.io/t-160/icon_add.png",
    cursorOverStyle: "pointer"
  })
}));
```

> **Note:** The interactive part of the button is its background. If we are disabling it, we will need to explicitly make the icon interactive by setting its `interactive` setting to `true`.

#### In-line image

We can also use Base64-encoded image data for in-line images.

If we use an SVG as an icon, we may want to specify image's `width` and `height` too.

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Picture.new(root, {
    width: 32,
    height: 32,
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
    cursorOverStyle: "pointer"
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Picture.new(root, {
    width: 32,
    height: 32,
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
    cursorOverStyle: "pointer"
  })
}));
```

Example: [Custom button to add data items](https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items-3/)

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

var data = [
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    layer: 40,
    icon: am5.Picture.new(root, {
      width: 32,
      height: 32,
      src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
      cursorOverStyle: "pointer"
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.4
});
```

#### SVG path

We can also use just an [SVG path](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) as button icon. The advantages of using an SVG path in place of a full image are that we can set colors to it both directly and via states.

TypeScript:

```ts
let button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Graphics.new(root, {
    fill: am5.color(0xffffff),
    svgPath: "M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
  })
}));
```

JavaScript:

```js
var button = chart.plotContainer.children.push(am5.Button.new(root, {
  dx: 10,
  dy: 10,
  layer: 40,
  icon: am5.Graphics.new(root, {
    fill: am5.color(0xffffff),
    svgPath: "M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
  })
}));
```

Example: [Custom button to add data items](https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items-4/)

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

var data = [
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    layer: 40,
    icon: am5.Picture.new(root, {
      width: 32,
      height: 32,
      src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyMHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAyMCIgd2lkdGg9IjIwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNTQuMDAwMDAwLCAtMi4wMDAwMDApIj48ZyBpZD0iYWRkLWNpcmNsZS1vdXRsaW5lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNTQuMDAwMDAwLCAyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0xMSw1IEw5LDUgTDksOSBMNSw5IEw1LDExIEw5LDExIEw5LDE1IEwxMSwxNSBMMTEsMTEgTDE1LDExIEwxNSw5IEwxMSw5IEwxMSw1IEwxMSw1IFogTTEwLDAgQzQuNSwwIDAsNC41IDAsMTAgQzAsMTUuNSA0LjUsMjAgMTAsMjAgQzE1LjUsMjAgMjAsMTUuNSAyMCwxMCBDMjAsNC41IDE1LjUsMCAxMCwwIEwxMCwwIFogTTEwLDE4IEM1LjYsMTggMiwxNC40IDIsMTAgQzIsNS42IDUuNiwyIDEwLDIgQzE0LjQsMiAxOCw1LjYgMTgsMTAgQzE4LDE0LjQgMTQuNCwxOCAxMCwxOCBMMTAsMTggWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+",
      cursorOverStyle: "pointer"
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});

button.get("background").setAll({
  cornerRadiusTL: 0,
  cornerRadiusTR: 0,
  cornerRadiusBR: 0,
  cornerRadiusBL: 0,
  fill: am5.color(0x000000),
  fillOpacity: 0.4
});
```

### States

Buttons come with three states that change background appearance on user interactions:

* `hover` - applied when button is hovered by a pointer.
* `down` - applied when button is being pressed down on by a pointer.
* `active` - when button is set as "active".

We can modify default states to apply our own colors and other settings:

TypeScript:

```ts
button.get("background").states.create("hover", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.8
});

button.get("background").states.create("down", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 1
});
```

JavaScript:

```js
button.get("background").states.create("hover", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 0.8
});

button.get("background").states.create("down", {}).setAll({
  fill: am5.color(0xff0000),
  fillOpacity: 1
});
```

Example: [Custom button to add data items](https://docs.amcharts.com/embeds/v5/custom-button-to-add-data-items-5/)

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

var data = [
  { date: new Date(2012, 1, 1).getTime(), value: 8 },
  { date: new Date(2012, 1, 2).getTime(), value: 10 },
  { date: new Date(2012, 1, 3).getTime(), value: 12 },
  { date: new Date(2012, 1, 4).getTime(), value: 14 },
  { date: new Date(2012, 1, 5).getTime(), value: 11 },
  { date: new Date(2012, 1, 6).getTime(), value: 6 },
  { date: new Date(2012, 1, 7).getTime(), value: 7 },
  { date: new Date(2012, 1, 8).getTime(), value: 9 },
  { date: new Date(2012, 1, 9).getTime(), value: 13 },
  { date: new Date(2012, 1, 10).getTime(), value: 15 },
  { date: new Date(2012, 1, 11).getTime(), value: 19 },
  { date: new Date(2012, 1, 12).getTime(), value: 21 },
  { date: new Date(2012, 1, 13).getTime(), value: 22 },
  { date: new Date(2012, 1, 14).getTime(), value: 20 },
  { date: new Date(2012, 1, 15).getTime(), value: 18 },
  { date: new Date(2012, 1, 16).getTime(), value: 14 },
  { date: new Date(2012, 1, 17).getTime(), value: 16 },
  { date: new Date(2012, 1, 18).getTime(), value: 18 },
  { date: new Date(2012, 1, 19).getTime(), value: 17 },
  { date: new Date(2012, 1, 20).getTime(), value: 15 },
  { date: new Date(2012, 1, 21).getTime(), value: 12 },
  { date: new Date(2012, 1, 22).getTime(), value: 10 },
  { date: new Date(2012, 1, 23).getTime(), value: 8 }
];

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    maxDeviation: 0.1,
    groupData: false,
    baseInterval: {
      timeUnit: "day",
      count: 1
    },

    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation: 0.1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    minBulletDistance: 10,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date"
  })
);

series.data.setAll(data);

var tooltip = am5.Tooltip.new(root, {
  pointerOrientation: "horizontal"
});

tooltip.label.set("text", "{valueY}");
series.set("tooltip", tooltip);

series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      stroke: root.interfaceColors.get("background"),
      strokeWidth: 2
    })
  });
});

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    xAxis: xAxis
  })
);

cursor.lineY.set("visible", false);

// add scrollbar
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal"
  })
);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Add custom button
var button = chart.plotContainer.children.push(
  am5.Button.new(root, {
    dx: 10,
    dy: 10,
    layer: 40,
    icon: am5.Graphics.new(root, {
      fill: am5.color(0xffffff),
      svgPath:
        "M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
    })
  })
);

button.events.on("click", function (ev) {
  var last = series.data.getIndex(series.data.length - 1);
  var newDate = new Date(last.date);
  newDate.setDate(newDate.getDate() + 1);
  series.data.push({
    date: newDate.getTime(),
    value: last.value + Math.random() * 5 - 2
  });
});

button
  .get("background")
  .states.create("hover", {})
  .setAll({
    fill: am5.color(0xff0000),
    fillOpacity: 0.8
  });

button
  .get("background")
  .states.create("down", {})
  .setAll({
    fill: am5.color(0xff0000),
    fillOpacity: 1
  });
```
