---
title: "IScrollbarPrivate"
type: "interface"
source: "https://docs.amcharts.com/v5/reference/iscrollbarprivate/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

## Inheritance

Extends: IContainerPrivate
All ancestors: IContainerPrivate, ISpritePrivate, IEntityPrivate
TypeScript: `am5.IScrollbarPrivate` (`import type { IScrollbarPrivate } from "@amcharts/amcharts5"`)

## Private settings

- **autoHidden** (`boolean`) — _(internal)_ Whether `autoHide` hides the scrollbar.
- **isBusy** (`boolean`) — _(internal)_
- **positionTextFunction** (`(position: number, isEnd?: boolean) => string`) — _(internal)_
- **reversedFunction** (`() => boolean`) — _(internal)_ Returns `true` if values go against the scrollbar's direction (bottom to top on a vertical one). Screen readers then read the start grip as the end of the range and the end grip as its start, and `positionTextFunction` gets positions flipped (`1 - position`).

## Other inherited private settings

Names only — see the declaring interface's page (e.g. `get_api_reference("IContainerPrivate")`) for types, defaults and descriptions.

- _IContainerPrivate_: htmlElement, htmlElementWrapper, wrapperContainer
- _ISpritePrivate_: customData, deform, drawHidden, focusable, focusDisabled, focusElement, focusExcluded, focusGroupVertical, focusOutOfView, height, lastTooltipCoords, list, maxHeight, maxWidth, minHeight, minWidth, showingTooltip, tooltipTarget, touchHovering, trustBounds, visible, width, x, y
