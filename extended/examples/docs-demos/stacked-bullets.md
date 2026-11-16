---
title: "Stacked bullets"
source: "https://docs.amcharts.com/embeds/v5/stacked-bullets/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["concepts/common-elements/bullets"]
---

A demo from the docs page "Bullets" (get_doc(path: "concepts/common-elements/bullets")).

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

// Add data
var data = [
  {
    category: "Marketing",
    value: 250
  },
  {
    category: "Sales",
    value: 350
  },
  {
    category: "Research & Development",
    value: 310
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

xAxis.get("renderer").labels.template.set("forceHidden", true);
xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraMax: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

yAxis.get("renderer").labels.template.set("forceHidden", true);

// Add series
// https://docs.amcharts.com/v5/charts/xy-chart/series/

var series = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "budget",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    categoryXField: "category"
  })
);

series.strokes.template.setAll({
  strokeWidth: 3
});

// Bullet #1
series.bullets.push(function (root, series) {
  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: am5.Circle.new(root, {
      radius: 8,
      stroke: series.get("fill"),
      strokeWidth: 3,
      fill: am5.color(0xffffff)
    })
  });
});

// Bullet #2
series.bullets.push(function (root, series) {
  // Bullet container
  var container = am5.Container.new(root, {
    rotation: 0
  });

  // Circle
  var circle = container.children.push(
    am5.Container.new(root, {
      centerX: am5.p50,
      centerY: am5.p100,
      dy: -15,
      width: 40,
      height: 40,
      background: am5.RoundedRectangle.new(root, {
        stroke: am5.color(0x000000),
        strokeOpacity: 1,
        strokeWidth: 1,
        fill: am5.color(0xffffff),
        fillOpacity: 0.8,
        cornerRadiusTL: 20,
        cornerRadiusTR: 20,
        cornerRadiusBR: 20,
        cornerRadiusBL: 20
      })
    })
  );

  // Label
  circle.children.push(
    am5.Label.new(root, {
      text: "{valueY}",
      oversizedBehavior: "wrap",
      maxWidth: 40,
      fontSize: 15,
      fontWeight: "bold",
      x: am5.p50,
      centerX: am5.p50,
      y: am5.p50,
      centerY: am5.p50,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      populateText: true
    })
  );

  // Stem
  container.children.push(
    am5.Line.new(root, {
      stroke: am5.color(0x000000),
      strokeOpacity: 1,
      strokeWidth: 1,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: -15 }
      ]
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: container
  });
});

// Bullet #3
series.bullets.push(function (root, series) {
  // Bullet container
  var container = am5.Container.new(root, {
    rotation: 0
  });

  // Box
  var box = container.children.push(
    am5.Container.new(root, {
      centerX: am5.p50,
      centerY: am5.p100,
      dy: -15,
      background: am5.RoundedRectangle.new(root, {
        stroke: am5.color(0x000000),
        strokeOpacity: 1,
        strokeWidth: 1,
        fill: am5.color(0xffffff),
        fillOpacity: 0.8,
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        cornerRadiusBR: 5,
        cornerRadiusBL: 5
      })
    })
  );

  // Label
  box.children.push(
    am5.Label.new(root, {
      text: "{categoryX}",
      oversizedBehavior: "wrap",
      maxWidth: 120,
      fontSize: 15,
      textAlign: "center",
      x: am5.p50,
      centerX: am5.p50,
      y: am5.p50,
      centerY: am5.p50,
      populateText: true
    })
  );

  // Stem
  container.children.push(
    am5.Line.new(root, {
      stroke: am5.color(0x000000),
      strokeOpacity: 1,
      strokeWidth: 1,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: -15 }
      ]
    })
  );

  return am5.Bullet.new(root, {
    locationY: 0.5,
    stacked: "up",
    sprite: container
  });
});

series.data.setAll(data);
series.appear();

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
  height: 94vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
