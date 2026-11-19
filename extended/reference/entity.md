---
title: "Entity"
type: "class"
source: "https://docs.amcharts.com/v5/reference/entity/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

Base class of amCharts objects with settings, states, adapters and events: elements, series, charts, formatters and more.

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Entity.new(root, { /* settings */ });
```

## Inheritance

Extends: Settings
Extended by: Annotator, AxisBullet, Bullet, ColorSet, DataProcessor, DateFormatter, Dropdown, DurationFormatter, Exporting, ExportingMenu, Gradient, InterfaceColors, Language, Layout, Modal, NumberFormatter, Pattern, PatternSet, Serializer, SliceGrouper, Sprite, StockControl, StockToolbar

## Settings and related interfaces

- Settings: `IEntitySettings` — get_api_reference shows it after this page
- Private settings: `IEntityPrivate`
- Events: `IEntityEvents`

## Properties

Public properties (not settings):

- **adapters** (`Adapters<this>`)
- **events** (`EventDispatcher<Events<this, this["_events"]>>`)
- **root** (`Root`) — The `Root` the object belongs to. _Since 5.0.6._
- **states** (`States<this>`)
- **template** (`Template<this>`) — A `Template` applied to the object. Its settings apply where the object has none set of its own.

## Methods

- `get<Key extends keyof this["_settings"], F>(key: Key, fallback: F): NonNullable<this["_settings"][Key]> | F` / `get<Key extends keyof this["_settings"]>(key: Key): this["_settings"][Key]` — Returns the value of setting `key`, run through any adapters, or `fallback` if it is not set. Parameters: `key`: Settings key; `fallback`: Value to return if the setting is not set. Returns: Value Docs: https://docs.amcharts.com/v5/concepts/settings/
- `isType<A>(type: string): this is A` — Returns `true` if the object is of class `type` or extends it. Parameters: `type`: Class name, such as `"XYSeries"`. Returns: Is of class?
- `remove<Key extends keyof this["_settings"]>(key: Key): void` — Removes the value set for setting `key`. The setting goes back to the value from a theme or template, if one has it. Parameters: `key`: Setting key. Docs: https://docs.amcharts.com/v5/concepts/settings/
- `set<Key extends keyof this["_settings"], Value extends this["_settings"][Key]>(key: Key, value: Value): Value` — Sets setting `key` to `value` and returns `value`. A value set this way overrides themes and templates, and stops any animation of the setting. Parameters: `key`: Setting key; `value`: Setting value. Returns: Setting value Docs: https://docs.amcharts.com/v5/concepts/settings/
- `setTimeout(fn: () => void, delay: number): IDisposer` — Calls `fn` after `delay` milliseconds, unless the object is disposed first. Disposing the returned disposer cancels it. Parameters: `fn`: Callback; `delay`: Delay in milliseconds. Returns: Timeout disposer

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Settings")`) for signatures and descriptions.

- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
