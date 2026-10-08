---
title: "Gantt with Hundreds of Items"
source: "https://www.amcharts.com/demos/gantt-with-hundreds-of-items/"
category: "gantt"
scraped: "2026-10-08"
---

About 200 tasks in 40 groups, generated from today’s date, to show the Gantt chart keeps up with a big plan. Scroll through the list, fold groups away, or press the fit button to zoom the timeline to the tasks in view.

When a plan gets big: A large plan needs two things from a Gantt chart: it must stay quick, and the reader must not get lost. This one draws only the rows in view, and folding groups or fitting the timeline brings hundreds of tasks back to a size you can read.

Good for:
- Programs with many projects or teams
- Plans imported from other tools
- Testing the chart with the size of your own data

Think twice when:
- Thousands of tasks: split the plan or load groups on demand
- Readers after the big picture: start with the groups folded
- Tasks of an hour or less: set the duration unit to hours

Prompt: Create a Gantt chart with about 200 generated tasks in 40 groups, where the subtasks of each group run one after another from today, with random lengths and progress, each linked to the next. Use the amCharts 5 library.

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

// random plan: each category gets 2 to 6 subtasks, each linked to the next and starting after it ends
function generateGanttData(categoriesCount) {
  var categories = [];
  var series = [];
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  var timestamp = date.getTime();

  for (let i = 0; i < categoriesCount; i++) {
    const categoryId = `gantt_${i}`;
    categories.push({
      name: `Category ${i + 1}`,
      id: categoryId
    });

    // no dates: a parent row's bar spans its subtasks
    series.push({
      id: categoryId
    });

    const subCount = Math.floor(Math.random() * 5) + 2;
    for (let j = 0; j < subCount; j++) {
      const subId = `${categoryId}_sub_${j}`;
      categories.push({
        name: `Subcategory ${i + 1}.${j + 1}`,
        id: subId,
        parentId: categoryId
      });
      const duration = Math.floor(Math.random() * 5) + 1;
      const progress = Math.round(Math.random() * 100) / 100; // 0 to 1, with two decimals
      series.push({
        start: timestamp,
        duration,
        progress,
        id: subId,
        // an arrow to the next subtask; the last one links to nothing
        linkTo: j < subCount - 1 ? [`${categoryId}_sub_${j + 1}`] : []
      });
      timestamp += duration * 86400000; // add days
    }
  }

  return { categories, series };
}

var ganttData = generateGanttData(40);

// When the data is in, zoom the timeline to the tasks in view, plus a little room on both sides
gantt.series.events.on("datavalidated", function () {
  setTimeout(function () { // half a second later
    var min = gantt.series.getPrivate("selectionMinX", 0);
    var max = gantt.series.getPrivate("selectionMaxX", 0);
    var extraTime = am5.time.getDuration("day", 1); // one day
    gantt.xAxis.zoomToValues(min - extraTime, max + extraTime * 8); // a day before, eight days after
  }, 500);
});

gantt.yAxis.data.setAll(ganttData.categories);
gantt.series.data.setAll(ganttData.series);
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
