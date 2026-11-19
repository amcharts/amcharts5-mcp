---
title: "Annotator"
type: "class"
source: "https://docs.amcharts.com/v5/reference/annotator/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

A plugin that lets the user draw annotations over the chart, using the MarkerJS library.

Docs: https://docs.amcharts.com/v5/concepts/exporting/annotator/

## Import

```js
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

am5plugins_exporting.Annotator.new(root, { /* settings */ });
```

## Inheritance

Extends: Entity → Settings

## Settings and related interfaces

- Settings: `IAnnotatorSettings` — get_api_reference shows it after this page
- Private settings: `IAnnotatorPrivate`
- Events: `IAnnotatorEvents`

## Methods

- `cancel(): Promise<void>` — Exits annotation mode, discarding the changes made since it opened.
- `clear(): void` — Removes all annotations.
- `close(): Promise<void>` — Exits annotation mode. The annotations stay visible on the chart.
- `getMarkerArea(): Promise<any>` — Returns MarkerJS's `MarkerArea`, loading MarkerJS first if needed. Returns: MarkerArea Docs: https://markerjs.com/docs/getting-started
- `open(): Promise<void>` — Opens annotation mode: shows the MarkerJS toolbars and disables interaction with the chart.
- `toggle(): Promise<void>` — Opens annotation mode, or closes it if it is open.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
