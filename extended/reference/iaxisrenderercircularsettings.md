---
title: "IAxisRendererCircularSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisrenderercircularsettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisRendererCircularSettings extends IAxisRendererSettings.
IAxisRendererCircularSettings is not extended by any other symbol.
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

Extends: IAxisRendererSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IAxisRendererSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **axisAngle** (`undefined | number`) — @todo am: needs description
- **endAngle** (`undefined | number`) — Series end angle. If not set, will use chart's endAngle. Click here for more info
- **innerRadius** (`number | Percent`) — Inner radius of the axis. If set in percent, it will be relative to chart's own innerRadius. If value is negative, inner radius will be calculated from the outer edge. Click here for more info
- **radius** (`number | Percent`) — Outer radius of the axis. If set in percent, it will be relative to chart's own radius. Click here for more info
- **startAngle** (`undefined | number`) — Series start angle. If not set, will use chart's startAngle. Click here for more info
