---
title: "Partitioned Bar Chart"
source: "https://www.amcharts.com/demos/partitioned-bar-chart/"
category: "column-bar"
scraped: "2026-10-08"
---

A bar chart split into groups along its axis: sales in the 48 mainland states and DC, grouped into four regions. Each region has its own color and its name on a line across the axis.

When to partition the bars: Grouping the bars by region, and sorting them within each group, answers two questions at once: which states sell most, and how the regions compare. The lines across the axis keep each group together, even where the colors are hard to tell apart. With values this uneven, a log scale shows the small states a plain scale squashes.

Good for:
- Sales by state, store or product line
- Long lists that fall into groups
- Rankings within each group

Think twice when:
- Comparing the group totals: one bar per group does it
- More than about 50 bars: the labels thin out
- A log scale for a general audience: say so on the chart

Prompt: Create a horizontal bar chart of sales in the mainland US states, grouped into four regions, sorted by sales within each region and colored by region, with each region’s name beside its group. Add a cursor, tooltips and a legend of the regions. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,                 // no dragging to pan...
  panY: false,                 // ...in either direction...
  wheelX: "none",              // ...and no wheel zooming...
  wheelY: "none",              // ...at all
  layout: root.verticalLayout, // the legend and the plot stacked top to bottom
  paddingLeft: 0,              // the state names sit at the chart's left edge
  paddingRight: 25             // room for the last sales label, centered on the axis end
}));

// Add legend above the chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legendData = []; // filled by createRange() below
var legend = chart.children.unshift(
  // a legend of plain data (names and colors), not series; its items don't react to clicks
  am5.Legend.new(root, {
    nameField: "name",  // item names from the data's name field...
    fillField: "color", // ...and marker colors from its color field
    strokeField: "color",
    centerX: am5.p50,   // the legend's middle...
    x: am5.p50,         // ...at the middle of the chart's width
    marginBottom: 15,   // 15px above the plot
    clickTarget: "none"
  })
);

var data = [{
  region: "Central",
  state: "North Dakota",
  sales: 920
}, {
  region: "Central",
  state: "South Dakota",
  sales: 1317
}, {
  region: "Central",
  state: "Kansas",
  sales: 2916
}, {
  region: "Central",
  state: "Iowa",
  sales: 4577
}, {
  region: "Central",
  state: "Nebraska",
  sales: 7464
}, {
  region: "Central",
  state: "Oklahoma",
  sales: 19686
}, {
  region: "Central",
  state: "Missouri",
  sales: 22207
}, {
  region: "Central",
  state: "Minnesota",
  sales: 29865
}, {
  region: "Central",
  state: "Wisconsin",
  sales: 32125
}, {
  region: "Central",
  state: "Indiana",
  sales: 53549
}, {
  region: "Central",
  state: "Michigan",
  sales: 76281
}, {
  region: "Central",
  state: "Illinois",
  sales: 80162
}, {
  region: "Central",
  state: "Texas",
  sales: 170187
}, {
  region: "East",
  state: "West Virginia",
  sales: 1209
}, {
  region: "East",
  state: "Maine",
  sales: 1270
}, {
  region: "East",
  state: "District of Columbia",
  sales: 2866
}, {
  region: "East",
  state: "New Hampshire",
  sales: 7294
}, {
  region: "East",
  state: "Vermont",
  sales: 8929
}, {
  region: "East",
  state: "Connecticut",
  sales: 13386
}, {
  region: "East",
  state: "Rhode Island",
  sales: 22629
}, {
  region: "East",
  state: "Maryland",
  sales: 23707
}, {
  region: "East",
  state: "Delaware",
  sales: 27453
}, {
  region: "East",
  state: "Massachusetts",
  sales: 28639
}, {
  region: "East",
  state: "New Jersey",
  sales: 35763
}, {
  region: "East",
  state: "Ohio",
  sales: 78253
}, {
  region: "East",
  state: "Pennsylvania",
  sales: 116522
}, {
  region: "East",
  state: "New York",
  sales: 310914
}, {
  region: "South",
  state: "South Carolina",
  sales: 8483
}, {
  region: "South",
  state: "Louisiana",
  sales: 9219
}, {
  region: "South",
  state: "Mississippi",
  sales: 10772
}, {
  region: "South",
  state: "Arkansas",
  sales: 11678
}, {
  region: "South",
  state: "Alabama",
  sales: 19511
}, {
  region: "South",
  state: "Tennessee",
  sales: 30662
}, {
  region: "South",
  state: "Kentucky",
  sales: 36598
}, {
  region: "South",
  state: "Georgia",
  sales: 49103
}, {
  region: "South",
  state: "North Carolina",
  sales: 55604
}, {
  region: "South",
  state: "Virginia",
  sales: 70641
}, {
  region: "South",
  state: "Florida",
  sales: 89479
}, {
  region: "West",
  state: "Wyoming",
  sales: 1603
}, {
  region: "West",
  state: "Idaho",
  sales: 4380
}, {
  region: "West",
  state: "New Mexico",
  sales: 4779
}, {
  region: "West",
  state: "Montana",
  sales: 5589
}, {
  region: "West",
  state: "Utah",
  sales: 11223
}, {
  region: "West",
  state: "Nevada",
  sales: 16729
}, {
  region: "West",
  state: "Oregon",
  sales: 17431
}, {
  region: "West",
  state: "Colorado",
  sales: 32110
}, {
  region: "West",
  state: "Arizona",
  sales: 35283
}, {
  region: "West",
  state: "Washington",
  sales: 138656
}, {
  region: "West",
  state: "California",
  sales: 457731
}];

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "state",
  renderer: am5xy.AxisRendererY.new(root, {
    minGridDistance: 10,   // labels as close as 10px apart, so every state fits
    minorGridEnabled: true // fainter grid lines between the labeled ones
  }),
  tooltip: am5.Tooltip.new(root, {}) // a state label follows the cursor along the axis
}));

yAxis.get("renderer").labels.template.setAll({
  fontSize: 12, // small labels...
  location: 0.5 // ...in the middle of each state's row
})

yAxis.data.setAll(data);

var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {}),
  tooltip: am5.Tooltip.new(root, {}) // a sales label follows the cursor along the axis
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueXField: "sales",
  categoryYField: "state",
  tooltip: am5.Tooltip.new(root, {
    pointerOrientation: "horizontal" // the tooltip sits beside the bar
  })
}));

series.columns.template.setAll({
  tooltipText: "{categoryY}: [bold]{valueX}[/]", // the state and its sales on hover
  height: am5.percent(80), // each bar fills 80% of its row
  strokeOpacity: 0, // no outline
  templateField: "columnSettings" // the fill color from the data's columnSettings
});

// Each bar takes its region's color, through the columnSettings field in its data
var regionColors = {
  Central: chart.get("colors").getIndex(0),
  East: chart.get("colors").getIndex(1),
  South: chart.get("colors").getIndex(2),
  West: chart.get("colors").getIndex(3)
};

am5.array.each(data, function(item) {
  item.columnSettings = { fill: regionColors[item.region] };
});

series.data.setAll(data);

// a line after a region's last state, with a tick and the region's name 130px out to the left
function createRange(label, category, color) {
  var rangeDataItem = yAxis.makeDataItem({
    category: category // the region's last state
  });

  var range = yAxis.createAxisRange(rangeDataItem);

  rangeDataItem.get("label").setAll({
    fill: color,        // in the region's color...
    text: label,
    location: 1,        // ...at the far edge of the state's row...
    fontWeight: "bold", // ...in bold...
    dx: -130            // ...130px out to the left
  });

  rangeDataItem.get("grid").setAll({
    stroke: color, // a solid line in the region's color...
    strokeOpacity: 1,
    location: 1    // ...on the edge between the regions
  });

  rangeDataItem.get("tick").setAll({
    stroke: color, // a tick in the region's color...
    strokeOpacity: 1,
    location: 1,
    visible: true, // ...shown (ticks are hidden by default)...
    length: 130    // ...130px long, out to the region's name
  });

  legendData.push({ name: label, color: color }); // a legend item for the region

}

createRange("Central", "Texas", regionColors.Central);
createRange("East", "New York", regionColors.East);
createRange("South", "Florida", regionColors.South);
createRange("West", "California", regionColors.West);

legend.data.setAll(legendData);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis // the cursor snaps to the states
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear();
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
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
