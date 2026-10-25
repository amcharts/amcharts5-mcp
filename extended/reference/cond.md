---
title: "Cond"
type: "type"
source: "https://docs.amcharts.com/v5/reference/cond/"
generatedFrom: "@amcharts/amcharts5@5.21.4"
---

============================================================================ MISC ============================================================================

TypeScript: not exported by name from the package.

## Type

```ts
type Cond<T, Keys extends keyof T> = Keys extends never ? never : { [K in Keys]: T[K]; }
```
