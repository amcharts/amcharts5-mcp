---
title: "Nested Donut Chart"
source: "https://www.amcharts.com/demos/nested-donut-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

Two rings, one inside the other, for two measures of the same countries: bottles sold inside, litres outside. Where the rings don’t line up, the measures disagree.

When to nest donuts: Nesting puts two splits of the same items side by side, so you can see where they differ: a country that sells many bottles but few litres sells small bottles. Two rings read well; by the third, the inner ones get too thin to compare.

Good for:
- Two measures of the same categories
- This year against last year
- Planned against actual

Think twice when:
- More than two or three rings
- Rings with different categories: use two separate charts
- Exact differences between rings: a grouped bar chart shows them better

Prompt: Create a nested donut chart comparing nine countries in two rings, the inner ring by bottles and the outer ring by liters, with labels on the outer ring only and tooltips showing each share and amount. Use the amCharts 5 library with its Responsive theme.

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
  layout: root.verticalLayout, // the chart's parts are stacked top to bottom
  innerRadius: am5.percent(40) // a hole in the middle, 40% of the radius
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// two series in one pie chart make two rings: bottles inside, litres outside
var series0 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "bottles",
  categoryField: "country",
  alignLabels: false
}));

var bgColor = root.interfaceColors.get("background"); // the background color, for the gaps between slices

series0.ticks.template.setAll({ forceHidden: true });  // no ticks...
series0.labels.template.setAll({ forceHidden: true }); // ...and no labels on the inner ring
series0.slices.template.setAll({
  stroke: bgColor, // a 2px outline in the background color...
  strokeWidth: 2,  // ...looks like a gap between the slices
  tooltipText:     // the country, its share with two decimals, and the bottles
    "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} bottles)"
});
// a hovered inner slice shrinks a little instead of growing into the outer ring
series0.slices.template.states.create("hover", { scale: 0.95 });

var series1 = chart.series.push(am5percent.PieSeries.new(root, {
  valueField: "litres",
  categoryField: "country",
  // labels line up in columns on both sides instead of sitting next to their slices
  alignLabels: true
}));

series1.slices.template.setAll({
  stroke: bgColor, // a 2px outline in the background color...
  strokeWidth: 2,  // ...looks like a gap between the slices
  tooltipText:     // the country, its share with two decimals, and the litres
    "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value} litres)"
});

var data = [{
  country: "Lithuania",
  litres: 501.9,
  bottles: 1500
}, {
  country: "Czechia",
  litres: 301.9,
  bottles: 990
}, {
  country: "Ireland",
  litres: 201.1,
  bottles: 785
}, {
  country: "Germany",
  litres: 165.8,
  bottles: 255
}, {
  country: "Australia",
  litres: 139.9,
  bottles: 452
}, {
  country: "Austria",
  litres: 128.3,
  bottles: 332
}, {
  country: "UK",
  litres: 99,
  bottles: 150
}, {
  country: "Belgium",
  litres: 60,
  bottles: 178
}, {
  country: "The Netherlands",
  litres: 50,
  bottles: 50
}];

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series0.data.setAll(data);
series1.data.setAll(data);

// Play initial series animation
// https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
series0.appear(1000, 100);
series1.appear(1000, 100);
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
