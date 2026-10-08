---
title: "Radar Chart"
source: "https://www.amcharts.com/demos/radar-chart/"
category: "radar-polar"
scraped: "2026-10-08"
---

A radar chart, also called a spider or web chart, puts each category on its own spoke and joins the values into one shape. Here, nine countries, one value each.

When a radar chart works: A radar chart turns a row of values into a shape, so one item’s strong and weak points show at a glance. It works best with five to ten categories that share one scale, like scores or ratings. The order of the spokes changes the shape, so the shape alone shouldn’t carry the message.

Good for:
- Ratings or scores on several criteria
- One profile against a target or an average
- Showing balance: which values stick out

Think twice when:
- Categories on different scales: the shape means nothing
- Ranking many items: a bar chart is easier to read
- More than three shapes on top of each other

Prompt: Create a radar (spider) chart comparing nine countries around the circle, drawn as one line with a light filled area and round bullets at each point, with a cursor and value tooltips. Use the amCharts 5 library with its Responsive theme.

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
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,    // no dragging the plot around
  panY: false,
  wheelX: "panX", // a horizontal wheel or trackpad swipe moves a zoomed view around...
  wheelY: "zoomX" // ...and the vertical wheel zooms in on some countries
}));

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  // drag around the circle to zoom in on a few countries
  behavior: "zoomX"
}));

cursor.lineY.set("visible", false); // no circle through the pointer, only the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// a small minGridDistance keeps every country's name, also on a small chart
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 20
});
xRenderer.labels.template.setAll({
  radius: 10 // the country names sit 10px outside the circle
});

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0, // can't be zoomed or panned past the first or last country
  categoryField: "country",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {}) // shows the country under the pointer at the edge
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5radar.AxisRendererRadial.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
var series = chart.series.push(am5radar.RadarLineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "litres",
  categoryXField: "country",
  tooltip:am5.Tooltip.new(root, {
    labelText:"{valueY}" // just the value
  })
}));

series.strokes.template.setAll({
  strokeWidth: 2 // a 2px line
});

// a light fill inside the line, so the shape reads at a glance
series.fills.template.setAll({
  visible: true,
  fillOpacity: 0.2
});

// a dot on each country's value
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 5,               // 5px dots
      fill: series.get("fill") // the series color
    })
  });
});

// Set data
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [{
  "country": "Lithuania",
  "litres": 501
}, {
  "country": "Czechia",
  "litres": 301
}, {
  "country": "Ireland",
  "litres": 266
}, {
  "country": "Germany",
  "litres": 165
}, {
  "country": "Australia",
  "litres": 139
}, {
  "country": "Austria",
  "litres": 336
}, {
  "country": "UK",
  "litres": 290
}, {
  "country": "Belgium",
  "litres": 325
}, {
  "country": "The Netherlands",
  "litres": 40
}];
series.data.setAll(data);
xAxis.data.setAll(data);

// Animate chart and series in
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
series.appear(1000);
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
- https://cdn.amcharts.com/lib/5/radar.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
