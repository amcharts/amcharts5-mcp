---
title: "Events"
type: "type"
source: "https://www.amcharts.com/docs/v5/reference/events/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

TypeScript: not exported by name from the package.

## Type

```ts
type Events<Target, T> = { [K in keyof T]: T[K] & { type: K; target: Target; }; }
```
