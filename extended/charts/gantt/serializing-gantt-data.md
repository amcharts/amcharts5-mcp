---
title: "Events and Gantt data serialization"
source: "https://docs.amcharts.com/v5/charts/gantt/serializing-gantt-data/"
scraped: "2026-11-16"
---

> This tutorial will look at the way we can use Gantt chart's events to track for changes, serialize, and restore the data.

This tutorial will look at the way we can use [Gantt chart](https://docs.amcharts.com/v5/charts/gantt/)'s events to track for changes, serialize, and restore the data.

## Events

### Data changes

Use `"valueschanged"` event of the Gantt chart, to track all changes on the chart's data: tasks added and removed, dragged, resized, linked, etc.

TypeScript:

```ts
chart.events.on("valueschanged", function(ev) {
  // Values changed
});
```

JavaScript:

```js
chart.events.on("valueschanged", function(ev) {
  // Values changed
});
```

`"valueschanged"` event is executed every time something changes, including intermediate values, when animations are playing out. To avoid wasteful repetition of the event handler calls, we can use "[debounced](https://docs.amcharts.com/v5/concepts/events/#debounced-events)" events instead:

TypeScript:

```ts
chart.events.onDebounced("valueschanged", function(ev) {
  // Values changed
  // This will execute only once after 500ms of the last "valueschanged" invocation
}, 500);
```

JavaScript:

```js
chart.events.onDebounced("valueschanged", function(ev) {
  // Values changed
  // This will execute only once after 500ms of the last "valueschanged" invocation
}, 500);
```

### Markers added or removed

When [markers](https://docs.amcharts.com/v5/charts/gantt/#marked-dates) are added or removed, the Gantt chart invokes its `"datemarked"` and `"dateunmarked"` events respectively.

TypeScript:

```ts
gantt.events.on("datemarked", function(ev) {
  console.log("Date marked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
});

gantt.events.on("dateunmarked", function(ev) {
  console.log("Date unmarked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
});
```

JavaScript:

```js
gantt.events.on("datemarked", function(ev) {
  console.log("Date marked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
});

gantt.events.on("dateunmarked", function(ev) {
  console.log("Date unmarked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
});
```

## Serializing data

For a complete snapshot of the Gantt chart's data, we need to query three data storages:

* Series data
* Category axis' data
* Primary timeline axis' marker data

The following example extracts all three and serializes into a JSON forma, suitable for transfer to a backend or saving into browser's local storage.

TypeScript:

```ts
// Get data
const ganttData = {
  axis: chart.yAxis.data.values,
  series: chart.series.data.values,
  markedDates: chart.xAxisMinor.axisRanges.values.map(function(range) {
    return range.get("value");
  })
};

// Serialize data into string for storage
const gantDataSerialized = JSON.stringify(ganttData);
```

JavaScript:

```js
// Get data
var ganttData = {
  xAxis: chart.yAxis.data.values,
  series: chart.series.data.values,
  markedDates: chart.xAxisMinor.axisRanges.values.map(function(range) {
    return range.get("value");
  })
};

// Serialize data into string for storage
var gantDataSerialized = JSON.stringify(ganttData);
```

## Loading saved data

To load series and axis data, simply use their respective `data.setAll()` methods.

To restore marker data, use Gantt chart's `markDate()` method.

TypeScript:

```ts
// Unserialize data
const ganttData = JSON.parse(gantDataSerialized);

// Set series and axis data
chart.yAxis.data.setAll(ganttData.axis);
chart.series.data.setAll(ganttData.series);

// Mark dates
am5.array.each(ganttData.markedDates, function(value) {
  chart.markDate(value);
});
```

JavaScript:

```js
// Unserialize data
var ganttData = JSON.parse(gantDataSerialized);

// Set series and axis data
chart.yAxis.data.setAll(ganttData.axis);
chart.series.data.setAll(ganttData.series);

// Mark dates
am5.array.each(ganttData.markedDates, function(value) {
  chart.markDate(value);
});
```

## Example

The following example shows how Gantt events can be used to track any changes, serialize and store them in [browser's local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), for retrieval and loading across multiple sessions.

Example: [Gantt chart w/ data saving to localStorage](https://docs.amcharts.com/embeds/v5/gantt-chart-w-data-saving-to-localstorage/). Its code: get_example(path: "examples/docs-demos/gantt-chart-w-data-saving-to-localstorage").
