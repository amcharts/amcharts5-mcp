---
title: "Root"
type: "class"
source: "https://docs.amcharts.com/v5/reference/root/"
generatedFrom: "@amcharts/amcharts5@5.24.0"
---

The root of a chart: it ties the chart to an HTML element and holds its global settings, formatters, locale and themes.

Docs: https://docs.amcharts.com/v5/getting-started/#root-element

## Import

```js
import * as am5 from "@amcharts/amcharts5";
```

## Inheritance

Extends: (none)

## Settings and related interfaces

- Settings: `IRootSettings` — get_api_reference shows it after this page
- Events: `IRootEvents`

## Properties

Public properties (not settings):

- **autoResize** (`boolean`) — Resizes the chart automatically when its container's size changes. With `false`, call `resize()` to resize it.
- **container** (`Container`) — The main container: charts and other elements go into its `children`.
- **dateFormatter** (`DateFormatter`) — Date/time formatter. Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/
- **dom** (`HTMLElement`) — The HTML element the chart is in.
- **durationFormatter** (`DurationFormatter`) — Duration formatter. Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/
- **entitiesById** (`{ [index: string]: any; }`) — Objects of this root that have an `id` setting, by that `id`. _Since 5.11.0._
- **events** (`EventDispatcher<Events<this, IRootEvents>>`) — Root's event dispatcher. Docs: https://docs.amcharts.com/v5/concepts/events/
- **fps** (`number`) — Maximum frames per second. When not set, the chart renders on every animation frame of the browser. Each frame waits `1000 / fps` milliseconds after the previous one is drawn, then for the screen's next refresh, so the rate achieved is lower: `fps: 30` gives about 20 on a 60 Hz screen. Docs: https://docs.amcharts.com/v5/getting-started/root-element/#performance
- **gridLayout** (`GridLayout`) — default `GridLayout.new()` — A shared `GridLayout` for a `Container`'s `layout` setting.
- **horizontalLayout** (`HorizontalLayout`) — default `HorizontalLayout.new()` — A shared `HorizontalLayout` for a `Container`'s `layout` setting.
- **interfaceColors** (`InterfaceColors`) — Colors of the chart's interface: text, grid, buttons and other controls. Docs: https://docs.amcharts.com/v5/concepts/colors-gradients-and-patterns/#interface-colors
- **locale** (`ILocale`) — Locale for the chart's texts and formatting. English by default. Docs: https://docs.amcharts.com/v5/concepts/locales/
- **nonce** (`string`) — Nonce for the `<style>` elements the chart adds to the page, for pages with a strict Content Security Policy.
- **numberFormatter** (`NumberFormatter`) — Number formatter. Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-numbers/
- **settings** (`IRootSettings`) — The Root's settings.
- **skipRenderFrame** (`boolean`)
- **systemTooltip** (`Tooltip`) — A shared `Tooltip` (theme tag `"system"`) for interface elements such as the logo and buttons, created on first use. _Since 5.14.0._
- **tabindex** (`number`) — Tab index for the whole chart. Docs: https://docs.amcharts.com/v5/concepts/accessibility/
- **tapToActivate** (`boolean`) — default `false` — Makes touch gestures such as zoom and pan work only after a tap on the chart, so the page can still be scrolled over it. The same as setting `touchGestures` to `"tap"`; `false` sets it back to `"chart"`, or to `"auto"` with the ResponsiveMax theme (an `"auto"` is left as it is). _Since 5.2.9._ Docs: https://docs.amcharts.com/v5/getting-started/root-element/#touch-related-options
- **tapToActivateTimeout** (`number`) — default `3000` — How long in milliseconds the chart stays active after the last touch, with `tapToActivate`, before handing touch gestures back to the page. `0` keeps it active until a tap outside the chart. _Since 5.2.9._ Docs: https://docs.amcharts.com/v5/getting-started/root-element/#touch-related-options
- **timezone** (`Timezone`) — Time zone to show dates in, instead of the user's local one. Set it to a `Timezone` with an IANA name, e.g. `am5.Timezone.new("America/Vancouver")`. For UTC, `utc` is faster. Every date is converted, which can slow down charts with large data sets. _Since 5.1.0._ Docs: https://docs.amcharts.com/v5/getting-started/root-element/#time-zone
- **tooltipContainer** (`Container`) — The `Container` tooltips are drawn in, above the chart.
- **touchGestures** (`TouchGestures`) — default `"chart"` — Who gets a touch gesture that starts on the chart, the chart or the page around it: • `"chart"`: the chart, wherever it drags, pans, zooms or selects. • `"tap"`: the page, until the chart is tapped; then the chart, until `tapToActivateTimeout` passes without a touch (as `tapToActivate`). • `"auto"`: a vertical swipe scrolls the page. A swipe that starts sideways, and any made with two fingers, goes to the chart, which then follows it both ways: a chart that pans vertically, a map or a globe also moves or turns up and down. Scrollbar grips, buttons and other things that are dragged, drawing on a stock chart, a cursor selecting only up and down and a radar chart take any swipe that starts on them. With `"tap"` and `"auto"`, a swipe the page scrolls with does not move the chart. The ResponsiveMax theme, set on the root with `setThemes()`, sets `"auto"`, unless `touchGestures` or `tapToActivate` is set in code. Turning `tapToActivate` off again goes back to what was there before it: the value set in code, or else the theme's choice. _Since 5.23.0._
- **updateTick** (`boolean`) — Whether the chart updates and redraws. Stops the chart from updating and redrawing with `false`, until set back to `true`.
- **utc** (`boolean`) — Treats dates as UTC instead of the user's local time, when formatting and parsing them and when placing date axis grid. It takes precedence over `timezone`. Docs: https://docs.amcharts.com/v5/concepts/formatters/formatting-dates/#utc-and-time-zones
- **verticalLayout** (`VerticalLayout`) — default `VerticalLayout.new()` — A shared `VerticalLayout` for a `Container`'s `layout` setting.

## Methods

- `dispose(): void` — Disposes the Root and everything in it, and removes the chart from the page.
- `documentPointToRoot(point: IPoint): IPoint` — Converts a point from viewport coordinates, such as a pointer event's `clientX` and `clientY`, to coordinates within the root. Parameters: `point`: Viewport point. Returns: Root point
- `eachFrame(f: (currentTime: number) => void): IDisposer` — Calls a function on every frame, which keeps the chart rendering, until the returned disposer is disposed. Parameters: `f`: Function, given the frame's time in milliseconds. Returns: Disposer that stops the calls
- `focused(target: Sprite): boolean` — Returns `true` if `target` is currently focused. Parameters: `target`: Target. Returns: Focused?
- `height(): number` — Returns the chart's height in pixels: the container's, or the one from `calculateSize` if set. Returns: Height
- `isDisposed(): boolean` — Returns `true` if the Root is disposed. Returns: Disposed?
- `markDirtyGlobal(container?: Container): void` — Makes every element inside a container update and re-measure on the next frame. Parameters: `container`: Container; the main `container` if not given.
- `moveDOM(id: string | HTMLElement): void` — Moves the chart to another HTML element and resizes it to fit there. Nothing happens if no element with that `id` exists. Parameters: `id`: The element, or its `id`.
- `readerAlert(text: string): void` — Makes screen readers read out a message. Parameters: `text`: Alert text. Docs: https://docs.amcharts.com/v5/concepts/accessibility/
- `resize(): void` — Resizes the chart to fit its container. Call it after the container's size changes when `autoResize` is `false`.
- `rootPointToDocument(point: IPoint): IPoint` — Converts a point from coordinates within the root to viewport coordinates, as in a pointer event's `clientX` and `clientY`. Parameters: `point`: Root point. Returns: Viewport point
- `setThemes(themes: Array<Theme>): void` — Sets the chart's themes, replacing any set before. Parameters: `themes`: A list of themes. Docs: https://docs.amcharts.com/v5/concepts/themes/
- `width(): number` — Returns the chart's width in pixels: the container's, or the one from `calculateSize` if set. Returns: Width
