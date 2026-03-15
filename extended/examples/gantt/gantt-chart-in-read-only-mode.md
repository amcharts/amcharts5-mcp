---
title: "Gantt chart in read-only mode"
source: "https://www.amcharts.com/demos/gantt-chart-in-read-only-mode/"
category: "gantt"
scraped: "2026-03-15"
---

This is a Gantt chart in read-only mode, where all interactions are disabled except for zooming and hovering over the columns. To enable editing, click the pencil icon in the top-right corner. Once editing is enabled, you can add or remove categories, move columns, and perform all the usual editing actions.
Gantt Chart

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
gantt.get("colors").set("step", 3);
gantt.editButton.set("visible", true);
gantt.set("editable", false);

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
  start: 1758142800000,
  duration: 0,
  progress: 1,
  id: "gantt_0",
  linkTo: ["gantt_1"]
}, {
  start: 1758142800000,
  duration: 2,
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
