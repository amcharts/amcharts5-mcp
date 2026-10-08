---
title: "Editable Gantt Chart"
source: "https://www.amcharts.com/demos/gantt-chart-dates/"
category: "gantt"
scraped: "2026-10-08"
---

Seven project phases in a Gantt chart you can change in place: drag and resize the bars, drag a bar’s small triangle to set its progress, and draw links between tasks from the dot at a bar’s end.

When people edit the plan: An editable Gantt chart turns the schedule into the planning tool itself: people move and stretch tasks where they see them, instead of typing dates into a form. Linked tasks move along, and every change fires an event your code can use to save the plan.

Good for:
- Planning tools and project apps
- Quick what-if changes to a schedule
- Teams who think in timelines

Think twice when:
- Exact dates for contracts: offer a date field too
- Many people editing at once: you need to sync and merge changes
- Phones: grips and dots are small for fingers

Prompt: Create an editable Gantt chart of seven project phases, from idea to release, linked in order, where you can drag and resize the bars, drag to set a task’s progress and draw links between tasks. Use the amCharts 5 library.

## JavaScript

```javascript
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create Gantt chart
// https://www.amcharts.com/docs/v5/charts/gantt/
var gantt = root.container.children.push(am5gantt.Gantt.new(root, {}));
gantt.get("colors").set("step", 3); // each new color three steps along the palette, so neighbors contrast
// show the button that switches edit mode on and off
gantt.editButton.set("visible", true);

// Hide a date label that would be cut off at the left edge of the timeline
gantt.xAxis.get("renderer").labels.template.set("minPosition", 0.08);

// Set category data
// https://www.amcharts.com/docs/v5/charts/gantt/#Category_data
gantt.yAxis.data.setAll([{
  name: "Idea",
  id: "gantt_0"
}, {
  name: "Kick-off",
  id: "gantt_1"
}, {
  name: "Planning",
  id: "gantt_2"
}, {
  name: "Development",
  id: "gantt_3"
}, {
  name: "Testing",
  id: "gantt_4"
}, {
  name: "Finalization",
  id: "gantt_5"
}, {
  name: "Release",
  id: "gantt_6"
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
  start: 1758142800000,
  duration: 2, // 2 working days: weekends don't count by default
  progress: 1,
  id: "gantt_1",
  linkTo: ["gantt_2"]
}, {
  start: 1758488400000,
  duration: 2,
  progress: 0.2,
  id: "gantt_2",
  linkTo: ["gantt_3"]
}, {
  start: 1758661200000,
  duration: 1,
  progress: 0.8,
  id: "gantt_3",
  linkTo: ["gantt_4"]
}, {
  start: 1758747600000,
  duration: 3,
  progress: 0,
  id: "gantt_4",
  linkTo: ["gantt_5"]
}, {
  start: 1759179600000,
  duration: 0,
  progress: 0,
  id: "gantt_5",
  linkTo: ["gantt_6"]
}, {
  start: 1759179600000,
  duration: 4,
  progress: 0,
  id: "gantt_6"
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
