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

Example: [Gantt chart w/ data saving to localStorage](https://docs.amcharts.com/embeds/v5/gantt-chart-w-data-saving-to-localstorage/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/plugins/colorPicker.js, https://cdn.amcharts.com/lib/5/gantt.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

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

// Create Gantt chart
// https://docs.amcharts.com/v5/charts/gantt/
var gantt = root.container.children.push(am5gantt.Gantt.new(root, {}));

// Configure Y-axis
gantt.yAxis.setAll({
  maxCellHeight: 70
});

// Default data
var categoryData = [
  {
    name: "Start",
    id: "gantt_0"
  },
  {
    name: "Design",
    id: "gantt_1"
  },
  {
    name: "Review",
    id: "gantt_2",
    parentId: "gantt_1"
  },
  {
    name: "User tests",
    id: "gantt_3",
    parentId: "gantt_1"
  },
  {
    name: "Programming",
    id: "gantt_4"
  },
  {
    name: "Task delegation",
    id: "gantt_5",
    parentId: "gantt_4"
  },
  {
    name: "Coding",
    id: "gantt_6",
    parentId: "gantt_4"
  },
  {
    name: "Testing",
    id: "gantt_7",
    parentId: "gantt_4"
  },
  {
    name: "Deploying",
    id: "gantt_8",
    parentId: "gantt_4"
  },
  {
    name: "Testing",
    id: "gantt_9"
  },
  {
    name: "Phase 1",
    id: "gantt_10",
    parentId: "gantt_9"
  },
  {
    name: "Phase 2",
    id: "gantt_11",
    parentId: "gantt_9"
  },
  {
    name: "Phase 3",
    id: "gantt_12",
    parentId: "gantt_9"
  },
  {
    name: "End",
    id: "gantt_15"
  }
];

var seriesData = [
  {
    start: 1758229200000,
    duration: 0,
    progress: 0,
    id: "gantt_0",
    linkTo: ["gantt_1"]
  },
  {
    category: "gantt_1",
    progress: 0,
    id: "gantt_1",
    linkTo: ["gantt_4"]
  },
  {
    category: "gantt_2",
    start: 1758488400000,
    duration: 1,
    progress: 1,
    id: "gantt_2",
    linkTo: ["gantt_3"]
  },
  {
    category: "gantt_3",
    start: 1758574800000,
    duration: 1,
    progress: 1,
    id: "gantt_3",
    linkTo: []
  },
  {
    category: "gantt_4",
    progress: 0,
    id: "gantt_4",
    linkTo: ["gantt_9"]
  },
  {
    category: "gantt_5",
    start: 1758747600000,
    duration: 1,
    progress: 1,
    id: "gantt_5",
    linkTo: ["gantt_6"]
  },
  {
    category: "gantt_6",
    start: 1758834000000,
    duration: 2,
    progress: 0.4956235693230202,
    id: "gantt_6",
    linkTo: ["gantt_7"]
  },
  {
    category: "gantt_7",
    start: 1759179600000,
    duration: 1,
    progress: 0,
    id: "gantt_7",
    linkTo: ["gantt_8"]
  },
  {
    category: "gantt_8",
    start: 1759266000000,
    duration: 2,
    progress: 0,
    id: "gantt_8"
  },
  {
    category: "gantt_9",
    progress: 0,
    id: "gantt_9",
    linkTo: ["gantt_15"]
  },
  {
    category: "gantt_10",
    start: 1759438800000,
    duration: 1,
    progress: 0,
    id: "gantt_10",
    linkTo: ["gantt_11"]
  },
  {
    category: "gantt_11",
    start: 1759698000000,
    duration: 1,
    progress: 0,
    id: "gantt_11",
    linkTo: ["gantt_12"]
  },
  {
    category: "gantt_12",
    start: 1759784400000,
    duration: 2,
    progress: 0,
    id: "gantt_12"
  },
  {
    start: 1760302800000,
    duration: 0,
    progress: 0,
    id: "gantt_15"
  }
];

var markedDates = [1758661200000, 1759352400000];

// Check if we have user-saved data in local storage
function loadGanttData() {
  if (localStorage.getItem("am_gantt_data")) {
    return JSON.parse(localStorage.getItem("am_gantt_data"));
  }
  return {};
}

function saveGanttData(gantt_data) {
  localStorage.setItem("am_gantt_data", JSON.stringify(gantt_data));
  console.log("Data saved to localStorage");
}

function saveGanttMarkedDates() {
  var gantt_data = loadGanttData();
  gantt_data.markedDates = gantt.xAxisMinor.axisRanges.values.map(function (range) {
    return range.get("value");
  });
  saveGanttData(gantt_data);
}

var gantt_data = loadGanttData();

if (gantt_data.categoryData) {
  categoryData = gantt_data.categoryData;
}
if (gantt_data.seriesData) {
  seriesData = gantt_data.seriesData;
}
if (gantt_data.markedDates) {
  markedDates = gantt_data.markedDates;
}

// Create axis ranges for marked dates
am5.array.each(markedDates, function (value) {
  gantt.markDate(value);
});

// Set data on axis and series
// https://docs.amcharts.com/v5/charts/gantt/#category-data
// https://docs.amcharts.com/v5/charts/gantt/#series-data
gantt.yAxis.data.setAll(categoryData);
gantt.series.data.setAll(seriesData);

// Set up saving of data
gantt.events.onDebounced(
  "valueschanged",
  function (ev) {
    gantt_data.categoryData = gantt.yAxis.data.values;
    gantt_data.seriesData = gantt.series.data.values;
    saveGanttData(gantt_data);
  },
  500
);

gantt.events.on("datemarked", function (ev) {
  console.log(
    "Date marked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name)
  );
  saveGanttMarkedDates();
});

gantt.events.on("dateunmarked", function (ev) {
  console.log(
    "Date unmarked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name)
  );
  saveGanttMarkedDates();
});
```
