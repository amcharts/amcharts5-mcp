---
title: "IArcDiagramLinkSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iarcdiagramlinksettings/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IFlowLinkSettings
All ancestors: IFlowLinkSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.ArcDiagramLink` (see its page for the class)
TypeScript: `am5flow.IArcDiagramLinkSettings` (`import type { IArcDiagramLinkSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **source** (`DataItem<IArcDiagramNodesDataItem>`) — Source node data item.
- **target** (`DataItem<IArcDiagramNodesDataItem>`) — Target node data item.

## Inherited settings with a different default on ArcDiagramLink

- **role** (`Role`) — default `"img"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://docs.amcharts.com/v5/concepts/accessibility/#roles

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowLinkSettings")`) for types, defaults and descriptions.

- _IFlowLinkSettings_: fillStyle, strokeStyle
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaDescription, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
