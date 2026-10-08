---
title: "IIndicatorControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iindicatorcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IDropdownListControlSettings
All ancestors: IDropdownListControlSettings, IStockControlSettings, IEntitySettings
Settings of: `am5stock.IndicatorControl` (see its page for the class)
TypeScript: `am5stock.IIndicatorControlSettings` (`import type { IIndicatorControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **indicators** (`(IIndicator | Indicators)[]`) — default `["Acceleration Bands", "Accumulation Distribution", "Accumulative Swing Index", "Aroon", "Average True Range", "Awesome Oscillator", "Bollinger Bands", "Bull Bear Power", "Chaikin Money Flow", "Cha…` _(theme)_ — Indicators to list: names of built-in ones, or `IIndicator` objects for custom ones. Those that need volume are listed only while the chart has a `volumeSeries`.
- **legend** (`StockLegend`) — The `StockLegend` that indicators drawn over the main series are added to.

## Inherited settings with a different default on IndicatorControl

- **fixedLabel** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Keeps the button's label and icon when an item is picked, instead of showing that item.
- **name** (`string`) — default `root.language.translateAny("Indicators")` _(theme)_ — _from IStockControlSettings_ — Label text of the control's button.
- **scrollable** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Limits the list's height to the chart's height minus 100 pixels, scrolling the rest.
- **searchable** (`boolean`) — default `true` _(theme)_ — _from IDropdownListControlSettings_ — Shows a search field above the list. Typing filters the items or, with `searchCallback`, replaces them with its results.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IDropdownListControlSettings")`) for types, defaults and descriptions.

- _IDropdownListControlSettings_: currentItem, exclude, items, maxSearchItems, searchCallback
- _IStockControlSettings_: active, align, description, forceHidden, icon, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
