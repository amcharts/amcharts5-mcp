---
title: "List"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/list/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

An ordered list of items that dispatches events as items are added, removed or moved.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)
Extended by: Children, ListAutoDispose, ListData

## Settings and related interfaces

- Events: `IListEvents`

## Properties

Public properties (not settings):

- **events** (`EventDispatcher<Events<this, IListEvents<T>>>`)
- **length** (`number`) — Number of items in list.
- **values** (`T[]`) — An array of values in the list. Don't change this array directly: use methods like `push()` and `removeIndex()`, which dispatch the list's events.
