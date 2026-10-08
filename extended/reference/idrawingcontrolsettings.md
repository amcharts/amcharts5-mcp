---
title: "IDrawingControlSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idrawingcontrolsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IStockControlSettings
All ancestors: IStockControlSettings, IEntitySettings
Settings of: `am5stock.DrawingControl` (see its page for the class)
TypeScript: `am5stock.IDrawingControlSettings` (`import type { IDrawingControlSettings } from "@amcharts/amcharts5/stock"`)

## Settings

- **tools** (`DrawingTools[]`) — default `["Arrows &amp; Icons", "Average", "Callout", "Doodle", "Ellipse", "Fibonacci", "Fibonacci Timezone", "Horizontal Line", "Horizontal Ray", "Label", "Line", "Line Arrow", "Measure", "Parallel Channel…` _(theme)_ — Tools to list in the tool dropdown. Docs: https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/#Tool_list
- **tool** (`DrawingTools`) — default `"Line"` _(theme)_ — The tool in use; the one set at the start is the default.
- **scrollable** (`boolean`) — default `true` _(theme)_ — Limits the tool list's height to the chart's height minus 100 pixels, scrolling the rest. _Since 5.9.5._
- **toolSettings** (`{ [index: string]: any; }`) — default `{}` _(code fallback)_ — Settings for the drawing series of each tool, keyed by tool name. _Since 5.5.2._ Docs: https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/#Tool_settings
- **series** (`XYSeries[]`) — default `[]` _(code fallback)_ — Series to attach drawings to. Each panel's main series (`stockSeries` on its panel, the first series on others) is added automatically.
- **colors** (`ColorSet`) — Colors to offer in the color pickers. Docs: https://www.amcharts.com/docs/v5/charts/stock/toolbar/drawing-control/#Colors
- **strokeColor** (`Color`) — default `am5.color(0x882dff)` _(theme)_ — Line color of new drawings; changing it also restyles the selected ones.
- **strokeWidth** (`number`) — default `2` _(theme)_ — Line width of new drawings, in pixels.
- **strokeWidths** (`number[]`) — default `[1, 2, 4, 8, 16]` _(theme)_ — Line widths to choose from, in pixels.
- **strokeDasharray** (`number[]`) — default `[]` _(theme)_ — Dash pattern of new drawings' lines, such as `[2, 2]`, or `[]` for a solid line.
- **strokeDasharrays** (`number[][]`) — default `[[], [2, 2], [6, 3], [8, 4, 2, 4]]` _(theme)_ — Dash patterns to choose from.
- **strokeOpacity** (`number`) — default `1` _(theme)_ — Line opacity of new drawings, from `0` to `1`.
- **showExtension** (`boolean`) — default `true` _(theme)_ — Extends new lines with a dotted line beyond both ends.
- **fillColor** (`Color`) — default `am5.color(0xad6eff)` _(theme)_ — Fill color of new drawings.
- **fillOpacity** (`number`) — default `0.2` _(theme)_ — Fill opacity of new drawings, from `0` to `1`.
- **labelFill** (`Color`) — default `am5.color(0x000000)` _(theme)_ — Text color of new labels and callouts.
- **labelFontSize** (`string | number`) — default `"12px"` _(theme)_ — Font size of new labels and callouts.
- **labelFontSizes** (`(string | number)[]`) — default `["8px", "10px", "11px", "12px", "14px", "16px", "20px", "24px", "36px", "48px"]` _(theme)_ — Font sizes to choose from.
- **labelFontFamily** (`string`) — default `"Arial"` _(theme)_ — Font family of new labels and callouts. `"inherit"` uses the computed font of the chart's container (since `5.17.3`).
- **labelFontFamilies** (`string[]`) — default `["Arial", "Courier New", "Garamond", "Georgia", "Times New Roman"]` _(theme)_ — Font families to choose from.
- **labelFontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — default `"normal"` _(theme)_ — Font weight of new labels and callouts.
- **labelFontStyle** (`"normal" | "italic" | "oblique"`) — default `"normal"` _(theme)_ — Font style of new labels and callouts.
- **drawingIcon** (`IIcon`) — default computed at runtime _(theme)_ — Icon that the icon tool draws.
- **drawingIcons** (`IIcon[]`) — default `[{ svgPath: "M 5 35 L 5 15 L 26 15 L 26 5 L 45 25 L 26 45 L 26 35 L 5 35 Z", scale: 1, centerX: am5.percent(100), centerY: am5.percent(50) }, { svgPath: "M 45 35 L 45 15 L 24 15 L 24 5 L 5 25 L 24 …` _(theme)_ — Icons to choose from for the icon tool.
- **snapToData** (`boolean`) — default `false` _(theme)_ — Snaps the points of new drawings to the values of the nearest data items.

## Inherited settings with a different default on DrawingControl

- **name** (`string`) — default `root.language.translateAny("Draw")` _(theme)_ — _from IStockControlSettings_ — Label text of the control's button.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IStockControlSettings")`) for types, defaults and descriptions.

- _IStockControlSettings_: active, align, description, forceHidden, icon, stockChart, togglable, visible
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
