---
title: "State"
type: "class"
source: "https://docs.amcharts.com/v5/reference/state/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

A named set of setting values, such as `"hover"`, that an element takes on when the state is applied.

Docs: https://docs.amcharts.com/v5/concepts/settings/states/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `apply(): void` — Applies the state to its element at once, without animation. The values the element had before are kept in its `"default"` state, for going back.
- `applyAnimate(duration?: number): Animations<E["_settings"]>` — Applies the state to its element, animating each setting to its new value. Returns the `Animation` objects, by setting key. Parameters: `duration`: Duration in milliseconds; `stateAnimationDuration` of the state or element if not given. Returns: Animations
- `get<Key extends keyof this["_settings"]>(key: Key): this["_settings"][Key]` / `get<Key extends keyof this["_settings"], F>(key: Key, fallback: F): NonNullable<this["_settings"][Key]> | F` — Returns the state's value for setting `key`, or `fallback` if it has none. Parameters: `key`: Settings key. Returns: Value Docs: https://docs.amcharts.com/v5/concepts/settings/
- `remove<Key extends keyof this["_settings"]>(key: Key): void` — Removes setting `key` from the state. Parameters: `key`: Setting key. Docs: https://docs.amcharts.com/v5/concepts/settings/
- `set<Key extends keyof E["_settings"]>(key: Key, value: E["_settings"][Key]): void` — Sets the value setting `key` takes when the state is applied. Parameters: `key`: Setting key; `value`: Setting value.
- `setAll(settings: this["_settings"]): void` — Sets several of the state's settings at once, from an object of key-value pairs. Parameters: `settings`: Settings. Docs: https://docs.amcharts.com/v5/concepts/settings/
