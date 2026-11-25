---
title: "Root element"
source: "https://docs.amcharts.com/v5/getting-started/root-element/"
scraped: "2026-11-25"
---

All charts and their controls are created in a root element. This tutorial examines some of its functionality and configuration options.

## What is root element?

A root element is a kind of "wrapper" for everything else - charts, legend, labels, etc.- as well as repository for some chart-wide configuration options, such as locale, formatting options, themes, and others.

Whenever we create a new object in amCharts 5, we also pass in its root element, so that it correctly inherits themes and other settings.

## Creating

We instantiate a root element by calling `new` method of `Root` class:

TypeScript:

```ts
const root = am5.Root.new("chartdiv");
```

JavaScript:

```js
var root = am5.Root.new("chartdiv");
```

The parameter we pass into `new()` call is the id or reference of the DOM container we will want to place our chart in.

The root element creation relies on the target container being already available.

In some setups the code might execute before DOM is fully loaded, which would result in error. For such cases amCharts provides a wrapper function:

TypeScript:

```ts
am5.ready(function() {
  const root = am5.Root.new("chartdiv");
});
```

JavaScript:

```js
am5.ready(function() {
  var root = am5.Root.new("chartdiv");
});
```

The above will ensure that the creation of the root element will be delayed until DOM is fully loaded.

Another added benefit of adding chart code to a "ready" wrapper, is that all the code, including variables, will be limited to the anonymous function scope, rather than result in global scope.

## Using

As we already mentioned, root element will need to be passed into any other element we will create for the chart.

This is a requirement, so that the system knows which root element is being created for, as parent-child relation is not always apparent.

A reference to the root element is always the first parameter to the `new()` method call on any element being created, other than root itself.

For example, here's how root element is passed into an `PieChart` that is being newly created:

TypeScript:

```ts
const chart = root.container.children.push(
  am5pie.PieChart.new(root, {})
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5pie.PieChart.new(root, {})
);
```

## Multiple Root elements

We can have as many Root elements on the same web page as we need. We just need to make sure their `id` attributes are unique, and that we reference correct id when we create Root element.

E.g. we create three `<div>` elements with unique IDs: `chartdiv1`, `chartdiv2`, and `chartdiv3`:

```html
<div id="chartdiv1" class="chartdiv"></div>
<div id="chartdiv2" class="chartdiv"></div>
<div id="chartdiv3" class="chartdiv"></div>
```

Then we can reference them when creating three unique charts:

TypeScript:

```ts
const root1 = am5.Root.new("chartdiv1");
const root2 = am5.Root.new("chartdiv2");
const root3 = am5.Root.new("chartdiv3");
```

JavaScript:

```js
var root1 = am5.Root.new("chartdiv1");
var root2 = am5.Root.new("chartdiv2");
var root3 = am5.Root.new("chartdiv3");
```

Or if we need to create a fairly similar charts, we can reuse the code by wrapping chart creation into a function:

TypeScript:

```ts
function createChart(div, data) {
  const root = am5.Root.new(div);
  // ... the rest of the chart config
}

createChart("chartdiv1", data1);
createChart("chartdiv2", data2);
createChart("chartdiv3", data3);
```

JavaScript:

```js
function createChart(div, data) {
  var root = am5.Root.new(div);
  // ... the rest of the chart config
}

createChart("chartdiv1", data1);
createChart("chartdiv2", data2);
createChart("chartdiv3", data3);
```

Example: [Multiple Root elements](https://docs.amcharts.com/embeds/v5/multiple-root-elements/). Its code: get_example(path: "examples/docs-demos/multiple-root-elements").

## Configuring root

### Formatters

Root element holds instances of the three formatters used throughout the charts and their elements:

| Property            | Class               |
| ------------------- | ------------------- |
| `numberFormatter`   | `NumberFormatter`   |
| `dateFormatter`     | `DateFormatter`     |
| `durationFormatter` | `DurationFormatter` |

Those are global formatters that define formats and related options used in formatting numbers, date/time, and duration.

> **More info:** For more information, please refer to "Formatters: [Global formatters](https://docs.amcharts.com/v5/concepts/formatters/#global-formatters)".

### Performance

amCharts 5 rendering engine will try to render charts and animations as smoothly as possible, cramming as many frames per second as possible.

The more frames per second animation plays, the smoother it looks.

However, if smoothness is not as important as resource usage, or chart-heavy page is suffering from performance-related issues, we can limit number of frames-per-second using root elements `fps` property:

TypeScript:

```ts
root.fps = 30;
```

JavaScript:

```js
root.fps = 30;
```

The smaller the number, the less resources charts will use, at the expense of smoothness of animations.

### Time zone

Normally, chart's date/time-related functionality will display date and time in user's local time zone.

If we need to display them in a specific time zone, wherever the user is, we can use root element's `timezone` property.

It needs to be set with an instance of `Timezone` object, e.g.:

TypeScript:

```ts
root.timezone = am5.Timezone.new("America/Vancouver");
```

JavaScript:

```js
root.timezone = am5.Timezone.new("America/Vancouver");
```

As per example above, `Timezone` takes string-based time zone identifier as a parameter of its `new()` call.

A few examples: `"Asia/Tokyo"`, `"America/New_York"`, `"Europe/Lisbon"`, `"Asia/Kathmandu"` (UTC+5:45).

For a full list of officially supported time zone identifiers, please refer to [this IANA page](https://www.iana.org/time-zones).

The time zone applies to everything date-related on the chart:

* Date axes place their grid at that zone's midnight, hours, weeks, and months.
* Axis labels, tooltips, and formatted dates show date and time in that zone.
* Data grouping groups data items by that zone's days, weeks, and months.
* Where the zone's clocks change for daylight saving, a day is 23 or 25 hours long, and grid, labels, and data groups follow.
* Stock chart's period selector and date range selector use it, too.

The data itself does not change: timestamps are moments in time, and the time zone only decides which day and hour they fall on.

> **Note:** If you need UTC, set `root.utc = true` instead. It works faster than `root.timezone = am5.Timezone.new("UTC")`.

TypeScript:

```ts
root.utc = true;
```

JavaScript:

```js
root.utc = true;
```

> **Note:** Before version 5.21.1, a time zone could noticeably slow down charts with large data sets. Since 5.21.1, the zone's offset is worked out once per day and reused, so the effect on performance is small.

> **More info:** To see it in action, check out the "[Time Zones and Daylight Saving](https://www.amcharts.com/demos/time-zones-and-daylight-saving/)" demo.

### First day of week

Normally, the [locale](https://docs.amcharts.com/v5/concepts/locales/) we are using will determine which week day is considered start of the week.

If we want to override it, we can do so by modifying `firstDayOfWeek` value in the locale:

TypeScript:

```ts
// Start the week on Sunday
root.locale.firstDayOfWeek = 0;
```

JavaScript:

```js
// Start the week on Sunday
root.locale.firstDayOfWeek = 0;
```

Example: [Week start on Sunday](https://docs.amcharts.com/embeds/v5/week-start-on-sunday/). Its code: get_example(path: "examples/docs-demos/week-start-on-sunday").

### Settings

It's possible to pass in a root element settings object as a second parameter to its `new()` call.

### Renderer

Charts are drawn on canvas by default. They can also be drawn as SVG, by setting `renderer` to `am5.SVGRenderer`:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  renderer: am5.SVGRenderer
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  renderer: am5.SVGRenderer
});
```

To draw every chart on the page as SVG, set the default once, before creating any root elements:

TypeScript:

```ts
am5.Root.defaultRenderer = am5.SVGRenderer;
```

JavaScript:

```js
am5.Root.defaultRenderer = am5.SVGRenderer;
```

The renderer can only be chosen when the root element is created. Charts look and behave the same with either one: text is measured the same way, so labels wrap and truncate identically, and all interactions work as usual. Either way, chart elements are styled through their settings: the SVG isn't marked up per chart element, and the chart handles mouse and touch input itself, so CSS and DOM events can't target single elements.

The only difference: blend modes `DST_OVER`, `SRC_ATOP`, and `XOR` are canvas-only. In SVG they are drawn as normal, with a warning in the console.

> **More info:** To save a chart as an SVG file, whichever renderer draws it, see "[Exporting to SVG](https://docs.amcharts.com/v5/concepts/exporting/exporting-svg/)". The [`<am5-chart>` element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/) uses SVG with its `renderer="svg"` attribute.

> **Note:** SVG renderer is available since version 5.21.0.

Example: [Canvas and SVG renderers](https://docs.amcharts.com/embeds/v5/canvas-and-svg-renderers/). Its code: get_example(path: "examples/docs-demos/canvas-and-svg-renderers").

### Safe resolution

This section deals with the setting: `useSafeResolution: boolean` (default: `true`).

The setting means that chart will automatically choose resolution of the chart that is "safe" for the given device.

For example, in iOS 15 and up, there were memory limits imposed on canvas rendering, which means that with large charts, on big tablets, and even larger Apple phones, that limit might get hit, effectively breaking the charts.

For those devices, "safe resolution" will be reduced, to minimize the chance of the issue hitting actual chart setup.

To disable such resolution reduction, we can use root element's settings:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  useSafeResolution: false
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  useSafeResolution: false
});
```

### Expanded tooltip bounds

Normally, tooltips are constrained to the area of the actual chart.

Using root element's `tooltipContainerBounds` setting, it's possible to add additional margins around chart area for tooltips.

The setting accepts an object with pixel values for top, right, bottom, and left sides of the chart area:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  tooltipContainerBounds: {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100
  }
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  tooltipContainerBounds: {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100
  }
});
```

> **More info:** For more information and a demo, visit "Tooltips: [Tooltips outside chart area](https://docs.amcharts.com/v5/concepts/common-elements/tooltips/#tooltips-outside-chart-area)".

### Custom sizing function

Usually, Root element will automatically size itself correctly.

However, in some rare setups, e.g. when using CSS `transform` scaling, the built-in sizing mechanism will fail.

In such cases, you as an implementor of the chart setup, will need to provide functionality for custom sizing the Root.

For that, we can use Root's setting: `calculateSize`.

It accepts a reference to a function, which dimensions calculated by built-in mechanism, and should return an object with modified, or non-modified dimensions.

TypeScript:

```ts
let scale = 2;

const root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: dimensions.width * scale,
      height: dimensions.height * scale
    };
  },
});
```

JavaScript:

```js
var scale = 2;

var root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: dimensions.width * scale,
      height: dimensions.height * scale
    };
  },
});
```

The above code will enlarge the chart's canvas by 2 - a good way to accommodate the custom translate scaling.

We can also use `clientWidth` and `clientHeight` to grab actual sizing, which would take the translates into account:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: root.dom.clientWidth,
      height: root.dom.clientHeight
    };
  },
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: root.dom.clientWidth,
      height: root.dom.clientHeight
    };
  },
});
```

### HTML sanitation

This section deals with the setting: `sanitizeHTML: boolean` (default: `true`).

A number of chart elements can display arbitrary HTML content - e.g. `html` and `labelHTML` label settings, HTML-based tooltips, [modal popups](https://docs.amcharts.com/v5/concepts/common-elements/modal-popups/), and [export](https://docs.amcharts.com/v5/concepts/exporting/) menu labels. This content is injected directly into the page.

Since such content often includes values coming from chart data, which in turn frequently originates from an untrusted back-end, amCharts sanitizes it before displaying.

Sanitation strips out constructs that are practically only used for cross-site scripting (XSS) attacks - e.g. `<script>` tags, inline event handlers like `onerror`, and `javascript:` URLs - while leaving legitimate markup such as formatting, links, and styles intact.

If you fully control all HTML content used in your charts, you can disable sanitation by setting `sanitizeHTML` to `false`:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  sanitizeHTML: false
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  sanitizeHTML: false
});
```

> **Important:** Disable sanitation only if you fully trust the source of all HTML content. Displaying unsanitized HTML that contains values from untrusted sources can expose your users to XSS attacks.

### High contrast mode

When the system is in a forced colors mode, such as Windows High Contrast, chart's labels, grid, axes, and buttons follow the system colors, so they stay visible. Series colors are kept.

To keep the chart's own colors instead, set `forcedColors` to `false`:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  forcedColors: false
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  forcedColors: false
});
```

> **More info:** For more information, see "[Accessibility: High contrast mode](https://docs.amcharts.com/v5/concepts/accessibility/#high-contrast-mode)".

### Text direction

For a right-to-left language, such as Arabic or Hebrew, set `direction` to `"rtl"`:

TypeScript:

```ts
const root = am5.Root.new("chartdiv", {
  direction: "rtl"
});
```

JavaScript:

```js
var root = am5.Root.new("chartdiv", {
  direction: "rtl"
});
```

Text with no `direction` of its own is then drawn right to left, and legends lay out from the right. `"ltr"` keeps everything left to right. Not set, text follows the direction of the chart's element, e.g. a page with `dir="rtl"`.

The direction can only be set when the root element is created.

> **Note:** `direction` is available since version 5.22.0.

> **More info:** For more information, see "[Right-to-left support](https://docs.amcharts.com/v5/concepts/locales/right-to-left-support/)".

### Other configuration options

Root element contains some other global options, too:

* [Locale](https://docs.amcharts.com/v5/concepts/locales/)
* [Top-level tab index](https://docs.amcharts.com/v5/concepts/accessibility/) (accessibility)

## Reusing

If we need to completely replace contents of the chart, we can dispose them, but keep root element for new chart.

To remove all elements from the root, simply clear children of its `container`:

TypeScript:

```ts
root.container.children.clear();
```

JavaScript:

```js
root.container.children.clear();
```

Root element is now empty (as newly created) and can be used to add any other charts to it.

Reusing root element can be faster than completely destroying it and creating a new element.

## Disposing

If we don't need root element anymore, we can dispose it, by calling its `dispose()` method:

TypeScript:

```ts
root.dispose();
```

JavaScript:

```js
root.dispose();
```

Disposing root element will automatically dispose all its children charts as well. No need to dispose them separately.

> **Note:** Trying to create a new root element in a container before disposing the old one that is currently residing there, will result in an error.

If we do not have reference to a previously created root element, we can find it among `am5.registry.rootElements`, which is an array that holds all root elements.

TypeScript:

```ts
am5.array.each(am5.registry.rootElements, function(root) {
  if (root.dom.id == divId) {
    root.dispose();
  }
});
```

JavaScript:

```js
am5.array.each(am5.registry.rootElements, function(root) {
  if (root.dom.id == divId) {
    root.dispose();
  }
});
```

Example: [Disposing previously created Root element](https://docs.amcharts.com/embeds/v5/disposing-previously-created-root-element/). Its code: get_example(path: "examples/docs-demos/disposing-previously-created-root-element").

## Controlling auto-resize

The root element will automatically resize itself if the size of its parent `<div>` element changes.

It can be disabled using `autoResize` property:

TypeScript:

```ts
root.autoResize = false;
```

JavaScript:

```js
root.autoResize = false;
```

If set that way, root element will ignore any size changes in its parent and will remain at the same size it was first initialized with.

To manually trigger a resize for new dimensions, use `resize()` method:

TypeScript:

```ts
root.resize();
```

JavaScript:

```js
root.resize();
```

## Touch-related options

A chart that pans, zooms or selects by dragging takes touch gestures that start on it, so the page can't be scrolled by swiping over the chart. The root's `touchGestures` property (since 5.23.0) sets who gets a gesture that starts on the chart:

| Value               | Gesture goes to                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `"chart"` (default) | The chart, wherever it drags, pans, zooms or selects.                                                                                            |
| `"tap"`             | The page, until the chart is tapped. Then the chart, until `tapToActivateTimeout` passes without a touch.                                        |
| `"auto"`            | A vertical swipe scrolls the page. A swipe that starts sideways, or uses two fingers, goes to the chart, which then follows it in any direction. |

TypeScript:

```ts
root.touchGestures = "auto";
```

JavaScript:

```js
root.touchGestures = "auto";
```

With `"auto"`, some elements take any swipe that starts on them: scrollbar grips, buttons and other draggable elements, drawing on a stock chart, a cursor that selects only up and down, and radar charts.

With `"tap"` or `"auto"`, a swipe that scrolls the page doesn't move the chart.

The [ResponsiveMax](https://docs.amcharts.com/v5/concepts/responsive-max/) theme, set on the root, sets `"auto"` unless `touchGestures` or `tapToActivate` is set in code. To keep the chart taking every gesture, set `"chart"`.

### Tap to activate

`tapToActivate = true` is the same as `touchGestures = "tap"`. Setting it back to `false` restores what was there before: the value set in code, or the theme's.

`tapToActivateTimeout` is how long in milliseconds the chart stays active after the last touch. Default: `3000`. With `0`, it stays active until a tap outside the chart.

TypeScript:

```ts
root.tapToActivate = true;
root.tapToActivateTimeout = 2000;
```

JavaScript:

```js
root.tapToActivate = true;
root.tapToActivateTimeout = 2000;
```

## Chart ready event

In some cases we may need to know when the chart is ready and all initial animations have played out.

While there's no such event built-in, we can utilize root element's `frameended` event with debounced handler to catch precise moment when chart is done painting and animating.

TypeScript:

```ts
let timeout;

root.events.on("frameended", exportChart);

function exportChart() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    root.events.off("frameended", exportChart);
    console.log("Chart ready!");
  }, 100)
}
```

JavaScript:

```js
var timeout;

root.events.on("frameended", exportChart);

function exportChart() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    root.events.off("frameended", exportChart);
    console.log("Chart ready!");
  }, 100)
}
```

Each time something is updated on the chart and some elements are repainted, its root element's `frameended` event kicks in.

Our code waits until there's an idle moment of at least 100ms, before "deciding" the chart is fully functional and initial animations are played out.

For an even safer approach, we can use a [debounced](https://docs.amcharts.com/v5/concepts/events/#debounced-events) `frameended` event:

TypeScript:

```ts
let timeout;

root.events.onDebounced("frameended", exportChart, 500);

function exportChart() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    root.events.off("frameended", exportChart);
    console.log("Chart ready!");
  }, 100)
}
```

JavaScript:

```js
var timeout;

root.events.onDebounced("frameended", exportChart, 500);

function exportChart() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function() {
    root.events.off("frameended", exportChart);
    console.log("Chart ready!");
  }, 100)
}
```

This will ensure that the code will not kick in until the chart building is done, including initial animations.

## Using in a Web Component

We can wrap chart as an `HTMLElement`.

When creating the Root, you can use an element instead of a string ID of the target chart container:

TypeScript:

```ts
class MyChart extends HTMLElement {
  connectedCallback() {
    const root = am5.Root.new(this);

    // Rest of chart code...
  }
}
```

JavaScript:

```js
class MyChart extends HTMLElement {
  connectedCallback() {
    const root = am5.Root.new(this);

    // Rest of chart code...
  }
}
```

> **More info:** amCharts also comes with a ready-made element, `<am5-chart>`, which builds a chart from a JSON config without any chart code. See "[The \<am5-chart> element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/)".
