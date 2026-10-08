---
title: "Select"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/select/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Creates a new type which is the same as T except it only has the properties of type U.

TypeScript: not exported by name from the package.

## Type

```ts
type Select<T, U> = Cond<T, SelectKeys<T, U>>
```
