---
title: "Two-Level Pie Chart"
source: "https://www.amcharts.com/demos/two-level-pie-chart/"
category: "pie-donut"
scraped: "2026-03-15"
---

Two-Level pie chart (or a multi-level pie chart as a generic case) lets you display data in multiple dimensions. For example, you can show detailed data as one level and then that same data grouped into higher-level groups as a second level.
Key implementation details
To achieve the effect in this demo, we create two pie series and specify radius and innerRadius of one to go from 80% to 100% (for the wider slice) and the other is 85% to 95%.
Pie chart
Pie series

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
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
// start and end angle must be set both for chart and series
var series0 = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category",
    alignLabels: false,
    radius: am5.percent(100),
    innerRadius: am5.percent(80)
  })
);

series0.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series0.slices.template.setAll({
  fillOpacity: 0.5,
  strokeOpacity: 0,
  templateField: "settings"
});

series0.slices.template.states.create("hover", { scale: 1 });
series0.slices.template.states.create("active", { shiftRadius:0 });

series0.labels.template.setAll({
  templateField: "settings"
});

series0.ticks.template.setAll({
  templateField: "settings"
});

series0.labels.template.setAll({
  textType: "circular",
  radius: 30
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
    settings: { forceHidden: true }
  }
]);

// Create series
// https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// start and end angle must be set both for chart and series
var series1 = chart.series.push(
  am5percent.PieSeries.new(root, {
    radius: am5.percent(95),
    innerRadius: am5.percent(85),
    valueField: "value",
    categoryField: "category",
    alignLabels: false
  })
);

series1.states.create("hidden", {
  startAngle: 180,
  endAngle: 180
});

series1.slices.template.setAll({
  templateField: "sliceSettings",
  strokeOpacity: 0
});

series1.labels.template.setAll({
  textType: "circular"
});

series1.labels.template.adapters.add("radius", function (radius, target) {
  var dataItem = target.dataItem;
  var slice = dataItem.get("slice");
  return -(slice.get("radius") - slice.get("innerRadius")) / 2 - 10;
});

series1.slices.template.states.create("hover", { scale: 1 });
series1.slices.template.states.create("active", { shiftRadius:0 });

series1.ticks.template.setAll({
  forceHidden: true
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
  sliceSettings: { fill: am5.color(0xdedede) }
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/percent.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
