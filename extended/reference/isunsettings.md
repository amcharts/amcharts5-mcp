---
title: "ISunSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isunsettings/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Settings shared by the series that show day and night.

_Since 5.21.0._

## Inheritance

Extends: (none)
TypeScript: `am5map.ISunSettings` (`import type { ISunSettings } from "@amcharts/amcharts5/map"`)

## Settings

- **sunPosition** (`IGeoPoint`) — The point where the sun is directly overhead. `am5map.getSunPosition()` finds it for a date, or set `sunDate` to have the series find it.
- **sunDate** (`string | number | Date`) — Works out `sunPosition` for this date: `"now"`, a timestamp in milliseconds, a date string (e.g. `"2026-12-21T12:00:00Z"`) or a `Date`. With `"now"` the sun moves with the clock, once a minute. Overrides `sunPosition`. To change a `Date`, set a new one: a change made to the same object goes unnoticed. _Since 5.21.0._
- **twilight** (`number`) — default `12` — How wide the twilight between day and night is, in degrees of the sun's height: day turns into night from half this above the horizon to half below it.
