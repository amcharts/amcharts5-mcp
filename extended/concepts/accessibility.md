---
title: "Accessibility"
source: "https://www.amcharts.com/docs/v5/concepts/accessibility/"
scraped: "2026-03-15"
---

This tutorial will go through amCharts 5 built-in accessibility features as well as how to configure them.

## Focusing elements

### Focusable elements

Focusable elements in charts can be selected using TAB key.

Some elements are focusable by default, e.g. legend items, buttons, columns in series, etc.

Whenever element is focused, it will show a contrasting outline around it. It will also trigger screen reader, if it also has such information attached to it.

### Enabling or disabling

We can control if element is focusable via its `focusable` setting.

Elements that make sense to be focusable are so y default. For example legend items and all buttons.

If for example we would like to disable focusing, we can do so by setting `focusable` to `false`:

scrollbar.stratGrip.set("focusable", false);
scrollbar.endGrip.set("focusable", false);

columnSeries.columns.template.set("focusable", false);

scrollbar.stratGrip.set("focusable", false);
scrollbar.endGrip.set("focusable", false);

columnSeries.columns.template.set("focusable", false);

Or we can enable focusing on elements that are usually not so. For example, we could make the whole chart focusable so it is identified by a screen reader when selected:

let chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Chart: Quarterly expenses by department"
  })
);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    focusable: true,
    ariaLabel: "Chart: Quarterly expenses by department"
  })
);

Some series elements are not measured by default and would not place the outline correctly, e.g. `PieSeries` slices.

For outline to work correctly we will also need to enable measuring of such elements:

series.slices.template.setAll({
  focusable: true,
  isMeasured: true,
  ariaLabel: "Slice; {category} {value}"
});

series.slices.template.setAll({
  focusable: true,
  isMeasured: true,
  ariaLabel: "Slice; {category} {value}"
});

### Tab index

The order in which document elements are focused with a TAB key is determined by their "tab index".

If tab index is not set, the elements are selected in the same order as they appear in document's DOM tree.

amCharts 5 offers two levels of such ordering:

-   Root element's tab index within the document.
-   Order of the chart elements within the chart.

#### Root element tab index

Tab index of the root element is set via its `tabindex` poperty:

root.tabindex = 10;

root.tabindex = 10;

If set like the above, the chart's focusable elements will be selected after any other element on the chart that has its own tab index set to 9 or lower, or does not have any tab index set (which works the same way as if it was set to zero).

#### Chart element internal tab index

While root element's `tabindex` will apply to all focusable elements in chart, we can control the actual order of such elements.

For that, we can use element's `tabindexOrder` setting.

It works the same way as `tabindex`: the larger the number, the further up the selection list the element will be.

The following example shows how we can alter the order of selection for columns on two series, as well as scrollbar grips:

series1.columns.template.set("tabindexOrder", 20);
series2.columns.template.set("tabindexOrder", 10);
scrollbar.startGrip.set("tabindexOrder", 100);
scrollbar.endGrip.set("tabindexOrder", 100);

series1.columns.template.set("tabindexOrder", 20);
series2.columns.template.set("tabindexOrder", 10);
scrollbar.startGrip.set("tabindexOrder", 100);
scrollbar.endGrip.set("tabindexOrder", 100);

The above will make columns of "series2" focus first, then TAB will jump to "series1", and only then to grips of the scrollbar.

### Grouping focusable elements

By default, chart will select each focusable element in chart with a TAB key.

If the chart has many focusable elements, it might be quite tedious to get to the desired element, or tab through the chart to other elements on the page.

This is where grouped focus elements come in.

To group elements, besides setting `focusable`, we can also set `focusableGroup`, which can be any text or number.

When groups are enabled, only the first element in the group is selected using TAB key, whereas other elements are selectable using arrow keys.

Naturally, `ariaLabel` must contain additional instructions, exposing such capability.

series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use arrow keys to select other columns in this series"
});

series.columns.template.setAll({
  focusable: true,
  focusableGroup: "Series #1",
  ariaLabel: "{name}. {categoryX} {valueY}. Use arrow keys to select other columns in this series"
});

IMPORTANTApple introduced a "Quick Nav" feature in its Voiceover assistive utility in macOS 13. It will prevent navigation of elements within the group, and make the arrow keys work as regular TAB. To disable this feature press the left and right arrow keys simultaneously. [More info](https://support.apple.com/guide/voiceover/with-quick-nav-vo27943/mac).

### Simulating hover on focus

It's also possible to simulate hover on a focus element, e.g. displaying tooltip, applying hover state, etc.

To enable, use `hoverOnFocus` setting:

series.columns.template.setAll({
  focusable: true,
  hoverOnFocus: true,
  tooltipText: "\[bold\]{name}\[/\]\\n{categoryX}: {valueY}",
  tooltipY: 0
});

series.columns.template.setAll({
  focusable: true,
  hoverOnFocus: true,
  tooltipText: "\[bold\]{name}\[/\]\\n{categoryX}: {valueY}",
  tooltipY: 0
});


### Focus outline margin

Normally, the outline of the focused element will show detracted from the focused element by 2 pixels.

We can control that using Root element's `focusPadding` setting:

let root = am5.Root.new("chartdiv", {
  focusPadding: 0
});

var root = am5.Root.new("chartdiv", {
  focusPadding: 0
});

## Screen reader

### How it works

When enabled, screen reader software - NV Access, MS Windows Narrator, or similar - will automatically read out textual information attached to element when it's focused.

The narration text will mostly be supplied via `aria-label` attribute of the DOM element corresponding to focusable element.

Some elements have their `aria-label` attribute pre-filled. E.g.: zoom out button will have it set to `"Zoom Out"`:

<div role="button" aria-label="Zoom Out" tabindex="0" style="position: absolute; pointer-events: none; top: 24px; left: 649px; width: 40px; height: 40px;"></div>

This will cause the text to be read out when zoom out button is focused via TAB key.

Similarly, legend items will also have additional information attached to them, like the label contents as well as relevant interaction instructions:

<div tabindex="0" aria-label="North America; Press ENTER to toggle" aria-checked="true" style="position: absolute; pointer-events: none; top: 1102.6px; left: 196.023px; width: 194.148px; height: 33.2px;"></div>

Some elements, e.g. columns, cannot be automatically described, and thus do not have any default label set. It's up to us - application developer - to determine what kind of information is relevant to be displayed on focus - much like what information to be displayed in a hover tooltip.

### Setting reader text

To set reader text, we can use `ariaLabel` setting for the element.

scrollbar.startGrip.set("ariaLabel", "Use left or right buttons to set start of zoom");
scrollbar.endGrip.set("ariaLabel", "Use left or right buttons to set end of zoom");

scrollbar.startGrip.set("ariaLabel", "Use left or right buttons to set start of zoom");
scrollbar.endGrip.set("ariaLabel", "Use left or right buttons to set end of zoom");

`ariaLabel` content also accepts data placeholders - a way to replace blocks of text with dynamic values.

series.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}; Category: {categoryX}; Value: {valueY}"
});

series.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}; Category: {categoryX}; Value: {valueY}"
});

The above code will make columns in series focusable, as well as add reader text to each one with its own dynamic values.

MORE INFOFor more information on binding data to text, refer to "[Data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/)" tutorial.

## Accessibility of Root element

We can also make the Root (or more like its inner `<div>`) element accessible using two additional settings in Root: `focusable`, `ariaLabel`, and `role`.

let root = am5.Root.new("chartdiv", {
  focusable: true,
  ariaLabel: "Revenue chart",
  role: "document"
});

var root = am5.Root.new("chartdiv", {
  focusable: true,
  ariaLabel: "Revenue chart",
  role: "document"
});

## Roles

In order to help assistive technologies, amCharts automatically assigns roles to some of the interactive elements.

It comes in a form of a `role` attribute of the related DOM element.

For example, a grip button of a scrollbar will gave `"slider"` role assigned, indicating that this element that can be used to adjust position/zoom.

Similarly, a focusable column in a column series will have a role of `"figure"`.

To change or set a role on specific element, we can use its `role` setting.

series.columns.template.set("role", "img");

series.columns.template.set("role", "img");

The above will change role of columns in series to `"img"`.

MORE INFOFor a full list of available ARIA roles, refer to [this Mozilla article](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles).

## Accessibility of series

### Enabling series accessibility

Series elements (e.g. columns in a column series, or slices in pie series) are not enabled for accessibility.

To enable it, we need to:

-   Make them focusable using `focusable` setting.
-   Provide reader text via `ariaLabel` setting.
-   Optionally, set role via `role` setting.

We set those just like any other setting: via templates:

columnSeries.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});

columnSeries.columns.template.setAll({
  focusable: true,
  ariaLabel: "Series: {name}. Department: {categoryX}. Sales: {valueY}",
  role: "figure"
});

Now each column will be TAB-selectable, and will trigger reader text to read out series name, category, and value.

Best of all, `ariaLabel` text is compatible with [data placeholders](https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/), so they will be replaced with real dynamic data.


NOTEWith series, that usually have quite a few elements, it makes sense to enable [focusable element grouping](https://www.amcharts.com/docs/v5/concepts/accessibility/#Grouping_focusable_elements).

### Bullets

It works the same way for series bullets:

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


## Tooltips

If we would like tooltips to read out its content, we can set their `readerAnnounce: true` setting.

If it's set, the reader will read its contents when:

-   It's shown.
-   Its data item changes.

We can also specify different content for the reader, using `labelAriaLabel` setting.

let series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
      readerAnnounce: true,
      labelArialLabel: "Value: {valueY}"
    })
  })
);

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "date",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}",
      readerAnnounce: true,
      labelArialLabel: "Value: {valueY}"
    })
  })
);

## Legend

Chart's legend has own fuzzy logic of applying `ariaLabel` content to its togglable items. I.e. it uses label content + "Press ENTER to toggle" text.

The only way to override it, is via an adapter:

legend.itemContainers.template.adapters.add("ariaLabel", function(label, target) {
  let label = target.dataItem.get("label");
  return "Click: " + label.get("text");
});

legend.itemContainers.template.adapters.add("ariaLabel", function(label, target) {
  var label = target.dataItem.get("label");
  return "Click: " + label.get("text");
});

## XY Cursor

It's possible to enable control of chart's cursor using direction keys.

To do that, simply set `focusable: true` on cursor lines you need to be controlled.

cursor.lineX.set("focusable", true);
cursor.lineY.set("focusable", true);

cursor.lineX.set("focusable", true);
cursor.lineY.set("focusable", true);


## Keyboard interactions

There are two types of objects on charts that can be interacted with with mouse/touch as well as with keyboard:

-   Draggable elements: e.g. scrollbar grips.
-   Clickable elements: e.g. legend items, zoom buttons, etc.

### Draggable elements

All draggable elements on chart can also be moved using keyboard arrow keys.

Some of them have reader text attached to read out instructions or current value when element is focused using TAB key.

For example, scrollbar's left grip will read out the value of the position it's currently at.

We can change that to drag instructions using `ariaLabel` setting:

scrollbar.startGrip.setAll({
  ariaLabel: root.language.translate("Use left and right arrows to move left selection")
});

scrollbar.startGrip.setAll({
  ariaLabel: root.language.translate("Use left and right arrows to move left selection")
});

### Togglable elements

Using TAB key, when we focus an element that has `"click"` event attached to it, we can press ENTER to actually trigger that event.

For example, focusing on a legend item and pressing ENTER will toggle related series or item.

Some built-in controls have also default reader text with toggling instructions pre-set.

E.g. the legend items we already mentioned: they will read out "Press ENTER to toggle".

## Events

To track when focusable element is selected or unselected we can use its `focus` and `blur` events:

series.slices.template.events.on("focus", function(ev) {
  // Slice focused
  console.log(ev.target);
});

series.slices.template.events.on("blur", function(ev) {
  // Slice no longer focused
  console.log(ev.target);
});

series.slices.template.events.on("focus", function(ev) {
  // Slice focused
  console.log(ev.target);
});

series.slices.template.events.on("blur", function(ev) {
  // Slice no longer focused
  console.log(ev.target);
});

## Related tutorials

-   [Focusable pie slices with perfect outline](https://www.amcharts.com/docs/v5/tutorials/focusable-pie-slices-with-perfect-outline/)
