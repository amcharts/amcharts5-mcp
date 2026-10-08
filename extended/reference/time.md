---
title: "Time"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/time/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Animation progress, from `0` (start) to `1` (end). A number converts to a `Time`, but a `Time` does not convert back to a number.

TypeScript: not exported by name from the package.

## Type

```ts
type Time = number | ITime
```

## time (namespace)

Helpers exported as `am5.time`.

### Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.time.…
```

### Functions

- `add(date: Date, unit: TimeUnit, count: number, utc?: boolean, timezone?: Timezone): Date` — Adds `count` units of time to `date`. Changes `date` itself and returns it.
- `checkChange(timeOne: number, timeTwo: number, unit: TimeUnit, utc?: boolean, timezone?: Timezone): boolean` — Returns `true` if two timestamps fall in different periods of `unit`, such as on different days for `"day"`.
- `chooseInterval(index: number, duration: number, gridCount: number, intervals: Array<ITimeInterval>): ITimeInterval`
- `copy(date: Date): Date` — Returns a copy of the `Date` object.
- `getDateIntervalDuration(interval: ITimeInterval, date: Date, firstDateOfWeek?: number, utc?: boolean, timezone?: Timezone): number` — Returns the length of `interval` in milliseconds, for the period that `date` falls in. Days, weeks, months and years get their real length there, such as 29 days for February 2024.
- `getDuration(unit: TimeUnit, count?: number): number` — Returns the length of `count` units of time, in milliseconds. A month counts as an average month (about 30.44 days), a year as 365 days.
- `getIntervalDuration(interval: ITimeInterval | undefined): number`
- `getNextUnit(unit: TimeUnit): TimeUnit | undefined` — Returns the next time unit that goes after source `unit`.
- `getTime(): number` — Returns current timestamp.
- `getUnitValue(date: Date, unit: TimeUnit): number`
- `now(): Date` — Returns current `Date` object.
- `roun(time: number, unit: TimeUnit, count: number, root: Root, firstTime?: number): number`
- `round(date: Date, unit: TimeUnit, count: number, firstDateOfWeek?: number, utc?: boolean, firstDate?: Date, timezone?: Timezone): Date` — Rounds a date down to the start of its period of `count` units, such as to midnight for `"day"`. May change `date` itself.
- `sleep(ms: number): Promise<void>` — Returns a promise that resolves after `ms` milliseconds.

### Other members

- `ITimeInterval` (interface)
- `TimeUnit` (type)
- `timeUnitDurations` (constant)
