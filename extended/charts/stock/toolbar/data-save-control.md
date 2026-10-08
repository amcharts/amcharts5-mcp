---
title: "Data save control"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/data-save-control/"
scraped: "2026-10-08"
---

Data save control when added to [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/) will provide users a way to save current indicators and drawings to browser's local storage so that they can be restored afterwards.

## What it does?

Adding Data save control will add ability for the users to retain their annotations - drawings and indicators - across multiple sessions.

It allows two modes of operation:

-   Manual
-   Automatic

### Manual mode

In manual mode (enabled by default), users can choose to when save current annotations to local browser storage.

At the moment when they select "Save drawings & indicators", the snapshot of the annotations is saved and retained in browser's storage.

To restore the annotations, users can select "Restore saved data".

The data can be cleared by selecting "Clear" option.


### Automatic mode

Automatic mode can be enabled by selecting "Auto-save drawings and indicators".

When enabled, the chart will automatically save all changes to drawings and indicators (including deletion) to browser's memory.

The automatic mode will persists across page reloads and even sessions.

It will automatically load the same annotations that were on the chart when the page was closed or navigated away from.

## What it doesn't do?

Data saver control saves ONLY drawings and indicators as well as their settings.

It DOES NOT save:

-   Zoom position
-   Chart settings
-   Any series settings
-   Any other selection like main series type, selected main or compared indexes, etc.

If we'd need to store current state of any of the above, we'd need to implement custom code to do so.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

## Storage scope

The way local storage in works in browsers is that it is shared across all of pages within the same domain.

To isolate stored data for each individual chart we use a unique ID to identify it.

By default the ID consists of a full URL of the current page + ID of the `<div>` element the chart is placed in.

This way, data will be stored for each individual chart, even if they are on the same page.

While this ensure data isolation, it might not suit all of the scenarios, e.g. if the page uses hash tags to identify various options, but essentially displays the same chart.

For such scenarios, we can use a manually provided storage id via `storageId` setting:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123"
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123"
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

The above will ensure that any chart that we set `storageId: "myChart123"` will use the same storage for saved indicators and drawings and will save and restore them across all reloads and sessions.

## Pre-enabling auto-save mode

By default, automatic save mode is turned off.

We can turn it on by setting `autoSave` setting to `true`:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123",
      autoSave: true
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DataSaveControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123",
      autoSave: true
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

NOTEAutomatic node will be turned on regardless of this setting if user explicitly check auto-save box.

## Relation to Settings control

Auto-saving can be enabled via [Settings control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/settings-control/), too.


If you already have Data save control added to the Stock toolbar, the auto-save functionality in Settings control will use the same configuration options.

If there's no Data save control (which is optional), we can configure auto-save related options via Settings control's settings:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123",
      autoSave: true
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      storageId: "myChart123",
      autoSave: true
    })
  \]
});
