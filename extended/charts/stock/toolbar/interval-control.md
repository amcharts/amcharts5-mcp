---
title: "Interval control"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/interval-control/"
scraped: "2026-10-08"
---

Interval control is a dropdown list of intervals for user to choose from. Implementer can add it to a [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/), augment it with custom functionality to load/set appropriate data as well as related settings.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

// Add series type control
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    intervalControl
  \]
});

// Add series type control
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    intervalControl
  \]
});

This will add a control, but it won't be useful because it does not do anything beyond allowing to select from the list. We will need to add an event that would actually handle the switch of the interval.

## Event

To catch the moment user chooses something from the list, we'll use control's `selected` event:

let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // ...
}

var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // ...
}

In the above code, whenever new interval is selected from the list, our custom function `setDataInterval()` is invoked, with interval passed in as an identifier.

At this point our custom code should:

-   Load data suitable for target granularity.
-   Update `baseInterval` setting on a related `DateAxis`.
-   Set settings to main and other series.

IMPORTANT`baseInterval` is used when parsing data, so it needs to be set **before** series data.

let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // Load external data
  am5.net.load("/data/mydata.php?timeUnit=" + interval.timeUnit + "&count=" + interval.count).then(function(result) {

    dateAxis.set("baseInterval", interval);
    valueSeries.data.setAll(am5.JSONParser.parse(result.response));
  });
}

var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart
});

intervalControl.events.on("selected", function(ev) {
  setDataInterval(ev.item.interval);
});

function setDataInterval(interval) {
  // Load external data
  am5.net.load("/data/mydata.php?timeUnit=" + interval.timeUnit + "&count=" + interval.count).then(function(result) {
    dateAxis.set("baseInterval", interval);
    valueSeries.data.setAll(am5.JSONParser.parse(result.response));
  });
}

NOTEIf you have a scrollbar with preview in your chart, you might also want to update data of its series, and `baseInterval` of its date axis. Please refer to a live example on this page for a demo.

MORE INFOFor more information about loading and parsing external data, please refer to "[External data](https://www.amcharts.com/docs/v5/concepts/data/#External_data)" tutorial.

## Interval list

To provide a custom list of intervals, use control's `items` setting.

Default is:

\[
  { id: "1 minute", label: "1 minute", interval: { timeUnit: "minute", count: 1 } },
  { id: "2 minute", label: "2 minutes", interval: { timeUnit: "minute", count: 2 } },
  { id: "5 minute", label: "5 minutes", interval: { timeUnit: "minute", count: 5 } },
  { id: "15 minute", label: "15 minutes", interval: { timeUnit: "minute", count: 15 } },
  { id: "30 minute", label: "30 minutes", interval: { timeUnit: "minute", count: 30 } },
  { id: "1 hour", label: "1 hour", interval: { timeUnit: "hour", count: 1 } },
  { id: "4 hour", label: "4 hours", interval: { timeUnit: "hour", count: 4 } },
  { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
  { id: "1 week", label: "1 week", interval: { timeUnit: "week", count: 1 } },
  { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } },
  { id: "1 year", label: "1 year", interval: { timeUnit: "year", count: 1 } }
\]

To set current item, use `currentItem` setting.

The following will provide selection between 1, 5, and 10 days, as well as 1 month, with 5 days set as default:

// Add series type control
let intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  currentItem: "5 day",
  \[
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "5 day", label: "5 days", interval: { timeUnit: "day", count: 5 } },
    { id: "10 day", label: "10 days", interval: { timeUnit: "day", count: 10 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  \]
});

// Add toolbar
let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    intervalControl
  \]
});

// Add series type control
var intervalControl = am5stock.IntervalControl.new(root, {
  stockChart: stockChart,
  currentItem: "5 day",
  \[
    { id: "1 day", label: "1 day", interval: { timeUnit: "day", count: 1 } },
    { id: "5 day", label: "5 days", interval: { timeUnit: "day", count: 5 } },
    { id: "10 day", label: "10 days", interval: { timeUnit: "day", count: 10 } },
    { id: "1 month", label: "1 month", interval: { timeUnit: "month", count: 1 } }
  \]
});

// Add toolbar
var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    intervalControl
  \]
});

## Example


