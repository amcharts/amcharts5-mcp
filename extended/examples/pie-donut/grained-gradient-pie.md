---
title: "Grainy Gradient Pie"
source: "https://www.amcharts.com/demos/grained-gradient-pie/"
category: "pie-donut"
scraped: "2026-10-08"
---

A donut with a fine grain over soft gradients, rounded slices and shadows that deepen on hover. A printed, tactile look instead of flat color.

When texture helps: Grain and gradients don’t change what the chart says; they change how it feels. They suit pages where the chart is part of the design, and they print well on posters. On a busy dashboard, flat color is easier on the eye.

Good for:
- Infographics, posters and landing pages
- Brand pages with a warm, crafted style
- Charts that go into slides as images

Think twice when:
- Dense dashboards with many charts side by side
- Very small charts, where the grain turns into noise
- When colors must match a legend exactly

Prompt: Create a donut chart comparing four countries with grainy gradient fills: each slice is shaded by a radial gradient that darkens toward the middle, with a fine noise texture on top. Add a legend. Use the amCharts 5 library with its Responsive theme.

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
    endAngle: 270,               // a full circle, from the top round to the top again
    layout:root.verticalLayout,  // the legend goes below the donut
    innerRadius: am5.percent(60) // a hole 60% of the radius turns the pie into a donut
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    endAngle: 270 // the slices fill the whole ring
  })
);

// each slice darkens from its own color at the outer edge towards the center of the pie
var gradient = am5.RadialGradient.new(root, {
  stops: [
    { color: am5.color(0x000000) },
    { color: am5.color(0x000000) },
    {}
  ]
})

series.slices.template.setAll({
  fillGradient: gradient,
  strokeWidth: 2,              // 2px...
  stroke: root.interfaceColors.get("background"), // ...lines in the background color between the slices
  cornerRadius: 10,            // rounded slice corners
  shadowOpacity: 0.1,          // a faint shadow...
  shadowOffsetX: 2,            // ...2px to the right...
  shadowOffsetY: 2,            // ...and 2px down
  shadowColor: am5.color(0x000000),
  fillPattern: am5.GrainPattern.new(root, { // grain: random black specks over the gradient
    maxOpacity: 0.2, // each speck at most 20% opaque
    density: 0.5,    // about half the pixels get a speck
    colors: [am5.color(0x000000)]
  })
})

// under the pointer, a slice's shadow darkens and spreads
series.slices.template.states.create("hover", {
  shadowOpacity: 1,
  shadowBlur: 10
})

series.ticks.template.setAll({
   strokeOpacity:0.4, // faint...
strokeDasharray:[2,2] // ...dotted tick lines
})

// hidden, the ring closes up at the top (-90 degrees), so on load it opens clockwise
series.states.create("hidden", {
  endAngle: -90
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series.data.setAll([{
  category: "Lithuania",
  value: 500
}, {
  category: "Czechia",
  value: 300
}, {
  category: "Ireland",
  value: 200
}, {
  category: "Germany",
  value: 100
}]);

var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50), // the legend's middle...
  x: am5.percent(50),       // ...at the middle of the chart
  marginTop: 15,            // 15px of space above...
  marginBottom: 15,         // ...and below the legend
}));
// legend markers show plain colors, without the slices' gradient
legend.markerRectangles.template.adapters.add("fillGradient", function() {
  return undefined;
})
legend.data.setAll(series.dataItems);

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
  max-width:100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
