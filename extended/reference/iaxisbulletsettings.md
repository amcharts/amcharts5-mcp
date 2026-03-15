---
title: "IAxisBulletSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iaxisbulletsettings/"
scraped: "2026-03-15"
---

Inheritance
IAxisBulletSettings extends IEntitySettings.
IAxisBulletSettings is not extended by any other symbol.
Properties


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        location        
        #
      


                          Type undefined | number                      
Relative location of the bullet within the cell.
 0 - beginning, 0.5 - middle, 1 - end.


        sprite        
        #
      


                          Type Sprite                      
A visual element of the bullet.


        stacked        
        #
      


                          Type undefined | false | true                      
Default false

Indicates if the bullet should be stacked on top of another bullet if it's on the same position.
 Will work on horizontal or vertical axes only.
@since 5.2.28


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

- **location** (`undefined | number`) — Relative location of the bullet within the cell. 0 - beginning, 0.5 - middle, 1 - end.
- **sprite** (`Sprite`) — A visual element of the bullet.
- **stacked** (`undefined | false | true`) — Default false Indicates if the bullet should be stacked on top of another bullet if it's on the same position. Will work on horizontal or vertical axes only. @since 5.2.28
