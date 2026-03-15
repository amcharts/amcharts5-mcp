---
title: "Radar with Date Axis"
source: "https://www.amcharts.com/demos/radar-with-date-axis/"
category: "radar-polar"
scraped: "2026-03-15"
---

Date-based data for cyclical periods (months, years, etc.) is well suited to be depicted in a Radar Chart. amCharts flexibility enables you to use date axes in a circular fashion with little effort.
Key implementation details
We add our regular DateAxis to the Radar Chart and just set its renderer to AxisRendererCircular.
Radar chart
Radar axes
Radar series
Date axis
Axis renderer

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    innerRadius: am5.percent(40)
  })
);

chart.get("colors").set("step", 2);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor",
am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false);

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var yRenderer = am5radar.AxisRendererRadial.new(root, { minGridDistance: 20 });

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,
    categoryField: "category",
    renderer: yRenderer
  })
);

var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    min: new Date("2021-01-01 00:00:00").getTime(),
    max: new Date("2022-01-01 00:00:00").getTime(),
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5radar.AxisRendererCircular.new(root, {})
  })
);

var data = [
  {
    category: "One",
    startDate1: new Date("2021-01-01").getTime(),
    endDate1: new Date("2021-03-01").getTime()
  },
  {
    category: "One",
    startDate1: new Date("2021-04-01").getTime(),
    endDate1: new Date("2021-08-15").getTime()
  },
  {
    category: "Two",
    startDate2: new Date("2021-03-01").getTime(),
    endDate2: new Date("2021-06-01").getTime()
  },
  {
    category: "Two",
    startDate2: new Date("2021-08-01").getTime(),
    endDate2: new Date("2021-10-01").getTime()
  },
  {
    category: "Three",
    startDate3: new Date("2021-02-01").getTime(),
    endDate3: new Date("2021-07-01").getTime()
  },
  {
    category: "Four",
    startDate4: new Date("2021-06-09").getTime(),
    endDate4: new Date("2021-09-01").getTime()
  },
  {
    category: "Four",
    startDate4: new Date("2021-10-01").getTime(),
    endDate4: new Date("2021-12-15").getTime()
  },
  {
    category: "Five",
    startDate5: new Date("2021-02-01").getTime(),
    endDate5: new Date("2021-04-15").getTime()
  },
  {
    category: "Five",
    startDate5: new Date("2021-10-01").getTime(),
    endDate5: new Date("2021-12-31").getTime()
  }
];

// Set date fields
// https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
root.dateFormatter.setAll({
  dateFormat: "yyyy-MM-dd",
  dateFields: ["valueX", "openValueX"]
});

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
for (var i = 1; i < 6; i++) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      clustered: false,
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      categoryYField: "category",
      valueXField: "endDate" + i,
      openValueXField: "startDate" + i
    })
  );

  series.columns.template.set("cornerRadius", 25);
  series.columns.template.set(
    "tooltipText",
    "{category}: {openValueX} - {valueX}"
  );

  series.data.setAll(data);
  series.appear(2000, 100);
  series.data.setAll(data);
}

yAxis.data.setAll([
  { category: "One" },
  { category: "Two" },
  { category: "Three" },
  { category: "Four" },
  { category: "Five" }
]);

chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal", exportable: false }));
chart.set("scrollbarY", am5.Scrollbar.new(root, { orientation: "vertical", exportable: false }));

xAxis.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
chart.appear(2000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 600px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
