---
title: "ease.byName"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Returns the easing function called `name` (`"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`), eased in, out or both ways. An unknown name gives `linear`.

_Since 5.20.8._

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.ease.byName(…);
```

## Signature

```ts
am5.ease.byName(name?: string, mode?: "in" | "out" | "inOut"): Easing
```

## Parameters

- **name** (`string`, optional) — Easing name
- **mode** (`"out" | "inOut" | "in"`, optional) — `"in"` (default), `"out"` or `"inOut"`

## Returns

`Easing` — Easing function
