---
title: "DateFormatter"
type: "class"
source: "https://docs.amcharts.com/v5/reference/dateformatter/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Formats dates in labels, tooltips and other text, and parses date strings.

Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.DateFormatter.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IDateFormatterSettings` — get_api_reference shows it after this page
- Private settings: `IDateFormatterPrivate`

## Methods

- `format(source: any, format?: string | Intl.DateTimeFormatOptions, ignoreTimezone?: boolean): string` — Formats a `Date` as a string. Parameters: `source`: Date; `format`: Format string or `Intl.DateTimeFormat` options; `dateFormat` if not given; `ignoreTimezone`: Ignore the root's `utc` and `timezone` settings. Returns: Formatted date
- `parse(source: any, format: string, utc?: boolean): Date` — Parses a date string in `format` into a `Date`. A `Date` is returned as it is and a number is read as a timestamp. A string that doesn't match the format is passed to the `Date` constructor. Parameters: `source`: Date string; `format`: Format of the string, such as `"yyyy-MM-dd"`; `utc`: Parse as UTC; the root's `utc` setting if not given. Returns: Date

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
