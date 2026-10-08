---
title: "ISerializerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iserializersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5plugins_json.Serializer` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **excludeSettings** (`string[]`) — default `[]` _(code fallback)_ — Settings to leave out of the output. Ignored when `includeSettings` is set. _Note:_ ChartSerializer sets a default list; setting `excludeSettings` replaces that list rather than adding to it.
- **includeSettings** (`string[]`) — default `[]` _(code fallback)_ — The only settings to write; all others are left out.
- **fullSettings** (`string[]`) — default `[]` _(code fallback)_ — Settings whose plain-object values are written with all their keys. In other settings, a plain object comes out empty. _Since 5.7.0._
- **excludeProperties** (`string[]`) — default `[]` _(code fallback)_ — Properties to leave out of the output, e.g. `"data"`. _Since 5.3.2._
- **includeProperties** (`string[]`) — default `[]` _(code fallback)_ — _(internal)_ An array of properties to include in the serialized data. _Since 5.15.0._
- **maxDepth** (`number`) — default `2` — How many levels of nested objects to write; deeper ones are left out.
- **runningAnimations** (`boolean`) — default `true` — Write an animation started in code that loops forever - a globe that keeps turning, a marker that keeps pulsing - into the `animations` setting, so the saved chart plays it too. Animations that end (`appear()`, state changes, zooming) are never written, and neither is one whose easing is a function of its own rather than one of amCharts' easings. _Since 5.20.8._ _Note:_ Such an animation (`loops: Infinity` with a named easing) is written as an `animations` entry `{ key, from, to, duration, loops: 0, easing?, ease?, yoyo? }` (see IDeclaredAnimation), and the setting it animates is left out of the saved settings. Easings `am5.ease.easingInfo()` cannot name — e.g. one made with `am5.ease.pow`, or `am5.ease.out(am5.ease.yoyo(x))` — are not written. ChartSerializer also writes an endless animation of a bullet's data item value (e.g. `dataItem.animate({ key: "positionOnLine", loops: Infinity, … })`) on the bullet sprite, as an entry with `target: "dataItem"` (5.21.0; 5.20.8 did not). Turn it off with `am5plugins_json.ChartSerializer.new(root, { runningAnimations: false })`.
- **includeStates** (`boolean`) — default `false` — Writes the elements' states. _Since 5.15.0._
- **includeAdapters** (`boolean`) — default `false` — Writes the elements' adapters. _Since 5.15.0._
- **includeEvents** (`boolean`) — default `false` — _(internal)_ Include events in the output. _Since 5.15.0._
- **functionsAs** (`"string" | "function"`) — default `"string"` — How adapter callbacks are written (see `includeAdapters`): `"string"` as their source code, `"function"` as the functions themselves, which JSON can't hold. `ChartSerializer` uses `"function"` unless set.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
