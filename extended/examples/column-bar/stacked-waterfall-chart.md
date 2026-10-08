---
title: "Stacked Waterfall Chart"
source: "https://www.amcharts.com/demos/stacked-waterfall-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A waterfall with two budgets in every column: the first column is the whole budget of 128, and each stage after it takes its share from both, stepping down to zero. The number above a column is what its stage cost.

When to stack a waterfall: A stacked waterfall splits every step into parts, so it shows not only how a total is spent, but also where the money for each step came from. Here, two budgets fund eight stages, and the colors show which one each stage leans on. Keep it to two or three parts, or the thin slices get lost.

Good for:
- Spending from several budgets or accounts
- Costs split by type along a process
- Project stages drawing on shared funds

Think twice when:
- Only the total matters: a plain waterfall is simpler
- Many parts per step: the slices get too thin to read
- Steps that add and take away at once: hard to read in one column

Prompt: Create a stacked waterfall chart of two budgets spent over eight stages: the first stage stacks both budgets from zero, and each later stage floats where the one before ended, taking its share of each budget, down to zero at the end. Label the parts and each stage’s total. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,     // no panning by drag
  panY: false,
  wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
  wheelY: "zoomX", // ...and the vertical wheel zooms in on the stages
  layout: root.verticalLayout,
  paddingLeft: 0   // no gap at the chart's left edge
}));

// Data
var data = [{
  category: "Stage #1",
  open1: 0,
  close1: 83,
  open2: 83,
  close2: 128
}, {
  category: "Stage #2",
  open1: 121,
  close1: 128,
  open2: 128,
  close2: 128
}, {
  category: "Stage #3",
  open1: 111,
  close1: 114,
  open2: 114,
  close2: 121
}, {
  category: "Stage #4",
  open1: 98,
  close1: 108,
  open2: 108,
  close2: 111
}, {
  category: "Stage #5",
  open1: 85,
  close1: 96,
  open2: 96,
  close2: 98
}, {
  category: "Stage #6",
  open1: 55,
  close1: 70,
  open2: 70,
  close2: 85
}, {
  category: "Stage #7",
  open1: 3,
  close1: 36,
  open2: 36,
  close2: 55
}, {
  category: "Stage #8",
  open1: 0,
  close1: 2,
  open2: 2,
  close2: 3
}];

// Work out what each budget gives to each stage, and the stage's total: the labels and tooltips show them.
// A budget that gives a stage nothing gets no amount, so its empty part shows no label.
am5.array.each(data, function(item) {
  if (item.close1 > item.open1) {
    item.amount1 = item.close1 - item.open1;
  }
  if (item.close2 > item.open2) {
    item.amount2 = item.close2 - item.open2;
  }
  item.total = item.close2 - item.open1;
});

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {
  // each column takes the middle 80% of its stage's cell, leaving a gap between stages
  cellStartLocation: 0.1,
  cellEndLocation: 0.9,
  minGridDistance: 70,   // at least 70px between the labels
  minorGridEnabled: true // fainter grid lines between the main ones
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xRenderer.grid.template.setAll({
  location: 1 // grid lines between the stages, not through the middle of each
});

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0, // columns start at zero
  // a little room on top for the totals
  extraMax: 0.05,
  renderer: am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/

// The stage totals share a template, so a change to it reaches them all
var totalLabel = am5.Template.new({});

// adds one budget's parts; with total true, it also labels each stage's total on top
function makeSeries(name, field, openField, amountField, total) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: field,
    // each part floats from its open value up to its close value
    openValueYField: openField,
    categoryXField: "category",
    // both budgets share one column per stage instead of standing side by side
    clustered: false
  }));

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}: {" + amountField + "}", // hover a part for its budget, stage and amount
    width: am5.percent(95), // the column takes 95% of its slot
    tooltipY: 0             // the tooltip points at the part's top
  });

  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  // The budget's amount in the middle of its part, hidden when the part is too short for it
  // (no padding, so the label fits wherever the text does)
  series.bullets.push(function() {
    return am5.Bullet.new(root, {
      locationX: 0.5, // the middle of the column...
      locationY: 0.5, // ...halfway up the part
      sprite: am5.Label.new(root, {
        text: "{" + amountField + "}",
        fill: root.interfaceColors.get("alternativeText"), // the theme's text color for use on colored fills
        centerY: am5.p50,   // centered on its point...
        centerX: am5.p50,   // ...both ways
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        populateText: true, // fill in the amount from the data
        textAlign: "center",
        oversizedBehavior: "hide"
      })
    });
  });

  // The stage's total above the column
  if (total) {
    series.bullets.push(function() {
      return am5.Bullet.new(root, {
        locationX: 0.5,
        locationY: 1, // at the top of the column
        sprite: am5.Label.new(root, {
          text: "{total}",
          fill: root.interfaceColors.get("text"), // the regular text color
          centerY: am5.p100,                      // the label's bottom sits on the column's top...
          centerX: am5.p50,                       // ...centered across it
          populateText: true,
          textAlign: "center"
        }, totalLabel)
      });
    });
  }

}

makeSeries("Budget #1", "close1", "open1", "amount1", false); // the lower parts, no totals
makeSeries("Budget #2", "close2", "open2", "amount2", true);  // the upper parts, with the stage totals on top

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
