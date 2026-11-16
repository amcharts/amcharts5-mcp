---
title: "Reset control"
source: "https://docs.amcharts.com/v5/charts/stock/toolbar/reset-control/"
scraped: "2026-11-16"
---

Reset control adds a simple button to stock toolbar, which upon click will remove all drawings/annotations as well as indicators added to chart.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```

JavaScript:

```js
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    })
  ]
});
```

Example: [Stock chart controls](https://docs.amcharts.com/embeds/v5/stock-chart-controls/). Its code: get_example(path: "examples/docs-demos/stock-chart-controls").

## Alignment

Reset control is aligned to right by default.

If we'd like it to go left - with the rest of the controls - we can set its `align: "left"` setting.

TypeScript:

```ts
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart,
      align: "left"
    })
  ]
});
```

JavaScript:

```js
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: [
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart,
      align: "left"
    })
  ]
});
```
