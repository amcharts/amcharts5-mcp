---
title: "Settings control"
source: "https://www.amcharts.com/docs/v5/charts/stock/toolbar/settings-control/"
scraped: "2026-10-08"
---

Settings control can be added to [stock toolbar](https://www.amcharts.com/docs/v5/charts/stock/toolbar/) which provides several bult-in configuration controls that user can use to modify chart behavior. It can also be enhanced with custom items.

## Adding

Like any other control, it should be instantiated using `new()` syntax, and pushed into toolbar's `controls` list:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
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
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart
    })
  \]
});


## Alignment

Settings control is aligned to right by default.

If we'd like it to go left - with the rest of the controls - we can set its `align: "left"` setting.

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      align: "left"
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
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      align: "left"
    })
  \]
});

## Modifying

### Getting default items

A settings control is essentially a regular [dropdown list control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/dropdown-list-control/) with pre-filled item list.

To grab the default list of items from a newly-created settings control, use its `items` setting:

let settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

let settings = settingsControl.get("items");

var settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

var settings = settingsControl.get("items");

If we look at what's inside `settings` variable now, we'll see an array of objects, identifying each item in the list.

Each item has an `id` property, which is required.

At this moment, settings control comes with the following default items:

Setting id

Comment

`fills`

Toggles X axis fills.

`y-scale`

Switches between [percent](https://www.amcharts.com/docs/v5/charts/stock/percent-mode/), logarithmic, and regular scale, on an Y axis of main panel.

`autosave`

Auto-save indicators and drawings feature.

### Removing items

We can use item ids, to selectively remove them from the item list, then set it back to the settings control's `items` setting.

let settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

let settings = settingsControl.get("items");

let newSettings = \[\];
am5.array.each(newSettings, function(setting) {
  if (setting.id != "fills") {
    newSettings.push(setting);
  }
});

settingsControl.set("items", newSettings);

var settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

var settings = settingsControl.get("items");

var newSettings = \[\];
am5.array.each(newSettings, function(setting) {
  if (setting.id != "fills") {
    newSettings.push(setting);
  }
});

settingsControl.set("items", newSettings);

The above will remove the "Fills" setting from the settings control.

### Disabling items by ID

Alternatively, we can make the control ignore certain items using its `exclude` setting:

let toolbar = am5stock.StockToolbar.new(root, {
  container: document.getElementById("chartcontrols"),
  stockChart: stockChart,
  controls: \[
    am5stock.DrawingControl.new(root, {
      stockChart: stockChart
    }),
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      exclude: \["autosave"\]
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
    am5stock.SettingsControl.new(root, {
      stockChart: stockChart,
      exclude: \["autosave"\]
    })
  \]
});

The above code will remove auto-save feature from the Settings control.

### Adding items

We can add new items to the settings list, too.

let settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

let newSettings = settingsControl.get("items");

newSettings.unshift({
  form: "checkbox",
  id: "mySetting",
  label: "My custom setting"
}, {
  form: "checkbox",
  id: "mySetting2",
  label: "Another setting",
  checked: true
});

settingsControl.set("items", newSettings);

var settingsControl = am5stock.SettingsControl.new(root, {
  stockChart: stockChart
});

var newSettings = settingsControl.get("items");

newSettings.unshift({
  form: "checkbox",
  id: "mySetting",
  label: "My custom setting"
}, {
  form: "checkbox",
  id: "mySetting2",
  label: "Another setting",
  checked: true
});

settingsControl.set("items", newSettings);

The list items can be forms, headings, or regular labels. Refer to "[Dropdown list control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/dropdown-list-control/)" tutorial for more information.

### Events

Before custom settings can be useful, we also need to attach a `changed` event to our settings control's dropdown sub-element, which would get invoked when setting is changed:

settingsControl.getPrivate("dropdown").events.on("changed", function(ev) {
  console.log(ev.item.label, ev.checked);
});

settingsControl.getPrivate("dropdown").events.on("changed", function(ev) {
  console.log(ev.item.label, ev.checked);
});

### Example


## Auto-saving feature

Settings control does have a checkbox which enables automatically saving of all added indicators and drawings to browser's local storage for easy carry over page reloads/sessions.

For more information on how this works, and how to configure it, please refer to "[Data save control](https://www.amcharts.com/docs/v5/charts/stock/toolbar/data-save-control/)" tutorial.
