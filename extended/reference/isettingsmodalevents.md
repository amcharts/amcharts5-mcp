---
title: "ISettingsModalEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/isettingsmodalevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IModalEvents
All ancestors: IModalEvents, IEntityEvents
TypeScript: `am5stock.ISettingsModalEvents` (`import type { ISettingsModalEvents } from "@amcharts/amcharts5/stock"`)

## Events

- **done** (`{ settings?: any; settingsTarget?: Indicator | XYSeries; }`) — The modal was closed: saved, with the changed values in `settings`, or canceled, with `settings` set to `null`.
- **initstarted** (`{ settings?: any; settingsTarget?: Indicator | XYSeries; }`) — The modal is about to build its fields. Changing the `settings` array here changes which fields it shows.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IModalEvents")`) for types, defaults and descriptions.

- _IModalEvents_: cancelled, closed, opened
