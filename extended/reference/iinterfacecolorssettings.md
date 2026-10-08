---
title: "IInterfaceColorsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iinterfacecolorssettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.InterfaceColors` (see its page for the class)
TypeScript: `am5.IInterfaceColorsSettings` (`import type { IInterfaceColorsSettings } from "@amcharts/amcharts5"`)

## Settings

- **stroke** (`Color`) — default `am5.Color.fromHex(0xe5e5e5)` _(theme)_ — Color for general outlines.
- **fill** (`Color`) — default `am5.Color.fromHex(0xf3f3f3)` _(theme)_ — Color for general fills, such as a scrollbar's background.
- **primaryButton** (`Color`) — default `am5.Color.fromHex(0x6794dc)` _(theme)_ — Primary button fill color.
- **primaryButtonHover** (`Color`) — default `am5.Color.fromHex(0x6771dc)` _(theme)_ — Primary button fill color on hover.
- **primaryButtonDown** (`Color`) — default `am5.Color.fromHex(0x68dc76)` _(theme)_ — Primary button fill color while pressed.
- **primaryButtonActive** (`Color`) — default `am5.Color.fromHex(0x68dc76)` _(theme)_ — Primary button fill color when active.
- **primaryButtonDisabled** (`Color`) — default `am5.Color.fromHex(0xdadada)` _(theme)_ — Primary button fill color when disabled.
- **primaryButtonTextDisabled** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Primary button text color when disabled.
- **primaryButtonText** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Primary button text color.
- **primaryButtonStroke** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Primary button stroke (outline) color.
- **secondaryButton** (`Color`) — default `am5.Color.fromHex(0xd9d9d9)` _(theme)_ — Secondary button fill color.
- **secondaryButtonHover** (`Color`) — default `am5.Color.fromHex(0xa3a3a3)` _(theme)_ — Secondary button fill color on hover.
- **secondaryButtonDown** (`Color`) — default `am5.Color.fromHex(0x8d8d8d)` _(theme)_ — Secondary button fill color while pressed.
- **secondaryButtonActive** (`Color`) — default `am5.Color.fromHex(0xe6e6e6)` _(theme)_ — Secondary button fill color when active.
- **secondaryButtonText** (`Color`) — default `am5.Color.fromHex(0x000000)` _(theme)_ — Secondary button text color.
- **secondaryButtonStroke** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Secondary button stroke (outline) color.
- **grid** (`Color`) — default `am5.Color.fromHex(0x000000)` _(theme)_ — Color of grid lines.
- **background** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Background color, for elements that should blend with what is behind the chart, such as legend item backgrounds.
- **alternativeBackground** (`Color`) — default `am5.Color.fromHex(0x000000)` _(theme)_ — A color that contrasts with `background`, for elements that should stand out from it, such as tooltips.
- **text** (`Color`) — default `am5.Color.fromHex(0x000000)` _(theme)_ — Label text color.
- **alternativeText** (`Color`) — default `am5.Color.fromHex(0xffffff)` _(theme)_ — Text color over `alternativeBackground`, such as in tooltips.
- **disabled** (`Color`) — default `am5.Color.fromHex(0xadadad)` _(theme)_ — Color for disabled elements.
- **positive** (`Color`) — default `am5.Color.fromHex(0x50b300)` _(theme)_ — Color for positive values, such as a rise.
- **negative** (`Color`) — default `am5.Color.fromHex(0xb30000)` _(theme)_ — Color for negative values, such as a fall.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
