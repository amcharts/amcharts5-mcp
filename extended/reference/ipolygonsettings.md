---
title: "IPolygonSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipolygonsettings/"
scraped: "2026-03-15"
---

Inheritance
IPolygonSettings extends IGraphicsSettings.
IPolygonSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Number of milliseconds to play morph animation.


        animationEasing        
        #
      


                          Type undefined | ( t: Time) => Time                      
Easing function to use for animations.

## Inheritance

Extends: IGraphicsSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IGraphicsSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **animationDuration** (`undefined | number`) — Number of milliseconds to play morph animation.
- **animationEasing** (`undefined | ( t: Time) => Time`) — Easing function to use for animations. Click here for more info
- **coordinates** (`Array`) — Corodinates.
- **points** (`Array`) — An array of polygon corner coordinates.
