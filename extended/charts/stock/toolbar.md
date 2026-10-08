---
title: "Stock toolbar"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/"
scraped: "2026-10-08"
---

Stock toolbar is a tool bundled with our [Stock chart](https://www.amcharts.com/docs/v5/charts/stock/) that can hold a number of chart-related controls, built-in or custom.

## Creating

A toolbar will need to be placed into its own container `<div>`, separate from the chart's container.

<div id="chartcontrols"></div>
<div id="chartdiv"></div>

NOTEThe container for toolbar should not be constricted with specific height using CSS, as its content is adjusted dynamically, thus the height might change based on user's interactions.

To create a toolbar we will need to instantiate a `StockToolbar` class, using its `new()` method.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    // ...
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    // ...
  \]
});

To work properly it needs three settings to be set:

-   `container` - a reference to a `<div>` element to place toolbar elements in.
-   `stockChart` - a reference to our stock chart.
-   `controls` - a list of controls to put into toolbar (more about it later).

## Controls

### Adding controls

A toolbar is just a shell. To add actual functionality, we need to add controls designed for it.

Stock chart comes with a number of controls:

Class

Comment

`ComparisonControl`

A control designed to add additional series to compare against main series.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/comparison-control/)

`DataSaveControl`

Allows saving/restoring current annotations, as well as enabling auto-saving.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/data-save-control/)

`DateRangeSelector`

Allows selecting date range the chart to zoom to, using date picker.

[Info](https://www.amcharts.com/docs/v5/date-range-selector/)

`DrawingControl`

Toggles drawing tools on and off. Puts chart into "[annotation mode](https://www.amcharts.com/docs/v5/charts/stock/stock-annotations/)".

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/)

`IndicatorControl`

Allows adding [technical indicators](https://www.amcharts.com/docs/v5/charts/stock/indicators/).

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/indicator-control/)

`IntervalControl`

Allows switching data granularity.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/interval-control/)

`PeriodSelector`

Displays a pre-defined list of periods for quick zoom of the chart.

[Info](https://www.amcharts.com/docs/v5/period-selector/)

`ResetControl`

Removes all annotations and indicators added by user.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/reset-control/)

`SeriesTypeControl`

Allows switching type of the main series.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/series-type-control/)

`SettingsControl`

Allows changing some settings of the chart, such as Y-axis scale and axis fills.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/settings-control/)

Besides these functional controls, stock chart offers generic controls that we can use to add custom functionality:

Class

Comment

`DropdownListControl`

A control that can be used to add searchable list of any item for selection.

[Info](https://www.amcharts.com/docs/v5/charts/stock/toolbar/dropdown-list-control/)

`StockControl`

A simple clickable or togglable button.

Info

Some controls are completely automated, while some will require custom code attached to its events for proper implementation.

All controls require `stockChart` set to an instance of the stock chart they are used for.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
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
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.ResetControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});

The above code will add three controls: drawing control which toggles annotation tools, as well as reset and settings controls.


### Configuring controls

As we mentioned before, some controls work without any configuration out-of-the-box, whereas others require additional custom code or configuration.

As an example, `SeriesTypeControl` control cannot change type of the series itself. It will rely on developer configuring an event handler which, when user selects new series type, destroys the old series, creates a new one, and sets it on the stock chart.

let seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(am5.type.isString(ev.item) ? ev.item : ev.item.id);
});

function setSeriesType(seriesType) {
  // Remove previous series
  let currentSeries = stockChart.get("stockSeries");
  let data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  let series;
  switch (seriesType) {
    case "line":
      series = mainPanel.series.push(am5xy.LineSeries.new(root, {
        // ...
      }));
      break;
    case "candlestick":
    case "procandlestick":
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
        // ...
      }));
      if (seriesType == "procandlestick") {
        series.columns.template.get("themeTags").push("pro");
      }
      break;
    case "ohlc":
      series = mainPanel.series.push(am5xy.OHLCSeries.new(root, {
        // ...
      }));
      break;
  }

  // Set new series as stockSeries
  if (series) {
    valueLegend.data.removeValue(currentSeries);
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    const cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", \[series\]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}

var seriesSwitcher = am5stock.SeriesTypeControl.new(root, {
  stockChart: stockChart
});

seriesSwitcher.events.on("selected", function(ev) {
  setSeriesType(am5.type.isString(ev.item) ? ev.item : ev.item.id);
});

function setSeriesType(seriesType) {
  // Remove previous series
  var currentSeries = stockChart.get("stockSeries");
  var data = currentSeries.data.values;
  mainPanel.series.removeValue(currentSeries);

  // Create new series
  var series;
  switch (seriesType) {
    case "line":
      series = mainPanel.series.push(am5xy.LineSeries.new(root, {
        // ...
      }));
      break;
    case "candlestick":
    case "procandlestick":
      series = mainPanel.series.push(am5xy.CandlestickSeries.new(root, {
        // ...
      }));
      if (seriesType == "procandlestick") {
        series.columns.template.get("themeTags").push("pro");
      }
      break;
    case "ohlc":
      series = mainPanel.series.push(am5xy.OHLCSeries.new(root, {
        // ...
      }));
      break;
  }

  // Set new series as stockSeries
  if (series) {
    valueLegend.data.removeValue(currentSeries);
    series.data.setAll(data);
    stockChart.set("stockSeries", series);
    const cursor = mainPanel.get("cursor");
    if (cursor) {
      cursor.set("snapToSeries", \[series\]);
    }
    valueLegend.data.insertIndex(0, series);
  }
}


MIRE INFOFor more information about each control follow links on the table earlier in this chapter, or in navigation menu on the left.

## Accessibility

The toolbar can be used with a keyboard: TAB moves between its buttons, and arrow keys move through lists.

NOTESince version 5.21.0, this is on by default. In earlier versions, it needs `focusable: true`.

To turn it off, set `focusable: false`:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  focusable: false,
  controls: \[
    // ...
  \]
});

var toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  focusable: false,
  controls: \[
    // ...
  \]
});

## Styling controls

The toolbar controls are all DOM elements, that can be targeted via CSS to override their look.

The following CSS will make toolbar's button dark green:

#chartcontrols .am5stock-control-button {
  background: #171c1c;
  color: #fff;
}

#chartcontrols .am5stock-control-button:hover {
  background: #98AEAB;
  color: #171c1c;
}

#chartcontrols .am5stock-control-icon path {
  stroke: #fff;
}

#chartcontrols .am5stock-control-button:hover .am5stock-control-icon path {
  stroke: #171c1c!important;
}

As you can see, various elements can be targeted using built-in class names.

NOTENotice the `#charttools` prefix in the CSS queries above. Since Stock Toolbar adds own CSS dynamically, simple targeting like `.am5stock-control-button` might not work, since default CSS might get loaded after your own custom CSS. More precise targeting like prefixing with the id of your toolbar container ensures that your queries will take precedence.

The following table lists a few of those.

Class name

Comment

`am5stock-control`

Wrapper for any control.

`am5stock-control-button`

Button wrapper.

`am5stock-control-dropdown`

Dropdown wrapper.

`am5stock-control-icon`

Icon in the button.

`am5stock-control-label`

Label.

There are more. We suggest right-clicking on any toolbar element, and selecting "Inspect element" item, which would open up browser's DOM tool.

You can use it to explore actual structure of the toolbar's elements, their assigned class names, and built-in CSS that affects it.

Here's an example:


## Related tutorials

-   [Stock Chart with custom indicator add button](https://www.amcharts.com/docs/v5/tutorials/stock-chart-with-custom-indicator-add-button/)
