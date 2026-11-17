---
title: "Gantt chart"
source: "https://docs.amcharts.com/embeds/v5/gantt-chart/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/gantt"]
---

A demo from the docs page "Gantt Chart" (get_doc(path: "charts/gantt")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
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

gantt.yAxis.setAll({
  maxCellHeight: 70
});

// Set category data
// https://docs.amcharts.com/v5/charts/gantt/#category-data
gantt.yAxis.data.setAll([
  {
    name: "Idea",
    id: "gantt_0"
  },
  {
    name: "Preparation",
    id: "gantt_1"
  },
  {
    name: "Kick-off",
    id: "gantt_2",
    parentId: "gantt_1"
  },
  {
    name: "Planning",
    id: "gantt_3",
    parentId: "gantt_1"
  },
  {
    name: "Implementation",
    id: "gantt_4"
  },
  {
    name: "Setup",
    id: "gantt_5",
    parentId: "gantt_4"
  },
  {
    name: "Development",
    id: "gantt_6",
    parentId: "gantt_4"
  },
  {
    name: "Finalization",
    id: "gantt_7",
    parentId: "gantt_4"
  },
  {
    name: "Release",
    id: "gantt_8"
  }
]);

// Set series data
// https://docs.amcharts.com/v5/charts/gantt/#series-data
gantt.series.data.setAll([
  {
    start: 1758142800000,
    duration: 0,
    progress: 0,
    id: "gantt_0",
    linkTo: ["gantt_1"]
  },
  {
    start: 1758142800000,
    id: "gantt_1"
  },
  {
    start: 1758142800000,
    duration: 2,
    progress: 0,
    id: "gantt_2",
    linkTo: ["gantt_3"]
  },
  {
    start: 1758488400000,
    duration: 2,
    progress: 0,
    id: "gantt_3",
    linkTo: ["gantt_4"]
  },
  {
    start: 1758661200000,
    id: "gantt_4"
  },
  {
    start: 1758661200000,
    duration: 1,
    progress: 0,
    id: "gantt_5",
    linkTo: ["gantt_6"]
  },
  {
    start: 1758747600000,
    duration: 3,
    progress: 0,
    id: "gantt_6",
    linkTo: ["gantt_7"]
  },
  {
    start: 1759179600000,
    duration: 1,
    progress: 0,
    id: "gantt_7",
    linkTo: ["gantt_8"]
  },
  {
    start: 1759179600000,
    duration: 0,
    progress: 0,
    id: "gantt_8"
  }
]);

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
