---
title: "MutableValueDisposer"
type: "class"
source: "https://docs.amcharts.com/v5/reference/mutablevaluedisposer/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Holds a value together with its disposer. Setting a new value with `set()` disposes the previous disposer.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: DisposerClass

## Methods

- `get(): Optional<T>` — Returns current value. Returns: Value
- `reset(): void` — Resets the disposer value.
- `set(value: Optional<T>, disposer: Optional<IDisposer>): void` — Sets value and disposes previous disposer if it was set. Parameters: `value`: New value; `disposer`: Disposer.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("DisposerClass")`) for signatures and descriptions.

- _DisposerClass_: dispose, isDisposed
