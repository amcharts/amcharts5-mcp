---
title: "Panels"
source: "https://docs.amcharts.com/v5/charts/stock/panels/"
scraped: "2026-11-14"
---

> Panels are instances of StockPanel class (which in turn extends an XYChart) comprising the Stock chart. Zoom state of their X axes as well as cursor are automatically synced by the stock chart itself.

Panels are instances of `StockPanel` class (which in turn extends an `XYChart`) comprising the [Stock chart](https://docs.amcharts.com/v5/charts/stock/). Zoom state of their X axes as well as cursor are automatically synced by the stock chart itself.

## Adding panels

To add a panel, we need to:

* Create an instance of an `StockPanel`.
* Configure it fully (remember it's an `XYChart` so we can use any configuration options available to it), including axes and series that will go into it.
* Push it into stock chart's `panels` list.

The following code will add a single panel. Let's call it a "main chart".

TypeScript:

```ts
let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));
```

JavaScript:

```js
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));
```

> **More info:** For a complete guide on how to configure an a panel (XY chart), please refer to "[XY chart](https://docs.amcharts.com/v5/charts/xy-chart/)" tutorial section.

## Panel controls

If the stock chart has more than one panel, a special set of controls is enabled on each panel.

Controls are buttons that allow:

* Moving panel up and down.
* Expanding panel to full chart size.
* Closing panel.

![](https://docs.amcharts.com/v5/images/charts/stock/panels/stock_panel_controls.png)

Panel controls is an object of type `PanelControls`, and is accessible via panel's `panelControls` property.

### Disabling panel controls

To disable panel controls, simply set its `forceHidden: true`:

TypeScript:

```ts
mainPanel.panelControls.set("forceHidden", true);
```

JavaScript:

```js
mainPanel.panelControls.set("forceHidden", true);
```

### Showing controls on hover

To show each panel's controls only while the pointer is over that panel's plot area, set the stock chart's `autoHidePanelControls` to `true` (since 5.13.0):

JavaScript:

```js
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {
  autoHidePanelControls: true
}));
```

TypeScript:

```ts
let stockChart = root.container.children.push(am5stock.StockChart.new(root, {
  autoHidePanelControls: true
}));
```

### Disabling individual buttons

Individual button elements from the controls are available via the following properties of the `PanelControls` instance:

* `upButton`
* `downButton`
* `expandButton`
* `closeButton`

To selectively disable them, use their `forceHidden` setting:

TypeScript:

```ts
mainPanel.panelControls.expandButton.set("forceHidden", true);
mainPanel.panelControls.closeButton.set("forceHidden", true);
```

JavaScript:

```js
mainPanel.panelControls.expandButton.set("forceHidden", true);
mainPanel.panelControls.closeButton.set("forceHidden", true);
```

> **Note:** Close button will be automatically disabled for the panel that holds the [main series](https://docs.amcharts.com/v5/charts/stock/#setting-main-series), if there's one set.

### Disabling panel resizer

The easiest way to disabling resizing of panels is via custom theme:

TypeScript:

```ts
let myTheme = am5.Theme.new(root);

myTheme.rule("Rectangle", ["panelresizer"]).setAll({
  forceInactive: true
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

JavaScript:

```js
var myTheme = am5.Theme.new(root);

myTheme.rule("Rectangle", ["panelresizer"]).setAll({
  forceInactive: true
});

root.setThemes([
  am5themes_Animated.new(root),
  myTheme
]);
```

## Order

### Initial order

We can push as many `StockPanel` instances into stock chart's `panels` list as we need to.

They will appear in the same order as the were pushed: the first panel will be displayed on top, with the rest following.

### Reordering via UI

Panels can also be re-ordered by user via panel controls, described earlier in this tutorial.

### Reordering via API

Each panel instance offers two methods, that allow changing its position: `moveUp()` and `moveDown()`.

Their functionality is self-explanatory.

## Sizing

### Via settings

Normally, all panels will divide the vertical space between them equally.

We can modify that manually, using panel/chart's `height` setting.

It accepts both absolute pixel as well as percent values.

TypeScript:

```ts
let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

let volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30)
}));
```

JavaScript:

```js
var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

var volumePanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true,
  height: am5.percent(30)
}));
```

In the above example, only "volumePanel" has its height set to 30%.

That means that it will take 30% of the height of the stock chart, with "mainPanel" taking up the rest 70% even if it does not have height explicitly set.

### Via user interface

The panels are resizable out-of-the-box.

User can drag space between panels to resize them manually.

## Syncing cursors

Cursors between panels will be automatically synced across all panels.

To disable it, use this line of code for each panel **after** it has been added to the chart:

TypeScript:

```ts
panel.removePrivate("otherCharts");
```

JavaScript:

```js
panel.removePrivate("otherCharts");
```

## Removing panels

### Via API

To remove a panel programmatically, all we need to do is call panel's `close()` method:

TypeScript:

```ts
volumePanel.close();
```

JavaScript:

```js
volumePanel.close();
```

> **Note:** Closing a panel will automatically dispose it. If we want to keep the instance (perhaps if we are intending to add it back to the the chart) we need to disable auto-disposing:

TypeScript:

```ts
stockChart.panels.autoDispose = false;
```

JavaScript:

```js
stockChart.panels.autoDispose = false;
```

### Via controls

If panel/chart has [panel controls](#panel-controls) added to it, it can be removed by the user by pressing the "close" button in control bar.

## Events

Panels have a few events you can tap into:

| Event       | Kicks in when                                         |
| ----------- | ----------------------------------------------------- |
| `closed`    | Panel is closed (removed).                            |
| `collapsed` | Panel returns from its expanded state.                |
| `expanded`  | Panel is expanded.                                    |
| `moved`     | Panel is moved up and down using its controls or API. |

TypeScript:

```ts
volumePanel.events.on("closed", function(ev) {
  console.log("Buh bye, Volume Panel");
});
```

JavaScript:

```js
volumePanel.events.on("closed", function(ev) {
  console.log("Buh bye, Volume Panel");
});
```

## Example

Below is a working multi-panel stock chart:

Example: [Multi-panel stock chart](https://docs.amcharts.com/embeds/v5/multi-panel-stock-chart/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/stock.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartcontrols"></div>
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartcontrols {
  height: auto;
  padding: 5px 45px 0 15px;
}

#chartdiv {
  width: 100%;
  height: 95vh;
}
```

JavaScript:

```js
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

// Create a stock chart
// https://docs.amcharts.com/v5/charts/stock/#instantiating-the-chart
var stockChart = root.container.children.push(am5stock.StockChart.new(root, {}));

// Set global number format
// https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
root.numberFormatter.set("numberFormat", "#,###.00");

// Add panels
// https://docs.amcharts.com/v5/charts/stock/panels/
function addPanel(ticker, showScrollbar, showTooltip) {
  // Create a main stock panel (chart)
  // https://docs.amcharts.com/v5/charts/stock/#panels
  var mainPanel = stockChart.panels.push(
    am5stock.StockPanel.new(root, {
      wheelY: "zoomX",
      panX: true,
      panY: true,
      paddingTop: 5
    })
  );

  mainPanel.plotsContainer.set(
    "background",
    am5.Rectangle.new(root, {
      stroke: am5.color(0xeeeeee),
      strokeOpacity: 1
    })
  );

  // Create axes
  // https://docs.amcharts.com/v5/charts/xy-chart/axes/
  var valueAxis = mainPanel.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        inside: true
      }),

      tooltip: am5.Tooltip.new(root, { animationDuration: 200 }),
      numberFormat: "#,###.00",
      extraTooltipPrecision: 2
    })
  );

  valueAxis.get("renderer").labels.template.setAll({
    centerY: am5.p100,
    fill: am5.color(0x888888),
    maxPosition: 0.99
  });

  var dateAxis = mainPanel.xAxes.push(
    am5xy.GaplessDateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },

      renderer: am5xy.AxisRendererX.new(root, {})
    })
  );

  dateAxis.get("renderer").labels.template.setAll({
    maxPosition: 0.99,
    minPosition: 0.01
  });

  var tooltip = dateAxis.set(
    "tooltip",
    am5.Tooltip.new(root, {
      animationDuration: 200
    })
  );

  if (!showTooltip) {
    tooltip.set("forceHidden", true);
  }

  // Add series
  // https://docs.amcharts.com/v5/charts/xy-chart/series/
  var valueSeries = mainPanel.series.push(
    am5xy.CandlestickSeries.new(root, {
      name: ticker,
      valueXField: "Date",
      valueYField: "Close",
      highValueYField: "High",
      lowValueYField: "Low",
      openValueYField: "Open",
      calculateAggregates: true,
      xAxis: dateAxis,
      yAxis: valueAxis,
      legendValueText: "{valueY}"
    })
  );

  // Add a stock legend
  // https://docs.amcharts.com/v5/charts/stock/stock-legend/
  var valueLegend = mainPanel.plotContainer.children.push(
    am5stock.StockLegend.new(root, {
      stockChart: stockChart
    })
  );

  valueLegend.data.setAll([valueSeries]);

  // Add cursor(s)
  // https://docs.amcharts.com/v5/charts/xy-chart/cursor/
  mainPanel.set(
    "cursor",
    am5xy.XYCursor.new(root, {
      yAxis: valueAxis,
      xAxis: dateAxis,
      snapToSeries: [valueSeries],
      snapToSeriesBy: "y!"
    })
  );

  if (showScrollbar) {
    // Add scrollbar
    // https://docs.amcharts.com/v5/charts/xy-chart/scrollbars/
    var scrollbar = mainPanel.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
      })
    );

    stockChart.toolsContainer.children.push(scrollbar);

    var sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        baseInterval: {
          timeUnit: "day",
          count: 1
        },

        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    var sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    var sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "Close",
        valueXField: "Date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis
      })
    );

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });
  }

  // Load initial data for the first series
  loadData(ticker, showScrollbar ? [valueSeries, sbSeries] : [valueSeries]);
}

addPanel("MSFT", true);
addPanel("AAPL");
addPanel("AMZN", false, true);

// Function that dynamically loads data
function loadData(ticker, series) {
  // Load external data
  // https://docs.amcharts.com/v5/charts/xy-chart/series/#setting-data
  am5.net
    .load("https://www.amcharts.com/wp-content/uploads/assets/docs/stock/" + ticker + ".csv")
    .then(function (result) {
      // Parse loaded data
      var data = am5.CSVParser.parse(result.response, {
        delimiter: ",",
        skipEmpty: true,
        useColumnNames: true
      });

      // Process data (convert dates and values)
      var processor = am5.DataProcessor.new(root, {
        dateFields: ["Date"],
        dateFormat: "yyyy-MM-dd",
        numericFields: ["Open", "High", "Low", "Close", "Adj Close", "Volume"]
      });

      processor.processMany(data);

      // Set data
      am5.array.each(series, function (item) {
        item.data.setAll(data);
        console.log(data);
      });
    });
}
```
