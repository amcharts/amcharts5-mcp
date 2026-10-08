---
title: "Semi-Circle Pie Chart"
source: "https://www.amcharts.com/demos/semi-circle-pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

Half a donut: the same shares as a pie, in half the height. It fits in a dashboard row or across the top of a report.

When a half donut works: Cutting the circle in half keeps what a donut does well, shares of a whole at a glance, in a shape twice as wide as it is tall. It sits well above a row of numbers or across the top of a page.

Good for:
- Dashboards where height is tight
- Election-style results: seats or votes by party
- Progress towards a goal, with the number underneath

Think twice when:
- Many slices: half a circle makes them twice as thin
- Precise comparisons: use a bar chart
- Audiences who might read the empty half as missing data

Prompt: Create a semi-circle donut chart that covers only the top half of a circle, showing seven sample categories with labels and tooltips. Use the amCharts 5 library with its Responsive theme.

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
// start and end angle must be set both for chart and series
var chart = root.container.children.push(am5percent.PieChart.new(root, {
  startAngle: 180,             // the arc starts at the left (0 is the right, angles go clockwise)...
  endAngle: 360,               // ...and ends at the right: the top half of a circle
  layout: root.verticalLayout,
  radius: am5.percent(70),     // the pie takes 70% of the space, leaving room for the labels
  innerRadius: am5.percent(50) // a hole half the pie's radius makes it a donut
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// start and end angle must be set both for chart and series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  startAngle: 180,
  endAngle: 360,
  valueField: "value",
  categoryField: "category",
  // labels sit next to their slices instead of lining up in columns at the sides
  alignLabels: false
}));

// the hidden state is a zero-width arc, so the series sweeps open from the left when it appears
series.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series.slices.template.setAll({
  cornerRadius: 5 // rounded slice corners
});

series.ticks.template.setAll({
  forceHidden: true // no lines from the slices to their labels
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" }
]);

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
