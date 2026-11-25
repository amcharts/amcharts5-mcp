---
title: "Sprite"
type: "class"
source: "https://docs.amcharts.com/v5/reference/sprite/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

Base class of all visual elements.

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: Entity → Settings
Extended by: Container, Graphics, Picture, Text

## Settings and related interfaces

- Settings: `ISpriteSettings` — get_api_reference shows it after this page
- Private settings: `ISpritePrivate`
- Events: `ISpriteEvents`

## Properties

Public properties (not settings):

- **dataItem** (`DataItem<IComponentDataItem>`) — The element's `DataItem`, or, if it has none, its nearest parent's. NOTE: data items are assigned automatically in most cases where it matters. Set one only if you know what you are doing.
- **events** (`SpriteEventDispatcher<this, Events<this, this["_events"]>>`)
- **parent** (`Container`) — Parent `Container` of this element.

## Methods

- `appear(duration?: number, delay?: number): Promise<void>` — Plays the reveal animation: hides the element at once, then shows it, whether it was hidden or not. Parameters: `duration`: Duration of the animation in milliseconds; `delay`: Milliseconds to wait before showing the element. Returns: Promise
- `compositeOpacity(): number` — Returns the element's opacity multiplied by those of all its parents. Returns: Opacity _Since 5.2.11._
- `compositeRotation(): number` — Returns the element's rotation plus those of all its parents, in degrees. Returns: Rotation _Since 5.9.2._
- `compositeScale(): number` — Returns the element's scale multiplied by those of all its parents. Returns: Scale _Since 5.9.2._
- `depth(): number` — Returns how deep the element is in the tree: the number of parents it has. Returns: Depth
- `getDateFormatter(): DateFormatter` — Returns the `DateFormatter` of the element: its own `dateFormatter`, or else the one of the `Root`. Returns: DateFormatter instance Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `getDurationFormatter(): DurationFormatter` — Returns the `DurationFormatter` of the element: its own `durationFormatter`, or else the one of the `Root`. Returns: DurationFormatter instance Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `getNumberFormatter(): NumberFormatter` — Returns the `NumberFormatter` of the element: its own `numberFormatter`, or else the one of the `Root`. Returns: NumberFormatter instance Docs: https://docs.amcharts.com/v5/concepts/formatters/
- `getTooltip(): Tooltip | undefined` — Returns the element's `Tooltip`: its own `tooltip`, or else the nearest parent's. Returns: Tooltip
- `height(): number` — Returns the element's height in pixels. Returns: Height (px)
- `hide(duration?: number): Promise<void>` — Hides the element and returns a `Promise` that resolves when its hiding animations finish. Parameters: `duration`: Animation duration in milliseconds. Returns: Promise
- `hideTooltip(): Promise<void> | undefined` — Hides the element's `Tooltip`. Returns: Promise
- `hover(): void` — Hovers the element as if the pointer were over it: applies its hover state and shows its tooltip.
- `isDragging(): boolean` — Returns `true` while the element is being dragged. Returns: Is dragged?
- `isFocus(): boolean` — Returns `true` if this element does currently have focus. Returns: Is focused?
- `isHidden(): boolean` — Returns `true` if the element was hidden with `hide()`, even while its hiding animation still plays. For the `visible` setting, use `isVisible()`. Returns: Is hidden?
- `isHiding(): boolean` — Returns `true` while the element's hiding animation plays. Returns: Is hiding?
- `isHover(): boolean` — Returns `true` if the pointer is over the element. Returns: Is hovered?
- `isShowing(): boolean` — Returns `true` while the element's showing animation plays. Returns: Is showing?
- `isVisible(): boolean` — Returns `false` if either the public or the private setting `visible` is `false`, or `forceHidden` is `true`. Returns: Visible?
- `isVisibleDeep(): boolean` — Same as `isVisible()`, except it checks all ascendants, too. Returns: Visible? _Since 5.2.7._
- `markDirtyKey<Key extends keyof this["_settings"]>(key: Key): void` — Marks a setting as changed, so the element reads it again, running its adapters, on the next frame. Parameters: `key`: Setting key.
- `maxHeight(): number` — Returns the most height the element may take, in pixels: its `maxHeight`, a fixed `height`, or else its parent's inner height. Returns: Maximum height (px)
- `maxWidth(): number` — Returns the most width the element may take, in pixels: its `maxWidth`, a fixed `width`, or else its parent's inner width. Returns: Maximum width (px)
- `show(duration?: number): Promise<void>` — Shows the element and returns a `Promise` that resolves when its showing animations finish. Parameters: `duration`: Animation duration in milliseconds. Returns: Promise
- `showTooltip(point?: IPoint): Promise<void> | undefined` — Shows the element's `Tooltip`. Does nothing if the element has no `tooltipText` or `tooltipHTML`. Parameters: `point`: Point to point at, relative to the root; used only with `tooltipPosition: "pointer"`. Returns: Promise
- `toBack(): void` — Moves the element to the start of its parent's children, so it is drawn under its siblings, or, in a layout, placed first.
- `toFront(): void` — Moves the element to the end of its parent's children, so it is drawn over its siblings, or, in a layout, placed last.
- `toGlobal(point: IPoint): IPoint` — Converts a point within the element to a point relative to the root. Parameters: `point`: Point within the element. Returns: Point relative to the root
- `toLocal(point: IPoint): IPoint` — Converts a point relative to the root to a point within the element. Parameters: `point`: Point relative to the root. Returns: Point within the element
- `unhover(): void` — Ends a hover, as if the pointer left the element: hides its tooltip and takes it out of its hover state.
- `width(): number` — Returns the element's width in pixels. Returns: Width (px)
- `x(): number` — Returns the element's X position in pixels, relative to its parent, without `dx`. Returns: X (px)
- `y(): number` — Returns the element's Y position in pixels, relative to its parent, without `dy`. Returns: Y (px)

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Entity")`) for signatures and descriptions.

- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
