---
title: "Template"
type: "class"
source: "https://docs.amcharts.com/v5/reference/template/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Settings, states, adapters and events shared by many objects, such as all columns of a series. A setting on the template reaches every object that uses it, unless the object has its own value.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Properties

Public properties (not settings):

- **adapters** (`TemplateAdapters<E>`) — Adapters added to the objects that use the template.
- **entities** (`E[]`) — The objects that use the template.
- **events** (`EventDispatcher<Events<E, E["_events"]>>`) — Event listeners added to the objects that use the template.
- **setup** (`<O extends E>(entity: O) => void`) — A function called once for each object that uses the template, when the template is first applied to it.
- **states** (`TemplateStates<E>`) — States passed on to the objects that use the template.

## Methods

- `dispose(): void` — Disposes the template, along with any disposable objects in its settings.
- `get<Key extends keyof this["_settings"]>(key: Key): this["_settings"][Key]` / `get<Key extends keyof this["_settings"], F>(key: Key, fallback: F): NonNullable<this["_settings"][Key]> | F` — Returns the template's value of setting `key`, or `fallback` if it has none. Parameters: `key`: Setting key. Returns: Value
- `getPrivate<Key extends keyof this["_privateSettings"], F>(key: Key, fallback: F): NonNullable<this["_privateSettings"][Key]> | F` / `getPrivate<Key extends keyof this["_privateSettings"]>(key: Key): this["_privateSettings"][Key]` — Returns the template's value of private setting `key`, or `fallback` if it has none. Parameters: `key`: Private setting key; `fallback`: Value to return if the setting is not set. Returns: Value
- `isDisposed(): boolean` — Returns `true` if the template has been disposed. Returns: Disposed
- `on<Key extends keyof this["_settings"]>(key: Key, callback: (value: this["_settings"][Key], target?: E, key?: Key) => void): IDisposer` — Calls `callback` each time setting `key` changes on an object that uses the template. Parameters: `key`: Setting key; `callback`: Callback. Returns: Disposer for event
- `onPrivate<Key extends keyof this["_privateSettings"]>(key: Key, callback: (value: this["_privateSettings"][Key], target?: E, key?: Key) => void): IDisposer` — Calls `callback` each time private setting `key` changes on an object that uses the template. Parameters: `key`: Private setting key; `callback`: Callback. Returns: Disposer for event
- `remove<Key extends keyof this["_settings"]>(key: Key): void` — Removes setting `key` from the template. The objects that use it go back to a value from a theme or other template, if there is one. Parameters: `key`: Setting key.
- `removeAll(): void` — Removes all settings from the template, as `remove()` does for each one.
- `removePrivate<Key extends keyof this["_privateSettings"]>(key: Key): void` — Removes private setting `key` from the template. Parameters: `key`: Private setting key.
- `set<Key extends keyof this["_settings"]>(key: Key, value: this["_settings"][Key]): void` — Sets setting `key` on the template, and on every object that uses it and has no value of its own. Parameters: `key`: Setting key; `value`: Setting value.
- `setAll(value: this["_settings"]): void` — Sets several settings at once, as `set()` does for each one. Parameters: `value`: Settings.
- `setPrivate<Key extends keyof this["_privateSettings"], Value extends this["_privateSettings"][Key]>(key: Key, value: Value): Value` — Sets private setting `key` on the template, and on every object that uses it and has no value of its own. Returns `value`. Parameters: `key`: Private setting key; `value`: Setting value. Returns: Setting value
- `setPrivateRaw<Key extends keyof this["_privateSettings"], Value extends this["_privateSettings"][Key]>(key: Key, value: Value): Value` — Sets private setting `key` on the template only, without passing it on to the objects that use it. Returns `value`. Parameters: `key`: Private setting key; `value`: Setting value. Returns: Setting value
- `setRaw<Key extends keyof this["_settings"]>(key: Key, value: this["_settings"][Key]): void` — Sets setting `key` on the template only, without passing it on to the objects that use it. Parameters: `key`: Setting key; `value`: Setting value.
