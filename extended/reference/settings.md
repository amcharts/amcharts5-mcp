---
title: "Settings"
type: "class"
source: "https://docs.amcharts.com/v5/reference/settings/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class for objects with settings, such as `Entity`.

Docs: https://docs.amcharts.com/v5/concepts/settings/

## Import

Not exported from any `@amcharts/amcharts5` entry point (internal class).

## Inheritance

Extends: (none)
Extended by: DataItem, Entity

## Properties

Public properties (not settings):

- **enableDispose** (`boolean`) — Set to `false` to make `dispose()` do nothing.
- **uid** (`number`) — A unique number, given to each object as it is created.

## Methods

- `animate<Key extends keyof this["_settings"]>(options: AnimationOptions<Key, this["_settings"][Key]>): Animation<this["_settings"][Key]>` — Animates a setting from its current value (or `from`) to `to`. The setting jumps to `from` at once. With `duration` `0`, or no value to start from, it is set to `to` at once and the returned animation is already stopped. Parameters: `options`: Animation options. Returns: Animation object Docs: https://docs.amcharts.com/v5/concepts/animations/#animating-settings
- `dispose(): void` — Disposes the object, freeing everything it holds. A disposed object can't be used again.
- `get<Key extends keyof this["_settings"], F>(key: Key, fallback: F): NonNullable<this["_settings"][Key]> | F` / `get<Key extends keyof this["_settings"]>(key: Key): this["_settings"][Key]` — Returns the value of setting `key`, or `fallback` if it is not set. Parameters: `key`: Settings key; `fallback`: Value to return if the setting is not set. Returns: Value Docs: https://docs.amcharts.com/v5/concepts/settings/
- `has<Key extends keyof this["_settings"]>(key: Key): boolean` — Returns `true` if setting `key` is set. Parameters: `key`: Settings key. Returns: Key exists Docs: https://docs.amcharts.com/v5/concepts/settings/
- `isDisposed(): boolean` — Returns `true` if the object has been disposed. Returns: Disposed
- `off<Key extends keyof this["_settings"]>(key: Key, callback?: (value: this["_settings"][Key], target?: this, key?: Key) => void): void` — Removes a callback added with `on()`. Without `callback`, removes all of them for `key`. Parameters: `key`: Settings key; `callback`: Callback. _Since 5.9.2._ Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `offDebounced<Key extends keyof this["_settings"]>(key: Key, callback?: (value: this["_settings"][Key], target?: this, key?: Key) => void): void` — Removes a callback added with `onDebounced()`. Without `callback`, removes all of them for `key`. Parameters: `key`: Settings key; `callback`: Callback. Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `offDebouncedPrivate<Key extends keyof this["_privateSettings"]>(key: Key, callback?: (value: this["_privateSettings"][Key], target?: this, key?: Key) => void): void` — Removes a callback added with `onPrivateDebounced()`. Without `callback`, removes all of them for `key`. Parameters: `key`: Private settings key; `callback`: Callback. Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `offPrivate<Key extends keyof this["_privateSettings"]>(key: Key, callback?: (value: this["_privateSettings"][Key], target?: this, key?: Key) => void): void` — Removes a callback added with `onPrivate()`. Without `callback`, removes all of them for `key`. Parameters: `key`: Private settings key; `callback`: Callback. _Since 5.9.2._ Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `on<Key extends keyof this["_settings"]>(key: Key, callback: (value: this["_settings"][Key], target?: this, key?: Key) => void): IDisposer` — Calls `callback` each time the value of setting `key` changes or is removed. Setting the same value again does not call it. Parameters: `key`: Settings key; `callback`: Callback. Returns: Disposer for event Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `onDebounced<Key extends keyof this["_settings"]>(key: Key, callback: (value: this["_settings"][Key], target?: this, key?: Key) => void, debounceDelay: number): IDisposer` — Like `on()`, but waits until setting `key` has not changed for `debounceDelay` milliseconds, then calls `callback` once with the latest value. Parameters: `key`: Settings key; `callback`: Callback; `debounceDelay`: Debounce delay in milliseconds. Returns: Disposer for event Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `onPrivate<Key extends keyof this["_privateSettings"]>(key: Key, callback: (value: this["_privateSettings"][Key], target?: this, key?: Key) => void): IDisposer` — Calls `callback` each time the value of private setting `key` changes. Parameters: `key`: Private settings key; `callback`: Callback. Returns: Disposer for event Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `onPrivateDebounced<Key extends keyof this["_privateSettings"]>(key: Key, callback: (value: this["_privateSettings"][Key], target?: this, key?: Key) => void, debounceDelay: number): IDisposer` — Like `onPrivate()`, but waits until private setting `key` has not changed for `debounceDelay` milliseconds, then calls `callback` once with the latest value. Parameters: `key`: Private settings key; `callback`: Callback; `debounceDelay`: Debounce delay in milliseconds. Returns: Disposer for event Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `once<Key extends keyof this["_settings"]>(key: Key, callback: (value: this["_settings"][Key], target?: this, key?: Key) => void): IDisposer` — Like `on()`, but the callback is removed after it is called once. Parameters: `key`: Settings key; `callback`: Callback. Returns: Disposer for event _Since 5.20.4._ Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `onceDebounced<Key extends keyof this["_settings"]>(key: Key, callback: (value: this["_settings"][Key], target?: this, key?: Key) => void, debounceDelay: number): IDisposer` — Like `onDebounced()`, but the callback is removed after it is called once. Parameters: `key`: Settings key; `callback`: Callback; `debounceDelay`: Debounce delay in milliseconds. Returns: Disposer for event _Since 5.20.4._ Docs: https://docs.amcharts.com/v5/concepts/events/#settings-value-change
- `remove<Key extends keyof this["_settings"]>(key: Key): void` — Removes the value of setting `key`. Parameters: `key`: Setting key. Docs: https://docs.amcharts.com/v5/concepts/settings/
- `removeAll(): void` — Removes all settings, as `remove()` does for each one. Docs: https://docs.amcharts.com/v5/concepts/settings/
- `set<Key extends keyof this["_settings"], Value extends this["_settings"][Key]>(key: Key, value: Value): Value` — Sets setting `key` to `value` and returns `value`. Stops any animation of that setting. Parameters: `key`: Setting key; `value`: Setting value. Returns: Setting value Docs: https://docs.amcharts.com/v5/concepts/settings/
- `setAll(settings: Partial<this["_settings"]>): void` — Sets several settings at once, from an object of key-value pairs. Parameters: `settings`: Settings. Docs: https://docs.amcharts.com/v5/concepts/settings/
