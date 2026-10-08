---
title: "Gantt Chart"
source: "https://www.amcharts.com/demos/gantt-chart/"
category: "gantt"
scraped: "2026-10-08"
---

A Gantt chart lays a project out on a calendar: one bar per task, grouped into phases, with arrows for the order the work must follow. Diamonds mark milestones, and the striped part of a bar is the work still to do.

When a Gantt chart works: A Gantt chart answers the planning questions a task list can’t: what runs in parallel, what waits for what, and when the whole thing ends. The links keep the plan honest: move one task and the tasks that depend on it move with it.

Good for:
- Project plans with phases and deadlines
- Showing which task waits for which
- Tracking progress against the schedule

Think twice when:
- Work with no fixed dates, like a backlog: use a list or a board
- Comparing amounts rather than dates: use a bar chart
- Hundreds of tiny tasks: group them into phases first

Prompt: Create a Gantt chart of a software project over about a month: a start milestone, design, programming and testing phases with their subtasks, and an end milestone, with each task’s progress and links to the task that follows. Mark two dates on the timeline. Use the amCharts 5 library.

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

// Default data
var categoryData = [{
  name: "Start",
  id: "gantt_0"
}, {
  name: "Design",
  id: "gantt_1"
}, {
  name: "Review",
  id: "gantt_2",
  parentId: "gantt_1", // a subtask of Design: its row nests under it
}, {
  name: "User tests",
  id: "gantt_3",
  parentId: "gantt_1",
}, {
  name: "Programming",
  id: "gantt_4"
}, {
  name: "Task delegation",
  id: "gantt_5",
  parentId: "gantt_4",
}, {
  name: "Coding",
  id: "gantt_6",
  parentId: "gantt_4",
}, {
  name: "Testing",
  id: "gantt_7",
  parentId: "gantt_4",
}, {
  name: "Deploying",
  id: "gantt_8",
  parentId: "gantt_4",
}, {
  name: "Testing",
  id: "gantt_9"
}, {
  name: "Phase 1",
  id: "gantt_10",
  parentId: "gantt_9",
}, {
  name: "Phase 2",
  id: "gantt_11",
  parentId: "gantt_9",
}, {
  name: "Phase 3",
  id: "gantt_12",
  parentId: "gantt_9",
}, {
  name: "End",
  id: "gantt_15"
}];

var seriesData = [{
  start: 1758229200000, // a timestamp in milliseconds
  // duration 0 draws a milestone
  duration: 0,
  progress: 0,          // how much is done: 0 not started, 1 finished
  id: "gantt_0",
  linkTo: ["gantt_1"]   // an arrow to the task that follows
}, {
  // no dates: a parent row's bar spans its child tasks
  progress: 0,
  id: "gantt_1",
  linkTo: ["gantt_4"]
}, {
  start: 1758488400000,
  duration: 1, // 1 working day: weekends don't count by default
  progress: 1,
  id: "gantt_2",
  linkTo: ["gantt_3"]
}, {
  start: 1758574800000,
  duration: 1,
  progress: 1,
  id: "gantt_3",
  linkTo: []
}, {
  progress: 0,
  id: "gantt_4",
  linkTo: ["gantt_9"]
}, {
  start: 1758747600000,
  duration: 1,
  progress: 1,
  id: "gantt_5",
  linkTo: ["gantt_6"]
}, {
  start: 1758834000000,
  duration: 2,
  progress: 0.4956235693230202,
  id: "gantt_6",
  linkTo: ["gantt_7"]
}, {
  start: 1759179600000,
  duration: 1,
  progress: 0,
  id: "gantt_7",
  linkTo: ["gantt_8"]
}, {
  start: 1759266000000,
  duration: 2,
  progress: 0,
  id: "gantt_8"
}, {
  progress: 0,
  id: "gantt_9",
  linkTo: ["gantt_15"]
}, {
  start: 1759438800000,
  duration: 1,
  progress: 0,
  id: "gantt_10",
  linkTo: ["gantt_11"]
}, {
  start: 1759698000000,
  duration: 1,
  progress: 0,
  id: "gantt_11",
  linkTo: ["gantt_12"]
}, {
  start: 1759784400000,
  duration: 2,
  progress: 0,
  id: "gantt_12"
}, {
  start: 1760302800000,
  duration: 0,
  progress: 0,
  id: "gantt_15"
}];

var markedDates = [1758661200000, 1759352400000]; // timestamps of the dates to mark

// Set data on axis and series
// https://www.amcharts.com/docs/v5/charts/gantt/#Category_data
// https://www.amcharts.com/docs/v5/charts/gantt/#Series_data
gantt.yAxis.data.setAll(categoryData);
gantt.series.data.setAll(seriesData);

// Mark two dates on the timeline: a click on the day axis marks or unmarks a date
am5.array.each(markedDates, function (date) {
  gantt.markDate(date);
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
