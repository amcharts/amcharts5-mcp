---
title: "States"
type: "class"
source: "https://docs.amcharts.com/v5/reference/states/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

The `State` objects of an element, by name, such as `"hover"` or `"hidden"`.

Docs: https://docs.amcharts.com/v5/concepts/settings/states/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `apply(newState: string): void` — Applies the state called `newState` to the element at once, without animation. Parameters: `newState`: State name.
- `applyAnimate(newState: string, duration?: number): Animations<E["_settings"]> | undefined` — Applies the state called `newState` to the element, animating each setting to its new value. Returns the `Animation` objects, by setting key, or `undefined` if there is no such state. Parameters: `newState`: State name; `duration`: Duration in milliseconds; `stateAnimationDuration` of the state or element if not given. Returns: Animations
- `create(name: string, settings: Partial<E["_settings"]>): State<E>` — Creates the state called `name` with `settings`, or adds `settings` to it if it already exists. Parameters: `name`: State name; `settings`: Settings. Returns: State
- `lookup(name: string): State<E> | undefined` — Returns the state called `name`, or `undefined` if there is none. Parameters: `name`: State name. Returns: State
- `remove(name: string): void` — Removes the state called `name`. Parameters: `name`: State name.
