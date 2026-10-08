---
title: "array"
type: "namespace"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

Helpers exported as `am5.array`.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.array.…
```

## Functions

- `add<A>(array: Array<A>, element: A, index?: number): void` — Inserts `element` into `array` at `index`.
- `any<A>(array: ArrayLike<A>, test: (value: A) => boolean): boolean` — Returns `true` if `test` returns `true` for any item of `array`, stopping at the first one.
- `copy<A>(array: ArrayLike<A>): Array<A>` — Returns a shallow copy of `array`.
- `each<A>(array: ArrayLike<A>, fn: (value: A, index: number) => void): void` — Iterates through all items in array and calls `fn` function for each of them.
- `eachContinue<A>(array: ArrayLike<A>, fn: (value: A, index: number) => boolean): void` — Iterates through all items in array and calls `fn` function for each of them.
- `eachReverse<A>(array: ArrayLike<A>, fn: (value: A, index: number) => void): void` — Iterates through all items in array in reverse order and calls `fn` function for each of them.
- `find<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): A | undefined` — Returns the first item for which `matches` returns `true`, or `undefined` if there is none.
- `findIndex<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): number` — Searches the array using custom function and returns index of the item if found.
- `findIndexReverse<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): number` — This is the same as `findIndex` except it searches from right to left.
- `findMap<A, B>(array: ArrayLike<A>, matches: (value: A, index: number) => B | undefined): B | undefined` — Calls `matches` on each item and returns the first value it returns that is not `undefined`, or `undefined` if there is none.
- `findReverse<A>(array: ArrayLike<A>, matches: (value: A, index: number) => boolean): A | undefined` — This is the same as `find` except it searches from right to left.
- `first<A>(array: Array<A>): Optional<A>` — Returns the first item of the array.
- `getFirstSortedIndex<A>(array: ArrayLike<A>, ordering: (left: A) => Ordering): SortResult` — Same as `getSortedIndex`, except that the index is that of the left-most match.
- `getSortedIndex<A>(array: ArrayLike<A>, ordering: (left: A) => Ordering): SortResult` — Binary-searches a sorted array. `ordering` returns a negative number for an item before the value searched for, `0` for a match and a positive number for an item after it. The index is that of the right-most match, or where the value would be inserted.
- `has<A>(array: ArrayLike<A>, element: A): boolean` — Returns `true` if `element` exists in `array`.
- `indexOf<A>(array: ArrayLike<A>, value: A): number` — Searches `array` for `value`.
- `insert<A>(array: Array<A>, element: A, index: number): void` — Inserts `element` into `array` at `index`, clamped to `0` to `array.length`.
- `insertIndex<A>(array: Array<A>, index: number, value: A): void` — Inserts a value into array at specific index.
- `keepIf<A>(array: Array<A>, keep: (value: A) => boolean): void` — Removes in place every item for which `keep` returns `false`.
- `last<A>(array: Array<A>): Optional<A>` — Returns the last item of the array.
- `map<A, B>(array: ArrayLike<A>, fn: (value: A, index: number) => B): Array<B>` — Calls `fn` function for every member of array and returns a new array out of all outputs.
- `move<A>(array: Array<A>, element: A, toIndex?: number): void` — Adds `element` to `array` at `toIndex`, or at the end if `toIndex` is not set. If `array` already contains `element`, its first copy is removed first.
- `pushAll<A>(array: Array<A>, input: Array<A>): void` — Pushes all of the elements from `input` into `array`.
- `pushOne<A>(array: Array<A>, element: A): void` — Pushes `element` into `array` if it doesn't already exist.
- `remove<A>(array: Array<A>, element: A): boolean` — Removes `element` from `array`.
- `removeFirst<A>(array: Array<A>, element: A): boolean` — Removes the first copy of `element` from `array`.
- `removeIndex<A>(array: Array<A>, index: number): void` — Removes a value from array at specific index.
- `replace<A>(array: Array<A>, element: A, index?: number): void` — Removes the first copy of `element` from `array` (if it exists) and then inserts `element` at `index`.
- `setIndex<A>(array: Array<A>, element: A, index: number): void` — Removes all copies of `element` from `array` (if they exist) and then inserts `element` at `index`.
- `shiftLeft<A>(array: Array<A>, index: number): void` — Removes the first `index` items of `array` in place, moving the rest to the beginning.
- `shuffle<A>(array: Array<A>): void` — Shuffles `array` in place into a random order.
- `slice<A>(array: ArrayLike<A>, start: number, end?: number): Array<A>` — Returns a copy of `array` which contains all the elements between `start` and `end`. (including `start` and excluding `end`)
- `toArray<A>(input: Array<A> | A): Array<A>` — Wraps `input` in an array, if it isn't already an array.

## Other members

- `Ordering` (type)
- `SortResult` (interface)
