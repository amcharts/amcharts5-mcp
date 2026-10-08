---
title: "Percent"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/percent/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A relative value in percent, such as 50% of a container's width.

Create one with `am5.percent(50)` or `new am5.Percent(50)`. For `0%`, `50%` and `100%` there are ready-made `am5.p0`, `am5.p50` and `am5.p100`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **percent** (`number`) — The value in percent: `50` for 50%.
- **value** (`number`) — The value as a fraction: `1` for 100%, `0.5` for 50%. Multiply by it to take a share of another value:

  ```ts
  let value = 256;
  let percent = am5.percent(50);
  console.log(value * percent.value); // outputs 128
  ```

  The same with the `am5.p50` shortcut:

  ```ts
  let value = 256;
  let percent = am5.p50;
  console.log(value * percent.value); // outputs 128
  ```

## Function `am5.percent()`

Creates a `Percent` from a number in percent: `am5.percent(80)` is 80%.

```ts
pieSeries.set("radius", am5.percent(80));
```

### Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.percent(…);
```

### Signature

```ts
am5.percent(value: number): Percent
```

### Parameters

- **value** (`number`) — Percent

### Returns

`Percent` — Percent object
