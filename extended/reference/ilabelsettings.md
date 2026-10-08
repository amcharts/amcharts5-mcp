---
title: "ILabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilabelsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IContainerSettings
All ancestors: IContainerSettings, ISpriteSettings, IEntitySettings
Settings of: `am5.Label` (see its page for the class)
TypeScript: `am5.ILabelSettings` (`import type { ILabelSettings } from "@amcharts/amcharts5"`)

## Settings

- **text** (`string`) — The label's text. It can hold in-line formatting and, with `populateText`, data placeholders. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/text-styling/
- **fill** (`Color`) — default `root.interfaceColors.get("text")` _(theme)_ — Text color.
- **fillOpacity** (`number`) — default `1` — Text opacity, from `0` (transparent) to `1` (opaque). _Since 5.2.39._
- **fillGradient** (`Gradient`) — Fill gradient. _Since 5.10.1._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/gradients/
- **textAlign** (`"start" | "end" | "left" | "right" | "center"`) — Horizontal alignment of the text's lines.
- **fontFamily** (`string`) — default `"-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""` _(theme)_ — Font family, or a comma-separated list of them. `"inherit"` uses the font of the chart's container element (since `5.17.3`).
- **fontSize** (`string | number`) — default `"1em"` _(theme)_ — Font size: a number in pixels, or any CSS size, such as `"1em"` or `"12pt"`.
- **fontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Font weight.
- **fontStyle** (`"normal" | "italic" | "oblique"`) — Font style.
- **fontVariant** (`"normal" | "small-caps"`) — Font variant.
- **textDecoration** (`"underline" | "line-through"`) — Text decoration: `"underline"` or `"line-through"`. _Since 5.0.15._
- **lineHeight** (`number | Percent`) — Line height as a multiple of the font's line height: a number, such as `1.5`, or a percent, such as `am5.percent(150)`. If not set, it is `1.2`.
- **baselineRatio** (`number`) — default `0.19` — Share of the line height that lies below the text's baseline.
- **opacity** (`number`) — default `1` _(theme)_ — Opacity of the label, from `0` (transparent) to `1` (opaque).
- **direction** (`"ltr" | "rtl"`) — default `"ltr"` — Text direction.
- **textBaseline** (`"top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"`) — The baseline the text is aligned to vertically, as in the canvas `textBaseline`.
- **oversizedBehavior** (`"none" | "hide" | "fit" | "wrap" | "wrap-no-break" | "truncate"`) — What to do with text that does not fit the label's `maxWidth` (or `maxHeight`): `"hide"` it, `"fit"` it by scaling it down, `"wrap"` it onto more lines, wrap it without breaking words (`"wrap-no-break"`), or `"truncate"` it with an ellipsis. LIMITATIONS: on circular labels, the only values supported are `"hide"` and `"truncate"`. The latter will ignore `breakWords` setting. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/labels/#Oversized_text
- **breakWords** (`boolean`) — default `false` — Lets truncation cut words in the middle. Wrapping does not use it.
- **ellipsis** (`string`) — default `"…"` — Characters added at the end of truncated text. The default Unicode ellipsis (`"…"`) is missing from some fonts. If it looks broken, use other characters, e.g.:

  ```ts
  label.set("ellipsis", "...");
  ```

- **minScale** (`number`) — Smallest scale, from `0` to `1`, that `oversizedBehavior: "fit"` may shrink the text to. Text that would need to shrink more is hidden.
- **populateText** (`boolean`) — default `false` _(theme)_ — Fills data placeholders in `text`, such as `{value}`, with values from the label's data item. Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/labels/#Data_placeholders
- **ignoreFormatting** (`boolean`) — default `false` — Shows `text` exactly as it is, without applying in-line formatting blocks such as `[bold]`.
- **shadowColor** (`Color`) — Color of the text's shadow. It shows only when `shadowBlur`, `shadowOffsetX` or `shadowOffsetY` is set too. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowBlur** (`number`) — Blurriness of the shadow: the bigger the number, the blurrier the shadow. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetX** (`number`) — Horizontal shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOffsetY** (`number`) — Vertical shadow offset in pixels. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **shadowOpacity** (`number`) — Opacity of the shadow, from `0` to `1`. If not set, the shadow takes the opacity of the text. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/shadows/
- **maxChars** (`number`) — Maximum number of characters in the label. A longer `text` is cut, using the `breakWords` and `ellipsis` settings. _Since 5.7.2._

## Inherited settings with a different default on Label

- **paddingBottom** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Bottom padding in pixels.
- **paddingLeft** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Left padding in pixels.
- **paddingRight** (`number`) — default `10` _(theme)_ — _from IContainerSettings_ — Right padding in pixels.
- **paddingTop** (`number`) — default `8` _(theme)_ — _from IContainerSettings_ — Top padding in pixels.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerSettings")`) for types, defaults and descriptions.

- _IContainerSettings_: background, html, interactiveChildren, layout, mask, maskContent, reverseChildren, setStateOnChildren, verticalScrollbar
- _ISpriteSettings_: active, appearDelay, appearDuration, ariaChecked, ariaControls, ariaCurrent, ariaExpanded, ariaHidden, ariaLabel, ariaLive, ariaOrientation, ariaSelected, ariaValueMax, ariaValueMin, ariaValueNow, ariaValueText, autoAppear, blur, brightness, centerX, centerY, clickAnnounceText, contrast, crisp, cursorOverStyle, dateFormatter, disabled, draggable, durationFormatter, dx, dy, exportable, filter, focusable, focusableGroup, forceHidden, forceInactive, height, hoverOnFocus, hue, interactive, invert, isMeasured, layer, layerMargin, marginBottom, marginLeft, marginRight, marginTop, maxHeight, maxWidth, minHeight, minWidth, numberFormatter, position, role, rotation, saturate, scale, sepia, showTooltipOn, tabindexOrder, templateField, toggleKey, tooltip, tooltipHTML, tooltipPosition, tooltipText, tooltipX, tooltipY, visible, wheelable, width, x, y
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
