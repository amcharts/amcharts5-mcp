---
title: "Tooltip shadows"
source: "https://docs.amcharts.com/embeds/v5/tooltip-shadows/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/colors-gradients-and-patterns/shadows"]
---

A demo from the docs page "Shadows" (get_doc(path: "concepts/colors-gradients-and-patterns/shadows")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

## JavaScript

```javascript
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Create custom theme
// https://docs.amcharts.com/v5/concepts/themes/#quick-custom-theme
var myTheme = am5.Theme.new(root);

// Add shadow to all tooltips...
myTheme.rule("PointedRectangle", ["tooltip", "background"]).setAll({
  shadowColor: am5.color(0x000000),
  shadowBlur: 10,
  shadowOffsetX: 4,
  shadowOffsetY: 4
});

// ... except axis
myTheme.rule("PointedRectangle", ["tooltip", "background", "axis"]).setAll({
  shadowColor: null
});

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), myTheme]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Add cursor
// https://docs.amcharts.com/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomX"
  })
);

cursor.lineY.set("visible", false);

// The data
var data = [
  {
    year: "1930",
    italy: 1,
    germany: 5,
    uk: 3
  },
  {
    year: "1934",
    italy: 1,
    germany: 2,
    uk: 6
  },
  {
    year: "1938",
    italy: 2,
    germany: 3,
    uk: 1
  },
  {
    year: "1950",
    italy: 3,
    germany: 4,
    uk: 1
  },
  {
    year: "1954",
    italy: 5,
    germany: 1,
    uk: 2
  },
  {
    year: "1958",
    italy: 3,
    germany: 2,
    uk: 1
  },
  {
    year: "1962",
    italy: 1,
    germany: 2,
    uk: 3
  },
  {
    year: "1966",
    italy: 2,
    germany: 1,
    uk: 5
  },
  {
    year: "1970",
    italy: 3,
    germany: 5,
    uk: 2
  },
  {
    year: "1974",
    italy: 4,
    germany: 3,
    uk: 6
  },
  {
    year: "1978",
    italy: 1,
    germany: 2,
    uk: 4
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xRenderer = am5xy.AxisRendererX.new(root, {});
xRenderer.grid.template.set("location", 0.5);
xRenderer.labels.template.setAll({ location: 0.5, multiLocation: 0.5 });

var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "year",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxPrecision: 0,
    renderer: am5xy.AxisRendererY.new(root, {
      inversed: true
    })
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function createSeries(name, field) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      categoryXField: "year"
    })
  );

  var tooltip = series.set(
    "tooltip",
    am5.Tooltip.new(root, {
      pointerOrientation: "horizontal"
    })
  );

  tooltip.label.setAll({
    text: "[bold]{categoryX}:[/]\n[width: 130px]Italy[/] {italy}\n[width: 130px]Germany[/] {germany}\n[width: 130px]United Kingdom[/] {uk}"
  });

  series.bullets.push(() => {
    return am5.Bullet.new(root, {
      sprite: am5.Circle.new(root, {
        radius: 5,
        fill: series.get("fill")
      })
    });
  });

  series.data.setAll(data);
  series.appear(1000);
}

createSeries("Italy", "italy");
createSeries("Germany", "germany");
createSeries("UK", "uk");

// Add scrollbar
// https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
chart.set(
  "scrollbarX",
  am5.Scrollbar.new(root, {
    orientation: "horizontal",
    marginBottom: 20
  })
);

var legend = chart.children.push(am5.Legend.new(root, { centerX: am5.p50, x: am5.p50 }));

legend.data.setAll(chart.series.values);

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
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
  height: 400px;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
