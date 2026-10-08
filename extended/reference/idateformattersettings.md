---
title: "IDateFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/idateformattersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.DateFormatter` (see its page for the class)
TypeScript: `am5.IDateFormatterSettings` (`import type { IDateFormatterSettings } from "@amcharts/amcharts5"`)

## Settings

- **capitalize** (`boolean`) — default `true` — Capitalizes the first letter of the formatted date.
- **dateFormat** (`string | Intl.DateTimeFormatOptions`) — default `"yyyy-MM-dd"` — Format used when no other format is given: a format string, or options for `Intl.DateTimeFormat`. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
- **dateFields** (`string[]`) — Data fields that hold dates. Text placeholders with these fields, such as `{date}`, are formatted as dates even without `formatDate()`. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/data-placeholders/#Formatting_placeholders
- **intlLocales** (`string`) — Locale for formats given as `Intl.DateTimeFormat` options, such as `"de-DE"`. The browser's locale if not set.

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
