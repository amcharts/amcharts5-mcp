---
title: "Keyof"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/keyof/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

`Keyof<T>` is the same as `keyof T` except it only accepts string keys, not numbers or symbols.

TypeScript: not exported by name from the package.

## Type

```ts
type Keyof<T> = Extract<keyof T, string>
```
