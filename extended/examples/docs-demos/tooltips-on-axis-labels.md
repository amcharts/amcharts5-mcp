---
title: "Tooltips on axis labels"
source: "https://docs.amcharts.com/embeds/v5/tooltips-on-axis-labels/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/labels"]
---

A demo from the docs page "Labels" (get_doc(path: "concepts/common-elements/labels")).

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

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: false,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

// Add legend
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.push(
  am5.Legend.new(root, {
    centerX: am5.p50,
    x: am5.p50
  })
);

var data = [
  {
    category: "This is a very long label",
    europe: 2.5,
    namerica: 2.5,
    asia: 2.1,
    lamerica: 1,
    meast: 0.8,
    africa: 0.4
  },
  {
    category: "And this one is even longer",
    europe: 2.6,
    namerica: 2.7,
    asia: 2.2,
    lamerica: 0.5,
    meast: 0.4,
    africa: 0.3
  },
  {
    category: "No, this one leaves the other two in the dust",
    europe: 2.8,
    namerica: 2.9,
    asia: 2.4,
    lamerica: 0.3,
    meast: 0.9,
    africa: 0.5
  }
];

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9
    }),

    tooltip: am5.Tooltip.new(root, {})
  })
);

xAxis.labelsContainer.set(
  "tooltip",
  am5.Tooltip.new(root, {
    pointerOrientation: "down"
  })
);

var xRenderer = xAxis.get("renderer");

xRenderer.labels.template.setAll({
  tooltipText: "{category}",
  oversizedBehavior: "truncate",
  maxWidth: 100
});

xRenderer.labels.template.setup = function (target) {
  target.set(
    "background",
    am5.Rectangle.new(root, {
      fill: am5.color(0x000000),
      fillOpacity: 0
    })
  );
};

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: fieldName,
      categoryXField: "category"
    })
  );

  series.columns.template.setAll({
    tooltipText: "{name}, {categoryX}:{valueY}",
    width: am5.percent(90),
    tooltipY: 0
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  series.data.setAll(data);
  series.appear();
  legend.data.push(series);
}

makeSeries("Europe", "europe");
makeSeries("North America", "namerica");
makeSeries("Asia", "asia");
makeSeries("Latin America", "lamerica");
makeSeries("Middle East", "meast");
makeSeries("Africa", "africa");

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
  height: 95vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
