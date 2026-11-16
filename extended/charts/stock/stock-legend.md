---
title: "Stock legend"
source: "https://docs.amcharts.com/v5/charts/stock/stock-legend/"
scraped: "2026-11-16"
---

This tutorial looks at various aspects of using the stock chart legend.

## Adding

In stock chart, we can use both the [regular legend](https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/) that we'd use in an XY chart, as well as advanced special "sock legend".

The latter offers enhanced view as well as tools to edit related series/indicators.

To ad a stock legend, we'll use a `StockLegend` class instead of `Legend`:

TypeScript:

```ts
let valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll([valueSeries]);
```

JavaScript:

```js
var valueLegend = mainPanel.plotContainer.children.push(am5stock.StockLegend.new(root, {
  stockChart: stockChart
}));
valueLegend.data.setAll([valueSeries]);
```

The important difference from regular legend is that stock legend is designed to be displayed over the plot area, so we push it into main panel's `plotContainer`.

Another difference is that because of additional functionality, stock legend requires to know what its stock chart it, hence us setting `stockChart` in the above code.

If we wanted we could use a regular legend here as well:

TypeScript:

```ts
let valueLegend = valueAxis.axisHeader.children.push(am5.Legend.new(root, {}));
valueLegend.data.setAll([valueSeries]);
```

JavaScript:

```js
var valueLegend = valueAxis.axisHeader.children.push(am5.Legend.new(root, {}));
valueLegend.data.setAll([valueSeries]);
```

## Settings and close buttons

### Global settings

Stock legend, besides textual information, also displays settings icon, and in some cases close/remove buttons.

Those can be configured using `legend.settingsButtons.template` and `legend.closeButtons.template`.

Those are list templates, meaning that any setting we set on them will be automatically set on any new items that are created in legend.

The following code will disable both of them:

TypeScript:

```ts
valueLegend.settingsButtons.template.set("forceHidden", true);
valueLegend.closeButtons.template.set("forceHidden", true);
```

JavaScript:

```js
valueLegend.settingsButtons.template.set("forceHidden", true);
valueLegend.closeButtons.template.set("forceHidden", true);
```

Both of the templates are of type `Button`. Refer to its [class reference](https://docs.amcharts.com/v5/reference/button/#settings), for a complete list of settings and events we can set.

Example: [Stock Chart with settings and close buttons disabled in the legend](https://docs.amcharts.com/embeds/v5/stock-chart-with-settings-and-close-buttons-disabled-in-the/). Its code: get_example(path: "examples/docs-demos/stock-chart-with-settings-and-close-buttons-disabled-in-the").

### Individual settings

The above section was dealing with applying settings to all legend items.

We are now going to look at ways to apply settings to individual legend items.

Whenever we insert series into legend's data, its setting `legendDataItem` is set automatically.

For stock legend, that is an object of type `IStockLegendDataItem`.

Among other things, it has `settingsButton` and `closeButton` settings, that are set to a `Button` instances for settings and close respectively.

We can grab those instances to configure them individually.

The following code will disable settings icon for "valueSeries":

TypeScript:

```ts
valueLegend.data.setAll([valueSeries, volumeSeries]);
valueSeries.get("legendDataItem").get("settingsButton").set("forceHidden", true);
```

JavaScript:

```js
valueLegend.data.setAll([valueSeries, volumeSeries]);
valueSeries.get("legendDataItem").get("settingsButton").set("forceHidden", true);
```

Example: [Stock Chart with disabled settings icon for single series](https://docs.amcharts.com/embeds/v5/stock-chart-with-disabled-settings-icon-for-single-series/). Its code: get_example(path: "examples/docs-demos/stock-chart-with-disabled-settings-icon-for-single-series").

## Related tutorials

* [Moving icons of a StockLegend to left](https://docs.amcharts.com/v5/tutorials/moving-icons-of-a-stocklegend-to-left/)
* [Modifying series/indicator settings modal](https://docs.amcharts.com/v5/tutorials/modifying-series-indicator-settings-modal/)
