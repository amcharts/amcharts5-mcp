---
title: "IHierarchyEvents"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ihierarchyevents/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesEvents
All ancestors: ISeriesEvents, IComponentEvents, IContainerEvents, ISpriteEvents, IEntityEvents
TypeScript: `am5hierarchy.IHierarchyEvents` (`import type { IHierarchyEvents } from "@amcharts/amcharts5/hierarchy"`)

## Events

- **dataitemselected** (`{ dataItem?: DataItem<IHierarchyDataItem>; }`) — A node was selected (drilled into), by a click or through `selectedDataItem`.

## Other inherited events

Names only — see the declaring interface's page (e.g. `get_api_reference("IComponentEvents")`) for types, defaults and descriptions.

- _IComponentEvents_: datavalidated, valueschanged
- _ISpriteEvents_: blur, boundschanged, click, dataitemchanged, dblclick, dragged, dragstart, dragstop, focus, globalpointerdown, globalpointermove, globalpointerup, middleclick, pointerdown, pointerout, pointerover, pointerup, positionchanged, rightclick, wheel
