---
title: "IPictureSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ipicturesettings/"
scraped: "2026-03-15"
---

Inheritance
IPictureSettings extends ISpriteSettings.
IPictureSettings is not extended by any other symbol.
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

Extends: ISpriteSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ISpriteSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **cors** (`string | null`) — CORS settings for loading the image. Defaults to "anonymous". @since 5.3.6 Click here for more info
- **shadowBlur** (`undefined | number`) — Blurriness of the the shadow. The bigger the number, the more blurry shadow will be. Click here for more info
- **shadowColor** (`Color | null`) — Color of the element's shadow. For this to work at least one of the following needs to be set as well: shadowBlur, shadowOffsetX, shadowOffsetY. Click here for more info
- **shadowOffsetX** (`undefined | number`) — Horizontal shadow offset in pixels. Click here for more info
- **shadowOffsetY** (`undefined | number`) — Vertical shadow offset in pixels. Click here for more info
- **shadowOpacity** (`undefined | number`) — Opacity of the shadow (0-1). If not set, will use the same as fillOpacity of the element. Click here for more info
- **src** (`undefined | string`) — A source URI of the image. Can be relative or absolute URL, or data-uri.
