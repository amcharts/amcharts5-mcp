---
title: "Pie Chart with Broken Down Slices"
source: "https://www.amcharts.com/demos/pie-chart-broken-slices/"
category: "pie-donut"
scraped: "2026-10-08"
---

A pie that opens up when clicked: click a slice and it breaks into the parts it is made of, while the other slices stay put. Here, fossil and green energy.

When a drill-down pie works: A drill-down keeps the first view simple, two or three big slices, and lets people open the one they care about. The rest of the pie stays in place, so the detail is always seen against the whole.

Good for:
- Categories with subcategories
- Overviews that some readers want to dig into
- Keeping a busy breakdown off the first view

Think twice when:
- Detail everyone needs: show it up front
- Several levels: a sunburst chart shows them all at once
- Printed reports, where nobody can click

Prompt: Create a pie chart of fossil and green energy that drills down in place: clicking a slice breaks it into its sources (oil, coal and gas, or hydro, wind and other), pulled out in the parent’s color, and clicking one of them puts the parent slice back. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    layout: root.verticalLayout // the chart's parts are stacked top to bottom
  })
);

// Create series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "percent",
    categoryField: "type",
    fillField: "color", // each slice's color from the data's color field
    alignLabels: false  // labels sit next to their slices, not lined up in columns
  })
);

series.slices.template.set("templateField", "sliceSettings"); // per-slice settings from the data
series.labels.template.set("radius", 30);                     // labels 30px out from the pie

// Set up click events
series.slices.template.events.on("click", function(event) {
  // a group's slice (it has an id) breaks into its parts; a part puts its group back together
  if (event.target.dataItem.dataContext.id != undefined) {
    selected = event.target.dataItem.dataContext.id;
  } else {
    selected = undefined;
  }
  series.data.setAll(generateChartData());
});

// Define data
var selected; // the index of the group broken into parts, if any
var types = [{
  type: "Fossil Energy",
  percent: 70,
  color: series.get("colors").getIndex(0), // the theme's first color, for this group and its parts
  subs: [{
    type: "Oil",
    percent: 15
  }, {
    type: "Coal",
    percent: 35
  }, {
    type: "Gas",
    percent: 20
  }]
}, {
  type: "Green Energy",
  percent: 30,
  color: series.get("colors").getIndex(1), // the second color, for this group and its parts
  subs: [{
    type: "Hydro",
    percent: 15
  }, {
    type: "Wind",
    percent: 10
  }, {
    type: "Other",
    percent: 5
  }]
}];
series.data.setAll(generateChartData()); // start with both groups whole

// a slice per group, with the selected group replaced by its parts
function generateChartData() {
  var chartData = [];
  for (var i = 0; i < types.length; i++) {
    if (i == selected) { // the selected group: one slice per part...
      for (var x = 0; x < types[i].subs.length; x++) {
        chartData.push({
          type: types[i].subs[x].type,
          percent: types[i].subs[x].percent,
          color: types[i].color, // ...in the group's color
          // the active state pulls the parts out of the pie
          sliceSettings: {
            active: true
          }
        });
      }
    } else { // the other groups: one slice, with the group's index as id
      chartData.push({
        type: types[i].type,
        percent: types[i].percent,
        color: types[i].color,
        id: i
      });
    }
  }
  return chartData;
}
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
