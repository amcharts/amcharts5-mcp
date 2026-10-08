---
title: "ISankeyLinkSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isankeylinksettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IFlowLinkSettings
All ancestors: IFlowLinkSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.SankeyLink` (see its page for the class)
TypeScript: `am5flow.ISankeyLinkSettings` (`import type { ISankeyLinkSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **source** (`DataItem<ISankeyNodesDataItem>`) — Source node data item.
- **target** (`DataItem<ISankeyNodesDataItem>`) — Target node data item.
- **fillStyle** (`"solid" | "source" | "target" | "gradient"`) — default `"gradient"` _(theme)_ — How the link is filled: `"solid"` with its own `fill`, `"source"` or `"target"` with that node's color, or `"gradient"` from the source color to the target color. Docs: https://www.amcharts.com/docs/v5/charts/flow-charts/sankey-diagram/#Color_mode
- **controlPointDistance** (`number`) — default `0.2` _(theme)_ — Distance of the link's two bend points from its ends, as a fraction of the distance between its nodes, up to `0.5`. Docs: https://www.amcharts.com/docs/v5/charts/flow-charts/sankey-diagram/#Bend_point

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IFlowLinkSettings")`) for types, defaults and descriptions.

- _IFlowLinkSettings_: strokeStyle
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
