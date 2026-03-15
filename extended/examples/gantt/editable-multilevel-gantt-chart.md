---
title: "Editable Multilevel Gantt Chart"
source: "https://www.amcharts.com/demos/editable-multilevel-gantt-chart/"
category: "gantt"
scraped: "2026-03-15"
---

Experience the power of an interactive, editable multilevel Gantt chart designed for modern project management. Add, edit, and reorder tasks effortlessly with intuitive drag-and-drop controls. Expand or collapse task hierarchies to keep complex projects organized and easy to navigate. Update progress, set dependencies, and adjust schedules in real time for seamless collaboration.
Gantt Chart

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
  start: 1758142800000,
  duration: 0,
  progress: 1,
  id: "gantt_0",
  linkTo: ["gantt_1"]
}, {
  start: 1758142800000,
  id: "gantt_1",
  linkTo: ["gantt_4"]  
}, {
  start: 1758142800000,
  duration: 2,
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
