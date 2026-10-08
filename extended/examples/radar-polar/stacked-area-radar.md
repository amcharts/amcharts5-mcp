---
title: "Stacked Area Radar"
source: "https://www.amcharts.com/demos/stacked-area-radar/"
category: "radar-polar"
scraped: "2026-10-08"
---

A radar chart with stacked areas: the inner area is one part, and the outer edge is the total. Here, the cash 24 companies hold abroad and in the US.

When a stacked radar works: Stacking puts two parts of one total on the same spokes: the inner shape is the first part, the outer edge the sum. With the companies sorted by the inner part, the outer spikes show who breaks the pattern. Only the inner part sits on a flat baseline, so reading the outer part alone takes a closer look.

Good for:
- Two or three parts of one total per category
- Many categories in a small, square space
- Spotting the biggest totals at a glance

Think twice when:
- Comparing the outer part alone: use grouped bars
- A handful of categories: a stacked bar chart is clearer
- Values far apart in size: small ones disappear in the middle

Prompt: Create a stacked area radar chart of the cash 24 companies hold abroad and in the US (sample data), with the companies around the circle sorted from most to least cash abroad, and a legend. Use the amCharts 5 library with its Responsive theme.

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
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,     // a drag doesn't pan: the cursor zooms with it
    panY: false,
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX", // ...and the vertical wheel zooms in on the companies
    // a hole big enough for the legend
    innerRadius: am5.percent(45),
    // room around the circle for the company names
    radius: am5.percent(65),
    arrangeTooltips: false // overlapping tooltips aren't moved apart
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on those companies
}));

cursor.lineY.set("visible", false); // no curved cursor line, only the straight one from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 15 // at least 15px between the names
});
xRenderer.labels.template.setAll({
  // the names point outward from the center, like spokes
  textType: "radial",
  radius: 10,       // names start 10px outside the circle
  paddingTop: 0,    // no space above...
  paddingBottom: 0, // ...or below the names
  centerY: am5.p50, // centered on their spoke
  fontSize: 11,     // small text
  // long names are cut short, so they stay inside the chart; the tooltip shows them whole
  maxWidth: 70,
  oversizedBehavior: "truncate"
});

xRenderer.grid.template.setAll({
  // a grid line runs through each company, not between them
  location: 0.5,
  strokeDasharray: [2, 2] // dashed: 2px dashes, 2px gaps
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0, // no panning past the first and last company
    categoryField: "company",
    renderer: xRenderer
  })
);

var yRenderer = am5radar.AxisRendererRadial.new(root, {
  minGridDistance: 30 // at least 30px between the value labels
});

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: yRenderer
  })
);

yRenderer.grid.template.setAll({
  strokeDasharray: [2, 2] // dashed rings
});

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series1 = chart.series.push(
  am5radar.RadarLineSeries.new(root, {
    name: "Cash abroad",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value1",
    categoryXField: "company"
  })
);

series1.strokes.template.setAll({
  strokeWidth: 2,
  strokeOpacity: 0 // no line along the edge, only the fill
});

series1.fills.template.setAll({
  visible: true,   // fill the area...
  fillOpacity: 0.5 // ...half see-through
});

var series2 = chart.series.push(
  am5radar.RadarLineSeries.new(root, {
    name: "Cash in the US",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value2",
    categoryXField: "company",
    stacked: true,                   // the main trick: this area starts where the first one ends
    tooltip: am5.Tooltip.new(root, { // one tooltip shows both values for the company
      labelText: "{categoryX}\nAbroad: ${value1}B\nIn the US: ${value2}B"
    })
  })
);

series2.strokes.template.setAll({
  strokeWidth: 2,
  strokeOpacity: 0 // no line along the edge, only the fill
});

series2.fills.template.setAll({
  visible: true,   // fill the area...
  fillOpacity: 0.5 // ...half see-through
});

// Add legend in the hole: click an item to hide its series
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var legend = chart.radarContainer.children.push(
  am5.Legend.new(root, {
    layout: root.verticalLayout, // one series per row
    centerX: am5.p50,            // centered in the hole...
    centerY: am5.p50             // ...both ways
  })
);
legend.labels.template.set("fontSize", 12); // smaller text
// no values next to the names, so the legend stays centered in the hole
legend.valueLabels.template.set("forceHidden", true);
legend.markers.template.setAll({
  width: 12, // small square markers
  height: 12
});
legend.data.setAll([series1, series2]);

// Set data: cash held by 24 companies abroad and in the US, in billions of dollars (sample data).
// The company field is not called "name": the legend would show it in place of the series names.
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [
  {
    company: "Openlane",
    value1: 160.2,
    value2: 66.9
  },
  {
    company: "Yearin",
    value1: 150.1,
    value2: 50.5
  },
  {
    company: "Goodsilron",
    value1: 120.7,
    value2: 32.3
  },
  {
    company: "Condax",
    value1: 89.4,
    value2: 74.5
  },
  {
    company: "Opentech",
    value1: 78.5,
    value2: 29.7
  },
  {
    company: "Golddex",
    value1: 77.6,
    value2: 102.2
  },
  {
    company: "Isdom",
    value1: 69.8,
    value2: 22.6
  },
  {
    company: "Plusstrip",
    value1: 63.6,
    value2: 45.3
  },
  {
    company: "Kinnamplus",
    value1: 59.7,
    value2: 12.8
  },
  {
    company: "Zumgoity",
    value1: 54.3,
    value2: 19.6
  },
  {
    company: "Stanredtax",
    value1: 52.9,
    value2: 96.3
  },
  {
    company: "Conecom",
    value1: 42.9,
    value2: 11.9
  },
  {
    company: "Zencorporation",
    value1: 40.9,
    value2: 16.8
  },
  {
    company: "Iselectrics",
    value1: 39.2,
    value2: 9.9
  },
  {
    company: "Treequote",
    value1: 36.6,
    value2: 36.9
  },
  {
    company: "Sumace",
    value1: 34.8,
    value2: 14.6
  },
  {
    company: "Lexiqvolax",
    value1: 32.1,
    value2: 35.6
  },
  {
    company: "Sunnamplex",
    value1: 31.8,
    value2: 5.9
  },
  {
    company: "Faxquote",
    value1: 29.3,
    value2: 14.7
  },
  {
    company: "Donware",
    value1: 23.0,
    value2: 2.8
  },
  {
    company: "Warephase",
    value1: 21.5,
    value2: 12.1
  },
  {
    company: "Donquadtech",
    value1: 19.7,
    value2: 10.8
  },
  {
    company: "Nam-zim",
    value1: 15.5,
    value2: 4.1
  },
  {
    company: "Y-corporation",
    value1: 14.2,
    value2: 11.3
  }
];

series1.data.setAll(data);
series2.data.setAll(data);
xAxis.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series1.appear(1000);
series2.appear(1000);
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
  height: 600px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
