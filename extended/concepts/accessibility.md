---
title: "Accessibility"
source: "https://docs.amcharts.com/v5/concepts/accessibility/"
scraped: "2026-11-16"
---

This tutorial will go through amCharts 5 built-in accessibility features as well as how to configure them.

## Focusing elements

### Focusable elements

Focusable elements in charts can be selected using TAB key.

Some elements are focusable by default, e.g. legend items, buttons, columns in series, etc.

Whenever element is focused, it will show a contrasting outline around it. It will also trigger screen reader, if it also has such information attached to it.

### Enabling or disabling

We can control if element is focusable via its `focusable` setting.

Elements that make sense to be focusable are so by default. For example legend items and all buttons.

If for example we would like to disable focusing, we can do so by setting `focusable` to `false`:

TypeScript:

```ts
scrollbar.startGrip.set("focusable", false);
scrollbar.endGrip.set("focusable", false);

columnSeries.columns.template.set("focusable", false);
```

JavaScript:

```js
scrollbar.startGrip.set("focusable", false);
scrollbar.endGrip.set("focusable", false);

columnSeries.columns.template.set("focusable", false);
```

Or we can enable focusing on elements that are usually not so. For example, we could make the whole chart focusable so it is identified by a screen reader when selected:

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Chart: Quarterly expenses by department"
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Chart: Quarterly expenses by department"
  })
);
```

Series elements such as `PieSeries` slices or map polygons are made focusable the same way:

TypeScript:

```ts
series.slices.template.setAll({
  focusable: true,
  ariaLabel: "Slice; {category} {value}"
});
```

JavaScript:

```js
series.slices.template.setAll({
  focusable: true,
  ariaLabel: "Slice; {category} {value}"
});
```

> **Note:** Before version 5.21.0, slices and polygons also needed `isMeasured: true` to be focused and outlined correctly. It is no longer needed.

### Tab index

The order in which document elements are focused with a TAB key is determined by their "tab index".

If tab index is not set, the elements are selected in the same order as they appear in document's DOM tree.

amCharts 5 offers two levels of such ordering:

* Root element's tab index within the document.
* Order of the chart elements within the chart.

#### Root element tab index

Tab index of the root element is set via its `tabindex` property:

TypeScript:

```ts
root.tabindex = 10;
```

JavaScript:

```js
root.tabindex = 10;
```

If set like the above, the chart's focusable elements will be selected after any other element on the page that has its own tab index set between 1 and 9. Note that elements with no tab index set (or tab index of 0) are focused last by the browser, so they will come after the chart, not before it.

#### Chart element internal tab index

While root element's `tabindex` will apply to all focusable elements in chart, we can control the actual order of such elements.

For that, we can use element's `tabindexOrder` setting.

It works the same way as `tabindex`: the larger the number, the further up the selection list the element will be.

The following example shows how we can alter the order of selection for columns on two series, as well as scrollbar grips:

TypeScript:

```ts
series1.columns.template.set("tabindexOrder", 20);
series2.columns.template.set("tabindexOrder", 10);
scrollbar.startGrip.set("tabindexOrder", 100);
scrollbar.endGrip.set("tabindexOrder", 100);
```

JavaScript:

```js
series1.columns.template.set("tabindexOrder", 20);
series2.columns.template.set("tabindexOrder", 10);
scrollbar.startGrip.set("tabindexOrder", 100);
scrollbar.endGrip.set("tabindexOrder", 100);
```

The above will make columns of "series2" focus first, then TAB will jump to "series1", and only then to grips of the scrollbar.

### Grouping focusable elements

By default, chart will select each focusable element in chart with a TAB key.

If the chart has many focusable elements, it might be quite tedious to get to the desired element, or tab through the chart to other elements on the page.

This is where grouped focus elements come in.

To group elements, besides setting `focusable`, we can also set `focusableGroup`, which can be any text or number.

A group is a single TAB stop. TAB lands on the member that was focused last (or the first one, if none was), and arrow keys move between the members.

Naturally, `ariaLabel` must contain additional instructions, exposing such capability.

TypeScript:

```ts
series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use arrow keys to select other columns in this series"
});
```

JavaScript:

```js
series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use arrow keys to select other columns in this series"
});
```

If group members can also be dragged, e.g. nodes in a [flow](https://docs.amcharts.com/v5/charts/flow-charts/) or [hierarchy](https://docs.amcharts.com/v5/charts/hierarchy/) chart, arrow keys still move between them. To drag the focused member, hold SHIFT while pressing arrow keys.

> **Important:** Apple introduced a "Quick Nav" feature in its VoiceOver assistive utility in macOS 13. It will prevent navigation of elements within the group, and make the arrow keys work as regular TAB. To disable this feature press the left and right arrow keys simultaneously. [More info](https://support.apple.com/guide/voiceover/with-quick-nav-vo27943/mac).

### Simulating hover on focus

It's also possible to simulate hover on a focus element, e.g. displaying tooltip, applying hover state, etc.

To enable, use `hoverOnFocus` setting:

TypeScript:

```ts
series.columns.template.setAll({
  focusable: true,
  hoverOnFocus: true,
  tooltipText: "[bold]{name}[/]\n{categoryX}: {valueY}",
  tooltipY: 0
});
```

JavaScript:

```js
series.columns.template.setAll({
  focusable: true,
  hoverOnFocus: true,
  tooltipText: "[bold]{name}[/]\n{categoryX}: {valueY}",
  tooltipY: 0
});
```

A tooltip shown this way is also read out by screen readers, unless its text repeats the element's `ariaLabel`. Tooltips shown by mouse hover are not read out.

Pressing ESC hides the tooltip, while the element stays focused.

Example: [Column series with focusable columns](https://docs.amcharts.com/embeds/v5/column-series-with-focusable-columns/)

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
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series1.data.setAll(data);

series1.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure",
  hoverOnFocus: true,
  tooltipText: "[bold]{name}[/]\n{categoryX}: {valueY}",
  tooltipY: 0
});

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

series2.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure",
  hoverOnFocus: true,
  tooltipText: "[bold]{name}[/]\n{categoryX}: {valueY}",
  tooltipY: 0
});

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

### Focus outline margin

Normally, the outline of the focused element will be offset from it by 2 pixels.

We can control that using Root element's `focusPadding` setting:

TypeScript:

```ts
let root = am5.Root.new("chartdiv", {
  focusPadding: 0
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  focusPadding: 0
});
```

## Screen reader

### How it works

When enabled, screen reader software - NV Access, MS Windows Narrator, or similar - will automatically read out textual information attached to element when it's focused.

The narration text will mostly be supplied via `aria-label` attribute of the DOM element corresponding to focusable element.

Some elements have their `aria-label` attribute pre-filled. E.g.: zoom out button will have it set to `"Zoom Out"`:

```html
<div role="button" aria-label="Zoom Out" tabindex="0" style="position: absolute; pointer-events: none; top: 24px; left: 649px; width: 40px; height: 40px;"></div>
```

This will cause the text to be read out when zoom out button is focused via TAB key.

Similarly, legend items will also have additional information attached to them, like the label contents as well as relevant interaction instructions:

```html
<div tabindex="0" aria-label="North America; Press ENTER to toggle" aria-checked="true" style="position: absolute; pointer-events: none; top: 1102.6px; left: 196.023px; width: 194.148px; height: 33.2px;"></div>
```

Some elements, e.g. columns, cannot be automatically described, and thus do not have any default label set. It's up to us - application developer - to determine what kind of information is relevant to be displayed on focus - much like what information to be displayed in a hover tooltip.

### Setting reader text

To set reader text, we can use `ariaLabel` setting for the element.

TypeScript:

```ts
scrollbar.startGrip.set("ariaLabel", "Use left or right buttons to set start of zoom");
scrollbar.endGrip.set("ariaLabel", "Use left or right buttons to set end of zoom");
```

JavaScript:

```js
scrollbar.startGrip.set("ariaLabel", "Use left or right buttons to set start of zoom");
scrollbar.endGrip.set("ariaLabel", "Use left or right buttons to set end of zoom");
```

`ariaLabel` content also accepts data placeholders - a way to replace blocks of text with dynamic values.

TypeScript:

```ts
series.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}; Category: {categoryX}; Value: {valueY}"
});
```

JavaScript:

```js
series.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}; Category: {categoryX}; Value: {valueY}"
});
```

The above code will make columns in series focusable, as well as add reader text to each one with its own dynamic values.

> **More info:** For more information on binding data to text, refer to "[Data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/)" tutorial.

## Accessibility of Root element

We can also make the Root (or more like its inner `<div>`) element accessible using three additional settings in Root: `focusable`, `ariaLabel`, and `role`.

TypeScript:

```ts
let root = am5.Root.new("chartdiv", {
  focusable: true,
  ariaLabel: "Revenue chart",
  role: "document"
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  focusable: true,
  ariaLabel: "Revenue chart",
  role: "document"
});
```

## High contrast mode

When the system is in a forced colors mode, such as Windows High Contrast, charts follow the system colors: labels, grid, axes, and buttons take the colors the user has chosen, so they stay visible. Series colors are kept, so the data can still be told apart.

This works automatically. To keep the chart's own colors instead, set Root's `forcedColors` setting to `false`:

TypeScript:

```ts
let root = am5.Root.new("chartdiv", {
  forcedColors: false
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  forcedColors: false
});
```

> **Note:** High contrast support is available since version 5.21.0.

## Roles

In order to help assistive technologies, amCharts automatically assigns roles to some of the interactive elements.

It comes in a form of a `role` attribute of the related DOM element.

For example, a grip button of a scrollbar will have `"slider"` role assigned, indicating that this element can be used to adjust position/zoom.

Similarly, a focusable column in a column series will have a role of `"figure"`.

To change or set a role on specific element, we can use its `role` setting.

TypeScript:

```ts
series.columns.template.set("role", "img");
```

JavaScript:

```js
series.columns.template.set("role", "img");
```

The above will change role of columns in series to `"img"`.

A focusable element that toggles a state when clicked (one with `toggleKey`), such as a pie slice that pulls out, is exposed as a toggle button, so screen readers can tell whether it is on or off.

> **More info:** For a full list of available ARIA roles, refer to [this Mozilla article](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles).

## Accessibility of series

### Enabling series accessibility

Series elements (e.g. columns in a column series, or slices in pie series) are not enabled for accessibility.

To enable it, we need to:

* Make them focusable using `focusable` setting.
* Provide reader text via `ariaLabel` setting.
* Optionally, set role via `role` setting.

We set those just like any other setting: via templates:

TypeScript:

```ts
columnSeries.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});
```

JavaScript:

```js
columnSeries.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});
```

Now each column will be TAB-selectable, and will trigger reader text to read out series name, category, and value.

Best of all, `ariaLabel` text is compatible with [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/), so they will be replaced with real dynamic data.

Example: [Column series with focusable columns](https://docs.amcharts.com/embeds/v5/column-series-with-focusable-columns-2/)

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
var series1 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {})
  })
);

series1.data.setAll(data);

series1.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});

var series2 = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "category"
  })
);

series2.data.setAll(data);

series2.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});

// Add legend
var legend = chart.children.push(am5.Legend.new(root, {}));
legend.data.setAll(chart.series.values);
```

> **Note:** With series, that usually have quite a few elements, it makes sense to enable [focusable element grouping](https://docs.amcharts.com/v5/concepts/accessibility/#grouping-focusable-elements).

### Bullets

It works the same way for series bullets:

TypeScript:

```ts
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      focusable: true,
      ariaLabel: "Series: {name}. Date: {valueX.formatDate()}. Sales: {valueY}",
      role: "figure"
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,
      fill: series.get("fill"),
      focusable: true,
      ariaLabel: "Series: {name}. Date: {valueX.formatDate()}. Sales: {valueY}",
      role: "figure"
    })
  });
});
```

If the bullet's sprite has no role, it gets `"figure"`. A sprite that has its own role, such as a button, keeps it.

Example: [Line series with focusable bullets](https://docs.amcharts.com/embeds/v5/line-series-with-focusable-bullets/)

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
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill"),
        focusable: true,
        ariaLabel: "Series: {name}. Date: {valueX.formatDate()}. Sales: {valueY}",
        role: "figure"
      })
    });
  });

  series.strokes.template.set("strokeWidth", 2);

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

## Tooltips

If we would like tooltips to read out its content, we can set their `readerAnnounce: true` setting.

If it's set, the reader will read its contents when:

* It's shown.
* Its data item changes.

We can also specify different content for the reader, using `labelAriaLabel` setting.

TypeScript:

```ts
let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
      readerAnnounce: true,
      labelAriaLabel: "Value: {valueY}"
    })
  })
);
```

JavaScript:

```js
var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
      readerAnnounce: true,
      labelAriaLabel: "Value: {valueY}"
    })
  })
);
```

Tooltips shown for a focused element (with `hoverOnFocus`) are read out without this setting. See "[Simulating hover on focus](#simulating-hover-on-focus)".

## Legend

Chart's legend has own fuzzy logic of applying `ariaLabel` content to its togglable items. I.e. it uses label content + "Press ENTER to toggle" text.

The only way to override it, is via an adapter:

TypeScript:

```ts
legend.itemContainers.template.adapters.add("ariaLabel", function(value, target) {
  let label = target.dataItem.get("label");
  return "Click: " + label.get("text");
});
```

JavaScript:

```js
legend.itemContainers.template.adapters.add("ariaLabel", function(value, target) {
  var label = target.dataItem.get("label");
  return "Click: " + label.get("text");
});
```

## XY Cursor

It's possible to enable control of chart's cursor using direction keys.

To do that, simply set `focusable: true` on cursor lines you need to be controlled.

TypeScript:

```ts
cursor.lineX.set("focusable", true);
cursor.lineY.set("focusable", true);
```

JavaScript:

```js
cursor.lineX.set("focusable", true);
cursor.lineY.set("focusable", true);
```

Example: [Keyboard-controllable XY cursor](https://docs.amcharts.com/embeds/v5/keyboard-controllable-xy-cursor/)

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
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

series.data.setAll(data);

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

cursor.lineX.set("focusable", true);
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
```

## Maps

When a map is zoomed, screen readers announce the new zoom level once zooming stops.

Focusable map objects (polygons, points, lines) that are panned or zoomed out of view are skipped by TAB, so the focus outline never ends up outside the chart. They become TAB stops again once at least partly in view. Screen readers can still reach all of them.

Objects left out with a series' `include` or `exclude` settings are not focusable at all.

## Keyboard interactions

Here's a summary of keys that work on focused chart elements:

| Key                | Action                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- |
| TAB / SHIFT+TAB    | Moves focus to the next / previous element or group.                                      |
| Arrow keys         | Drag a draggable element, or move between members of a group.                             |
| SHIFT + arrow keys | Drag a draggable element that is in a group.                                              |
| ENTER              | Clicks the focused element.                                                               |
| SPACE              | Clicks the focused element, if it acts as a button (see below).                           |
| ESC                | Hides the focused element's tooltip and ends a keyboard drag. Focus stays on the element. |

There are two types of objects on charts that can be interacted with with mouse/touch as well as with keyboard:

* Draggable elements: e.g. scrollbar grips.
* Clickable elements: e.g. legend items, zoom buttons, etc.

### Draggable elements

All draggable elements on chart can also be moved using keyboard arrow keys. If the element is in a [focusable group](#grouping-focusable-elements), hold SHIFT while pressing arrow keys.

Some of them have reader text attached to read out instructions or current value when element is focused using TAB key.

For example, scrollbar's left grip will read out the value of the position it's currently at.

We can change that to drag instructions using `ariaLabel` setting:

TypeScript:

```ts
scrollbar.startGrip.setAll({
  ariaLabel: root.language.translate("Use left and right arrows to move left selection")
});
```

JavaScript:

```js
scrollbar.startGrip.setAll({
  ariaLabel: root.language.translate("Use left and right arrows to move left selection")
});
```

### Togglable elements

Using TAB key, when we focus an element that has `"click"` event attached to it, we can press ENTER to actually trigger that event.

SPACE does the same for elements that act as buttons: those with a `role` of `"button"`, `"checkbox"`, `"switch"`, `"radio"`, `"tab"`, `"option"`, or one of the menu item roles. This is how such controls work elsewhere on a page.

For example, focusing on a legend item and pressing ENTER will toggle related series or item.

Some built-in controls have also default reader text with toggling instructions pre-set.

E.g. the legend items we already mentioned: they will read out "Press ENTER to toggle".

Toggles also tell screen readers their current state. A button with `toggleKey` is read out as pressed or not pressed. For elements that show or hide other content, the `ariaExpanded` setting tells whether it is expanded. It is set automatically on [Gantt](https://docs.amcharts.com/v5/charts/gantt/) tasks with subtasks and on hierarchy nodes with children.

> **More info:** Some controls built with HTML have their own keyboard support: [export menu](https://docs.amcharts.com/v5/concepts/exporting/export-menu/#accessibility), [modal popups](https://docs.amcharts.com/v5/concepts/common-elements/modal-popups/), and [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/#accessibility).

## Events

To track when focusable element is selected or unselected we can use its `focus` and `blur` events:

TypeScript:

```ts
series.slices.template.events.on("focus", function(ev) {
  // Slice focused
  console.log(ev.target);
});

series.slices.template.events.on("blur", function(ev) {
  // Slice no longer focused
  console.log(ev.target);
});
```

JavaScript:

```js
series.slices.template.events.on("focus", function(ev) {
  // Slice focused
  console.log(ev.target);
});

series.slices.template.events.on("blur", function(ev) {
  // Slice no longer focused
  console.log(ev.target);
});
```

## Related tutorials

* [Focusable pie slices with perfect outline](https://docs.amcharts.com/v5/tutorials/focusable-pie-slices-with-perfect-outline/)
