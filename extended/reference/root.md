---
title: "Root"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/root/"
scraped: "2026-03-15"
---

Root element of the chart.

## Import

```javascript
// Import Root
import * as am5 from "@amcharts/amcharts5"
```

## Properties

- **autoResize** (`boolean`) — Default true Indicates whether chart should resized automatically when parent container width and/or height changes. If disabled (autoResize = false) you can make the chart resize manually by calling root element's resize() method.
- **container** (`Container`) — Main content container.
- **dateFormatter** (`DateFormatter`) — Default DateFormatter.new(this, { }) Date/time formatter. Click here for more info
- **dom** (`HTMLElement`) — A reference to original chart container (div element).
- **durationFormatter** (`DurationFormatter`) — Default DurationFormatter.new(this, { }) Duration formatter. Click here for more info
- **entitiesById** (`object`) — Entities that have their id setting set. @since 5.11.0
- **events** (`EventDispatcher`) — Default new EventDispatcher() Root's event dispatcher. Click here for more info
- **fps** (`number | undefined`) — The maximum FPS that the Root will run at. If undefined it will run at the highest FPS. Click here for more info
- **gridLayout** (`VerticalLayout`) — Default VerticalLayout.new() An instance of grid layout object that can be used to set layout setting of a Container.
- **horizontalLayout** (`VerticalLayout`) — Default HorizontalLayout.new() An instance of horizontal layout object that can be used to set layout setting of a Container.
- **interfaceColors** (`InterfaceColors`) — Special color set to be used for various controls. Click here for more info
- **locale** (`ILocale`) — Default en Locale used by the chart. Click here
- **nonce** (`undefined | string`) — Used for dynamically-created CSS and JavaScript with strict source policies.
- **numberFormatter** (`NumberFormatter`) — Default NumberFormatter.new(this, { }) Number formatter. Click here for more info
- **systemTooltip** (`Tooltip`) — Returns an instance of a universal Tooltip instance. @since 5.14.0
- **tabindex** (`number`) — Default 0 Global tab index for using for the whole chart Click here for more info
- **tapToActivate** (`boolean`) — Default false Set this to true if you need chart to require first a tap onto it before touch gesture related functionality like zoom/pan is turned on. Click here for more info @since 5.2.9
- **tapToActivateTimeout** (`number`) — Default 3000 If tapToActivate is set to true, this setting will determine number of milliseconds the chart will stay "active", before releasing the controls back to the page. Click here for more info @since 5.2.9
- **timezone** (`Timezone`) — If set, will format date/time in specific time zone. The value should be named time zone, e.g.: "America/Vancouver", "Australia/Sydney", "UTC". NOTE: Using time zone feature may noticeable affect performance of the chart, especially with large data sets, since every single date will need to be recalculated. Click here for more info @since 5.1.0
- **tooltipContainer** (`Container`) — A Container used to display tooltips in.
- **updateTick** (`boolean`) — Returns whether the root is updating or not. Enables or disables the root updating.
- **utc** (`boolean`) — Default false Use UTC when formatting date/time. Click here for more info
