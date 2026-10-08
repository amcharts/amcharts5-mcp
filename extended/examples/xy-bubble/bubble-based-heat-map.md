---
title: "Bubble-Based Heat Map"
source: "https://www.amcharts.com/demos/bubble-based-heat-map/"
category: "xy-bubble"
scraped: "2026-10-08"
---

A heat map drawn with bubbles instead of colored cells: a week of hourly values, one row per day, and the bigger the bubble, the higher the value. The values change every second.

Bubbles or colored cells?: A heat map shows one value for every pair of two categories, here day and hour. Colored cells are compact, but people compare sizes more easily than shades, so bubbles make the busy and quiet times stand out. Each bubble is sized between the smallest and the largest value on the chart.

Good for:
- Activity by weekday and hour: visits, orders, calls
- Spotting busy and quiet times at a glance
- Live dashboards where the values keep changing

Think twice when:
- Reading exact values: a table works better
- Dozens of rows and columns: the bubbles shrink to dots
- Negative values: use colored cells with a two-color scale

Prompt: Create a bubble heat map of days of the week by hours of the day, with a circle in each cell sized by its value that fits its cell at any chart size. Every second, the values change a little and the bubbles grow and shrink smoothly. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,    // the plot doesn't pan when dragged
    panY: false,
    wheelX: "none", // the mouse wheel doesn't zoom or pan
    wheelY: "none",
    layout: root.verticalLayout
  })
);

// Create axes and their renderers
var yRenderer = am5xy.AxisRendererY.new(root, {
  visible: false,      // no axis line
  minGridDistance: 20, // a label for every day down to 20px apart
  // the first day, Sunday, at the top
  inversed: true
});

yRenderer.grid.template.set("visible", false); // no grid lines

var yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // no panning past the first and last day
    renderer: yRenderer,
    categoryField: "weekday"
  })
);

var xRenderer = am5xy.AxisRendererX.new(root, {
  visible: false,      // no axis line
  minGridDistance: 40, // at least 40px between hour labels; some are skipped when tighter
  opposite: true       // the hours along the top
});

xRenderer.grid.template.set("visible", false); // no grid lines

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    renderer: xRenderer,
    categoryField: "hour"
  })
);

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
var series = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    // finds the lowest and highest value, which the heat rule below sizes the bubbles by
    calculateAggregates: true,
    // bubbles are outlined in the background color, so touching bubbles stay apart in light and dark mode
    stroke: root.interfaceColors.get("background"),
    clustered: false,
    xAxis: xAxis,
    yAxis: yAxis,
    categoryXField: "hour",
    categoryYField: "weekday",
    valueField: "value"
  })
);

// the columns only place the bubbles in their cells, so they stay hidden
series.columns.template.setAll({
  forceHidden: true
});

// one template for all bubbles, so the heat rule can size them
var circleTemplate = am5.Template.new({ radius: 5 });

// Add circle bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series.bullets.push(function () {
  var graphics = am5.Circle.new(
    root, {
      stroke: series.get("stroke"), // the background-colored outline...
      strokeWidth: 2,               // ...2px wide
      fill: series.get("fill"),     // the series color
      // day, hour and the value in bold
      tooltipText: "{categoryY}, {categoryX}: [bold]{value.formatNumber('#,###.')}[/]"
    }, circleTemplate
  );
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

// Set up heat rules
// https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
var heatRule = {
  target: circleTemplate,
  min: 3,  // the smallest bubble has a 3px radius
  max: 18, // replaced below to fit the cells
  dataField: "value",
  key: "radius"
};
series.set("heatRules", [heatRule]);

// Size the biggest bubble to its cell (24 hours by 7 days), whatever the size of the chart:
// it may overlap its neighbors a little, and the outline keeps them apart
chart.plotContainer.events.on("boundschanged", function () {
  // the smaller side of one cell
  var cellSize = Math.min(chart.plotContainer.width() / 24, chart.plotContainer.height() / 7);
  heatRule.max = Math.max(4, cellSize * 0.7); // a radius of 70% of the cell, at least 4px
  series.set("heatRules", [heatRule]);        // set the rule again, so the bubbles take the new size
});

// Set data
// https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data
var data = [{
  hour: "12am",
  weekday: "Sunday",
  value: 2990
}, {
  hour: "1am",
  weekday: "Sunday",
  value: 2520
}, {
  hour: "2am",
  weekday: "Sunday",
  value: 2334
}, {
  hour: "3am",
  weekday: "Sunday",
  value: 2230
}, {
  hour: "4am",
  weekday: "Sunday",
  value: 2325
}, {
  hour: "5am",
  weekday: "Sunday",
  value: 2019
}, {
  hour: "6am",
  weekday: "Sunday",
  value: 2128
}, {
  hour: "7am",
  weekday: "Sunday",
  value: 2246
}, {
  hour: "8am",
  weekday: "Sunday",
  value: 2421
}, {
  hour: "9am",
  weekday: "Sunday",
  value: 2788
}, {
  hour: "10am",
  weekday: "Sunday",
  value: 2959
}, {
  hour: "11am",
  weekday: "Sunday",
  value: 3018
}, {
  hour: "12pm",
  weekday: "Sunday",
  value: 3154
}, {
  hour: "1pm",
  weekday: "Sunday",
  value: 3172
}, {
  hour: "2pm",
  weekday: "Sunday",
  value: 3368
}, {
  hour: "3pm",
  weekday: "Sunday",
  value: 3464
}, {
  hour: "4pm",
  weekday: "Sunday",
  value: 3746
}, {
  hour: "5pm",
  weekday: "Sunday",
  value: 3656
}, {
  hour: "6pm",
  weekday: "Sunday",
  value: 3336
}, {
  hour: "7pm",
  weekday: "Sunday",
  value: 3292
}, {
  hour: "8pm",
  weekday: "Sunday",
  value: 3269
}, {
  hour: "9pm",
  weekday: "Sunday",
  value: 3300
}, {
  hour: "10pm",
  weekday: "Sunday",
  value: 3403
}, {
  hour: "11pm",
  weekday: "Sunday",
  value: 3323
}, {
  hour: "12am",
  weekday: "Monday",
  value: 3346
}, {
  hour: "1am",
  weekday: "Monday",
  value: 2725
}, {
  hour: "2am",
  weekday: "Monday",
  value: 3052
}, {
  hour: "3am",
  weekday: "Monday",
  value: 3876
}, {
  hour: "4am",
  weekday: "Monday",
  value: 4453
}, {
  hour: "5am",
  weekday: "Monday",
  value: 3972
}, {
  hour: "6am",
  weekday: "Monday",
  value: 4644
}, {
  hour: "7am",
  weekday: "Monday",
  value: 5715
}, {
  hour: "8am",
  weekday: "Monday",
  value: 7080
}, {
  hour: "9am",
  weekday: "Monday",
  value: 8022
}, {
  hour: "10am",
  weekday: "Monday",
  value: 8446
}, {
  hour: "11am",
  weekday: "Monday",
  value: 9313
}, {
  hour: "12pm",
  weekday: "Monday",
  value: 9011
}, {
  hour: "1pm",
  weekday: "Monday",
  value: 8508
}, {
  hour: "2pm",
  weekday: "Monday",
  value: 8515
}, {
  hour: "3pm",
  weekday: "Monday",
  value: 8399
}, {
  hour: "4pm",
  weekday: "Monday",
  value: 8649
}, {
  hour: "5pm",
  weekday: "Monday",
  value: 7869
}, {
  hour: "6pm",
  weekday: "Monday",
  value: 6933
}, {
  hour: "7pm",
  weekday: "Monday",
  value: 5969
}, {
  hour: "8pm",
  weekday: "Monday",
  value: 5552
}, {
  hour: "9pm",
  weekday: "Monday",
  value: 5434
}, {
  hour: "10pm",
  weekday: "Monday",
  value: 5070
}, {
  hour: "11pm",
  weekday: "Monday",
  value: 4851
}, {
  hour: "12am",
  weekday: "Tuesday",
  value: 4468
}, {
  hour: "1am",
  weekday: "Tuesday",
  value: 3306
}, {
  hour: "2am",
  weekday: "Tuesday",
  value: 3906
}, {
  hour: "3am",
  weekday: "Tuesday",
  value: 4413
}, {
  hour: "4am",
  weekday: "Tuesday",
  value: 4726
}, {
  hour: "5am",
  weekday: "Tuesday",
  value: 4584
}, {
  hour: "6am",
  weekday: "Tuesday",
  value: 5717
}, {
  hour: "7am",
  weekday: "Tuesday",
  value: 6504
}, {
  hour: "8am",
  weekday: "Tuesday",
  value: 8104
}, {
  hour: "9am",
  weekday: "Tuesday",
  value: 8813
}, {
  hour: "10am",
  weekday: "Tuesday",
  value: 9278
}, {
  hour: "11am",
  weekday: "Tuesday",
  value: 10425
}, {
  hour: "12pm",
  weekday: "Tuesday",
  value: 10137
}, {
  hour: "1pm",
  weekday: "Tuesday",
  value: 9290
}, {
  hour: "2pm",
  weekday: "Tuesday",
  value: 9255
}, {
  hour: "3pm",
  weekday: "Tuesday",
  value: 9614
}, {
  hour: "4pm",
  weekday: "Tuesday",
  value: 9713
}, {
  hour: "5pm",
  weekday: "Tuesday",
  value: 9667
}, {
  hour: "6pm",
  weekday: "Tuesday",
  value: 8774
}, {
  hour: "7pm",
  weekday: "Tuesday",
  value: 8649
}, {
  hour: "8pm",
  weekday: "Tuesday",
  value: 9937
}, {
  hour: "9pm",
  weekday: "Tuesday",
  value: 10286
}, {
  hour: "10pm",
  weekday: "Tuesday",
  value: 9175
}, {
  hour: "11pm",
  weekday: "Tuesday",
  value: 8581
}, {
  hour: "12am",
  weekday: "Wednesday",
  value: 8145
}, {
  hour: "1am",
  weekday: "Wednesday",
  value: 7177
}, {
  hour: "2am",
  weekday: "Wednesday",
  value: 5657
}, {
  hour: "3am",
  weekday: "Wednesday",
  value: 6802
}, {
  hour: "4am",
  weekday: "Wednesday",
  value: 8159
}, {
  hour: "5am",
  weekday: "Wednesday",
  value: 8449
}, {
  hour: "6am",
  weekday: "Wednesday",
  value: 9453
}, {
  hour: "7am",
  weekday: "Wednesday",
  value: 9947
}, {
  hour: "8am",
  weekday: "Wednesday",
  value: 11471
}, {
  hour: "9am",
  weekday: "Wednesday",
  value: 12492
}, {
  hour: "10am",
  weekday: "Wednesday",
  value: 9388
}, {
  hour: "11am",
  weekday: "Wednesday",
  value: 9928
}, {
  hour: "12pm",
  weekday: "Wednesday",
  value: 9644
}, {
  hour: "1pm",
  weekday: "Wednesday",
  value: 9034
}, {
  hour: "2pm",
  weekday: "Wednesday",
  value: 8964
}, {
  hour: "3pm",
  weekday: "Wednesday",
  value: 9069
}, {
  hour: "4pm",
  weekday: "Wednesday",
  value: 8898
}, {
  hour: "5pm",
  weekday: "Wednesday",
  value: 8322
}, {
  hour: "6pm",
  weekday: "Wednesday",
  value: 6909
}, {
  hour: "7pm",
  weekday: "Wednesday",
  value: 5810
}, {
  hour: "8pm",
  weekday: "Wednesday",
  value: 5151
}, {
  hour: "9pm",
  weekday: "Wednesday",
  value: 4911
}, {
  hour: "10pm",
  weekday: "Wednesday",
  value: 4487
}, {
  hour: "11pm",
  weekday: "Wednesday",
  value: 4118
}, {
  hour: "12am",
  weekday: "Thursday",
  value: 3689
}, {
  hour: "1am",
  weekday: "Thursday",
  value: 3081
}, {
  hour: "2am",
  weekday: "Thursday",
  value: 6525
}, {
  hour: "3am",
  weekday: "Thursday",
  value: 6228
}, {
  hour: "4am",
  weekday: "Thursday",
  value: 6917
}, {
  hour: "5am",
  weekday: "Thursday",
  value: 6568
}, {
  hour: "6am",
  weekday: "Thursday",
  value: 6405
}, {
  hour: "7am",
  weekday: "Thursday",
  value: 8106
}, {
  hour: "8am",
  weekday: "Thursday",
  value: 8542
}, {
  hour: "9am",
  weekday: "Thursday",
  value: 8501
}, {
  hour: "10am",
  weekday: "Thursday",
  value: 8802
}, {
  hour: "11am",
  weekday: "Thursday",
  value: 9420
}, {
  hour: "12pm",
  weekday: "Thursday",
  value: 8966
}, {
  hour: "1pm",
  weekday: "Thursday",
  value: 8135
}, {
  hour: "2pm",
  weekday: "Thursday",
  value: 8224
}, {
  hour: "3pm",
  weekday: "Thursday",
  value: 8387
}, {
  hour: "4pm",
  weekday: "Thursday",
  value: 8218
}, {
  hour: "5pm",
  weekday: "Thursday",
  value: 7641
}, {
  hour: "6pm",
  weekday: "Thursday",
  value: 6469
}, {
  hour: "7pm",
  weekday: "Thursday",
  value: 5441
}, {
  hour: "8pm",
  weekday: "Thursday",
  value: 4952
}, {
  hour: "9pm",
  weekday: "Thursday",
  value: 4643
}, {
  hour: "10pm",
  weekday: "Thursday",
  value: 4393
}, {
  hour: "11pm",
  weekday: "Thursday",
  value: 4017
}, {
  hour: "12am",
  weekday: "Friday",
  value: 4022
}, {
  hour: "1am",
  weekday: "Friday",
  value: 3063
}, {
  hour: "2am",
  weekday: "Friday",
  value: 3638
}, {
  hour: "3am",
  weekday: "Friday",
  value: 3968
}, {
  hour: "4am",
  weekday: "Friday",
  value: 4070
}, {
  hour: "5am",
  weekday: "Friday",
  value: 4019
}, {
  hour: "6am",
  weekday: "Friday",
  value: 4548
}, {
  hour: "7am",
  weekday: "Friday",
  value: 5465
}, {
  hour: "8am",
  weekday: "Friday",
  value: 6909
}, {
  hour: "9am",
  weekday: "Friday",
  value: 7706
}, {
  hour: "10am",
  weekday: "Friday",
  value: 7867
}, {
  hour: "11am",
  weekday: "Friday",
  value: 8615
}, {
  hour: "12pm",
  weekday: "Friday",
  value: 8218
}, {
  hour: "1pm",
  weekday: "Friday",
  value: 7604
}, {
  hour: "2pm",
  weekday: "Friday",
  value: 7429
}, {
  hour: "3pm",
  weekday: "Friday",
  value: 7488
}, {
  hour: "4pm",
  weekday: "Friday",
  value: 7493
}, {
  hour: "5pm",
  weekday: "Friday",
  value: 6998
}, {
  hour: "6pm",
  weekday: "Friday",
  value: 5941
}, {
  hour: "7pm",
  weekday: "Friday",
  value: 5068
}, {
  hour: "8pm",
  weekday: "Friday",
  value: 4636
}, {
  hour: "9pm",
  weekday: "Friday",
  value: 4241
}, {
  hour: "10pm",
  weekday: "Friday",
  value: 3858
}, {
  hour: "11pm",
  weekday: "Friday",
  value: 3833
}, {
  hour: "12am",
  weekday: "Saturday",
  value: 3503
}, {
  hour: "1am",
  weekday: "Saturday",
  value: 2842
}, {
  hour: "2am",
  weekday: "Saturday",
  value: 2808
}, {
  hour: "3am",
  weekday: "Saturday",
  value: 2399
}, {
  hour: "4am",
  weekday: "Saturday",
  value: 2280
}, {
  hour: "5am",
  weekday: "Saturday",
  value: 2139
}, {
  hour: "6am",
  weekday: "Saturday",
  value: 2527
}, {
  hour: "7am",
  weekday: "Saturday",
  value: 2940
}, {
  hour: "8am",
  weekday: "Saturday",
  value: 3066
}, {
  hour: "9am",
  weekday: "Saturday",
  value: 3494
}, {
  hour: "10am",
  weekday: "Saturday",
  value: 3287
}, {
  hour: "11am",
  weekday: "Saturday",
  value: 3416
}, {
  hour: "12pm",
  weekday: "Saturday",
  value: 3432
}, {
  hour: "1pm",
  weekday: "Saturday",
  value: 3523
}, {
  hour: "2pm",
  weekday: "Saturday",
  value: 3542
}, {
  hour: "3pm",
  weekday: "Saturday",
  value: 3347
}, {
  hour: "4pm",
  weekday: "Saturday",
  value: 3292
}, {
  hour: "5pm",
  weekday: "Saturday",
  value: 3416
}, {
  hour: "6pm",
  weekday: "Saturday",
  value: 3131
}, {
  hour: "7pm",
  weekday: "Saturday",
  value: 3057
}, {
  hour: "8pm",
  weekday: "Saturday",
  value: 3227
}, {
  hour: "9pm",
  weekday: "Saturday",
  value: 3060
}, {
  hour: "10pm",
  weekday: "Saturday",
  value: 2855
}, {
  hour: "11pm",
  weekday: "Saturday",
  value: 2625
}];

series.data.setAll(data);

yAxis.data.setAll([
  { weekday: "Sunday" },
  { weekday: "Monday" },
  { weekday: "Tuesday" },
  { weekday: "Wednesday" },
  { weekday: "Thursday" },
  { weekday: "Friday" },
  { weekday: "Saturday" }
]);

xAxis.data.setAll([
  { hour: "12am" },
  { hour: "1am" },
  { hour: "2am" },
  { hour: "3am" },
  { hour: "4am" },
  { hour: "5am" },
  { hour: "6am" },
  { hour: "7am" },
  { hour: "8am" },
  { hour: "9am" },
  { hour: "10am" },
  { hour: "11am" },
  { hour: "12pm" },
  { hour: "1pm" },
  { hour: "2pm" },
  { hour: "3pm" },
  { hour: "4pm" },
  { hour: "5pm" },
  { hour: "6pm" },
  { hour: "7pm" },
  { hour: "8pm" },
  { hour: "9pm" },
  { hour: "10pm" },
  { hour: "11pm" }
]);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
chart.appear(1000, 100);

// Every second, move each value up to 20% above or below its starting value
setInterval(function () {
  am5.array.each(data, function (d, i) {
    series.data.setIndex(i, {
      value: d.value * (0.8 + Math.random() * 0.4), // 80% to 120% of the starting value
      hour: d.hour,
      weekday: d.weekday
    });
  });
}, 1000);
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
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
