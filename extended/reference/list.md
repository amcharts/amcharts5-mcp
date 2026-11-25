---
title: "List"
type: "class"
source: "https://docs.amcharts.com/v5/reference/list/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
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

## Methods

- `clear(): void` — Removes all items from the list.
- `contains(value: T): boolean` — Checks if list contains specific item reference. Parameters: `value`: Item to search for. Returns: `true` if found, `false` if not found
- `copyFrom(source: this): void` — Adds all items of another list to the end of this one. Parameters: `source`: A list to copy items from.
- `each(f: (value: T, index: number) => void): void` — Calls `f` for each item in the list, with the item and its index.
- `eachReverse(f: (value: T, index: number) => void): void` — Calls `f` for each item in the list, from last to first, with the item and its index.
- `getIndex(index: number): T | undefined` — Returns an item at specified index. Parameters: `index`: Index. Returns: List item
- `hasIndex(index: number): boolean` — Checks if there's a value at specific index. Parameters: `index`: Index. Returns: Value exists?
- `indexOf(value: T): number` — Searches the list for specific item and returns its index. Parameters: `value`: An item to search for. Returns: Index or -1 if not found
- `insertIndex<K extends T>(index: number, value: K): K` — Inserts an item at `index`, moving the items from there on one place further. Parameters: `index`: Index; `value`: An item to add. Returns: Added item
- `moveValue<K extends T>(value: K, toIndex?: number): K` — Moves an item to `toIndex`, or to the end of the list if `toIndex` is not set. An item that is not in the list yet is added. Parameters: `value`: Item to move; `toIndex`: Index to place item at. Returns: Moved item
- `pop(): Optional<T>` — Returns the last item from the list, and removes it. Returns: Item
- `push<K extends T>(value: K): K` — Adds an item to the end of the list. Parameters: `value`: An item to add. Returns: Added item
- `pushAll(values: Array<T>): void` — Adds multiple items to the end of the list. Parameters: `values`: An Array of items to add.
- `removeIndex(index: number): T` — Removes a value at specific index. Parameters: `index`: Index of value to remove. Returns: Removed value
- `removeValue(value: T): void` — Removes all copies of an item from the list. Parameters: `value`: An item to remove.
- `setAll(newArray: Array<T>): void` — Replaces all items in the list with `newArray`. Parameters: `newArray`: New items.
- `setIndex(index: number, value: T): T` — Replaces the value at `index`, which must already exist. Parameters: `index`: Index; `value`: New value. Returns: Old value
- `shift(): Optional<T>` — Returns the first item from the list, and removes it. Returns: Item
- `swap(a: number, b: number): void` — Swaps two items in the list. Parameters: `a`: Index of the first item; `b`: Index of the second item.
- `unshift<K extends T>(value: K): K` — Adds an item as a first item in the list. Parameters: `value`: An item to add. Returns: Added item
