---
title: "IDurationFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idurationformattersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.DurationFormatter` (see its page for the class)
TypeScript: `am5.IDurationFormatterSettings` (`import type { IDurationFormatterSettings } from "@amcharts/amcharts5"`)

## Settings

- **durationFormat** (`string`) — Format for every duration that is not given its own format. Overrides `durationFormats`.
- **negativeBase** (`number`) — default `0` — Values below this are negative: they use the negative part of the format (after the first `|`) and get a minus sign. A value equal to it uses the zero part (after the second `|`).
- **baseUnit** (`TimeUnit`) — default `"second"` — Unit of the numbers being formatted: `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"` or `"year"`. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-durations/#Base_unit
- **durationFormats** (`Partial<Record<TimeUnit, Partial<Record<TimeUnit, string>>>>`) — Formats picked when `durationFormat` is not set, by base unit and by the largest unit the value reaches: `durationFormats[baseUnit][unit]`. Also used by `DurationAxis`.
- **durationFields** (`string[]`) — Data fields that hold durations. Text placeholders with these fields are formatted as durations even without `formatDuration()`. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/#Formatting_placeholders

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
