---
title: "IPicturePatternSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipicturepatternsettings/"
scraped: "2026-03-15"
---

Inheritance
IPicturePatternSettings extends IPatternSettings.
IPicturePatternSettings is not extended by any other symbol.
Properties


        canvas        
        #
      


                          Type HTMLCanvasElement                      


        centered        
        #
      


                          Type undefined | false | true                      
Default true

Center images.


        color        
        #
      


                          Type Color                      
Inherited from IPatternSettings
Color of the pattern shape.

## Inheritance

Extends: IPatternSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IPatternSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **canvas** (`HTMLCanvasElement`) — (no description)
- **centered** (`undefined | false | true`) — Default true Center images.
- **fit** (`"image" | "pattern" | "none"`) — Default "image" How pattern should be sized: "image" (default) - pattern will be sized to actual image dimensions. "pattern" - image will sized to image dimensions. "none" - image will be placed in the pattern, regardless of either dimensions.
- **src** (`undefined | string`) — A source URI of the image. Can be relative or absolute URL, or data-uri.
