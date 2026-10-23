---
title: "Column Chart with Patterns"
source: "amcharts5-mcp: written for the skill, checked in a browser with amCharts 5.21.3"
category: "column-bar"
---

A column chart where every column has a fill pattern of its own: diagonal lines, dots, a checkerboard and vertical lines (LinePattern, CirclePattern, RectanglePattern), in black on white, so it reads printed in black and white.

When patterns beat colors: patterns tell columns apart without relying on color, which helps readers with color blindness and survives grayscale printing. Each column gets its pattern through its data row, with a template field on the columns' template. Keep to a handful: past six or seven, patterns get busy.

Good for:
- Charts that must read in print or grayscale
- Accessible charts for color-blind readers
- Marking special columns: forecast, estimate, incomplete

Think twice when:
- Many columns: patterns get busy, use colors and a legend
- Thin columns: patterns need room to show

Things that go wrong:
- `templateField` set on the series instead of on `series.columns.template`: the series ignores it, and the columns stay plain.
- A pattern `color` equal to the fill behind it: the stripes vanish and the column looks solid. The gaps show the column's `fill`, or the pattern's own `fill` if it has one.
- No pattern `color`: the shapes are drawn black whatever the column's colors (5.21.3).
- `rotation` on a LinePattern turns the whole tile, and at 45° its edges show as broken lines. Set the line direction with `angle`.

Prompt: Create a column chart of website visits by traffic source (Search, Social, Email, Direct), with a different black-and-white fill pattern in each column and the value above it. Use the amCharts 5 library.

## JavaScript

```javascript
// Create root and chart
var root = am5.Root.new("chartdiv");

// Set themes
root.setThemes([
  am5themes_Animated.new(root)
]);

var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  paddingLeft: 0
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "source",
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "Visits",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "visits",
  categoryXField: "source",
  tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}: {valueY}" })
}));

var black = am5.color(0x000000);

series.columns.template.setAll({
  width: am5.percent(70),
  fill: am5.color(0xffffff), // white: shows in the gaps between the pattern's shapes
  stroke: black,             // a black outline
  strokeWidth: 2,
  // each column's pattern comes from "columnSettings" in its data row;
  // templateField goes on the columns' template, not on the series
  templateField: "columnSettings"
});

// Value labels above the columns
series.bullets.push(function () {
  return am5.Bullet.new(root, {
    locationY: 1,
    sprite: am5.Label.new(root, {
      text: "{valueY}",
      fill: black,
      centerX: am5.p50,
      centerY: am5.p100,
      populateText: true
    })
  });
});

// One pattern per column, made once here. Each pattern's color is black,
// which contrasts with the white column fill behind it.
var data = [{
  source: "Search",
  visits: 4200,
  columnSettings: {
    fillPattern: am5.LinePattern.new(root, { // lines...
      color: black,  // ...in black...
      angle: 45,     // ...at 45 degrees: angle turns the lines, not the tile...
      strokeWidth: 2,
      gap: 6         // ...6px apart
    })
  }
}, {
  source: "Social",
  visits: 2600,
  columnSettings: {
    fillPattern: am5.CirclePattern.new(root, { // dots...
      color: black, // ...in black...
      radius: 2,    // ...with a 2px radius...
      gap: 5        // ...5px apart
    })
  }
}, {
  source: "Email",
  visits: 1500,
  columnSettings: {
    fillPattern: am5.RectanglePattern.new(root, { // squares...
      color: black,  // ...in black...
      maxWidth: 5,   // ...5px wide...
      maxHeight: 5,  // ...and 5px high...
      gap: 5,        // ...5px apart...
      checkered: true // ...every second one, like a checkerboard
    })
  }
}, {
  source: "Direct",
  visits: 3100,
  columnSettings: {
    fillPattern: am5.LinePattern.new(root, { // lines...
      color: black,  // ...in black...
      angle: 90,     // ...upright...
      strokeWidth: 2,
      gap: 6         // ...6px apart
    })
  }
}];

xAxis.data.setAll(data);
series.data.setAll(data);

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
