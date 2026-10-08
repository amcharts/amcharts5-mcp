---
title: "Flower Chart"
source: "https://www.amcharts.com/demos/flower-chart/"
category: "radar-polar"
scraped: "2026-10-08"
---

A radar column chart where the columns fill only the middle of each slice, so they stand apart like petals. Here, two coffees scored on eight tasting notes.

When a flower chart works: A flower chart compares two or three profiles across the same criteria, petal by petal. Unlike a filled radar, the petals don’t cover each other, so every score stays visible. It reads best when the scores share one scale, here 0 to 10.

Good for:
- Tasting notes, reviews and ratings
- Two products or players side by side
- Profiles where every criterion counts on its own

Think twice when:
- More than three profiles: the petals get thin
- Criteria on different scales
- Exact differences: a grouped bar chart lines them up

Prompt: Create a flower chart: a radar chart comparing light and dark roast coffee scored on eight tasting notes (sample data), with columns that fill only the middle of each slice so they look like petals, and a legend. Use the amCharts 5 library with its Responsive theme.

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

// Data: two coffees scored from 0 to 10 on eight tasting notes (sample data)
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Setting_data
var data = [{
  note: "Acidity",
  light: 8,
  dark: 3
}, {
  note: "Fruit",
  light: 8,
  dark: 2
}, {
  note: "Floral",
  light: 7,
  dark: 1
}, {
  note: "Sweetness",
  light: 6,
  dark: 5
}, {
  note: "Body",
  light: 4,
  dark: 8
}, {
  note: "Chocolate",
  light: 3,
  dark: 8
}, {
  note: "Nutty",
  light: 4,
  dark: 6
}, {
  note: "Bitterness",
  light: 2,
  dark: 8
}];

// Create chart
// https://www.amcharts.com/docs/v5/charts/radar-chart/
var chart = root.container.children.push(
  am5radar.RadarChart.new(root, {
    panX: false,    // no panning: a drag zooms in instead
    // a vertical layout puts the legend under the chart
    layout: root.verticalLayout,
    panY: false,
    wheelX: "panX", // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX" // ...and the vertical wheel zooms in on the notes
  })
);

// each new series moves three colors on in the palette, so the two coffees don't take look-alike neighbors
chart.get("colors").set("step", 3);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX" // drag around the circle to zoom in on a few notes
}));

cursor.lineY.set("visible", false); // no ring at the pointer's distance, just the line from the center

// Create axes and their renderers
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
// The columns fill only the middle of each slice (from 20% to 80%), so they stand apart like petals
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  cellStartLocation: 0.2,
  cellEndLocation: 0.8,
  minGridDistance: 20 // at least 20px between labels around the circle
});

xRenderer.labels.template.setAll({
  radius: 10 // the labels 10px outside the circle
});

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    maxDeviation: 0,                   // no panning past the first or last note
    categoryField: "note",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {}) // shows the hovered note
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,  // the scale runs from 0...
    max: 10, // ...to 10
    // the scale stays exactly 0 to 10 instead of being rounded out
    strictMinMax: true,
    renderer: am5radar.AxisRendererRadial.new(root, {})
  })
);

// Create series: one per coffee, side by side in each slice
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
function createSeries(name, field) {
  var series = chart.series.push(
    am5radar.RadarColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "note"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}: {valueY} of 10", // as "Light roast: 8 of 10"
    width: am5.percent(100)                // the two columns together fill the slice's middle, with no gap
  });

  series.data.setAll(data);

  series.appear(1000);
}

createSeries("Light roast", "light");
createSeries("Dark roast", "dark");


// Add legend: click a coffee to hide it
// https://www.amcharts.com/docs/v5/charts/radar-chart/#Legend
var legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50, // the legend's middle...
  x: am5.p50        // ...at the middle of the chart
}));
legend.data.setAll(chart.series.values);

// Animate chart
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
