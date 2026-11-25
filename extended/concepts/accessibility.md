---
title: "Accessibility"
source: "https://docs.amcharts.com/v5/concepts/accessibility/"
scraped: "2026-11-25"
---

This tutorial will go through amCharts 5 built-in accessibility features as well as how to configure them.

## Focusing elements

### Focusable elements

Focusable elements in charts can be selected using TAB key.

Some elements are focusable by default, e.g. legend items, buttons, columns in series, hierarchy breadcrumb labels, etc.

Elements of a hidden series, or inside a hidden container, are not TAB stops.

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

Tell users about it in `ariaLabel`. Name the up and down arrow keys: in a screen reader's browse mode they step from item to item, while left and right read letter by letter.

TypeScript:

```ts
series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use up and down arrow keys to move through the columns"
});
```

JavaScript:

```js
series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use up and down arrow keys to move through the columns"
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

Example: [Column series with focusable columns](https://docs.amcharts.com/embeds/v5/column-series-with-focusable-columns/). Its code: get_example(path: "examples/docs-demos/column-series-with-focusable-columns").

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

### Setting a description

`ariaDescription` sets a longer description, which screen readers read after the `ariaLabel`. It works on any element and accepts data placeholders.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Quarterly expenses by department",
    ariaDescription: "Marketing spending doubled in the third quarter, while other departments stayed flat."
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Quarterly expenses by department",
    ariaDescription: "Marketing spending doubled in the third quarter, while other departments stayed flat."
  })
);
```

Use `ariaLabel` for a short name, and `ariaDescription` for what the reader should know beyond it: the main point of the chart, or how to use it.

> **Note:** `ariaDescription` is available since version 5.24.0.

## Data summary

With `ariaSummary: true`, the chart describes its data to screen readers. For each series it reads out:

* how many values it has;
* the first and last values (XY series);
* the highest and lowest values.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Daily sales by region",
    ariaSummary: true
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Daily sales by region",
    ariaSummary: true
  })
);
```

When the chart is focused, a screen reader reads its label, then the summary. For a chart with daily data and two series, "North" and "South":

```text
Daily sales by region. North. Values: 30. From Jan 01, 2025 (100) to Jan 30, 2025 (158). Highest: Jan 13, 2025 (174). Lowest: Jan 01, 2025 (100). South. Values: 30. From Jan 01, 2025 (80) to Jan 30, 2025 (51). Highest: Jan 01, 2025 (80). Lowest: Jan 30, 2025 (51).
```

Other chart types read like this:

| Chart | Summary                                                                     |
| ----- | --------------------------------------------------------------------------- |
| Pie   | Values: 3. Highest: Lithuania (501.9, 49.9%). Lowest: Estonia (201.1, 20%). |
| Flow  | Values: 2. Highest: X > Y (5). Lowest: X > Z (3).                           |

How the summary is put together:

* On a chart, each series' summary starts with the series name.
* Only XY series get "From … to …".
* Values are formatted with the value axis' `tooltipNumberFormat`, or its `numberFormat` if that isn't set.
* Dates are formatted with the date axis' tooltip format for its base interval: `tooltipDateFormats`, or `tooltipDateFormat` if that is set.

In English, the default date formats read like this:

| Base interval | Date read out        |
| ------------- | -------------------- |
| `day`         | Jan 01, 2025         |
| `hour`        | 14:00 - Jan 01, 2025 |
| `month`       | Jan, 2025            |
| `year`        | 2025                 |

The chart has to be `focusable` for this. The summary is the chart's `ariaDescription`, so an `ariaDescription` set in code is used instead.

Each series' summary also goes to its legend item, read after the item's name. The summary follows the data: it is worked out again when the data changes.

To leave a series out, set `ariaSummary: false` on it:

TypeScript:

```ts
trendSeries.set("ariaSummary", false);
```

JavaScript:

```js
trendSeries.set("ariaSummary", false);
```

Hierarchy, flow and word cloud series are not in a chart, so they take `ariaSummary` themselves, and have to be `focusable`:

TypeScript:

```ts
let series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    focusable: true,
    ariaLabel: "Sales by region",
    ariaSummary: true
  })
);
```

JavaScript:

```js
var series = root.container.children.push(
  am5hierarchy.Treemap.new(root, {
    valueField: "value",
    categoryField: "name",
    childDataField: "children",
    focusable: true,
    ariaLabel: "Sales by region",
    ariaSummary: true
  })
);
```

### Getting the summary as data

`series.getSummary()` returns the summary as an object, for use in your own text or page:

TypeScript:

```ts
let summary = series.getSummary();
if (summary) {
  console.log(summary.count, summary.highest.label, summary.highest.value);
}
```

JavaScript:

```js
var summary = series.getSummary();
if (summary) {
  console.log(summary.count, summary.highest.label, summary.highest.value);
}
```

| Property            | Contents                                          |
| ------------------- | ------------------------------------------------- |
| `count`             | Number of data items with a value.                |
| `highest`, `lowest` | The data items with the highest and lowest value. |
| `first`, `last`     | The first and last data items (XY series only).   |
| `text`              | The whole summary, as screen readers read it.     |

Each item has `label` (category, date or name), `value` (the number) and `text` (the value, formatted). `getSummary()` returns `undefined` if the series has no values.

The texts ("Values", "From … to …", "Highest", "Lowest") come from the chart's [locale](https://docs.amcharts.com/v5/concepts/locales/).

> **Note:** `ariaSummary` and `getSummary()` are available since version 5.24.0.

## Data table

With `ariaDataTable: true`, the chart gives screen readers its data as a table, hidden from view. It has a row for each category or date and a column for each series, so screen readers can move through it by row and column.

TypeScript:

```ts
let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    ariaLabel: "Monthly sales",
    ariaDataTable: true
  })
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    ariaLabel: "Monthly sales",
    ariaDataTable: true
  })
);
```

* The table is captioned with the chart's `ariaLabel`.
* Columns are headed with series names.
* Values and dates are formatted as in the [data summary](#data-summary). With grouped data, dates use the format of their group interval.
* The table doesn't need the chart to be focusable: screen readers find it as they read through the page.
* It is updated when the data changes.

With [data grouping](https://docs.amcharts.com/v5/charts/xy-chart/axes/date-axis/#dynamic-data-item-grouping) on a date axis, the table lists the groups shown when the chart is zoomed out all the way. It doesn't change with the zoom.

To leave a series out of the table, set `ariaDataTable: false` on it.

Hierarchy, flow and word cloud series are not in a chart, so they take `ariaDataTable` themselves and get a table of their own.

> **More info:** `ariaSummary` and `ariaDataTable` work well together: the summary gives the main points when the chart is focused, and the table has every value for those who want them.

> **Note:** `ariaDataTable` is available since version 5.24.0.

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

Charts of every type have the `"img"` role, read with the chart's `ariaLabel`. That includes stock and Gantt charts, and series used as the chart itself, such as Sankey, treemap or word cloud. A focusable chart needs no role set.

Focusable data elements and bullets have the `"img"` role too, such as columns of a column series, and:

* pie, funnel, pyramid and pictorial slices;
* radar slices;
* hierarchy nodes (leaves only);
* flow nodes and links;
* word cloud words;
* Venn areas;
* timeline curve slices;
* map polygons and lines;
* Gantt bars and milestones.

`"img"` is the role whose name all major screen readers read out. JAWS, for one, reads nothing for a focused `"figure"`, `"group"` or `"region"`.

A focusable element that toggles a state when clicked (one with `toggleKey`), such as a pie slice that pulls out, is exposed as a toggle button instead, so screen readers can tell whether it is on or off.

Buttons, including hierarchy breadcrumbs, have the `"button"` role. While a [Gantt chart](https://docs.amcharts.com/v5/charts/gantt/#accessibility) is editable, its bars, milestones and grips are sliders.

Any other focusable element with no role of its own, such as a `Container` made focusable by hand, is read as `"img"`.

To give an element another meaning, use its `role` setting. For example, columns that do something when clicked:

TypeScript:

```ts
series.columns.template.set("role", "button");
```

JavaScript:

```js
series.columns.template.set("role", "button");
```

> **Note:** The `"img"` defaults are available since version 5.24.0. Before that, data elements had the `"figure"` role and charts had none.

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
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}"
});
```

JavaScript:

```js
columnSeries.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}"
});
```

Now each column will be TAB-selectable, and will trigger reader text to read out series name, category, and value.

Best of all, `ariaLabel` text is compatible with [data placeholders](https://docs.amcharts.com/v5/concepts/formatters/data-placeholders/), so they will be replaced with real dynamic data.

Example: [Column series with focusable columns](https://docs.amcharts.com/embeds/v5/column-series-with-focusable-columns-2/). Its code: get_example(path: "examples/docs-demos/column-series-with-focusable-columns-2").

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
      ariaLabel: "Series: {name}. Date: {valueX.formatDate()}. Sales: {valueY}"
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
      ariaLabel: "Series: {name}. Date: {valueX.formatDate()}. Sales: {valueY}"
    })
  });
});
```

If the bullet's sprite has no role, it gets `"img"`. A sprite that has its own role, such as a button, keeps it.

Example: [Line series with focusable bullets](https://docs.amcharts.com/embeds/v5/line-series-with-focusable-bullets/). Its code: get_example(path: "examples/docs-demos/line-series-with-focusable-bullets").

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

Example: [Keyboard-controllable XY cursor](https://docs.amcharts.com/embeds/v5/keyboard-controllable-xy-cursor/). Its code: get_example(path: "examples/docs-demos/keyboard-controllable-xy-cursor").

## Maps

When a map is zoomed, screen readers announce the new zoom level once zooming stops.

Focusable map objects (polygons, points, lines) that are panned or zoomed out of view are skipped by TAB, so the focus outline never ends up outside the chart. They become TAB stops again once at least partly in view. Screen readers can still reach all of them.

Objects left out with a series' `include` or `exclude` settings are not focusable at all.

## Keyboard interactions

Here's a summary of keys that work on focused chart elements:

| Key                | Action                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| TAB / SHIFT+TAB    | Moves focus to the next / previous element or group.                                                                  |
| Arrow keys         | Drag a draggable element, or move between members of a group. Up and down also work in a screen reader's browse mode. |
| SHIFT + arrow keys | Drag a draggable element that is in a group.                                                                          |
| ENTER              | Clicks the focused element.                                                                                           |
| SPACE              | Clicks the focused element, if it acts as a button (see below).                                                       |
| ESC                | Hides the focused element's tooltip and ends a keyboard drag. Focus stays on the element.                             |

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

> **More info:** Some controls have their own keyboard support: [export menu](https://docs.amcharts.com/v5/concepts/exporting/export-menu/#accessibility), [modal popups](https://docs.amcharts.com/v5/concepts/common-elements/modal-popups/), [stock toolbar](https://docs.amcharts.com/v5/charts/stock/toolbar/#accessibility), [Gantt chart](https://docs.amcharts.com/v5/charts/gantt/#accessibility) and [color picker](https://docs.amcharts.com/v5/tutorials/using-the-color-picker/#accessibility).

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

## Testing with screen readers

Charts are tested with NVDA, JAWS, Narrator and VoiceOver on macOS. Here's how they behave, and what to check.

### Browse mode and focus mode

* NVDA and JAWS start in browse mode, where they keep the arrow keys for themselves. Up and down step from item to item and read each one; left and right read the name letter by letter. This is why labels should name the up and down arrow keys.
* In focus mode, all arrow keys reach the chart. Switch to it with NVDA+SPACE (NVDA), INSERT+Z (JAWS) or Narrator key+SPACE (Narrator).
* Sliders, such as scrollbar grips, switch NVDA and JAWS to focus mode by themselves: left and right change the value, and the new value is read.
* Dragging with SHIFT and arrow keys needs focus mode: in browse mode, the screen reader uses SHIFT+arrows to select text.
* VoiceOver on macOS has no browse mode: arrow keys reach the chart directly. See the note on [Quick Nav](#grouping-focusable-elements).

### Things to know

* JAWS reads nothing for a focused element with the `"figure"`, `"group"`, `"region"` or `"graphics-document"` role. Keep the default `"img"` role on focusable elements, or use another role that JAWS reads.
* Descriptions (`ariaDescription`, `ariaSummary`) are read after the name.
* Toggling items, such as pie slices, are read as toggle buttons, with their state: "pressed" or "not pressed" (VoiceOver says "selected").
* There's no single key to skip past a chart's elements: TAB stops at the chart, then once per group and per scrollbar grip. NVDA's comma key ("move past end of container") jumps past them; JAWS has no equivalent.
* VoiceOver reads "To begin interacting with the contents of this image…" on a chart that has an `ariaDescription`. It does no harm.

### Test steps

1. TAB to the chart: its name and description are read.
2. TAB again: the first item is read.
3. Up and down arrow keys: one item per press.
4. ENTER on a toggling item: its new state is read.
5. TAB to a slider: left and right arrow keys change the value, which is read.
6. Repeat in focus mode.

Test NVDA and JAWS with Chrome or Edge, VoiceOver with Safari and Chrome, and Narrator with Edge.

## Related tutorials

* [Focusable pie slices with perfect outline](https://docs.amcharts.com/v5/tutorials/focusable-pie-slices-with-perfect-outline/)
