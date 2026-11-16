---
title: "Annotator"
source: "https://docs.amcharts.com/v5/concepts/exporting/annotator/"
scraped: "2026-11-16"
---

This tutorial shows how we can use Annotator tool that comes with the Exporting plugin.

## About Annotator

Annotator is a standalone control that enables users to add visual annotations to the charts.

Under the hood it's just a wrapper for an amazing [marker.js 2](https://markerjs.com/l/amcharts/) library.

Annotator is equipped to automatically load marker.js so you do not need any additional downloads or any dependencies to install.

## Loading

Annotator comes with the Exporting plugin, so if you are using other plugin's features, nothing needs to be loaded additionally.

If you are planning on using Annotator alone, you will need to load Exporting plugin.

You can import those in your TypeScript / ES6 application as JavaScript modules:

```ts
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
```

For vanilla JavaScript applications and web pages, you can use "script" version:

```html
<script src="https://cdn.amcharts.com/lib/5/plugins/exporting.js"></script>
```

> **More info:** For more information on installing amCharts 5 as well as loading modules refer to our "[Getting started](https://docs.amcharts.com/v5/getting-started/)" tutorial.

## Enabling

Annotator is instantiated just like any other object in amCharts 5: by calling [`new()` method](https://docs.amcharts.com/v5/getting-started/#new-element-syntax) of its class, passing in [root element](https://docs.amcharts.com/v5/getting-started/#root-element) and settings object.

TypeScript:

```ts
let annotator = am5plugins_exporting.Annotator.new(root, {});
```

JavaScript:

```js
var annotator = am5plugins_exporting.Annotator.new(root, {});
```

## Invoking

### Via API

Annotator instance contains several methods that we can use:

| Method     | Comment                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `open()`   | Triggers annotation mode on the chart. This will display UI toolbars and disable all interactions on the chart itself. |
| `close()`  | Exists from annotation mode. All annotations remain visible on the chart.                                              |
| `toggle()` | Toggles annotation mode between on and off. If annotations have been modified, the changes will be saved.              |
| `cancel()` | Exits from annotation mode. Any changes made during last session of the annotation editing are discarded.              |
| `clear()`  | All annotations are removed.                                                                                           |

TypeScript:

```ts
annotator.open();
```

JavaScript:

```js
annotator.open();
```

### Via export menu

We can add Annotator to export menu by manually [inserting it into menu items](https://docs.amcharts.com/v5/concepts/exporting/export-menu/#adding-custom-items):

TypeScript:

```ts
let menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function() {
    this.close();
    annotator.toggle();
  }
});
```

JavaScript:

```js
var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function() {
    this.close();
    annotator.toggle();
  }
});
```

## Configuring UI

Annotator acts as a wrapper for the actual annotation library - marker.js 2.

To configure UI and functionality of the marker.js you will need to set `markerStyleSettings` and `markerSettings` respectively.

TypeScript:

```ts
let annotator = am5plugins_exporting.Annotator.new(root, {
  markerSettings: {
    defaultColorSet: ["red", "green", "blue"],
    defaultColor: "green"
  }
  markerStyleSettings: {
    toolboxColor: "#F472B6",
    toolboxAccentColor: "#BE185D"
  }
});
```

JavaScript:

```js
var annotator = am5plugins_exporting.Annotator.new(root, {
  markerSettings: {
    defaultColorSet: ["red", "green", "blue"],
    defaultColor: "green"
  }
  markerStyleSettings: {
    toolboxColor: "#F472B6",
    toolboxAccentColor: "#BE185D"
  }
});
```

For more information on configuring `MarkerArea`, visit these [marker.js docs](https://markerjs.com/docs/getting-started).

## Example

Example: [Chart with annotator support](https://docs.amcharts.com/embeds/v5/chart-with-annotator-support/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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
  height: 85vh;
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
  { date: "2012-01-01", value: 8 },
  { date: "2012-01-02", value: 10 },
  { date: "2012-01-03", value: 12 },
  { date: "2012-01-04", value: 14 },
  { date: "2012-01-05", value: 11 },
  { date: "2012-01-06", value: 6 },
  { date: "2012-01-07", value: 7 },
  { date: "2012-01-08", value: 9 },
  { date: "2012-01-09", value: 13 },
  { date: "2012-01-10", value: 15 },
  { date: "2012-01-11", value: 19 },
  { date: "2012-01-12", value: 21 },
  { date: "2012-01-13", value: 22 },
  { date: "2012-01-14", value: 20 },
  { date: "2012-01-15", value: 18 },
  { date: "2012-01-16", value: 14 },
  { date: "2012-01-17", value: 16 },
  { date: "2012-01-18", value: 18 },
  { date: "2012-01-19", value: 17 },
  { date: "2012-01-20", value: 15 },
  { date: "2012-01-21", value: 12 },
  { date: "2012-01-22", value: 10 },
  { date: "2012-01-23", value: 8 }
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

    tooltip: am5.Tooltip.new(root, {
      themeTags: ["axis"],
      animationDuration: 300
    })
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

// Set up data processor to parse string dates
// https://docs.amcharts.com/v5/concepts/data/#pre-processing-data
series.data.processor = am5.DataProcessor.new(root, {
  dateFormat: "yyyy-MM-dd",
  dateFields: ["date"]
});

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

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);

// Set up export and annotation
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

var annotator = am5plugins_exporting.Annotator.new(root, {});

var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function () {
    this.close();
    annotator.toggle();
  }
});
```

## Pre-loading annotations

In some cases we will want to pre-load previously created annotations, rather then starting afresh.

### Getting annotation data

To get current annotations from annotator, we can use its `markerState` setting.

It's a setting annotator stores raw data in whenever annotation UI is closed.

TypeScript:

```ts
let annotationData = annotator.get("markerState");
```

JavaScript:

```js
var annotationData = annotator.get("markerState");
```

Now that we have raw data (which is a JS object), we can serialize and store it the way we see fit, for later retrieval.

### Restoring annotation data

For restoring annotation data, we too use `markerState`.

We can use annotator's `set()` method, or provide it when initializing the annotator itself:

TypeScript:

```ts
let annotationData = { ... };

let annotator = am5plugins_exporting.Annotator.new(root, {
  markerState: annotationData
});
```

JavaScript:

```js
var annotationData = { ... };

var annotator = am5plugins_exporting.Annotator.new(root, {
  markerState: annotationData
});
```

Example: [Annotating Charts](https://docs.amcharts.com/embeds/v5/annotating-charts/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/percent.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

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
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270
  })
);

// Create series
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270
  })
);

series.states.create("hidden", {
  endAngle: -90
});

series.labels.template.set("forceHidden", true);
series.ticks.template.set("forceHidden", true);

// Set data
// https://docs.amcharts.com/v5/charts/percent-charts/pie-chart/#setting-data
series.data.setAll([
  {
    category: "Lithuania",
    value: 501.9
  },
  {
    category: "Czechia",
    value: 301.9
  },
  {
    category: "Ireland",
    value: 201.1
  },
  {
    category: "Germany",
    value: 165.8
  },
  {
    category: "Australia",
    value: 139.9
  },
  {
    category: "Austria",
    value: 128.3
  },
  {
    category: "UK",
    value: 99
  }
]);

series.appear(1000, 100);

// Set up export and annotation
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});

var annotationData = {
  width: 897,
  height: 500,
  markers: [
    {
      bgColor: "#EF4444",
      tipPosition: { x: 276.00001525878906, y: 92.33334350585938 },
      color: "#FFFFFF",
      fontFamily: "Helvetica, Arial, sans-serif",
      padding: 5,
      text: "Needs improvement",
      left: 96.66667175292969,
      top: 178,
      width: 230,
      height: 48.333343505859375,
      rotationAngle: 0,
      visualTransformMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      containerTransformMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      typeName: "CalloutMarker",
      state: "select"
    },
    {
      arrowType: "end",
      strokeColor: "#7C3AED",
      strokeWidth: 3,
      strokeDasharray: "",
      x1: 733.3333740234375,
      y1: 125.33334350585938,
      x2: 539.3333740234375,
      y2: 225.6666717529297,
      typeName: "ArrowMarker",
      state: "select"
    },
    {
      arrowType: "end",
      strokeColor: "#7C3AED",
      strokeWidth: 3,
      strokeDasharray: "",
      x1: 736.6666870117188,
      y1: 153.33334350585938,
      x2: 518.6666870117188,
      y2: 343.0000915527344,
      typeName: "ArrowMarker",
      state: "select"
    },
    {
      color: "#EF4444",
      fontFamily: "Helvetica, Arial, sans-serif",
      padding: 5,
      text: "OK",
      left: 706.0000610351562,
      top: 125.00001525878906,
      width: 100,
      height: 30,
      rotationAngle: 0,
      visualTransformMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      containerTransformMatrix: { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
      typeName: "TextMarker",
      state: "select"
    }
  ]
};

var annotator = am5plugins_exporting.Annotator.new(root, {
  markerState: annotationData
});

var menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Annotate",
  callback: function () {
    this.close();
    annotator.toggle();
  }
});
```
