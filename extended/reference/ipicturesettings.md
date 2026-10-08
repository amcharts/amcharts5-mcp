---
title: "IPictureSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipicturesettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISpriteSettings
All ancestors: ISpriteSettings, IEntitySettings
Settings of: `am5.Picture` (see its page for the class)
TypeScript: `am5.IPictureSettings` (`import type { IPictureSettings } from "@amcharts/amcharts5"`)

## Settings

- **src** (`string`) — URL of the image: relative, absolute, or a data URI.
- **cors** (`string`) — default `"anonymous"` — CORS setting for loading the image, as in the image element's `crossOrigin`. _Since 5.3.6._ Docs: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/crossOrigin
- **shadowColor** (`Color`) — Color of the image's shadow. It shows only when `shadowBlur`, `shadowOffsetX` or `shadowOffsetY` is set too. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowBlur** (`number`) — Blurriness of the shadow: the bigger the number, the blurrier the shadow. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetX** (`number`) — Horizontal shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetY** (`number`) — Vertical shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOpacity** (`number`) — default `1` — Opacity of the shadow, from `0` to `1`. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISpriteSettings")`) for types, defaults and descriptions.

- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, opacity, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
