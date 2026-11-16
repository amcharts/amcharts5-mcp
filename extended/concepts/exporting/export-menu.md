---
title: "Export menu"
source: "https://docs.amcharts.com/v5/concepts/exporting/export-menu/"
scraped: "2026-11-16"
---

> This tutorial looks at configuration options for Exporting plugin menu.

This tutorial looks at configuration options for [Exporting](https://docs.amcharts.com/v5/concepts/exporting/) plugin menu.

## Enabling

To enable export menu, we need to instantiate an `ExportingMenu` object and assign it to `menu` setting of the exporting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {})
});
```

## Position

Export menu is placed in upper-right corner of the chart by default.

To change it, we can use menu's `align` and `valign` settings to set horizontal and vertical alignment respectively.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    align: "left",
    valign: "bottom"
  })
});
```

The above will place menu in the lower-left corner.

## External container

We can also place the whole menu in an external container.

For that we need to set menu's setting `container` to a reference to the DOM element, we want to use as a container.

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  })
});
```

Example: [Exporting menu in external container](https://docs.amcharts.com/embeds/v5/exporting-menu-in-external-container/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

HTML:

```html
<div id="exportdiv"></div>
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#exportdiv {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eee;
}

#chartdiv {
  width: 100%;
  height: 400px;
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
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 32,
        height: 32,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    container: document.getElementById("exportdiv")
  }),

  dataSource: data
});

exporting.events.on("dataprocessed", function (ev) {
  for (var i = 0; i < ev.data.length; i++) {
    ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
  }
});
```

## Appearance

The exporting menu is built using HTML tags.

Each tag is has a class name attached to it, so it can be targeted via CSS.

The following table lists some of the most common CSS queries that can be used to target menu elements:

| CSS query                     | Refers to                                                              |
| ----------------------------- | ---------------------------------------------------------------------- |
| `a.am5exporting-icon`         | Menu toggle button.                                                    |
| `.am5exporting-list`          | A `<ul>` element with menu items.                                      |
| `.am5exporting-item`          | A `<li>` element of the menu item.                                     |
| `.am5exporting-item a`        | A `<a>` element of the menu item (child of the `<li>`)                 |
| `.am5exporting-menu-open`     | A `<div>` element with all menu items, when menu is open.              |
| `.am5exporting-align-left`    | A main `<div>` element when setting `align: "left"` is set.            |
| `.am5exporting-align-right`   | A main `<div>` element when setting `align: "right"` is set (default). |
| `.am5exporting-valign-top`    | A main `<div>` element when setting `valign: "top"` is set (default).  |
| `.am5exporting-valign-bottom` | A main `<div>` element when setting `valign: "bottom"` is set.         |

Menu will automatically load a default stylesheets to make the menu usable without any further configuration.

We can override all or some of the default CSS:

```css
a.am5exporting-icon,
.am5exporting-list {
  background: #C2FFE2;
}

a.am5exporting-icon:hover,
.am5exporting-menu-open a.am5exporting-icon,
.am5exporting-item a:hover {
  background: #85FFC4;
}
```

Example: [Exporting data with custom menu](https://docs.amcharts.com/embeds/v5/exporting-data-with-custom-menu/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

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
  height: 400px;
}

a.am5exporting-icon,
.am5exporting-list {
  background: #c2ffe2;
}

a.am5exporting-icon:hover,
.am5exporting-menu-open a.am5exporting-icon,
.am5exporting-item a:hover {
  background: #85ffc4;
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
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 32,
        height: 32,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

exporting.events.on("dataprocessed", function (ev) {
  for (var i = 0; i < ev.data.length; i++) {
    ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
  }
});
```

If we'd rather menu would not load any default CSS, allowing us to configure it from scratch, we can set menu's `useDefaultCSS` to `false`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    useDefaultCSS: false
  })
});
```

## Behavior

### Auto-closing

Normally, when user clicks on menu item, that invokes some export operation, the legend auto-closes.

If we'd rather it remained open until toggle button is clicked again, we can set menu's `autoClose` setting to `false`:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    autoClose: false
  })
});
```

### Deactivating underlying chart

Menu will also disable all interactivity on the underlying chart when legend is hovered, so that interactive elements like cursor would not be active.

To disable this functionality, use `deactivateRoot` setting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    deactivateRoot: false
  })
});
```

## Customizing menu items

### Adding custom items

We can add custom menu items to menu as well, by pushing item objects into `items` array.

Menu item object must follow `IExportingMenuItem` interface.

The object should at the very least have `type` key, with one of the possible values:

* `"format"` - export to specific format. If this type is used, `format` key must also be set (`"png"`, `"jpg"`, `"svg"`, `"pdf"`, `"xlsx"`, `"csv"`, `"json"`, `"html"`, `"pdfdata"`, `"print"`).
* `"separator"` - a separator line.
* `"custom"` - a custom function will be called when clicked. `callback` must also be set if this type is used.

Additionally, we will probably want to set `label` property, so that item is labelled:

TypeScript:

```ts
let menuitems = exporting.get("menu").get("items");

menuitems.push({
  type: "separator"
});

menuitems.push({
  type: "custom",
  label: "Do something",
  callback: function() {
    alert("Did something!")
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
  label: "Do something",
  callback: function() {
    alert("Did something!")
  }
});
```

### Completely custom menu

We can build a completely custom menu by overriding `items` altogether, e.g.:

TypeScript:

```ts
exporting.get("menu").set("items", [{
  type: "format",
  format: "png",
  label: "Export image"
}, {
  type: "format",
  format: "csv",
  label: "Export CSV"
}, {
  type: "separator"
}, {
  type: "format",
  format: "print",
  label: "Print"
}]);
```

JavaScript:

```js
exporting.get("menu").set("items", [{
  type: "format",
  format: "png",
  label: "Export image"
}, {
  type: "format",
  format: "csv",
  label: "Export CSV"
}, {
  type: "separator"
}, {
  type: "format",
  format: "print",
  label: "Print"
}]);
```

Example: [Exporting data with custom menu](https://docs.amcharts.com/embeds/v5/exporting-data-with-custom-menu-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/radar.js, https://cdn.amcharts.com/lib/5/themes/Animated.js, https://cdn.amcharts.com/lib/5/plugins/exporting.js

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
  height: 400px;
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
    wheelY: "zoomX"
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 100,
    value2: 220
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 320,
    value2: 300
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 216,
    value2: 120
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 150,
    value2: 190
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 156,
    value2: 190
  },
  {
    date: new Date(2021, 0, 6).getTime(),
    value: 199,
    value2: 120
  },
  {
    date: new Date(2021, 0, 7).getTime(),
    value: 114,
    value2: 300
  },
  {
    date: new Date(2021, 0, 8).getTime(),
    value: 269,
    value2: 290
  },
  {
    date: new Date(2021, 0, 9).getTime(),
    value: 190,
    value2: 290
  },
  {
    date: new Date(2021, 0, 10).getTime(),
    value: 380,
    value2: 170
  },
  {
    date: new Date(2021, 0, 11).getTime(),
    value: 250,
    value2: 200
  },
  {
    date: new Date(2021, 0, 12).getTime(),
    value: 110,
    value2: 210
  },
  {
    date: new Date(2021, 0, 13).getTime(),
    value: 185,
    value2: 85
  },
  {
    date: new Date(2021, 0, 14).getTime(),
    value: 105,
    value2: 244
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {
      minGridDistance: 30
    })
  })
);

// Create X-Axis
let xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20,
      cellStartLocation: 0.2,
      cellEndLocation: 0.8
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
      tooltip: am5.Tooltip.new(root, {}),
      clustered: true
    })
  );

  series.strokes.template.setAll({
    strokeWidth: 2
  });

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value");
createSeries("Series #2", "value2");

// Create axis ranges
function createRange(value, bullet) {
  var rangeDataItem = xAxis.makeDataItem({
    value: value
  });

  var range = xAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("grid").set("visible", false);

  rangeDataItem.set(
    "bullet",
    am5xy.AxisBullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 32,
        height: 32,
        centerX: am5.percent(0),
        centerY: am5.percent(100),
        src: bullet
      })
    })
  );
}

createRange(new Date(2021, 0, 3).getTime(), "https://docs.amcharts.com/assets/icon_flag_red.svg");
createRange(new Date(2021, 0, 10).getTime(), "https://docs.amcharts.com/assets/icon_flag_green.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX",
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

var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  dataSource: data
});

exporting.events.on("dataprocessed", function (ev) {
  for (var i = 0; i < ev.data.length; i++) {
    ev.data[i].sum = ev.data[i].value + ev.data[i].value2;
  }
});

exporting.get("menu").set("items", [
  {
    type: "format",
    format: "csv",
    label: "Export image"
  },
  {
    type: "format",
    format: "csv",
    label: "Export CSV"
  },
  {
    type: "separator"
  },
  {
    type: "format",
    format: "print",
    label: "Print"
  }
]);
```

## Accessibility

The menu can be used with a keyboard:

| Key              | Action                                     |
| ---------------- | ------------------------------------------ |
| TAB              | Focuses the menu button.                   |
| ENTER            | Opens the menu, or picks the focused item. |
| Up / Down arrows | Move between items.                        |
| ESC              | Closes the menu.                           |

When the menu closes, focus goes back to the menu button.

Screen readers announce the button as a menu button, along with whether the menu is open or closed, and the items as menu items.

By default, the button is read out as "Export; Press ENTER to open". To change it, use menu's `ariaLabel` setting:

TypeScript:

```ts
let exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    ariaLabel: "Download or print the chart"
  })
});
```

JavaScript:

```js
var exporting = am5plugins_exporting.Exporting.new(root, {
  menu: am5plugins_exporting.ExportingMenu.new(root, {
    ariaLabel: "Download or print the chart"
  })
});
```

## Menu API

Menu can be opened or closed programmatically using its methods `open()`, `close()`, and `toggle()`:

TypeScript:

```ts
exporting.get("menu").toggle();
```

JavaScript:

```js
exporting.get("menu").toggle();
```
