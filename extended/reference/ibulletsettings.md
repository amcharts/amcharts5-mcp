---
title: "IBulletSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibulletsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.Bullet` (see its page for the class)
TypeScript: `am5.IBulletSettings` (`import type { IBulletSettings } from "@amcharts/amcharts5"`)

## Settings

- **locationX** (`number`) — default `0.5` _(theme)_ — Horizontal location within the target element, from `0` (left) to `1` (right). In a pie slice it runs along the arc.
- **locationY** (`number`) — default `0.5` _(theme)_ — Vertical location within the target element, from `0` (top) to `1` (bottom). On XY columns `0` is the column's base and `1` its value end; in a pie slice it runs from the inner to the outer radius.
- **sprite** (`Sprite`) — The element the bullet shows.
- **dynamic** (`boolean`) — default `false` — Refreshes the `sprite` (its fill, size and label text, and those of its children) each time the series positions its bullets.
- **autoRotate** (`boolean`) — default `false` — Rotates the bullet to follow the direction of the line it sits on. Works on links of `Flow` charts, `HierarchyLink` and `MapSankeySeries`, and in `MapPointSeries` for points placed on a `MapLine`.
- **autoRotateAngle** (`number`) — Degrees added to the angle that `autoRotate` sets.
- **field** (`"open" | "high" | "low" | "value"`) — Places the bullet at this value of the data item along the value axis, in place of the location on that axis. The location across it still applies. **IMPORTANT: this setting works with `XYSeries` only.** _Since 5.6.0._ Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/#By_data_field
- **stacked** (`"auto" | "up" | "down"`) — Stacks bullets at the same spot instead of overlapping them. • `"up"` - stacks bullets upwards (rightwards on a horizontal series). • `"down"` - stacks bullets downwards (leftwards on a horizontal series). • `"auto"` - stacks bullets in the direction that offers more space. **IMPORTANT: this setting works with `XYSeries` only.** _Since 5.6.0._ Docs: https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/#Stacked_bullets

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
