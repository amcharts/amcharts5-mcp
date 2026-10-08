---
title: "IAxisBulletSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisbulletsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5xy.AxisBullet` (see its page for the class)
TypeScript: `am5xy.IAxisBulletSettings` (`import type { IAxisBulletSettings } from "@amcharts/amcharts5/xy"`)

## Settings

- **location** (`number`) — default `0.5` — Where the bullet sits within its cell, from `0` (start) to `1` (end).
- **sprite** (`Sprite`) — The element to show as the bullet.
- **stacked** (`boolean`) — default `false` — Stacks the bullet next to another bullet at the same position, instead of over it. Works on `AxisRendererX` and `AxisRendererY` only. _Since 5.2.28._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
