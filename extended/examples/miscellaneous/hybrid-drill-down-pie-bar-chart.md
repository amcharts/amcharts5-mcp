---
title: "Hybrid Drill-Down Pie/Bar Chart"
source: "https://www.amcharts.com/demos/hybrid-drill-down-pie-bar-chart/"
category: "miscellaneous"
scraped: "2026-10-08"
---

A donut that drives a bar chart: click a slice and the bars show what it’s made of. Here, 280 support tickets rated Critical, Acceptable or Good, split by type.

When to pair a donut with bars: The donut answers the first question, how the whole splits up, and the bars answer the next one, what one part is made of. Matching colors tie the two together, and the bars compare the parts more exactly than a second ring of slices would.

Good for:
- Tickets, sales or costs split two ways
- Dashboards where people dig into one part
- A total with three to five parts

Think twice when:
- Comparing breakdowns side by side: a stacked bar chart shows all at once
- Print: only one breakdown shows
- Many slices: the donut gets hard to click

Prompt: Create a donut chart of support tickets by rating (Critical, Acceptable, Good) next to a bar chart. Clicking a slice pulls it out, shows its share in the donut’s middle and fills the bar chart with that slice’s breakdown by ticket type. Use the Animated and Responsive themes and the amCharts 5 library.

## JavaScript

```javascript
// Set up data
var data = [{
  category: "Critical",
  value: 89,
  sliceSettings: {
    fill: am5.color(0xdc4534),
  },
  breakdown: [{
    category: "Sales inquiries",
    value: 29
  }, {
    category: "Support requests",
    value: 40
  }, {
    category: "Bug reports",
    value: 11
  }, {
    category: "Other",
    value: 9
  }]
}, {
  category: "Acceptable",
  value: 71,
  sliceSettings: {
    fill: am5.color(0xd7a700),
  },
  breakdown: [{
    category: "Sales inquiries",
    value: 22
  }, {
    category: "Support requests",
    value: 30
  }, {
    category: "Bug reports",
    value: 11
  }, {
    category: "Other",
    value: 10
  }]
}, {
  category: "Good",
  value: 120,
  sliceSettings: {
    fill: am5.color(0x68ad5c),
  },
  breakdown: [{
    category: "Sales inquiries",
    value: 60
  }, {
    category: "Support requests",
    value: 35
  }, {
    category: "Bug reports",
    value: 15
  }, {
    category: "Other",
    value: 10
  }]
}]

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create wrapper container
var container = root.container.children.push(am5.Container.new(root, {
  width: am5.p100,              // fills the whole chart area
  height: am5.p100,
  layout: root.horizontalLayout // the bar chart and the donut side by side
}));

// ==============================================
// Column chart
// ==============================================

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var columnChart = container.children.push(am5xy.XYChart.new(root, {
  width: am5.p50, // half the width
  panX: false,    // no dragging the plot
  panY: false,
  wheelX: "none", // the mouse wheel scrolls the page, not the chart
  wheelY: "none",
  layout: root.verticalLayout
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yRenderer = am5xy.AxisRendererY.new(root, {});
var yAxis = columnChart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "category",
  renderer: yRenderer
}));

yRenderer.grid.template.setAll({
  location: 1 // grid lines at the end of each row, between the bars
})

var xAxis = columnChart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1 // a faint axis line
  })
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var columnSeries = columnChart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "value",
  categoryYField: "category"
}));

columnSeries.columns.template.setAll({
  tooltipText: "{categoryY}: {valueX}" // as "Support requests: 40"
});


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
columnChart.appear(1000, 100);

// ==============================================
// Pie chart
// ==============================================

var pieChart = container.children.push(
  am5percent.PieChart.new(root, {
    width: am5.p50,              // the other half
    innerRadius: am5.percent(50) // a hole half the radius turns the pie into a donut
  })
);

// Create series
var pieSeries = pieChart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

pieSeries.slices.template.setAll({
  // each slice's color comes from sliceSettings in its data
  templateField: "sliceSettings",
  strokeOpacity: 0 // no outline
});

// Clicking a slice selects it and shows its breakdown in the bar chart. One slice stays selected: clicking the
// selected slice again does not deselect it
var currentSlice;
pieSeries.slices.template.on("active", function(active, slice) {
  if (!active) {
    if (slice == currentSlice) {
      slice.set("active", true);
    }
    return;
  }

  var previousSlice = currentSlice;
  currentSlice = slice;
  if (previousSlice && previousSlice != slice) {
    previousSlice.set("active", false);
  }

  var color = slice.get("fill");

  label1.setAll({
    fill: color,
    text: root.numberFormatter.format(slice.dataItem.get("valuePercentTotal"), "#.'%'") // as "32%"
  });

  label2.set("text", slice.dataItem.get("category"));

  // the bars take the slice's color
  columnSeries.columns.template.setAll({
    fill: slice.get("fill"),
    stroke: slice.get("fill")
  });

  columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
  yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
});

pieSeries.labels.template.set("forceHidden", true); // no labels around the donut...
pieSeries.ticks.template.set("forceHidden", true);  // ...and no ticks

pieSeries.data.setAll(data);

// Add label
var label1 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
  text: "",           // filled in when a slice is selected
  fontSize: 35,       // big...
  fontWeight: "bold", // ...bold text...
  centerX: am5.p50,   // ...centered in the hole
  centerY: am5.p50
}));

var label2 = pieChart.seriesContainer.children.push(am5.Label.new(root, {
  text: "",
  fontSize: 12,     // small text...
  centerX: am5.p50, // ...centered too
  centerY: am5.p50,
  // the category name, under the percentage in the donut's hole
  dy: 30
}));

// Pre-select first slice
pieSeries.events.on("datavalidated", function() {
  pieSeries.slices.getIndex(0).set("active", true);
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
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
