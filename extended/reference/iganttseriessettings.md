---
title: "IGanttSeriesSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iganttseriessettings/"
scraped: "2026-03-15"
---

Inheritance
IGanttSeriesSettings extends IColumnSeriesSettings.
IGanttSeriesSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        adjustBulletPosition        
        #
      


                          Type undefined | false | true                      
Default true

Inherited from IBaseColumnSeriesSettings
Whether positions of bullets should be calculated based on portion of column currently visual (true) or the whole length/height of the column (false).


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

Extends: IColumnSeriesSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IColumnSeriesSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **durationField** (`undefined | string`) — Default "duration" A field in data that holds duration of the task. Click here for more info
- **linkHorizontalOffset** (`undefined | number`) — Default 25 A distance in pixels that link should be protracted from the edge of the task bars.
- **linkToField** (`undefined | string`) — Default "linkTo" A field in data that holds and ID of the task it is linked to. Click here for more info
- **progressField** (`undefined | string`) — Default "progress" A field in data that holds progress of the task. Click here for more info
- **snapCount** (`undefined | number`) — Default 1 When dragging/resizing a column, how many units should it snap to.
- **xAxis** (`GanttDateAxis`) — A reference to the x-axis of the Gantt chart.

