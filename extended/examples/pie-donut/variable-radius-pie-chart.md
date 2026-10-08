---
title: "Variable Radius Pie Chart"
source: "https://www.amcharts.com/demos/variable-radius-pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

A pie where slices differ in length as well as width: the bigger the value, the further a slice reaches from the middle. The largest parts stand out at once.

When variable radius works: Size counts twice here, in the angle and in the length, so differences look bigger than in a plain pie. That makes it striking for showing who leads, and a poor fit for exact proportions.

Good for:
- A clear winner, or a long tail
- Infographics that need to catch the eye
- Ranked data, where the order matters more than the exact share

Think twice when:
- Shares that people should compare precisely
- Values that are all about the same: every slice looks alike
- Readers who take the area as the value

Prompt: Create a pie chart where each slice’s radius grows with its value, so the larger values reach further from the center, showing six sample categories with labels and a legend. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  layout: root.verticalLayout // the legend goes under the pie
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  alignLabels: true, // labels line up in columns at the sides
  // works out the highest value, which the radius adapter below measures the slices against
  calculateAggregates: true,
  valueField: "value",
  categoryField: "category"
}));

series.slices.template.setAll({
  strokeWidth: 3, // 3px gaps between the slices
  stroke: root.interfaceColors.get("background") // gaps in the background color, light or dark
});

// 30px of room above the labels at the top, so the highest ones stay in view
series.labelsContainer.set("paddingTop", 30);

// Set up adapters for variable slice radius
// https://www.amcharts.com/docs/v5/concepts/settings/adapters/
series.slices.template.adapters.add("radius", function (radius, target) {
  var dataItem = target.dataItem;
  var high = series.getPrivate("valueHigh");

  if (dataItem) {
    // the value as it animates, so a slice hidden from the legend shrinks away
    var value = target.dataItem.get("valueWorking", 0);
    return radius * value / high // the biggest value gets the full radius, the rest in proportion
  }
  return radius;
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  value: 10,
  category: "One"
}, {
  value: 9,
  category: "Two"
}, {
  value: 6,
  category: "Three"
}, {
  value: 5,
  category: "Four"
}, {
  value: 4,
  category: "Five"
}, {
  value: 3,
  category: "Six"
}]);

// Create legend
// https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // centered under the pie
  x: am5.p50,
  marginTop: 15, // 15px of room above and below
  marginBottom: 15
}));

legend.data.setAll(series.dataItems);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series.appear(1000, 100);
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
