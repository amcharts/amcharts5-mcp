---
title: "TemplateState"
type: "class"
source: "https://docs.amcharts.com/v5/reference/templatestate/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

A state of a `Template`, passed on to every object that uses the template.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `get<Key extends keyof this["_settings"]>(key: Key): this["_settings"][Key]` / `get<Key extends keyof this["_settings"], F>(key: Key, fallback: F): NonNullable<this["_settings"][Key]> | F` — Returns the state's value of setting `key`, or `fallback` if it has none. Parameters: `key`: Setting key. Returns: Value
- `remove<Key extends keyof this["_settings"]>(key: Key): void` — Removes setting `key` from the state. Parameters: `key`: Setting key.
- `set<Key extends keyof E["_settings"]>(key: Key, value: E["_settings"][Key]): void` — Sets the value setting `key` takes in this state, for every object that uses the template. Parameters: `key`: Setting key; `value`: Setting value.
- `setAll(settings: this["_settings"]): void` — Sets several of the state's settings at once. Parameters: `settings`: Settings.
