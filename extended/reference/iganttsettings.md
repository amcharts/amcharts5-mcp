---
title: "IGanttSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttsettings/"
scraped: "2026-03-15"
---

Inheritance
IGanttSettings extends IContainerSettings.
IGanttSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        ariaChecked        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
aria-checked setting.
 This setting is ignored unless role is one of the following:

"checkbox"

"option"

"radio"

"menuitemcheckbox"

"menuitemradio"

"treeitem"


        ariaControls        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-controls setting.


        ariaCurrent        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-current setting.

## Inheritance

Extends: IContainerSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **colors** (`ColorSet`) — A ColorSet to use when asigning colors for series. Click here for more info
- **durationUnit** (`"year" | "month" | "week" | "day" | "hour" | "minute" | "second"`) — Default "day" A unit to be used for when calculating "duration" of Gantt items. Click here for more information
- **editable** (`undefined | false | true`) — Default true If set to true, the user will be able to edit the chart via UI.
- **excludeWeekends** (`undefined | false | true`) — If set to true, weekends will be excluded from the chart. Click here for more information
- **gridIntervals** (`undefined | object`) — Grid intervals. Click here for more info
- **holidays** (`Array`) — An array of dates to treat as a holiday. Click here for more information
- **linkNewTasks** (`undefined | false | true`) — Default true If this is set to true, when a new task is added, it will be automatically linked to the previous task.
- **sidebarWidth** (`number | Percent`) — Default 30% An absolute or relative width of the left-side category column. Click here for more information
- **snapThreshold** (`undefined | number`) — Default 0.5 A relative vertical cell position to treat as the threshold for snapping bars. Available range of values: 0 (left) to 1 (right). This will be used when resizing or dragging a bar. If the position is bigger than snapThreshold the bar will snap to the right, if it is smaller than snapThreshold, it will snap to the left. Click here for more information
- **weekends** (`Array`) — Default [0, 6] An array of weekend days, e.g. [0, 6] for Sunday and Saturday. Click here for more information
