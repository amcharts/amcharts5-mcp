---
title: "SettingsModal"
type: "class"
source: "https://docs.amcharts.com/v5/reference/settingsmodal/"
generatedFrom: "@amcharts/amcharts5@5.23.0"
---

The modal dialog where the settings of an indicator or series are edited.

## Import

```js
import * as am5stock from "@amcharts/amcharts5/stock";

am5stock.SettingsModal.new(root, { /* settings */ });
```

## Inheritance

Extends: Modal → Entity → Settings

## Settings and related interfaces

- Settings: `ISettingsModalSettings` — get_api_reference shows it after this page
- Private settings: `ISettingsModalPrivate`
- Events: `ISettingsModalEvents`

## Methods

- `cancel(): void` — Closes the modal without applying any changes, and dispatches `done` with `settings` set to `null`.
- `clear(): void` — Removes the modal's content.
- `close(): void` — Closes the modal and dispatches `done` with the changed values. It does not apply them; the Save button does that before closing.
- `openIndicator(target: Indicator): void` — Opens the modal for an `Indicator`, with a field for each of its editable settings. Parameters: `target`: Indicator.
- `openSeries(series: XYSeries): void` — Opens the modal for a series, with fields for its colors (and line width, for a line series). Parameters: `series`: Series.

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Modal")`) for signatures and descriptions.

- _Modal_: isOpen, open
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
