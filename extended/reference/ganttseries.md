---
title: "GanttSeries"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/ganttseries/"
scraped: "2026-03-15"
---

A series used in Gantt chart to display tasks and their progress.

## Import

```javascript
// Import GanttSeries
import * as am5gantt from "@amcharts/amcharts5/gantt"
```

## Inheritance

Extends: ColumnSeries

> **Note:** This class also inherits all settings, properties, methods, and events from ColumnSeries (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **durationField** (`undefined | string`) — Default "duration" A field in data that holds duration of the task. Click here for more info
- **linkHorizontalOffset** (`undefined | number`) — Default 25 A distance in pixels that link should be protracted from the edge of the task bars.
- **linkToField** (`undefined | string`) — Default "linkTo" A field in data that holds and ID of the task it is linked to. Click here for more info
- **progressField** (`undefined | string`) — Default "progress" A field in data that holds progress of the task. Click here for more info
- **snapCount** (`undefined | number`) — Default 1 When dragging/resizing a column, how many units should it snap to.
- **xAxis** (`GanttDateAxis`) — A reference to the x-axis of the Gantt chart.

## Properties

- **connectorArrow** (`Triangle`) — Default this.children.push(Triangle.new(this._root, { themeTags: ["connectorarrow"], visible: false, forceInactive: true })) A triangle that is shown at the end of the connector line, while creating a connector.
- **connectorLine** (`Line`) — Default this.children.push(Line.new(this._root, { themeTags: ["connectorline"], visible: false, forceInactive: true })) A line which is shown while creating a connector between two tasks.
- **containers** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Container._new(this._root, { position: "absolute", themeTagsSelf: ["columncontainer"] }, [this.containers.template]) )) ListTemplate of Containers that hold all the elements of series items, such as grips, bullets, etc.
- **endBullets** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Circle._new(this._root, { x: - 1000, themeTagsSelf: ["connectorbullet", "end"] }, [this.endBullets.template]) )) ListTemplate of Circles that are used as end bullets.
- **endGrips** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Rectangle._new(this._root, { themeTagsSelf: ["resizegrip", "end"] }, [this.endGrips.template]) )) ListTemplate of Rectangles that are used to resize task bars.
- **gantt** (`Gantt`) — A reference to the parent Gantt chart.
- **links** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Link._new(this._root, { themeTags: $utils.mergeTags(this.containers.template.get("themeTags", []), ["link"]) }, [this.links.template]) )) ListTemplate of Link that connect tasks.
- **linksContainer** (`Container`) — Default this.children.push(Container.new(this._root, { })) A container that holds all the links between tasks.
- **maskedContainers** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Container._new(this._root, { position: "absolute", themeTagsSelf: ["maskedcontainer"] }, [this.maskedContainers.template]) )) ListTemplate of Containers that are used to mask elements, such as progress rectangles.
- **progressGrips** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Triangle._new(this._root, { themeTagsSelf: ["progressgrip"] }, [this.progressGrips.template]) )) ListTemplate of Triangles that are used to resize progress rectangles.
- **progressRectangles** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Rectangle._new(this._root, { themeTagsSelf: ["progressrectangle"] }, [this.progressRectangles.template]) )) ListTemplate of Rectangles that are used to show progress of the task. It is actually a remaining part of the task and is filled with diagonal line pattern.
- **startBullets** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Circle._new(this._root, { x: - 1000, themeTagsSelf: ["connectorbullet", "start"], }, [this.startBullets.template]) )) ListTemplate of Circles that are used as start bullets.
- **startGrips** (`ListTemplate`) — Default this.addDisposer(new ListTemplate( Template.new({ }), () => Rectangle._new(this._root, { themeTagsSelf: ["resizegrip", "start"] }, [this.startGrips.template]) )) ListTemplate of Rectangles that are used to resize task bars.
