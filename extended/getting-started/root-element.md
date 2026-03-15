---
title: "Root element"
source: "https://www.amcharts.com/docs/v5/getting-started/root-element/"
scraped: "2026-03-15"
---

All charts and their controls are created in a root element. This tutorial examines some of its functionality and configuration options.

## What is root element?

A root element is a kind of "wrapper" for everything else - charts, legend, labels, etc.- as well as repository for some chart-wide configuration options, such as locale, formatting options, themes, and others.

Whenever we create a new object in amCharts 5, we also pass in its root element, so that it correctly inherits themes and other settings.

## Creating

We instantiate a root element by calling `new` method of `Root` class:

const root = am5.Root.new("chartdiv");

var root = am5.Root.new("chartdiv");

The parameter we pass into `new()` call is the id or reference of the DOM container we will want to place our chart in.

The root element creation relies on the target container being already available.

In some setups the code might execute before DOM is fully loaded, which would result in error. For such cases amCharts provides a wrapper function:

am5.ready(function() {
  const root = am5.Root.new("chartdiv");
});

am5.ready(function() {
  var root = am5.Root.new("chartdiv");
});

The above will ensure that the creation of the root element will be delayed until DOM is fully loaded.

Another added benefit of adding chart code to a "ready" wrapper, is that all the code, including variables, will be limited to the anonymous function scope, rather than result in global scope.

## Using

As we already mentioned, root element will need to be passed into any other element we will create for the chart.

This is a requirement, so that the system knows which root element is being created for, as parent-child relation is not always apparent.

A reference to the root element is always the first parameter to the `new()` method call on any element being created, other than root itself.

For example, here's how root element is passed into an `PieChart` that is being newly created:

const chart = root.container.children.push(
  am5pie.PieChart.new(root, {})
);

var chart = root.container.children.push(
  am5pie.PieChart.new(root, {})
);

## Multiple Root elements

We can have as many Root elements on the same web page as we need. We just need to make sure their `id` attributes are unique, and that we reference correct id when we create Root element.

E.g. we create three `<div>` elements with unique IDs: `chartdiv1`, `chartdiv2`, and `chartdiv3`:

<div id="chartdiv1" class="chartdiv"></div>
<div id="chartdiv2" class="chartdiv"></div>
<div id="chartdiv3" class="chartdiv"></div>

Then we can reference them when creating three unique charts:

const root1 = am5.Root.new("chartdiv1");
const root2 = am5.Root.new("chartdiv2");
const root3 = am5.Root.new("chartdiv3");

var root1 = am5.Root.new("chartdiv1");
var root2 = am5.Root.new("chartdiv2");
var root3 = am5.Root.new("chartdiv3");

Or if we need to create a fairly similar charts, we can reuse the code by wrapping chart creation into a function:

function createChart(div, data) {
  const root = am5.Root.new(div);
  // ... the rest of the chart config
}

createChart("chartdiv1", data1);
createChart("chartdiv2", data2);
createChart("chartdiv3", data3);

function createChart(div, data) {
  var root = am5.Root.new(div);
  // ... the rest of the chart config
}

createChart("chartdiv1", data1);
createChart("chartdiv2", data2);
createChart("chartdiv3", data3);


## Configuring root

### Formatters

Root element holds instances of the three formatters used throughout the charts and their elements:

Property

Class

`numberFormatter`

`NumberFormatter`

`dateFormatter`

`DateFormatter`

`durationFormatter`

`DurationFormatter`

Those are global formatters that define formats and related options used in formatting numbers, date/time, and duration.

MORE INFOFor more information, please refer to "Formatters: [Global formatters](https://www.amcharts.com/docs/v5/concepts/formatters/#Global_formatters)".

### Performance

amCharts 5 rendering engine will try to render charts and animations as smoothly as possible, cramming as many frames per second as possible.

The more frames per second animation plays, the smoother it looks.

However, if smoothness is not as important as resource usage, or chart-heavy page is suffering from performance-related issues, we can limit number of frames-per-second using root elements `fps` property:

root.fps = 30;

root.fps = 30;

The smaller the number, the less resources charts will use, at the expense of smoothness of animations.

### Time zone

Normally, chart's date/time-related functionality will display date and time in user's local time zone.

If we need to force displaying of the information in a specific time zone, we can use root element's `timezone` property.

It needs to be set with an instance of `Timezone` object, e.g.:

root.timezone = am5.Timezone.new("America/Vancouver");

root.timezone = am5.Timezone.new("America/Vancouver");

As per example above, `Timezone` takes string-based time zone identifier as a constructor parameter.

A few examples: `"UTC"`, `"Asia/Tokyo"`, `"America/New_York"`, `"Europe/Lisbon"`.

For a full list of officially supported time zone identifiers, please refer to [this IANA page](https://www.iana.org/time-zones).

NOTEPlease note that if you are using `"UTC"` it's better to use `root.utc = true`. It will work faster than via named `root.timezone = "UTC"`.

IMPORTANTUsing time zone feature may noticeable affect performance of the chart, especially with large data sets, since every single date will need to be recalculated.

### First day of week

Normally, the [locale](https://www.amcharts.com/docs/v5/concepts/locales/) we are using will determine which week day is considered start of the week.

If we want to override it, we can do so by modifying `firstDayOfWeek` value in the locale:

// Start the week on Sunday
root.locale.firstDayOfWeek = 0;

// Start the week on Sunday
root.locale.firstDayOfWeek = 0;


### Settings

It's possible to pass in a root element settings object as a second parameter to its `new()` call.

### Safe resolution

This section deals with the setting: `useSafeResolution: boolean` (default: `true`).

The setting means that chart will automatically choose resolution of the chart that is "safe" for the given device.

For example, in iOS 15 and up, there were memory limits imposed on canvas rendering, which means that with large charts, on big tablets, and even larger Apple phones, that limit might get hit, effectively breaking the charts.

For those devices, "safe resolution" will be reduced, to minimize the chance of the issue hitting actual chart setup.

To disable such resolution reduction, we can use root element's settings:

const root = am5.Root.new("chartdiv", {
  useSafeResolution: false
});

var root = am5.Root.new("chartdiv", {
  useSafeResolution: false
});

### Expanded tooltip bounds

Normally, tooltips are constrained to the area of the actual chart.

Using root element's `tooltipContainerBounds` setting, it's possible to add additional margins around chart area for tooltips.

The setting accepts an object with pixel values for top, right, bottom, and left sides of the chart area:

const root = am5.Root.new("chartdiv", {
  tooltipContainerBounds: {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100
  }
});

var root = am5.Root.new("chartdiv", {
  tooltipContainerBounds: {
    top: 50,
    right: 100,
    bottom: 50,
    left: 100
  }
});

MORE INFOFor more information and a demo, visit "Tooltips: [Tooltips outside chart area](https://www.amcharts.com/docs/v5/concepts/common-elements/tooltips/#Tooltips_outside_chart_area)".

### Custom sizing function

Usually, Root element will automatically size itself correctly.

However, in some rare setups, e.g. when using CSS `transform` scaling, the built-in sizing mechanism will fail.

In such cases, you as an implementor of the chart setup, will need to provide functionality for custom sizing the Root.

For that, we can use Root's setting: `calculateSize`.

It accepts a reference to a function, which dimensions calculated by built-in mechanism, and should return an object with modified, or non-modified dimensions.

let scale = 2;

const root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: dimensions.width \* scale,
      height: dimensions.height \* scale
    };
  },
});

var scale = 2;

var root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: dimensions.width \* scale,
      height: dimensions.height \* scale
    };
  },
});

The above code will enlarge the chart's canvas by 2 - a good way to accommodate the custom translate scaling.

We can also use `clientWidth` and `clientHeight` to grab actual sizing, which would take the translates into account:

const root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: root.dom.clientWidth,
      height: root.dom.clientHeight
    };
  },
});

var root = am5.Root.new("chartdiv", {
  calculateSize: function(dimensions) {
    return {
      width: root.dom.clientWidth,
      height: root.dom.clientHeight
    };
  },
});

### Other configuration options

Root element contains some other global options, too:

-   [Locale](https://www.amcharts.com/docs/v5/concepts/locales/)
-   [Top-level tab index](https://www.amcharts.com/docs/v5/concepts/accessibility/) (accessibility)

## Reusing

If we need to completely replace contents of the chart, we can dispose them, but keep root element for new chart.

To remove all elements from the root, simply clear children of its `container`:

root.container.children.clear();

root.container.children.clear();

Root element is now empty (as newly created) and can be used to add any other charts to it.

Reusing root element can be faster than completely destroying it and creating a new element.

## Disposing

If we don't need root element anymore, we can dispose it, by calling its `dispose()` method:

root.dispose();

root.dispose();

Disposing root element will automatically dispose all its children charts as well. No need to dispose them separately.

NOTETrying to create a new root element in a container before disposing the old one that is currently residing there, will result in an error.

If we do not have reference to a previously created root element, we can find it among `am5.registry.rootElements`, which is an array that holds all root elements.

am5.array.each(am5.registry.rootElements, function(root) {
  if (root.dom.id == divId) {
    root.dispose();
  }
});

am5.array.each(am5.registry.rootElements, function(root) {
  if (root.dom.id == divId) {
    root.dispose();
  }
});


## Controlling auto-resize

The root element will automatically resize itself if the size of its parent `<div>` element changes.

It can be disabled using `[autoResize](https://www.amcharts.com/docs/v5/reference/root/#autoResize_property)` property:

root.autoResize = false;

root.autoResize = false;

If set that way, root element will ignore any size changes in its parent and will remain at the same size it was first initialized with.

To manually trigger a resize for new dimensions, use `[resize()](https://www.amcharts.com/docs/v5/reference/root/#resize_method)` method:

root.resize();

root.resize();

## Touch-related options

There are a few options that can be used to tweak built-in touch-related functionality of the charts.

Charts that use touch gestures for their functionality, like zooming or panning the chart or map, will hijack page gestures such as scroll.

If we set root element's `tapToActivate` property to `true`, user will first need to tap on the chart before those functions are enabled.

Once "activated" chart's gesture-based functionality will start to work normally, and will revert back to "inactive" state after 3 seconds of inactivity.

The default timeout can be modified via `tapToActivateTimeout` property, which accepts time in milliseconds.

root.tapToActivate = true;
root.tapToActivateTimeout = 2000;

root.tapToActivate = true;
root.tapToActivateTimeout = 2000;

## Chart ready event

In some cases we may need to know when the chart is ready and all initial animations have played out.

While there's no such event built-in, we can utilize root element's `frameended` event with debounced handler to catch precise moment when chart is done painting and animating.

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

Each time something is updated on the chart and some elements are repainted, its root element's `frameended` event kicks in.

Our code waits until there's an idle moment of at least 100ms, before "deciding" the chart is fully functional and initial animations are played out.

## Using in a Web Component

We can wrap chart as an `HTMLElement`.

When creating the Root, you can use an element instead of a string ID of the target chart container:

class MyChart extends HTMLElement {
  connectedCallback() {
    const root = am5.Root.new(this);

    // Rest of chart code...
  }
}

class MyChart extends HTMLElement {
  connectedCallback() {
    const root = am5.Root.new(this);

    // Rest of chart code...
  }
}
