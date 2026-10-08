---
title: "Type"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/type/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Represents a type for all available JavaScript variable types.

TypeScript: not exported by name from the package.

## Type

```ts
type Type = "[object Object]" | "[object Array]" | "[object String]" | "[object Number]" | "[object Boolean]" | "[object Date]"
```

## type (namespace)

Helpers exported as `am5.type`.

### Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.type.…
```

### Functions

- `assert(condition: boolean, message?: string): asserts condition` — Asserts that the condition is true.
- `getType<A>(value: A): Type` — Returns a type of the value.
- `isArray(value: any): value is Array<unknown>` — Checks if parameter is `Array`.
- `isDate(value: any): value is Date` — Checks if parameter is `Date`.
- `isNaN(value: number): boolean` — Returns `true` if value is not a number (NaN).
- `isNumber(value: any): value is number` — Checks if parameter is `number`. `NaN` is not counted as one.
- `isObject(value: any): value is object` — Checks if parameter is `object`.
- `isString(value: any): value is string` — Checks if parameter is `string`.
- `numberToString(value: number): string` — Converts numeric value into string. Deals with large or small numbers that would otherwise use exponents.
- `repeat(string: string, amount: number): string` — Repeats a `string` number of times as set in `amount`.
- `toDate(value: Date | number | string): Date` — Converts anything to Date object.
- `toNumber(value: any): number` — Converts any value into a `number`. A string with digits in it loses its other characters first, so `"$1,200"` becomes `1200`. `null` and `undefined` are returned as they are.

### Other members

- `Keyof` (type)
- `Optional` (type)
- `PLACEHOLDER` (constant)
- `PLACEHOLDER2` (constant)
- `Public` (type)
- `Select` (type)
- `SelectKeys` (type)
- `Type` (type)
