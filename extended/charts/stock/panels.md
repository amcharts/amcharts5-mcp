---
title: "Panels"
source: "https://www.amcharts.com/docs/v5/charts/stock/panels/"
scraped: "2026-03-15"
---

Panels are instances of `StockPanel` class (which in turn extends an `XYChart`) comprising the [Stock chart](https://www.amcharts.com/docs/v5/charts/stock/). Zoom state of their X axes as well as cursor are automatically synced by the stock chart itself.

## Adding panels

To add a panel, we need to:

-   Create an instance of an `StockPanel`.
-   Configure it fully (remember it's an `XYChart` so we can use any configuration options available to it), including axes and series that will go into it.
-   Push it into stock chart's `panels` list.

The following code will add a single panel. Let's call it a "main chart".

let mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

var mainPanel = stockChart.panels.push(am5stock.StockPanel.new(root, {
  wheelY: "zoomX",
  panX: true,
  panY: true
}));

MORE INFOFor a complete guide on how to configure an a panel (XY chart), please refer to "[XY chart](https://www.amcharts.com/docs/v5/charts/xy-chart/)" tutorial section.

## Panel controls

If the stock chart has more than one panel, a special set of controls is enabled on each panel.

Controls are buttons that allow:

-   Moving panel up and down.
-   Expanding panel to full chart size.
-   Closing panel.

Panel controls is an object of type `PanelControls`, and is accessible via panel's `panelControls` property.

### Disabling panel controls

To disable panel controls, simply set its `forceHidden: true`:

mainPanel.panelControls.set("forceHidden");

mainPanel.panelControls.set("forceHidden");

### Disabling individual buttons

Individual button elements from the controls are available via the following properties of the `PanelControls` instance:

-   `upButton`
-   `downButton`
-   `expandButton`
-   `closeButton`

To selectively disable them, use their `forceHidden` setting:

mainPanel.panelControls.expandButton.set("forceHidden");
mainPanel.panelControls.closeButton.set("forceHidden");

mainPanel.panelControls.expandButton.set("forceHidden");
mainPanel.panelControls.closeButton.set("forceHidden");

NOTEClose button will be automatically disabled for the panel that holds the [main series](https://www.amcharts.com/docs/v5/charts/stock/#Setting_main_series), if there's one set.

### Disabling panel resizer

The easiest way to disabling resizing of panels is via custom theme:

let myTheme = am5.Theme.new(root);

myTheme.rule("Rectangle", \["panelresizer"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

var myTheme = am5.Theme.new(root);

myTheme.rule("Rectangle", \["panelresizer"\]).setAll({
  forceInactive: true
});

root.setThemes(\[
  am5themes\_Animated.new(root),
  myTheme
\]);

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

In the above example, only "volumePanel" has its height set to 30%.

That means that it will take 30% of the height of the stock chart, with "mainPanel" taking up the rest 70% even if it does not have height explicitly set.

### Via user interface

The panels are resizable out-of-the-box.

User can drag space between panels to resize them manually.

## Syncing cursors

Cursors between panels will be automatically synced across all panels.

To disable it, use this line of code for each panel **after** it has been added to the chart:

panel.removePrivate("otherCharts");

panel.removePrivate("otherCharts");

## Removing panels

### Via API

To remove a panel programmatically, all we need to do is call panel's `close()` method:

volumePanel.close();

volumePanel.close();

NOTEClosing a panel will automatically dispose it. If we want to keep the instance (perhaps if we are intending to add it back to the the chart) we need to disable auto-disposing:

stockChart.panels.autoDispose = false;

stockChart.panels.autoDispose = false;

### Via controls

If panel/chart has [panel controls](#Panel_controls) added to it, it can be removed by the user by pressing the "close" button in control bar.

## Events

Panels have a few events you can tap into:

Event

Kicks in when

`closed`

Panel is closed (removed).

`collapsed`

Panel returns from its expanded state.

`expanded`

Panel is expanded.

`moved`

Panel is moved up and down using its controls or API.

volumePanel.events.on("closed", function(ev) {
  console.log("Buh bye, Volume Panel");
});

volumePanel.events.on("closed", function(ev) {
  console.log("Buh bye, Volume Panel");
});

## Example

Below is a working multi-panel stock chart:


