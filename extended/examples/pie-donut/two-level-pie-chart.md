---
title: "Two-Level Pie Chart"
source: "https://www.amcharts.com/demos/two-level-pie-chart/"
category: "pie-donut"
scraped: "2026-10-08"
---

A thin ring of parts inside a wider, see-through band that groups some of them together. Here the band shows that First and Second belong together.

When a second level helps: Sometimes the parts belong to bigger groups: products to product lines, costs to departments. A second ring shows both at once, the detail in the middle and the grouping around it, without a second chart.

Good for:
- Subtotals: which parts add up to a group
- Highlighting a share of the whole, like used against free
- Two levels of one hierarchy

Think twice when:
- More than two levels: try a sunburst chart
- Groups that overlap: each part must belong to one group
- Many parts per group: the inner slices get thin

Prompt: Create a two-level pie chart of three equal parts: a thin ring shows First, Second and Remaining, and a faint, wider band behind it spans only First and Second to group them. Write the names along the curve of the rings. Use the Animated and Responsive themes and the amCharts 5 library.

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
    layout: root.verticalLayout
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// two pie series in one chart: a faint outer ring for the group, a thinner one for its parts
var series0 = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: false,          // each label stays by its slice, not lined up in columns
    radius: am5.percent(100),    // the ring fills the chart's whole radius...
    innerRadius: am5.percent(80) // ...from 80% of it outward
  })
);

// hidden, the ring shrinks to a point at the left (180 degrees)
series0.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series0.slices.template.setAll({
  fillOpacity: 0.5,         // a faint ring
  strokeOpacity: 0,         // no outline
  templateField: "settings" // the Unused slice takes its forceHidden from the data
});

// slices neither grow on hover nor pull out when clicked
series0.slices.template.states.create("hover", { scale: 1 });
series0.slices.template.states.create("active", { shiftRadius:0 });

series0.labels.template.setAll({
  templateField: "settings" // so its label hides too...
});

series0.ticks.template.setAll({
  templateField: "settings" // ...and its tick
});

series0.labels.template.setAll({
  textType: "circular", // names curve along the ring
  radius: 30            // 30px out from the ring
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series0.data.setAll([
  {
    category: "First + Second",
    value: 60
  },
  {
    category: "Unused",
    value: 30,
    // takes its share of the ring, but its slice, label and tick are hidden
    settings: { forceHidden: true }
  }
]);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
var series1 = chart.series.push(
  am5percent.PieSeries.new(root, {
    // a thinner ring in the middle of the faint ring's band, which runs from 80% to 100%
    radius: am5.percent(95),
    innerRadius: am5.percent(85),
    valueField: "value",
    categoryField: "category",
    alignLabels: false // each label stays by its slice
  })
);

series1.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series1.slices.template.setAll({
  templateField: "sliceSettings", // the Remaining slice takes its gray from the data
  strokeOpacity: 0                // no outline
});

series1.labels.template.setAll({
  textType: "circular" // names curve along the ring
});

// a negative radius puts each name inside its slice, about halfway between the ring's edges
series1.labels.template.adapters.add("radius", function (radius, target) {
  var dataItem = target.dataItem;
  var slice = dataItem.get("slice");
  return -(slice.get("radius") - slice.get("innerRadius")) / 2 - 10;
});

// as on the outer ring: no growing on hover, no pulling out on click
series1.slices.template.states.create("hover", { scale: 1 });
series1.slices.template.states.create("active", { shiftRadius:0 });

series1.ticks.template.setAll({
  forceHidden: true // no ticks: the names sit inside their slices
});

// Set data
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
series1.data.setAll([{
  category: "First",
  value: 30
}, {
  category: "Second",
  value: 30
}, {
  category: "Remaining",
  value: 30,
  // a gray from the theme, 15% of the way from the background to its contrast color: light in light mode,
  // dark in dark mode, so the name on it stays readable
  sliceSettings: { fill: am5.Color.interpolate(0.15, root.interfaceColors.get("background"), root.interfaceColors.get("alternativeBackground")) }
}]);
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
