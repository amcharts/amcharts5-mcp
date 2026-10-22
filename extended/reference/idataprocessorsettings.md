---
title: "IDataProcessorSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idataprocessorsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.3"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.DataProcessor` (see its page for the class)
TypeScript: `am5.IDataProcessorSettings` (`import type { IDataProcessorSettings } from "@amcharts/amcharts5"`)

## Settings

- **dateFormat** (`string`) — Format of the string dates in `dateFields`, such as `"yyyy-MM-dd"`. Without it, strings are read by the browser's `Date`, which takes a date-only string such as `"2024-03-15"` as midnight UTC.
- **dateFields** (`string[]`) — Data fields to convert to timestamps. A nested field is written as a path, such as `"values.date"`.
- **numericFields** (`string[]`) — Data fields to convert to numbers. A nested field is written as a path, such as `"values.value"`.
- **colorFields** (`string[]`) — Data fields to convert to `Color` objects. A nested field is written as a path, such as `"values.color"`.
- **emptyAs** (`any`) — Replaces empty values (`null`, `undefined` or `""`) in any field with this value.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
