---
title: "ISeriesSummary"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iseriessummary/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A summary of a series' data, as returned by `getSummary()`.

## Inheritance

Extends: (none)
TypeScript: not exported by name from the package.

## Properties

- **count** (`number`) — Number of data items with a value.
- **first** (`ISeriesSummaryItem`) — The first data item with a value (series whose data has an order, like XY series).
- **last** (`ISeriesSummaryItem`) — The last data item with a value (series whose data has an order).
- **highest** (`ISeriesSummaryItem`) — The data item with the highest value.
- **lowest** (`ISeriesSummaryItem`) — The data item with the lowest value.
- **text** (`string`) — All of it in a few short sentences, as screen readers read it.
