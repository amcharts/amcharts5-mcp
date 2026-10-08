---
title: "ILegendSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilegendsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Legend` (see its page for the class)
TypeScript: `am5.ILegendSettings` (`import type { ILegendSettings } from "@amcharts/amcharts5"`)

## Settings

- **useDefaultMarker** (`boolean`) — default `false` — Shows a plain rectangle marker instead of one that mimics the look of the item.
- **nameField** (`string`) — default `"name"` _(theme)_ — Setting of each legend item (a series or a data item) to take its name from.
- **fillField** (`string`) — default `"fill"` _(theme)_ — Setting of each legend item to take its marker's fill color from.
- **strokeField** (`string`) — default `"stroke"` _(theme)_ — Setting of each legend item to take its marker's stroke color from.
- **clickTarget** (`"none" | "itemContainer" | "marker"`) — default `"itemContainer"` _(theme)_ — Which part of a legend item toggles the chart item when clicked: • `"itemContainer"` - the whole legend item (default). • `"marker"` - the marker only. • `"none"` - nothing; the legend items cannot be toggled. _Since 5.0.13._

## Inherited settings with a different default on Legend

- **layer** (`number`) — default `30` _(theme)_ — _from ISpriteSettings_ — Layer to draw the element on: elements on higher layers show in front of those on lower ones. If not set, the element is on its parent's layer.
- **layout** (`Layout`) — default `GridLayout.new(root, {})` _(theme)_ — _from IContainerSettings_ — How children are arranged, e.g. `root.horizontalLayout`, `root.verticalLayout` or `root.gridLayout`. Without a layout, children are placed by their own `x` and `y`. Docs: https://www.amcharts.com/docs/v5/concepts/containers/#Layout

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, idField, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
