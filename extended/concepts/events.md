---
title: "Events"
source: "https://www.amcharts.com/docs/v5/concepts/events/"
scraped: "2026-10-08"
updated: "2026-08-05"
updatedFor: "@amcharts/amcharts5@5.20.1"
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

### Executing a handler only once

Sometimes we need a handler to run only the first time an event happens - reacting to the very first click, or waiting for something to become ready. For that we use `once()` instead of `on()`.

It works exactly like `on()`, except the handler is automatically removed right after it is invoked for the first time:

columnSeries.columns.template.events.once("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

columnSeries.columns.template.events.once("click", function(ev) {
  console.log("Clicked on a column", ev.target);
});

Like `on()`, `once()` returns a disposer, so we can still remove the handler manually before it ever fires.

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

## Global pointer events

Regular pointer events like `pointerdown` fire only when the pointer is over the element itself. The "global" variants fire on **every** element for a pointer action anywhere on the chart surface, which is what you need for drag-style interactions that must keep tracking once the pointer leaves the element.

Available on all elements:

-   `globalpointermove`
-   `globalpointerup`
-   `globalpointerdown` — added in 5.20.0

```javascript
series.columns.template.events.on("globalpointerdown", function(ev) {
  // fires on a press anywhere on the chart surface
});
```

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

### Executing only once

Starting with version `5.20.4`, we can invoke a settings-change handler only once, using the `once()` method. It works just like `on()`, but removes itself after the setting changes for the first time:

series.once("visible", function(visible, target) {
  console.log("Series visibility changed for the first time:", visible, target);
});

series.once("visible", function(visible, target) {
  console.log("Series visibility changed for the first time:", visible, target);
});

`once()` returns a disposer, so the handler can also be removed manually before it fires.

### Debounced settings changes

Starting with version `5.17.3`, settings-change handlers can be debounced, too - so that the handler is invoked only once after a burst of rapid changes settles. This works similarly to [debounced events](#Debounced_events): instead of `on()`, we use `onDebounced()`, passing a timeout in milliseconds as the third parameter:

xAxis.onDebounced("start", function(value, target) {
  // Runs 500ms after the zoom stops changing
  console.log("Zoom settled at:", value, target);
}, 500);

xAxis.onDebounced("start", function(value, target) {
  // Runs 500ms after the zoom stops changing
  console.log("Zoom settled at:", value, target);
}, 500);

Starting with version `5.20.4`, we can combine both behaviors with `onceDebounced()` - a debounced handler that fires only once, then removes itself:

series.onceDebounced("visible", function(visible, target) {
  console.log("Series visibility settled once:", visible, target);
}, 500);

series.onceDebounced("visible", function(visible, target) {
  console.log("Series visibility settled once:", visible, target);
}, 500);

(Do not confuse settings-change `once()` with `events.once("eventName", …)`, which has existed for regular events all along.)

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
