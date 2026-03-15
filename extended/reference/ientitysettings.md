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

- **id** (`undefined | string`) — A custom string ID for the element. If set, element can be looked up via root.entitiesById. Will raise error if an element with the same ID already exists.
- **stateAnimationDuration** (`undefined | number`) — Duration of transition from one state to another.
- **stateAnimationEasing** (`$ease.Easing`) — Easing of transition from one state to another.
- **themeTags** (`Array`) — Tags which can be used by the theme rules. Click here for more info
- **themeTagsSelf** (`Array`) — Tags which can be used by the theme rules. These tags only apply to this object, not any children. Click here for more info
- **themes** (`Array`) — A list of themes applied to the element.

