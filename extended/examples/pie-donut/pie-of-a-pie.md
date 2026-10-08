---
title: "Pie of a Pie (Exploding Pie Chart)"
source: "https://www.amcharts.com/demos/pie-of-a-pie/"
category: "pie-donut"
scraped: "2026-10-08"
---

Two pies joined by lines: click a slice of the big pie and it turns to face the small one, which shows what that slice is made of.

When to break out a slice: A pie of pie keeps the overview and the detail of one part on screen together. It helps when a slice is made of many small pieces that would be unreadable inside the main pie.

Good for:
- One category everyone asks about, like Other
- An overview plus the detail of a selected item
- Presentations where you go through items one by one

Think twice when:
- Comparing the breakdown of two slices at once: use stacked bars
- Many slices with their own breakdown: a sunburst chart shows them all
- Printed reports, where nobody can click

Prompt: Create a pie-of-a-pie chart comparing six countries: clicking a slice turns the main pie until that slice faces a smaller pie beside it, which shows that country’s breakdown, with two lines joining the slice to the smaller pie. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

var container = root.container.children.push(
  am5.Container.new(root, {
    width: am5.p100,              // the container fills the chart div
    height: am5.p100,             // in both directions
    layout: root.horizontalLayout // main pie on the left, sub pie on the right
  })
);

// Create main chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = container.children.push(
  am5percent.PieChart.new(root, {
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: false // labels stay by their slices instead of lining up in columns
  })
);

series.labels.template.setAll({
  textType: "circular", // labels bend along the edge of the pie
  radius: 4             // 4px out from the slice
});
series.ticks.template.set("visible", false); // no lines from the slices to their labels
// a click picks the slice for the sub pie instead of pulling it out
series.slices.template.set("toggleKey", "none");

// add events
series.slices.template.events.on("click", function(e) {
  selectSlice(e.target);
});

// Create sub chart
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var subChart = container.children.push(
  am5percent.PieChart.new(root, {
    radius: am5.percent(50), // half the radius it could take, so the sub pie is smaller
    tooltip: am5.Tooltip.new(root, {})
  })
);

// Create sub series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var subSeries = subChart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

// seven empty slices that selectSlice fills from the picked slice's subData
subSeries.data.setAll([
  { category: "A", value: 0 },
  { category: "B", value: 0 },
  { category: "C", value: 0 },
  { category: "D", value: 0 },
  { category: "E", value: 0 },
  { category: "F", value: 0 },
  { category: "G", value: 0 }
]);
subSeries.slices.template.set("toggleKey", "none"); // clicking a sub pie slice does nothing

var selectedSlice;

// keep the connecting lines on the slice while the pie turns and when the chart resizes
series.on("startAngle", function() {
  updateLines();
});

container.events.on("boundschanged", function() {
  root.events.once("frameended", function() {
    updateLines();
   })
});

// draw the two dashed lines from the edges of the picked slice to the top and bottom of the sub pie
function updateLines() {
  if (selectedSlice) {
    var startAngle = selectedSlice.get("startAngle");
    var arc = selectedSlice.get("arc");
    var radius = selectedSlice.get("radius");

    var x00 = radius * am5.math.cos(startAngle);
    var y00 = radius * am5.math.sin(startAngle);

    var x10 = radius * am5.math.cos(startAngle + arc);
    var y10 = radius * am5.math.sin(startAngle + arc);

    var subRadius = subSeries.slices.getIndex(0).get("radius");
    var x01 = 0;
    var y01 = -subRadius;

    var x11 = 0;
    var y11 = subRadius;

    var point00 = series.toGlobal({ x: x00, y: y00 });
    var point10 = series.toGlobal({ x: x10, y: y10 });

    var point01 = subSeries.toGlobal({ x: x01, y: y01 });
    var point11 = subSeries.toGlobal({ x: x11, y: y11 });

    line0.set("points", [point00, point01]);
    line1.set("points", [point10, point11]);
  }
}

// lines
var line0 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",                     // placed by its points, outside the container's layout
    stroke: root.interfaceColors.get("text"), // the text color, so the lines show on any background
    strokeDasharray: [2, 2]                   // dashed: 2px dash, 2px gap
  })
);
var line1 = container.children.push(
  am5.Line.new(root, {
    position: "absolute",
    stroke: root.interfaceColors.get("text"),
    strokeDasharray: [2, 2]
  })
);

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  {
    category: "Lithuania",
    value: 500,
    subData: [
      { category: "A", value: 200 },
      { category: "B", value: 150 },
      { category: "C", value: 100 },
      { category: "D", value: 100 }
    ]
  },
  {
    category: "Czechia",
    value: 300,
    subData: [
      { category: "A", value: 150 }
    ]
  },
  {
    category: "Ireland",
    value: 200,
    subData: [
      { category: "A", value: 110 },
      { category: "B", value: 60 },
      { category: "C", value: 30 }
    ]
  },
  {
    category: "Germany",
    value: 150,
    subData: [
      { category: "A", value: 80 },
      { category: "B", value: 40 },
      { category: "C", value: 30 }
    ]
  },
  {
    category: "Australia",
    value: 140,
    subData: [
      { category: "A", value: 90 },
      { category: "B", value: 40 },
      { category: "C", value: 10 }
    ]
  },
  {
    category: "Austria",
    value: 120,
    subData: [
      { category: "A", value: 60 },
      { category: "B", value: 30 },
      { category: "C", value: 30 }
    ]
  }
]);

// the pie of a pie: show the picked slice's subData in the sub pie and turn the slice toward it
function selectSlice(slice) {
  selectedSlice = slice;
  var dataItem = slice.dataItem;
  var dataContext = dataItem.dataContext;

  if (dataContext) {
    var i = 0;
    // copy subData into the sub pie's slices and hide the slices it has no value for
    subSeries.data.each(function(dataObject) {
      var dataObj = dataContext.subData[i];
      if(dataObj){
          if(!subSeries.dataItems[i].get("visible")){
              subSeries.dataItems[i].show();
          }
          subSeries.data.setIndex(i, dataObj);
      }
      else{
          subSeries.dataItems[i].hide();
      }

      i++;
    });
  }

  // turn the pie so the middle of the picked slice faces right, toward the sub pie
  var middleAngle = slice.get("startAngle") + slice.get("arc") / 2;
  var firstAngle = series.dataItems[0].get("slice").get("startAngle");

  series.animate({
    key: "startAngle",
    to: firstAngle - middleAngle,
    duration: 1000,                      // one second
    easing: am5.ease.out(am5.ease.cubic) // slows down at the end
  });
  series.animate({
    key: "endAngle",
    to: firstAngle - middleAngle + 360,
    duration: 1000,
    easing: am5.ease.out(am5.ease.cubic)
  });
}

container.appear(1000, 10);

// pick the first slice once the data is in
series.events.on("datavalidated", function() {
  selectSlice(series.slices.getIndex(0));
});
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
