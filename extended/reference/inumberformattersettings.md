---
title: "INumberFormatterSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/inumberformattersettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IEntitySettings
Settings of: `am5.NumberFormatter` (see its page for the class)
TypeScript: `am5.INumberFormatterSettings` (`import type { INumberFormatterSettings } from "@amcharts/amcharts5"`)

## Settings

- **numberFormat** (`string | Intl.NumberFormatOptions`) — default `"#,###.#####"` — Format used when no other format is given: a format string, or options for `Intl.NumberFormat`.
- **negativeBase** (`number`) — default `0` — Values below this use the negative part of the format (after the first `|`), and a value equal to it the zero part (after the second `|`). The minus sign still shows only for values below `0`.
- **bigNumberPrefixes** (`INumberSuffix[]`) — Suffixes for big numbers and the values they stand for, such as `"M"` for a million. Used by the `a` modifier of the number format.
- **smallNumberPrefixes** (`INumberSuffix[]`) — Suffixes for small numbers and the values they stand for, such as `"m"` for a thousandth. Used by the `a` modifier of the number format.
- **smallNumberThreshold** (`number`) — default `1` — Numbers below this use `smallNumberPrefixes` with the `a` modifier; others use `bigNumberPrefixes`.
- **bytePrefixes** (`INumberSuffix[]`) — Suffixes for data sizes and the byte counts they stand for, such as `"KB"` for 1024. Used by the `b` modifier of the number format.
- **numericFields** (`string[]`) — Data fields that hold numbers. Text placeholders with these fields are formatted as numbers even without `formatNumber()`.
- **intlLocales** (`string`) — Locale for formats given as `Intl.NumberFormat` options, such as `"de-DE"`. The browser's locale if not set. Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
- **forceLTR** (`boolean`) — default `false` — Forces formatted numbers to read left to right, even in a right-to-left layout. _Since 5.3.13._

## Other inherited settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IEntitySettings")`) for types, defaults and descriptions.

- _IEntitySettings_: animations, id, ignoreThemes, stateAnimationDuration, stateAnimationEasing, themes, themeTags, themeTagsSelf, userData
