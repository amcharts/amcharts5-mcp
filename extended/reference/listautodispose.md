---
title: "ListAutoDispose"
type: "class"
source: "https://docs.amcharts.com/v5/reference/listautodispose/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A version of a `List` where the elements are disposed automatically when removed from the list, unless `autoDispose` is set to `false`.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: List
Extended by: ListTemplate

## Properties

Public properties (not settings):

- **autoDispose** (`boolean`) — default `true` — Automatically disposes elements that are removed from the list.

## Methods

- `dispose(): void`
- `isDisposed(): boolean`
- `swap(a: number, b: number): void` — Swaps two items in the list, without disposing them. Parameters: `a`: Index of the first item; `b`: Index of the second item.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("List")`) for signatures and descriptions.

- _List_: clear, contains, copyFrom, each, eachReverse, getIndex, hasIndex, indexOf, insertIndex, moveValue, pop, push, pushAll, removeIndex, removeValue, setAll, setIndex, shift, unshift
