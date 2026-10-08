---
title: "ISliceGrouperSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/islicegroupersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5plugins_sliceGrouper.SliceGrouper` (see its page for the class)
TypeScript: not exported by name from the package.

## Settings

- **series** (`PercentSeries`) — The series whose small slices are grouped.
- **legend** (`Legend`) — Legend to keep in step with the grouping: it gets an item for the group slice, and the items of the grouped slices are hidden.
- **threshold** (`number`) — default `5` _(class default)_ — Slices whose share of the total is at or below this percent are grouped.
- **limit** (`number`) — default `1000` _(code fallback)_ — Keeps only this many first slices; the rest are grouped.
- **groupName** (`string`) — default `"Other"` _(class default)_ — Name (category) of the group slice.
- **clickBehavior** (`"none" | "zoom" | "break"`) — default `"none"` _(class default)_ — What a click on the group slice does: • `"none"`: nothing. • `"break"`: replaces the group slice with the small slices. • `"zoom"`: shows only the small slices, hiding the others.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
