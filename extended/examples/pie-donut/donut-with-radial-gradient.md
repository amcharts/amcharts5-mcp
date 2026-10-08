---
title: "Donut with Radial Gradient"
source: "https://www.amcharts.com/demos/donut-with-radial-gradient/"
category: "pie-donut"
scraped: "2026-10-08"
---

A donut where every slice is softly shaded, darker at its edges than in the middle of the ring. The shade is made from the slice colors, so it follows any theme.

Depth without extra colors: A radial gradient shades each slice a little towards its inner and outer edge, so the ring gets some depth without looking like plastic. Because it is made from each slice’s own color, a new theme keeps the effect, and the labels around the ring give each country and its share.

Good for:
- Presentation slides and reports
- Labeled shares around the ring
- Brand palettes and themes: the effect adapts

Think twice when:
- Black-and-white print: the dark middles can merge
- Two or three slices: a flat pie is clearer
- When people need to compare slices closely

Prompt: Create a donut chart of sales in nine countries, where each slice is shaded with a soft radial gradient made from its own color, so the ring looks rounded, with labels showing each country and its share. Use the amCharts 5 library with its Responsive theme.

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
  // room around the ring for the labels
  radius: am5.percent(75),
  innerRadius: am5.percent(50) // a hole half the radius turns the pie into a donut
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(am5percent.PieSeries.new(root, {
  name: "Series",
  valueField: "sales",
  categoryField: "country"
}));

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  country: "Lithuania",
  sales: 501.9
}, {
  country: "Czechia",
  sales: 301.9
}, {
  country: "Ireland",
  sales: 201.1
}, {
  country: "Germany",
  sales: 165.8
}, {
  country: "Australia",
  sales: 139.9
}, {
  country: "Austria",
  sales: 128.3
}, {
  country: "UK",
  sales: 99
}, {
  country: "Belgium",
  sales: 60
}, {
  country: "The Netherlands",
  sales: 50
}]);

// Adding gradients
series.slices.template.setAll({
  // a thin line in the background color between the slices
  stroke: root.interfaceColors.get("background"),
  strokeWidth: 1,
  strokeOpacity: 1,
  cornerRadius: 10 // rounded slice corners
});
// A soft shade: each slice is a little darker at its inner and outer edge than in the middle of the ring
series.slices.template.set("fillGradient", am5.RadialGradient.new(root, {
  stops: [{ // five stops spread evenly from the pie's center to its edge; below 0 darkens
    brighten: -0.35
  }, {
    brighten: -0.35
  }, {
    brighten: -0.25
  }, {
    brighten: 0
  }, {
    brighten: -0.25
  }]
}));

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
