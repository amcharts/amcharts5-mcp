---
title: "Pie Chart"
source: "https://www.amcharts.com/demos/pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

The classic way to show parts of a whole: one circle, cut into slices sized by their share. Here, seven countries.

When a pie chart works: A pie chart shows how one total splits into parts. People read it at a glance when there are only a few slices and one or two clearly lead. It struggles when slices are close in size, because angles are hard to compare.

Good for:
- Market share or votes, with a few clear leaders
- Where a budget or a day goes
- One headline split for a slide or a report

Think twice when:
- Slices of nearly the same size: a bar chart ranks them better
- Values that don’t add up to a whole, like ratings or averages
- More than six or seven parts: group the small ones as Other

Prompt: Create a pie chart comparing seven countries, each slice sized by its value, with tooltips showing the country and its share of the total. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(
  am5percent.PieChart.new(root, {
    endAngle: 270 // a full circle, from the top (-90, the default start) back to the top
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270 // the slices fill the full circle too
  })
);

// hidden, the pie closes up to its start angle, so appear() sweeps it open
series.states.create("hidden", {
  endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Lithuania",
  value: 501.9
}, {
  category: "Czechia",
  value: 301.9
}, {
  category: "Ireland",
  value: 201.1
}, {
  category: "Germany",
  value: 165.8
}, {
  category: "Australia",
  value: 139.9
}, {
  category: "Austria",
  value: 128.3
}, {
  category: "UK",
  value: 99
}]);

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
