---
title: "IBulletSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibulletsettings/"
scraped: "2026-03-15"
---

Inheritance
IBulletSettings extends IEntitySettings.
IBulletSettings is not extended by any other symbol.
Properties


        autoRotate        
        #
      


                          Type undefined | false | true                      
Default false

If set to true, the bullet will be automatically rotated to face direction of line it is attached to.
 NOTE: Works only in Flow and MapPointSeries (when MapPoint is attached to a MapLine).


        autoRotateAngle        
        #
      


                          Type undefined | number                      
If autoRotate is set to true, value of autoRotateAngle will be added to the automatically-calculated angle.


        dynamic        
        #
      


                          Type undefined | false | true                      
Default false

If set to true, the bullet will redraw its sprite element whenever anything in its parent series changes.


        field        
        #
      


                          Type "open" | "high" | "low" | "value"                      
If a field will be set, the bullet will be located at exact value of that field, not paying atention to locationY/locationX. Works with XYSeries only.
If field is set, bullet will be placed at the specific data value, ignoring any locationX and locationY settings.

IMPORTANT: this setting works with XYSeries only.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **autoRotate** (`undefined | false | true`) — Default false If set to true, the bullet will be automatically rotated to face direction of line it is attached to. NOTE: Works only in Flow and MapPointSeries (when MapPoint is attached to a MapLine).
- **autoRotateAngle** (`undefined | number`) — If autoRotate is set to true, value of autoRotateAngle will be added to the automatically-calculated angle.
- **dynamic** (`undefined | false | true`) — Default false If set to true, the bullet will redraw its sprite element whenever anything in its parent series changes.
- **field** (`"open" | "high" | "low" | "value"`) — If a field will be set, the bullet will be located at exact value of that field, not paying atention to locationY/locationX. Works with XYSeries only. If field is set, bullet will be placed at the specific data value, ignoring any locationX and locationY settings. IMPORTANT: this setting works with XYSeries only. Click here for more info @since 5.6.0
- **locationX** (`undefined | number`) — Horizontal location within target element. 0 - left, 1 - right, or anything inbetweeen.
- **locationY** (`undefined | number`) — Vertical location within target element. 0 - top, 1 - bottom, or anything inbetweeen.
- **sprite** (`Sprite`) — A visual element of the bullet.
- **stacked** (`"up" | "down" | "auto"`) — If set, will stack bullets instead of overlapping them. "up - stacks bullets upwards. "down - stacks bullets downwards. "auto - stacks bullets in the direction that offers more space. IMPORTANT: this setting works with XYSeries only. Click here for more info @since 5.6.0
