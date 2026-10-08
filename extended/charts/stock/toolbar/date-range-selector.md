---
title: "Date range selector"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/date-range-selector/"
scraped: "2026-10-08"
---

Date range selector control allows picking out start and end dates for the chart zoom to. It can either use interactive calendar widget or date input fields.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart
    })
  \]
});


## Date format

Date range selector will automatically use [global date format](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/#global-date-format) specified in the root element's date formatter.

The format will be used both to format dates displayed in the input fields, as well as parse user-typed dates.

Should we need to, we can override it using control's `dateFormat` setting:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart,
      dateFormat: "yyyy-MM-dd"
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart,
      dateFormat: "yyyy-MM-dd"
    })
  \]
});

Please refer to "[Formatting dates](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/#format-codes)" for syntax reference.

## Restricting date range

By default, the range selector will allow selecting dates within actual scope of data on the chart.

We can use its settings `minDate` and `maxDate` to change that behavior.

Both settings can accept either `Date` object, `"auto"` (default), or `null`.

`Date` object means specific date. Setting it to on `minDate` for example will allow selecting dates only on or after that timestamp.

`"auto"` (default) means actual start or end of data.

`null` - no restrictions.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart,
      minDate: new Date(2023, 2, 1),
      maxDate: null
    })
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DateRangeSelector.new(root, {
      stockChart: stockChart,
      minDate: new Date(2023, 2, 1),
      maxDate: null
    })
  \]
});

## Period selector

Date range selector works well with [period selector](https://www.amcharts.com/docs/v5/period-selector/) control.
