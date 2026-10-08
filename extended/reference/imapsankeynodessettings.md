---
title: "IMapSankeyNodesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imapsankeynodessettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesSettings
All ancestors: ISeriesSettings, IComponentSettings, IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5map.MapSankeyNodes` (see its page for the class)
TypeScript: `am5map.IMapSankeyNodesSettings` (`import type { IMapSankeyNodesSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **nameField** (`string`) — default `"name"` _(class default)_ — A field in data that holds the node's name.
- **fillField** (`string`) — default `"fill"` _(class default)_ — A field in data that holds the node's fill color.
- **longitudeField** (`string`) — default `"longitude"` _(class default)_ — A field in data that holds the node longitude.
- **latitudeField** (`string`) — default `"latitude"` _(class default)_ — A field in data that holds the node latitude.
- **colors** (`ColorSet`) — Colors for nodes that have no `fill` in data, one after another.

## Inherited settings with a different default on MapSankeyNodes

- **idField** (`string`) — default `"id"` _(class default)_ — _from ISeriesSettings_ — A key to look up in data for an id of the data item.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesSettings")`) for types, defaults and descriptions.

- _ISeriesSettings_: calculateAggregates, customValueField, excludeFromAggregate, fill, fillGradient, fillPattern, heatRules, legendDataItem, legendLabelText, legendValueText, linkTarget, name, sequencedDelay, sequencedInterpolation, stroke, strokeGradient, urlField, valueField
- _IComponentSettings_: interpolationDuration, interpolationEasing
- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, paddingBottom, paddingLeft, paddingRight, paddingTop, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
