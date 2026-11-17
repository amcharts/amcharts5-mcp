---
title: "Adapters"
type: "class"
source: "https://docs.amcharts.com/v5/reference/adapters/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Functions that modify an element's setting values each time they are read.

Docs: https://docs.amcharts.com/v5/concepts/settings/adapters/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)

## Methods

- `add<Key extends keyof E["_settings"]>(key: Key, callback: (value: E["_settings"][Key], target: E, key: Key) => E["_settings"][Key]): IDisposer` — Adds a function that modifies the value of setting `key` each time it is read. Parameters: `key`: Setting key; `callback`: Takes the value and returns the modified one. Returns: Disposer that removes the adapter Docs: https://docs.amcharts.com/v5/concepts/settings/adapters/
- `disable<Key extends keyof E["_settings"]>(key: Key): void` — Turns off all adapters for setting `key` without removing them. Parameters: `key`: Setting key. _Since 5.1.0._
- `enable<Key extends keyof E["_settings"]>(key: Key): void` — Turns the adapters for setting `key` back on after `disable()`. Parameters: `key`: Setting key. _Since 5.1.0._
- `remove<Key extends keyof E["_settings"]>(key: Key): void` — Removes all adapters for setting `key`. Parameters: `key`: Setting key. _Since 5.1.0._
