---
title: "Canvas and SVG renderers"
source: "https://docs.amcharts.com/embeds/v5/canvas-and-svg-renderers/"
category: "docs-demos"
scraped: "2026-11-25"
docsPages: ["getting-started/root-element"]
---

A demo from the docs page "Root element" (get_doc(path: "getting-started/root-element")). It shows one setting in isolation: for a chart you build, start the themes with `Animated` and `ResponsiveMax`.

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

function createChart(div, settings) {
  // Create root element
  // https://docs.amcharts.com/v5/getting-started/#root-element
  var root = am5.Root.new(div, settings);

  root.setThemes([am5themes_Animated.new(root)]);

  // Create chart
  // https://docs.amcharts.com/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {}));

  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: am5xy.AxisRendererX.new(root, {})
    })
  );

  var yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    })
  );

  var series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{categoryX}: {valueY}"
      })
    })
  );

  series.columns.template.setAll({
    cornerRadiusTL: 5,
    cornerRadiusTR: 5
  });

  var data = [
    { category: "Research", value: 1000 },
    { category: "Marketing", value: 1200 },
    { category: "Sales", value: 850 },
    { category: "Support", value: 600 }
  ];

  xAxis.data.setAll(data);
  series.data.setAll(data);

  series.appear(1000);
  chart.appear(1000, 100);
}

// Drawn on canvas (default)
createChart("chartdiv1");

// Drawn as SVG
// https://docs.amcharts.com/v5/getting-started/root-element/#renderer
createChart("chartdiv2", {
  renderer: am5.SVGRenderer
});
```

## HTML

```html
<div id="charts">
  <div>
    <h3>Canvas</h3>
    <div id="chartdiv1" class="chartdiv"></div>
  </div>
  <div>
    <h3>SVG</h3>
    <div id="chartdiv2" class="chartdiv"></div>
  </div>
</div>
```

## CSS

```css
#charts {
  display: flex;
  gap: 20px;
}

#charts > div {
  flex: 1;
}

.chartdiv {
  width: 100%;
  height: 80vh;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
