---
title: "Stock annotations"
source: "https://www.amcharts.com/docs/v5/charts/stock/stock-annotations/"
scraped: "2026-03-15"
---

[Stock chart](https://www.amcharts.com/docs/v5/charts/stock/) can be annotated using a vast array of tools ranging from simple shapes and doodles, to complex calculated indicators.

## Enabling UI

To enable annotation user interface, we need to add a [drawing control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/) to the stock toolbar.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    })
  \]
});


## Removing annotations

### Eraser tool

Once chart is in drawing mode - when user clicks drawing control - they can select an eraser tool from the drawing menu.

When eraser tool is selected, clicking on any annotation will remove it.

### Reset control

If the toolbar contains a [reset control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/reset-control/), it can be clicked to automatically remove all annotations from the chart.

## Drawing on fills

Normally, annotation/drawing fill is part of it and will react on click/drags, which makes it impossible to draw other annotations on top.

E.g. if we draw a rectangle, we can't draw a doodle inside it.

Should we want to have such capability, we need to disable interactivity of drawings' fills.

This can be done by implementing a [custom theme](https://www.amcharts.com/docs/v5/concepts/themes/creating-themes/):

const myTheme = am5.Theme.new(root);

myTheme.this.rule("Graphics", \["series", "fill", "drawing"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

var myTheme = am5.Theme.new(root);

myTheme.this.rule("Graphics", \["series", "fill", "drawing"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

Or, if we'd like to target only specific drawing tools only:

const myTheme = am5.Theme.new(root);

myTheme.this.rule("Graphics", \["series", "parallelchannel", "fill", "drawing"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

var myTheme = am5.Theme.new(root);

myTheme.this.rule("Graphics", \["series", "parallelchannel", "fill", "drawing"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

## Serializing annotations

At this moment serializing and restoring annotations is not yet supported.

The functionality is under development and will be available soon, at which point this section will be updated.
