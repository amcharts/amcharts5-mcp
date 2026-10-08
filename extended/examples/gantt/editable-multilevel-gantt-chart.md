---
title: "Editable Multilevel Gantt Chart"
source: "https://www.amcharts.com/demos/editable-multilevel-gantt-chart/"
category: "gantt"
scraped: "2026-10-08"
---

A Gantt chart with tasks grouped under their stage. Each stage’s bar covers its tasks, its progress comes from theirs, and a click folds it away.

When to nest tasks: Big plans read better in layers: a few stages for the whole project, and the tasks inside when you need them. A folded stage keeps its bar and its progress in view, so the plan gets shorter without losing anything.

Good for:
- Projects with stages and subtasks
- Plans read by people at different levels
- Editing a plan in the browser

Think twice when:
- Deep nesting: past two or three levels it gets hard to follow
- A handful of tasks: skip the grouping
- Plans nobody should change: switch editing off

Prompt: Create an editable Gantt chart on two levels: an idea milestone, preparation and implementation stages with their tasks, and a release milestone, with each task’s progress and links to the task that follows. Use the amCharts 5 library.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create Gantt chart
// https://www.amcharts.com/docs/v5/charts/gantt/
var gantt = root.container.children.push(am5gantt.Gantt.new(root, {}));

// Hide a date label that would be cut off at the left edge of the timeline
gantt.xAxis.get("renderer").labels.template.set("minPosition", 0.08);

// Set category data
// https://www.amcharts.com/docs/v5/charts/gantt/#Category_data
gantt.yAxis.data.setAll([{
  name: "Idea",
  id: "gantt_0"
}, {
  name: "Preparation",
  id: "gantt_1"
}, {
  name: "Kick-off",
  id: "gantt_2",
  parentId: "gantt_1"
}, {
  name: "Planning",
  id: "gantt_3",
  parentId: "gantt_1"
}, {
  name: "Implementation",
  id: "gantt_4"
}, {
  name: "Setup",
  id: "gantt_5",
  parentId: "gantt_4"
}, {
  name: "Development",
  id: "gantt_6",
  parentId: "gantt_4"
}, {
  name: "Finalization",
  id: "gantt_7",
  parentId: "gantt_4"
}, {
  name: "Release",
  id: "gantt_8"
}]);

// Set series data
// https://www.amcharts.com/docs/v5/charts/gantt/#Series_data
gantt.series.data.setAll([{
  start: 1758142800000, // a timestamp in milliseconds
  // duration 0 draws a milestone
  duration: 0,
  progress: 1,          // how much is done: 0 not started, 1 finished
  id: "gantt_0",
  linkTo: ["gantt_1"]   // an arrow to the task that follows
}, {
  // no duration: a parent row's bar spans its child tasks
  start: 1758142800000,
  id: "gantt_1",
  linkTo: ["gantt_4"]
}, {
  start: 1758142800000,
  duration: 2, // 2 working days: weekends don't count by default
  progress: 1,
  id: "gantt_2",
  linkTo: ["gantt_3"]
}, {
  start: 1758488400000,
  duration: 2,
  progress: 0.5,
  id: "gantt_3"
}, {
  start: 1758661200000,
  id: "gantt_4",
  linkTo: ["gantt_8"]
}, {
  start: 1758661200000,
  duration: 1,
  progress: 0,
  id: "gantt_5",
  linkTo: ["gantt_6"]
}, {
  start: 1758747600000,
  duration: 3,
  progress: 0,
  id: "gantt_6",
  linkTo: ["gantt_7"]
}, {
  start: 1759179600000,
  duration: 1,
  progress: 0,
  id: "gantt_7"
}, {
  start: 1759179600000,
  duration: 0,
  progress: 0,
  id: "gantt_8"
}]);

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
  max-width:100%;
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
