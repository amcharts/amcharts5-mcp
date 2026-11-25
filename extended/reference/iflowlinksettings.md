---
title: "IFlowLinkSettings"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iflowlinksettings/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IGraphicsSettings
All ancestors: IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.FlowLink` (see its page for the class)
TypeScript: `am5flow.IFlowLinkSettings` (`import type { IFlowLinkSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **source** (`DataItem<IFlowNodesDataItem>`) — Source node data item.
- **target** (`DataItem<IFlowNodesDataItem>`) — Target node data item.
- **fillStyle** (`"none" | "solid" | "source" | "target" | "gradient"`) — default `"gradient"` _(theme)_ — How the link is filled: `"solid"` with its own `fill`, `"source"` or `"target"` with that node's color, `"gradient"` from the source color to the target color, or `"none"`.
- **strokeStyle** (`"none" | "solid" | "source" | "target" | "gradient"`) — default `"gradient"` _(theme)_ — How the link's outline is colored: `"solid"` with its own `stroke`, `"source"` or `"target"` with that node's color, `"gradient"` from the source color to the target color, or `"none"`.

## Inherited settings with a different default on FlowLink

- **role** (`Role`) — default `"img"` _(theme)_ — _from ISpriteSettings_ — Element's role. Docs: https://docs.amcharts.com/v5/concepts/accessibility/#roles

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IGraphicsSettings")`) for types, defaults and descriptions.

- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaDescription, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
