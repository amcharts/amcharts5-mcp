---
title: "registerClass"
type: "function"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Registers a custom class, such as an indicator, so that objects using it can be serialized and restored.

_Since 5.7.2._

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.registerClass(…);
```

## Signature

```ts
am5stock.registerClass(name: string, ref: any): void
```

## Parameters

- **name** (`string`) — Class name
- **ref** (`any`) — Class reference

## Returns

`void`
