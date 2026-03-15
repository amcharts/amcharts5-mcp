---
title: "Events"
source: "https://www.amcharts.com/docs/v5/concepts/events/"
scraped: "2026-03-15"
---

## User interactions

### Adding a handler

To attach an event handler for various user interactions - click, hover, etc. - an an element, we use its event dispatcher, accessible via `events` property.

The most common method for the event dispatcher is `on()`:

columnSeries.columns.template.events.on("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

columnSeries.columns.template.events.on("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

Or, if we want the event to execute only once, we can use `once()` instead:

columnSeries.columns.template.events.once("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

columnSeries.columns.template.events.once("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

### Removing a handler

To remove a handler, we use `off()` method.

Please note that we need to pass in a reference to the function to `off()`, so the anonymous function approach above won't work.

fuunction handleColumnClick(ev) {
  console.log("Clicked on a column", ev.target);
}

// Add handler
columnSeries.columns.template.events.on("click", handleColumnClick);

// Remove handler
columnSeries.columns.template.events.off("click", handleColumnClick);

fuunction handleColumnClick(ev) {
  console.log("Clicked on a column", ev.target);
}

// Add handler
columnSeries.columns.template.events.on("click", handleColumnClick);

// Remove handler
columnSeries.columns.template.events.off("click", handleColumnClick);

### Disabling or enabling events

To temporarily disable event handlers of certain type, without removing them permanently, use `disableType()`:

columnSeries.columns.template.events.disableType("click");

columnSeries.columns.template.events.disableType("click");

To enable event type back, use `enableType()`:

columnSeries.columns.template.events.enableType("click");

columnSeries.columns.template.events.enableType("click");

To temporarily disable all event handlers, use `disable()`. To enable all them back on - `enable()`.

MORE INFO Please refer to the `[SpriteEventDispatcher](https://www.amcharts.com/docs/v5/reference/spriteeventdispatcher/)` for a complete list of available methods.

## Behavioral events

Some elements might have events that signal some change on it without user's intervention.

For example, a Scrollbar might invoke a `rangechanged` event when its selection range changes, whether by dragging its grips or programatically.

For a complete list of element's events, see "Events" section in its class reference. Here's a [link](https://www.amcharts.com/docs/v5/reference/scrollbar/#Events) to `Scrollbar` events as an example.

## Debounced events

Starting with version `5.14`, we can create debounced events, i.e. ensuring that event handler will be invoked only once during specific timeframe.

It's useful in situations where events are happening multiple times, and we only want the handler invoked when they stop.

It works similarly to regular events, except instead of `on()` method, we use `onDebounced()`, providing a timeout in milliseconds as the third parameter:

series.events.onDebounced("valueschanged", function(ev) {
  // Save data when 500ms pass since las "valueschanged" event
  // ...
}, 500);

series.events.onDebounced("valueschanged", function(ev) {
  // Save data when 500ms pass since las "valueschanged" event
  // ...
}, 500);

## Settings value change

### Adding

Elements settings is a set of key-value pairs that can be set via `set()` property. Most of the configuration in amCharts 5 happens via settings. Read more about it [here](https://www.amcharts.com/docs/v5/concepts/settings/).

We can add a handler whenever a value for a particular setting changes using element's `on()` method:

series.on("visible", function(visible, target) {
  if (visible) {
    console.log("Series shown", target)
  }
  else {
    console.log("Series hidden", target)
  }
});

series.on("visible", function(visible, target) {
  if (visible) {
    console.log("Series shown", target)
  }
  else {
    console.log("Series hidden", target)
  }
});

Similarly, for catching value change of a [private setting](https://www.amcharts.com/docs/v5/concepts/settings/#Private_settings), we can use the `onPrivate()` method:

xAxis.onPrivate("selectionMin", function(value, target) {
  var start = new Date(value);
  console.log("Start date changed:", start);
});

xAxis.onPrivate("selectionMax", function(value, target) {
  var end = new Date(value);
  console.log("End date changed:", end);
});

xAxis.onPrivate("selectionMin", function(value, target) {
  var start = new Date(value);
  console.log("Start date changed:", start);
});

xAxis.onPrivate("selectionMax", function(value, target) {
  var end = new Date(value);
  console.log("End date changed:", end);
});

### Removing

Turning off value change events are similar to regular events: we can just use `off()` or `offPrivate()` methods.

`callback` (second) parameter is optional: if it's specified, only specific key/callback pair will be removed.

If callback is not provided, all handlers for the specified settings key will be removed:

// Removing specific callback
series.off("visible", seriesVisibilityChange);

// Removing all handlers for a private setting
xAxis.offPrivate("selectionMin");
xAxis.offPrivate("selectionMax");

// Removing specific callback
series.off("visible", seriesVisibilityChange);

// Removing all handlers for a private setting
xAxis.offPrivate("selectionMin");
xAxis.offPrivate("selectionMax");

## Related tutorials

-   [Chart ready event](https://www.amcharts.com/docs/v5/getting-started/root-element/#Chart_ready_event)
-   [Column series events](https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/#Events)
-   [Bullet events](https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/#event-handlers)
