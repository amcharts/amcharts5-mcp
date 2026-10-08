---
title: "IListEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilistevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Events

- **clear** (`{ oldValues: Array<A>; }`) — All items were removed, by `clear()` or `setAll()`.
- **push** (`{ newValue: A; }`) — An item was added to the end of the list.
- **insertIndex** (`{ index: number; newValue: A; }`) — An item was inserted at `index`.
- **setIndex** (`{ index: number; oldValue: A; newValue: A; }`) — The item at `index` was replaced.
- **removeIndex** (`{ index: number; oldValue: A; }`) — The item at `index` was removed.
- **moveIndex** (`{ oldIndex: number; newIndex: number; value: A; }`) — An item was moved from `oldIndex` to `newIndex`.
- **swap** (`{ a: A; b: A; }`) — Two items swapped places.
