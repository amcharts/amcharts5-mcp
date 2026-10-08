---
title: "Root"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/root/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

The root of a chart: it ties the chart to an HTML element and holds its global settings, formatters, locale and themes.

Docs: https://www.amcharts.com/docs/v5/getting-started/#Root_element

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
- **dateFormatter** (`DateFormatter`) — Date/time formatter. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
- **dom** (`HTMLElement`) — The HTML element the chart is in.
- **durationFormatter** (`DurationFormatter`) — Duration formatter. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/
- **entitiesById** (`{ [index: string]: any; }`) — Objects of this root that have an `id` setting, by that `id`. _Since 5.11.0._
- **events** (`EventDispatcher<Events<this, IRootEvents>>`) — Root's event dispatcher. Docs: https://www.amcharts.com/docs/v5/concepts/events/
- **fps** (`number`) — Maximum frames per second. When not set, the chart renders on every animation frame of the browser. Docs: https://www.amcharts.com/docs/v5/getting-started/root-element/#Performance
- **gridLayout** (`GridLayout`) — default `GridLayout.new()` — A shared `GridLayout` for a `Container`'s `layout` setting.
- **horizontalLayout** (`HorizontalLayout`) — default `HorizontalLayout.new()` — A shared `HorizontalLayout` for a `Container`'s `layout` setting.
- **interfaceColors** (`InterfaceColors`) — Colors of the chart's interface: text, grid, buttons and other controls. Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/#Interface_colors
- **locale** (`ILocale`) — Locale for the chart's texts and formatting. English by default. Docs: https://www.amcharts.com/docs/v5/concepts/locales/
- **nonce** (`string`) — Nonce for the `<style>` elements the chart adds to the page, for pages with a strict Content Security Policy.
- **numberFormatter** (`NumberFormatter`) — Number formatter. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-numbers/
- **settings** (`IRootSettings`) — The Root's settings.
- **skipRenderFrame** (`boolean`)
- **systemTooltip** (`Tooltip`) — A shared `Tooltip` (theme tag `"system"`) for interface elements such as the logo and buttons, created on first use. _Since 5.14.0._
- **tabindex** (`number`) — Tab index for the whole chart. Docs: https://www.amcharts.com/docs/v5/concepts/accessibility/
- **tapToActivate** (`boolean`) — default `false` — Makes touch gestures such as zoom and pan work only after a tap on the chart, so the page can still be scrolled over it. _Since 5.2.9._ Docs: https://www.amcharts.com/docs/v5/getting-started/root-element/#Touch_related_options
- **tapToActivateTimeout** (`number`) — default `3000` — How long in milliseconds the chart stays active after the last touch, with `tapToActivate`, before handing touch gestures back to the page. `0` keeps it active until a tap outside the chart. _Since 5.2.9._ Docs: https://www.amcharts.com/docs/v5/getting-started/root-element/#Touch_related_options
- **timezone** (`Timezone`) — Time zone to show dates in, instead of the user's local one. Set it to a `Timezone` with an IANA name, e.g. `am5.Timezone.new("America/Vancouver")`. For UTC, `utc` is faster. Every date is converted, which can slow down charts with large data sets. _Since 5.1.0._ Docs: https://www.amcharts.com/docs/v5/getting-started/root-element/#time-zone
- **tooltipContainer** (`Container`) — The `Container` tooltips are drawn in, above the chart.
- **updateTick** (`boolean`) — Whether the chart updates and redraws. Stops the chart from updating and redrawing with `false`, until set back to `true`.
- **utc** (`boolean`) — Treats dates as UTC instead of the user's local time, when formatting and parsing them and when placing date axis grid. It takes precedence over `timezone`. Docs: https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/#utc-and-time-zones
- **verticalLayout** (`VerticalLayout`) — default `VerticalLayout.new()` — A shared `VerticalLayout` for a `Container`'s `layout` setting.
