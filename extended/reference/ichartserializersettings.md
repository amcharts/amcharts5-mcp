---
title: "IChartSerializerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ichartserializersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISerializerSettings
All ancestors: ISerializerSettings, IEntitySettings
Settings of: `am5plugins_json.ChartSerializer` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **removeEmptyObjects** (`boolean`) — default `true` _(class default)_ — Leaves empty objects out of the output.
- **includeRoot** (`boolean`) — default `false` _(class default)_ — Adds a `root` section with what was configured on the `Root`, such as its settings, formatters and locale. _Since 5.20.2._ _Note:_ The `root` section holds the Root's `utc`, `fps`, `numberFormatter`, `dateFormatter`, `durationFormatter`, `tabindex` and `interfaceColors`; JsonParser applies it before parsing the chart.

## Inherited settings with a different default on ChartSerializer

- **excludeSettings** (`string[]`) — default `["chart", "draw", "curveFactory", "pixelHeightFunction", "tooltipDataItem", "legendDataItem", "vcx", "vcy", "bounds", "pointTo", "tooltipTarget", "translateX", "translateY", "heatRules"]` _(class default)_ — _from ISerializerSettings_ — Settings to leave out of the output. Ignored when `includeSettings` is set. _Note:_ ChartSerializer sets a default list; setting `excludeSettings` replaces that list rather than adding to it.
- **functionsAs** (`"string" | "function"`) — default `"function"` _(class default)_ — _from ISerializerSettings_ — How adapter callbacks are written (see `includeAdapters`): `"string"` as their source code, `"function"` as the functions themselves, which JSON can't hold. `ChartSerializer` uses `"function"` unless set.
- **includeAdapters** (`boolean`) — default `true` _(class default)_ — _from ISerializerSettings_ — Writes the elements' adapters. _Since 5.15.0._
- **includeEvents** (`boolean`) — default `true` _(class default)_ — _from ISerializerSettings_ — _(internal)_ Include events in the output. _Since 5.15.0._
- **includeStates** (`boolean`) — default `true` _(class default)_ — _from ISerializerSettings_ — Writes the elements' states. _Since 5.15.0._
- **maxDepth** (`number`) — default `10` _(class default)_ — _from ISerializerSettings_ — How many levels of nested objects to write; deeper ones are left out.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("ISerializerSettings")`) for types, defaults and descriptions.

- _ISerializerSettings_: excludeProperties, fullSettings, includeProperties, includeSettings, runningAnimations
- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
