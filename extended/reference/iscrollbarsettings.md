---
title: "IScrollbarSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iscrollbarsettings/"
scraped: "2026-03-15"
---

Inheritance
IScrollbarSettings extends IContainerSettings.
IScrollbarSettings is extended by ISliderSettings, IXYChartScrollbarSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Number of milliseconds to play scroll animations for.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Easing function to use for animations.

## Inheritance

Extends: IContainerSettings
Extended by: ISliderSettings, IXYChartScrollbarSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Number of milliseconds to play scroll animations for.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function to use for animations. Click here for more info
- **end** (`undefined | number`) — Relative end of the selected range, with 0 meaning beginning, and 1 the end.
- **orientation** (`"horizontal" | "vertical"`) — Orientation of the scrollbar.
- **start** (`undefined | number`) — Relative start of the selected range, with 0 meaning beginning, and 1 the end.
