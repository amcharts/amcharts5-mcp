---
title: "Gantt Chart Playground"
source: "https://www.amcharts.com/demos/gantt-chart-playground/"
category: "gantt"
scraped: "2026-03-15"
---

Welcome to your interactive Gantt chart!
Click the + button to add a new task.
To create a subtask, select a task and click + again, or drag one task onto another to make it a child.
Drag entire tasks to adjust their position in the timeline.
Resize tasks by dragging the grips at their edges, or fine-tune the duration using the numeric stepper next to the task name.
Drag the triangle on a task bar to set its progress, or click the pie chart on the left to mark it as 100%.
Click on the x-axis to add or remove markers.
Click and drag the circles on tasks to draw connecting lines. Click a line to delete it.
Use the color picker to set a custom color for any task.
That’s it—have fun planning!

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

// Check if we have user-saved data in local storage
function loadGanttData() {
  if (localStorage.getItem("am_gantt_data")) {
    return JSON.parse(localStorage.getItem("am_gantt_data"));
  }
  return {};
}

function saveGanttData(gantt_data) {
  localStorage.setItem("am_gantt_data", JSON.stringify(gantt_data));
}

function saveGanttMarkedDates() {
  const gantt_data = loadGanttData();
  gantt_data.markedDates = gantt.xAxisMinor.axisRanges.values.map((range) => {
    return range.get("value");
  });
  saveGanttData(gantt_data);
}

var markedDates = [];
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

// Set data
gantt.yAxis.data.setAll(categoryData);
gantt.series.data.setAll(seriesData);

// Create axis ranges for marked dates
am5.array.each(markedDates, (value) => {
  gantt.markDate(value);
});

// Set up saving of data
gantt.events.onDebounced("valueschanged", (ev) => {
  gantt_data.categoryData = gantt.yAxis.data.values;
  gantt_data.seriesData = gantt.series.data.values;
  saveGanttData(gantt_data);
}, 500);

gantt.events.on("datemarked", (ev) => {
  console.log("Date marked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
  saveGanttMarkedDates();
});

gantt.events.on("dateunmarked", (ev) => {
  console.log("Date unmarked: " + ev.date + " (" + new Date(ev.date) + ") in " + ev.dataItem.get(name));
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
