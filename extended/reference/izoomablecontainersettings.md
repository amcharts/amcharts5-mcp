---
title: "IZoomableContainerSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/izoomablecontainersettings/"
scraped: "2026-03-15"
---

Inheritance
IZoomableContainerSettings extends IContainerSettings.
IZoomableContainerSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Default 600

Animation duration (ms) for zoom animations.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Default am5.ease.out(am5.ease.cubic)

Easing function to use for zoom animations.


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

- **animationDuration** (`undefined | number`) — Default 600 Animation duration (ms) for zoom animations.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Default am5.ease.out(am5.ease.cubic) Easing function to use for zoom animations.
- **maxPanOut** (`undefined | number`) — Default 0.4 How much of a content can go outside the viewport.
- **maxZoomLevel** (`undefined | number`) — Default 32 Maximum zoom-in level.
- **minZoomLevel** (`undefined | number`) — Default 1 Maximum zoom-out level.
- **pinchZoom** (`undefined | false | true`) — Default true Pinch-zooming is enabled on touch devices.

