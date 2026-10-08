---
title: "IMapRasterSeriesEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/imaprasterseriesevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IMapSeriesEvents
All ancestors: IMapSeriesEvents, ISeriesEvents, IComponentEvents, IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5map.IMapRasterSeriesEvents` (`import type { IMapRasterSeriesEvents } from "@amcharts/amcharts5/map"`)

## Events

- **loaded** (`{}`) — The images finished loading: `src`, and `nightSrc` if set.
- **loaderror** (`{}`) — An image failed to load, or can't be read, such as a cross-origin image without CORS headers.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IMapSeriesEvents")`) for types, defaults and descriptions.

- _IMapSeriesEvents_: geodataprocessed
- _IComponentEvents_: datavalidated, valueschanged
- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
