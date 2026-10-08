---
title: "Gantt Chart Playground"
source: "https://www.amcharts.com/demos/gantt-chart-playground/"
category: "gantt"
scraped: "2026-10-08"
---

A Gantt chart to try things on. It starts with a small sample plan: add tasks with the + button and drag them around, or clear everything with the bin and start from nothing. Your plan is saved in this browser.

A Gantt editor in the page: Everything here is the Gantt chart’s own interface: the toolbar, the task list with its durations and progress, and the color picker. The demo adds no editing code of its own; it only saves the plan to the browser’s storage when it changes, and loads it on the next visit.

Good for:
- Trying the Gantt chart before you build with it
- Sketching a project plan quickly
- Seeing what users of your app could do

Think twice when:
- Plans to share: browser storage stays on this device, save to a server
- Several people editing: the chart has no syncing of its own
- Plans that should only be read: switch editing off

Prompt: Create an editable Gantt chart playground that saves its tasks and marked dates in the browser and loads them on the next visit. With nothing saved yet, start from a short sample plan for this week, with a few tasks in progress and a launch milestone. Use the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
const root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create Gantt chart
// https://www.amcharts.com/docs/v5/charts/gantt/
const gantt = root.container.children.push(am5gantt.Gantt.new(root, {}));

// Hide a date label that would be cut off at the left edge of the timeline
gantt.xAxis.get("renderer").labels.template.set("minPosition", 0.08);

// Check if we have user-saved data in local storage
function loadGanttData() {
  if (localStorage.getItem("am_gantt_data")) {
    return JSON.parse(localStorage.getItem("am_gantt_data"));
  }
  return {};
}

// store all of the chart's data in the browser, under one key
function saveGanttData(gantt_data) {
  localStorage.setItem("am_gantt_data", JSON.stringify(gantt_data));
}

// the marked dates live as axis ranges on the minor date axis
function saveGanttMarkedDates() {
  const gantt_data = loadGanttData();
  gantt_data.markedDates = gantt.xAxisMinor.axisRanges.values.map((range) => {
    return range.get("value");
  });
  saveGanttData(gantt_data);
}

var markedDates = [];
var categoryData = [];
var seriesData = [];

const gantt_data = loadGanttData();

if (gantt_data.categoryData) {
  categoryData = gantt_data.categoryData;
}
if (gantt_data.seriesData) {
  seriesData = gantt_data.seriesData;
}
if (gantt_data.markedDates) {
  markedDates = gantt_data.markedDates;
}

// Nothing saved yet: start with a small sample plan from this week's Monday.
// The bin button clears it, for a blank chart.
if (!gantt_data.categoryData) {
  const day = 24 * 60 * 60 * 1000; // a day in milliseconds
  const monday = am5.time.round(new Date(), "week", 1).getTime(); // the start of this week: Monday
  categoryData = [
    { name: "Plan", id: "gantt_0" },
    { name: "Design", id: "gantt_1" },
    { name: "Build", id: "gantt_2" },
    { name: "Launch", id: "gantt_3" }
  ];
  // durations are in working days: weekends are skipped
  seriesData = [
    { start: monday, duration: 2, progress: 1, id: "gantt_0", linkTo: ["gantt_1"] },
    { start: monday + 2 * day, duration: 3, progress: 0.6, id: "gantt_1", linkTo: ["gantt_2"] },
    { start: monday + 7 * day, duration: 4, progress: 0.2, id: "gantt_2", linkTo: ["gantt_3"] },
    { start: monday + 11 * day, duration: 0, progress: 0, id: "gantt_3" }
  ];
}

// Set data
gantt.yAxis.data.setAll(categoryData);
gantt.series.data.setAll(seriesData);

// Create axis ranges for marked dates
am5.array.each(markedDates, (value) => {
  gantt.markDate(value);
});

// Set up saving of data
// saves half a second after the last change, not on every step of a drag
gantt.events.onDebounced("valueschanged", (ev) => {
  gantt_data.categoryData = gantt.yAxis.data.values;
  gantt_data.seriesData = gantt.series.data.values;
  saveGanttData(gantt_data);
}, 500);

// save the marked dates whenever one is added or removed
gantt.events.on("datemarked", (ev) => {
  saveGanttMarkedDates();
});

gantt.events.on("dateunmarked", (ev) => {
  saveGanttMarkedDates();
});

gantt.appear();
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
