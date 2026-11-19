---
title: "DurationFormatter"
type: "class"
source: "https://docs.amcharts.com/v5/reference/durationformatter/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Formats numbers as durations, such as `125` seconds as `"02:05"`.

Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-durations/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.DurationFormatter.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IDurationFormatterSettings` — get_api_reference shows it after this page
- Private settings: `IDurationFormatterPrivate`

## Methods

- `format(value: number | string, format?: string, base?: TimeUnit): string` — Formats a number as a duration. For example `1000` with base unit `"second"` gives `"16:40"`: 16 minutes and 40 seconds. Parameters: `value`: Value to format; `format`: Format to apply; `durationFormat` or a default from `durationFormats` if not given; `base`: Base unit of the value; `baseUnit` if not given. Returns: Formatted number
- `getFormat(value: number, maxValue?: number, baseUnit?: TimeUnit): string` — Returns the format for `value`: `durationFormat` if set, otherwise the entry of `durationFormats` for the largest unit the value reaches. With `maxValue`, the unit comes from the larger of the two, so a range of values shares one format. With base unit `"second"`, `10` alone gets `"ss"`, but with `maxValue` `600` it gets `"mm:ss"` and shows as `00:10`. Parameters: `value`: Value to format; `maxValue`: Largest value of the range, used to pick the unit; `baseUnit`: Base unit of the value; `baseUnit` if not given. Returns: Format
- `getMilliseconds(value: number, baseUnit?: TimeUnit): number` — Converts a value in `baseUnit` to milliseconds. Parameters: `value`: Source duration value; `baseUnit`: Base unit; `baseUnit` setting if not given. Returns: Value in milliseconds
- `getValueUnit(value: number, baseUnit?: TimeUnit): TimeUnit | undefined` — Returns the largest unit the value holds more than one of: 100 seconds is `"minute"`, 59 seconds is still `"second"`. Parameters: `value`: Source duration value; `baseUnit`: Base unit; `baseUnit` setting if not given. Returns: Time unit
- `toTimeStamp(value: number, baseUnit: TimeUnit): number` — Converts a value in `baseUnit` to milliseconds. Parameters: `value`: A source value; `baseUnit`: Unit the value is in, such as `"second"`. Returns: Value in milliseconds

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
