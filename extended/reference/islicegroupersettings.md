---
title: "ISliceGrouperSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/islicegroupersettings/"
scraped: "2026-03-15"
---

Inheritance
ISliceGrouperSettings extends IEntitySettings.
ISliceGrouperSettings is not extended by any other symbol.
Properties


        clickBehavior        
        #
      


                          Type "none" | "break" | "zoom"                      
What happens when group slice is clicked.

"none" (default) - nothing.

"break" - underlying small slices are shown.

"zoom" - series shows only small slies (big ones are hidden).


        groupName        
        #
      


                          Type undefined | string                      
Default "Other"

Name (category) of the group slice.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        legend        
        #
      


                          Type Legend                      
If set, plugin will try to manipulate the items in legend, such as adding group slice, hiding items for small slices, etc.


        limit        
        #
      


                          Type undefined | number                      
If set, only X first slices will be left as they are. The rest of the slices will be grouped.


        series        
        #
      


                          Type PercentSeries                      
A series that will be used to group slices on.


        stateAnimationDuration        
        #
      


                          Type undefined | number                      
Inherited from IEntitySettings
Duration of transition from one state to another.


        stateAnimationEasing        
        #
      


                          Type $ease.Easing                      
Inherited from IEntitySettings
Easing of transition from one state to another.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **clickBehavior** (`"none" | "break" | "zoom"`) — What happens when group slice is clicked. "none" (default) - nothing. "break" - underlying small slices are shown. "zoom" - series shows only small slies (big ones are hidden).
- **groupName** (`undefined | string`) — Default "Other" Name (category) of the group slice.
- **legend** (`Legend`) — If set, plugin will try to manipulate the items in legend, such as adding group slice, hiding items for small slices, etc.
- **limit** (`undefined | number`) — If set, only X first slices will be left as they are. The rest of the slices will be grouped.
- **series** (`PercentSeries`) — A series that will be used to group slices on.
- **threshold** (`undefined | number`) — Default 5 Any slice which has percent value less than this setting will be grouped.
