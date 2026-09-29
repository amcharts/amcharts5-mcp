---
title: "IEntitySettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ientitysettings/"
scraped: "2026-03-15"
---

Inheritance
IEntitySettings does not extend any other symbol.
IEntitySettings is extended by IColorSetSettings, ILayoutSettings, ISpriteSettings, IPatternSettings, IGradientSettings, IInterfaceColorsSettings, INumberFormatterSettings, IDateFormatterSettings, IDurationFormatterSettings, ILanguageSettings, IModalSettings, IBulletSettings, IPatternSetSettings, IDataProcessorSettings, IAxisBulletSettings, IStockControlSettings, IDropdownSettings, IStockToolbarSettings, ISerializerSettings, IExportingSettings, IExportingMenuSettings, IAnnotatorSettings, ISliceGrouperSettings.
Properties


        id        
        #
      


                          Type undefined | string                      
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        stateAnimationDuration        
        #
      


                          Type undefined | number                      
Duration of transition from one state to another.


        stateAnimationEasing        
        #
      


                          Type $ease.Easing                      
Easing of transition from one state to another.


        themeTags        
        #
      


                          Type Array                      
Tags which can be used by the theme rules.

## Inheritance

Extended by: IColorSetSettings, ILayoutSettings, ISpriteSettings, IPatternSettings, IGradientSettings, IInterfaceColorsSettings, INumberFormatterSettings, IDateFormatterSettings, IDurationFormatterSettings, ILanguageSettings, IModalSettings, IBulletSettings, IPatternSetSettings, IDataProcessorSettings, IAxisBulletSettings, IStockControlSettings, IDropdownSettings, IStockToolbarSettings, ISerializerSettings, IExportingSettings, IExportingMenuSettings, IAnnotatorSettings, ISliceGrouperSettings

## Properties

- **animations** (`Array<IDeclaredAnimation>`) — Animations the element plays on its own, described as data - so they can be set from a JSON config and saved with it. Each one animates a setting of the element (or, with `target: "dataItem"`, a value of its data item - a map point's `positionOnLine`, say). They start when the setting is applied, restart when it changes, and stop when the element is disposed. A saved config keeps what was configured, never a value caught half way through an animation. E.g. `sprite.set("animations", [{ key: "rotation", to: 360, duration: 4000, loops: 0 }, { key: "scale", from: 1, to: 1.3, duration: 800, loops: 0, yoyo: true, easing: "sine" }])`. Entry fields (key, from, to, duration, delay, loops, yoyo, easing, ease, target): see IDeclaredAnimation. @since 5.20.8 (typings say 5.21.0)
- **id** (`undefined | string`) — A custom string ID for the element. If set, element can be looked up via root.entitiesById. Will raise error if an element with the same ID already exists.
- **ignoreThemes** (`undefined | false | true`) — Default false If set to true the themes will be ignored when applying settings. @since 5.15.6
- **stateAnimationDuration** (`undefined | number`) — Default 0 Duration of transition from one state to another.
- **stateAnimationEasing** (`$ease.Easing`) — Default out(cubic) Easing of transition from one state to another.
- **themeTags** (`Array`) — Tags which can be used by the theme rules. Click here for more info
- **themeTagsSelf** (`Array`) — Tags which can be used by the theme rules. These tags only apply to this object, not any children. Click here for more info
- **themes** (`Array`) — A list of themes applied to the element.
- **userData** (`any`) — A storage for any custom user data that needs to be associated with the element.

