---
title: "Gantt with hundreds of items"
source: "https://www.amcharts.com/demos/gantt-with-hundreds-of-items/"
category: "gantt"
scraped: "2026-03-15"
---

Our Gantt chart is designed to handle hundreds of tasks efficiently. With a single click on the “Fit to View” button (top-right), the timeline automatically zooms so that all tasks in the current scope are visible at once. You can drag and drop tasks to rearrange them, toggle progress by clicking on the progress indicator, and add markers by clicking directly on the top axis. Tasks with hierarchies can be easily collapsed or expanded to reduce clutter and focus on the right level of detail.
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
      const progress = Math.round(Math.random() * 100) / 100;
      series.push({
        start: timestamp,
        duration,
        progress,
        id: subId,
        linkTo: j < subCount - 1 ? [`${categoryId}_sub_${j + 1}`] : []
      });
      timestamp += duration * 86400000; // add days
    }
  }

  return { categories, series };
}

var ganttData = generateGanttData(40);


gantt.series.events.on("datavalidated", function () {  
  console.log("datavalidated");
  setTimeout(function () {    
    var min = gantt.series.getPrivate("selectionMinX", 0);
    var max = gantt.series.getPrivate("selectionMaxX", 0);
    var extraTime = am5.time.getDuration("day", 1);
    gantt.xAxis.zoomToValues(min - extraTime, max + extraTime * 8);
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/plugins/colorPicker.js
- https://cdn.amcharts.com/lib/5/gantt.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
