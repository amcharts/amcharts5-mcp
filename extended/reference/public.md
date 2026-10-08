---
title: "Public"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/public/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

A type with only the public members of `T`.

TypeScript: not exported by name from the package.

## Type

```ts
type Public<T> = { [P in keyof T]: T[P]; }
```
