---
title: "IStockLegendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/istocklegendsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ILegendSettings
All ancestors: ILegendSettings, ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5stock.StockLegend` (see its page for the class)
TypeScript: `am5stock.IStockLegendSettings` (`import type { IStockLegendSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **stockChart** (`StockChart`) — The `StockChart` the legend belongs to.

## Inherited settings with a different default on StockLegend

- **clickTarget** (`"none" | "itemContainer" | "marker"`) — default `"marker"` _(theme)_ — _from ILegendSettings_ — Which part of a legend item toggles the chart item when clicked: • `"itemContainer"` - the whole legend item (default). • `"marker"` - the marker only. • `"none"` - nothing; the legend items cannot be toggled. _Since 5.0.13._
- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.
- **layout** (`Layout`) — default `GridLayout.new(root, {})` _(theme)_ — _from IContainerSettings_ — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout
- **paddingLeft** (`number`) — default `6` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingTop** (`number`) — default `6` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ILegendSettings")`) for types, defaults and descriptions.

- _ILegendSettings_: fillField, nameField, strokeField, useDefaultMarker
- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, mask, maskContent, paddingBottom, paddingRight, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
