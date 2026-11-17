---
title: "Timezone"
type: "class"
source: "https://docs.amcharts.com/v5/reference/timezone/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A named timezone, such as `"America/New_York"`, used for `root.timezone`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **name** (`string`) — The IANA name of the timezone.

## Methods

- `convertLocal(date: Date): Date` — Returns a copy of `date` shifted so that its local time reads as the time in this timezone. Parameters: `date`: Date. Returns: Shifted date
- `offsetUTC(date: Date): number` — Returns the timezone's offset from UTC at `date`, in minutes, signed as `Date.getTimezoneOffset()` is: positive west of UTC. Parameters: `date`: Date. Returns: Offset in minutes
- `parseDate(date: Date): ParsedDate` — Returns the parts of `date` as seen in this timezone: year, month (from `0`), day, hour, minute, second, millisecond and weekday (`0` for Sunday). Parameters: `date`: Date. Returns: Date parts
