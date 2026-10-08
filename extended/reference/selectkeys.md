---
title: "SelectKeys"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/selectkeys/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Selects all the keys of T which have a value of U.

TypeScript: not exported by name from the package.

## Type

```ts
type SelectKeys<T, U> = Never<{ [K in keyof T]: T[K] extends U ? K : never; }[keyof T]>
```
