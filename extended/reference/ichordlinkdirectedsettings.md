---
title: "IChordLinkDirectedSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichordlinkdirectedsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IChordLinkSettings
All ancestors: IChordLinkSettings, IFlowLinkSettings, IGraphicsSettings, ISpriteSettings, IEntitySettings
Settings of: `am5flow.ChordLinkDirected` (see its page for the class)
TypeScript: `am5flow.IChordLinkDirectedSettings` (`import type { IChordLinkDirectedSettings } from "@amcharts/amcharts5/flow"`)

## Settings

- **headRadius** (`number`) — default `10` _(theme)_ — Has no effect: the arrowhead length is set by `linkHeadRadius` on the `ChordDirected` series.

## Inherited settings with a different default on ChordLinkDirected

- **fillStyle** (`"none" | "solid" | "source" | "target" | "gradient"`) — default `"solid"` _(theme)_ — _from IFlowLinkSettings_ — How the link is filled: `"solid"` with its own `fill`, `"source"` or `"target"` with that node's color, `"gradient"` from the source color to the target color, or `"none"`.
- **strokeStyle** (`"none" | "solid" | "source" | "target" | "gradient"`) — default `"solid"` _(theme)_ — _from IFlowLinkSettings_ — How the link's outline is colored: `"solid"` with its own `stroke`, `"source"` or `"target"` with that node's color, `"gradient"` from the source color to the target color, or `"none"`.
- **tooltipText** (`string`) — default `"{sourceId} - {targetId}: {value}"` _(theme)_ — _from ISpriteSettings_ — Text of the element's tooltip. It can hold data placeholders, such as `{value}`.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IChordLinkSettings")`) for types, defaults and descriptions.

- _IChordLinkSettings_: source, sourceRadius, target, targetRadius
- _IGraphicsSettings_: blendMode, draw, fill, fillGradient, fillOpacity, fillPattern, lineCap, lineJoin, nonScalingStroke, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, shadowOpacity, stroke, strokeDasharray, strokeDashoffset, strokeGradient, strokeOpacity, strokePattern, strokeWidth, svgPath
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
