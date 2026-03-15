---
title: "IInterfaceColorsSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iinterfacecolorssettings/"
scraped: "2026-03-15"
---

Inheritance
IInterfaceColorsSettings extends IEntitySettings.
IInterfaceColorsSettings is not extended by any other symbol.
Properties


        alternativeBackground        
        #
      


                          Type Color                      
Alternative background, for elements that need to contrast with primary background.


        alternativeText        
        #
      


                          Type Color                      
Alternative text color, used for inverted (dark) backgrounds.


        background        
        #
      


                          Type Color                      
Chart background color.


        disabled        
        #
      


                          Type Color                      
Color for disabled elements.


        fill        
        #
      


                          Type Color                      
Used for generic fills.


        grid        
        #
      


                          Type Color                      
Grid color.


        id        
        #
      


                          Type undefined | string                      
Inherited from IEntitySettings
A custom string ID for the element.
 If set, element can be looked up via root.entitiesById.
 Will raise error if an element with the same ID already exists.


        negative        
        #
      


                          Type Color                      
Color to indicate negative value.


        positive        
        #
      


                          Type Color                      
Color to indicate positive value.


        primaryButton        
        #
      


                          Type Color                      
Primary button fill color.


        primaryButtonActive        
        #
      


                          Type Color                      
Primary button fill color when it is set as active.


        primaryButtonDisabled        
        #
      


                          Type Color                      
Primary button fill color when it is set as disabled.


        primaryButtonDown        
        #
      


                          Type Color                      
Primary button fill color when pressing down on it.


        primaryButtonHover        
        #
      


                          Type Color                      
Primary button fill color on hover.


        primaryButtonStroke        
        #
      


                          Type Color                      
Primary button stroke (outline) color.


        primaryButtonText        
        #
      


                          Type Color                      
Primary button text color.


        primaryButtonTextDisabled        
        #
      


                          Type Color                      
Primary button text color when it is set as disabled.


        secondaryButton        
        #
      


                          Type Color                      
Secondary button fill color.


        secondaryButtonActive        
        #
      


                          Type Color                      
Secondary button fill color when it is set as active.


        secondaryButtonDown        
        #
      


                          Type Color                      
Secondary button fill color when pressing down on it.


        secondaryButtonHover        
        #
      


                          Type Color                      
Secondary button fill color on hover.


        secondaryButtonStroke        
        #
      


                          Type Color                      
Secondary button stroke (outline) color.


        secondaryButtonText        
        #
      


                          Type Color                      
Secondary button text color.


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


        stroke        
        #
      


                          Type Color                      
Used for generic outlines.


        text        
        #
      


                          Type Color                      
Label text color.


        themeTags        
        #
      


                          Type Array                      
Inherited from IEntitySettings
Tags which can be used by the theme rules.

## Inheritance

Extends: IEntitySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **alternativeBackground** (`Color`) — Alternative background, for elements that need to contrast with primary background.
- **alternativeText** (`Color`) — Alternative text color, used for inverted (dark) backgrounds.
- **background** (`Color`) — Chart background color.
- **disabled** (`Color`) — Color for disabled elements.
- **fill** (`Color`) — Used for generic fills.
- **grid** (`Color`) — Grid color.
- **negative** (`Color`) — Color to indicate negative value.
- **positive** (`Color`) — Color to indicate positive value.
- **primaryButton** (`Color`) — Primary button fill color.
- **primaryButtonActive** (`Color`) — Primary button fill color when it is set as active.
- **primaryButtonDisabled** (`Color`) — Primary button fill color when it is set as disabled.
- **primaryButtonDown** (`Color`) — Primary button fill color when pressing down on it.
- **primaryButtonHover** (`Color`) — Primary button fill color on hover.
- **primaryButtonStroke** (`Color`) — Primary button stroke (outline) color.
- **primaryButtonText** (`Color`) — Primary button text color.
- **primaryButtonTextDisabled** (`Color`) — Primary button text color when it is set as disabled.
- **secondaryButton** (`Color`) — Secondary button fill color.
- **secondaryButtonActive** (`Color`) — Secondary button fill color when it is set as active.
- **secondaryButtonDown** (`Color`) — Secondary button fill color when pressing down on it.
- **secondaryButtonHover** (`Color`) — Secondary button fill color on hover.
- **secondaryButtonStroke** (`Color`) — Secondary button stroke (outline) color.
- **secondaryButtonText** (`Color`) — Secondary button text color.
- **stroke** (`Color`) — Used for generic outlines.
- **text** (`Color`) — Label text color.
