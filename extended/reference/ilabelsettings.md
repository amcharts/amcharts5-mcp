---
title: "ILabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ilabelsettings/"
scraped: "2026-03-15"
---

Inheritance
ILabelSettings extends IContainerSettings.
ILabelSettings is extended by IRadialLabelSettings, IEditableLabelSettings, IAxisLabelSettings.
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

Extends: IContainerSettings
Extended by: IRadialLabelSettings, IEditableLabelSettings, IAxisLabelSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IContainerSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **baselineRatio** (`undefined | number`) — Default 0.19 How mouch of the height should be considered to go below baseline.
- **breakWords** (`undefined | false | true`) — Default false Whether words can be broken when truncating or wrapping text.
- **direction** (`"ltr" | "rtl"`) — Default "ltr" Text direction.
- **ellipsis** (`undefined | string`) — Default "…" Ellipsis characters to use when truncating text. Will use Unicode ellipsis symbol ("…") by default, which might not be available in all fonts. If ellipsis looks broken, use different characters. E.g.: label.set("ellipsis", "..."); label.set("ellipsis", "...");
- **fill** (`Color`) — Text color.
- **fillGradient** (`Gradient`) — Fill gradient. Click here for more information @since 5.10.1
- **fillOpacity** (`undefined | number`) — Default 1 Text opacity. @ince 5.2.39
- **fontFamily** (`undefined | string`) — Font family to use for the label. Multiple fonts can be separated by commas.
- **fontSize** (`string | number`) — Font size in misc any supported CSS format (pixel, point, em, etc.).
- **fontStyle** (`"normal" | "italic" | "oblique"`) — Font style.
- **fontVariant** (`"normal" | "small-caps"`) — Font variant.
- **fontWeight** (`"normal" | "bold" | "bolder" | "lighter" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"`) — Font weight.
- **ignoreFormatting** (`undefined | false | true`) — Default false If set to true, will ignore in-line formatting blocks and will display text exactly as it is.
- **lineHeight** (`Percent | number`) — Line height in percent or absolute pixels.
- **maxChars** (`undefined | number`) — Maximum number of characters to allow in label. If the text is longer than maxChars, the text will be truncated using the breakWords and ellipsis settings. @since 5.7.2
- **minScale** (`undefined | number`) — Minimum relative scale allowed for label when scaling down when oversizedBehavior is set to "fit". If fitting the label would require it to scale beyond minScale it would be hidden instead.
- **opacity** (`undefined | number`) — Opacity of the label. 0 - fully transparent; 1 - fully opaque.
- **oversizedBehavior** (`"none" | "hide" | "fit" | "wrap" | "wrap-no-break" | "truncate"`) — How to handle labels that do not fit into its designated space. LIMITATIONS: on circular labels, the only values supported are "hide" and "truncate". The latter will ignore breakWords setting. Click here for more info
- **populateText** (`undefined | false | true`) — If set to true the label will parse text for data placeholders and will try to populate them with actual data. Click here for more info
- **shadowBlur** (`undefined | number`) — Blurriness of the the shadow. The bigger the number, the more blurry shadow will be. Click here for more info
- **shadowColor** (`Color | null`) — Color of the element's shadow. For this to work at least one of the following needs to be set as well: shadowBlur, shadowOffsetX, shadowOffsetY. Click here for more info
- **shadowOffsetX** (`undefined | number`) — Horizontal shadow offset in pixels. Click here for more info
- **shadowOffsetY** (`undefined | number`) — Vertical shadow offset in pixels. Click here for more info
- **shadowOpacity** (`undefined | number`) — Opacity of the shadow (0-1). If not set, will use the same as fillOpacity of the element. Click here for more info
- **text** (`undefined | string`) — Labels' text. Click here for text styling info
- **textAlign** (`"start" | "end" | "left" | "right" | "center"`) — Alignment.
- **textBaseline** (`"top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom"`) — A base line to use when aligning text chunks vertically.
- **textDecoration** (`"underline" | "line-through"`) — Text decoration. Supported options "underline", "line-through". @since 5.0.15
