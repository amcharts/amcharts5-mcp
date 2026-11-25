---
title: "TemplateAdapters"
type: "class"
source: "https://docs.amcharts.com/v5/reference/templateadapters/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Adapters of a `Template`, added to every object that uses the template.

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `add<Key extends keyof E["_settings"]>(key: Key, callback: (value: E["_settings"][Key], target: E, key: Key) => E["_settings"][Key]): IDisposer` — Adds a function that modifies the value of setting `key` each time it is read, on the objects that use the template. Parameters: `key`: Setting key; `callback`: Takes the value and returns the modified one. Returns: Disposer that removes the adapter
- `remove<Key extends keyof E["_settings"]>(key: Key): void` — Removes all adapters for setting `key` from the template. Parameters: `key`: Setting key.
