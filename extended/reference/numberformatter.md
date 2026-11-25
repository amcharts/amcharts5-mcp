---
title: "NumberFormatter"
type: "class"
source: "https://docs.amcharts.com/v5/reference/numberformatter/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Formats numbers in labels, tooltips and other text.

Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.NumberFormatter.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `INumberFormatterSettings` — get_api_reference shows it after this page
- Private settings: `INumberFormatterPrivate`

## Methods

- `format(value: number | string, format?: string | Intl.NumberFormatOptions, precision?: number): string` — Formats a number as a string. Parameters: `value`: Value to format; `format`: Format string or `Intl.NumberFormat` options; `numberFormat` if not given; `precision`: Minimum number of decimals, padded with zeros, shown even where the format keeps fewer; ignored for a format with a modifier. Returns: Formatted number

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
