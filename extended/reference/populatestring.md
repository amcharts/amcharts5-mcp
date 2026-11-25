---
title: "populateString"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Populates the curly-bracket placeholders with actual values from a `Sprite`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.populateString(…);
```

## Signature

```ts
am5.populateString(target: Sprite, string: string, final?: boolean): string
```

## Parameters

- **target** (`Sprite`) — Target Sprite
- **string** (`string`) — Target text
- **final** (`boolean`, optional) — Use the values animations are going to, not the current ones

## Returns

`string` — Populated text
