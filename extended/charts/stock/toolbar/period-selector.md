---
title: "Period selector"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/period-selector/"
scraped: "2026-10-08"
---

Period selector is a [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/) control that displays buttons for predefined periods. Those can be used to single-click zoom to some useful pre-defined period, such as 1 month, year-to-date, etc.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart
    })
  \]
});


## Zoom anchor point

By default, clicking on a period button, will select a range of dates that ends with the last timestamp on the X-axis scale.

If we'd rather make it zoom from the start of the axis, we can set period selector's `zoomTo` setting to `"start"`:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      zoomTo: "start"
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      zoomTo: "start"
    })
  \]
});

## Period list

A list of pre-defined periods can be set via control's `periods` setting.

It accepts a list of objects that holds time unit (`"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`, and two special units: `"ytd"` and `"max"`), count, and a name.

Defaults are as follows:

\[
  { timeUnit: "day", count: 1, name: "1D" },
  { timeUnit: "day", count: 5, name: "5D" },
  { timeUnit: "month", count: 1, name: "1M" },
  { timeUnit: "month", count: 3, name: "3M" },
  { timeUnit: "month", count: 6, name: "6M" },
  { timeUnit: "ytd", name: "YTD" },
  { timeUnit: "year", count: 1, name: "1Y" },
  { timeUnit: "year", count: 2, name: "2Y" },
  { timeUnit: "year", count: 5, name: "5Y" },
  { timeUnit: "max", name: "Max" },
\]

Should we want to, we can modify it to our needs:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: \[
        { timeUnit: "month", count: 1, name: "1M" },
        { timeUnit: "ytd", name: "YTD" },
        { timeUnit: "year", count: 1, name: "1Y" },
        { timeUnit: "max", name: "Max" },
      \]
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: \[
        { timeUnit: "month", count: 1, name: "1M" },
        { timeUnit: "ytd", name: "YTD" },
        { timeUnit: "year", count: 1, name: "1Y" },
        { timeUnit: "max", name: "Max" },
      \]
    })
  \]
});

### Custom periods

We can also use `"custom"` type periods in `periods` list.

Those need to have their `start` or `end` properties set to a Date object.

If `start` is not set, the button will assume the earliest date available in chart.

Similarly, if `end` is not set, it will assume the timestamp of the end of data.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: \[
        { timeUnit: "custom", name: "2022", from: new Date(2022, 0, 1), to: new Date(2022, 11, 31, 23, 59, 59 },
        { timeUnit: "custom", name: "2023", from: new Date(2023, 0, 1), to: new Date(2023, 11, 31, 23, 59, 59 }
      \]
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.PeriodSelector.new(root, {
      stockChart: stockChart,
      periods: \[
        { timeUnit: "custom", name: "2022", from: new Date(2022, 0, 1), to: new Date(2022, 11, 31, 23, 59, 59 },
        { timeUnit: "custom", name: "2023", from: new Date(2023, 0, 1), to: new Date(2023, 11, 31, 23, 59, 59 }
      \]
    })
  \]
});

## Pre-selecting a period

If we want the chart to start up with some period pre-selected, we can use period selector's `selectPeriod()` method.

It accepts a period definition as a parameter, e.g.:

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });

However, since chart starts off without data, and thus no scale on a date axis, we would probably need to call this when data is parsed:

valueSeries.events.once("datavalidated", function() {
  periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
});

valueSeries.events.once("datavalidated", function() {
  periodSelector.selectPeriod({ timeUnit: "month", count: 6 });
});

## Standalone usage / API

Period selector can also be used as a standalone object, without adding it to a stock toolbar:

let periodSelector = am5stock.PeriodSelector.new(root, {
  stockChart: stockChart
});

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });

var periodSelector = am5stock.PeriodSelector.new(root, {
  stockChart: stockChart
});

periodSelector.selectPeriod({ timeUnit: "month", count: 6 });

## Date range selector

Period selector works well together with [date range selector](https://www.amcharts.com/docs/v5/charts/stock/toolbar/date-range-selector/) control.

## Related class references

-   [PeriodSelector](https://www.amcharts.com/docs/v5/reference/periodselector)
