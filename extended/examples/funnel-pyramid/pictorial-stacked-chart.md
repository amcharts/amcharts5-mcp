---
title: "Pictorial Stacked Chart"
source: "https://www.amcharts.com/demos/pictorial-stacked-chart/"
category: "funnel-pyramid"
scraped: "2026-10-08"
---

Seven values stacked inside the outline of a person, from head to feet, each band sized by its share. An infographic look for data about people.

When a figure fits the data: Filling a human outline tells people at once that the numbers are about people: staff by team, voters by age, patients by group. The bands split the figure’s height, so the head, arms and legs make some bands look bigger or smaller than their share.

Good for:
- Infographics about people
- A breakdown of one group, like staff by team
- Covers and posters that need a strong image

Think twice when:
- Exact comparisons: the bands cut through head, arms and legs
- More than seven parts: the bands get too thin to label
- Data that isn’t about people: pick a shape that matches

Prompt: Create a pictorial stacked chart that fills the outline of a person from head to feet with seven sample categories, each band as tall as its share, with labels at the side. Use the Animated and Responsive themes and the amCharts 5 library.

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
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
  layout: root.verticalLayout // the chart's parts are stacked top to bottom
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
  alignLabels: true,       // labels line up in a column beside the figure
  orientation: "vertical", // slices stacked top to bottom
  valueField: "value",
  categoryField: "category",
  // the figure the slices fill, as an SVG path
  svgPath: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
}));

series.labelsContainer.set("width", 100); // 100px of room for the labels
// ticks start at 60% of a slice's width, a little right of its middle
series.ticks.template.set("location", 0.6);

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
series.data.setAll([
  { value: 10, category: "One" },
  { value: 9, category: "Two" },
  { value: 6, category: "Three" },
  { value: 5, category: "Four" },
  { value: 4, category: "Five" },
  { value: 3, category: "Six" },
  { value: 1, category: "Seven" }
]);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
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
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
