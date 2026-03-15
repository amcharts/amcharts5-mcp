---
title: "ISpriteSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ispritesettings/"
scraped: "2026-03-15"
---

Inheritance
ISpriteSettings extends IEntitySettings.
ISpriteSettings is extended by IGraphicsSettings, IContainerSettings, IPictureSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Indicates if element is currently active.


        ariaChecked        
        #
      


                          Type undefined | false | true                      
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
aria-controls setting.


        ariaCurrent        
        #
      


                          Type undefined | string                      
aria-current setting.

## Inheritance

Extends: IEntitySettings
Extended by: IGraphicsSettings, IContainerSettings, IPictureSettings

> **Note:** This class also inherits all settings, properties, methods, and events from IEntitySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **active** (`undefined | false | true`) — Indicates if element is currently active.
- **ariaChecked** (`undefined | false | true`) — aria-checked setting. This setting is ignored unless role is one of the following: "checkbox" "option" "radio" "menuitemcheckbox" "menuitemradio" "treeitem"
- **ariaControls** (`undefined | string`) — aria-controls setting.
- **ariaCurrent** (`undefined | string`) — aria-current setting. Click here for more info @since 5.9.8
- **ariaHidden** (`undefined | false | true`) — aria-hidden setting.
- **ariaLabel** (`undefined | string`) — Label for the element to use for screen readers. Click here for more info
- **ariaLive** (`AriaLive`) — aria-live setting.
- **ariaOrientation** (`undefined | string`) — aria-orientation setting.
- **ariaSelected** (`undefined | false | true`) — aria-selected setting. Click here for more info @since 5.9.8
- **ariaValueMax** (`undefined | string`) — aria-valuemax setting.
- **ariaValueMin** (`undefined | string`) — aria-valuemin setting.
- **ariaValueNow** (`undefined | string`) — aria-valuenow setting.
- **ariaValueText** (`undefined | string`) — aria-valuetext setting.
- **blur** (`undefined | number`) — Apply blur filter. Ranges of values in pixels: 0 to X. IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **brightness** (`undefined | number`) — Modifty visual brightness. Range of values: 0 to 1. IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **centerX** (`number | Percent`) — X coordinate of the center of the element relative to itself. Center coordinates will affect placement as well as rotation pivot point.
- **centerY** (`number | Percent`) — Y coordinate of the center of the element relative to itself. Center coordinates will affect placement as well as rotation pivot point.
- **clickAnnounceText** (`undefined | string`) — If set, the text will be read out (announced) by a screen reader when focused element is "clicked" (by pressing ENTER or SPACE). @since 5.10.8
- **contrast** (`undefined | number`) — Modify contrast. Range of values: 0 to 1. IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **crisp** (`undefined | false | true`) — Default false If set to true, an element will try to draw itself in such way, that it looks crisp on screen, with minimal anti-aliasing. It will round x/y position so it is positioned fine "on pixel". It will also adjust strokeWidth based on device pixel ratio or zoom, so the line might look thinner than expected. NOTE: this is might not universally work, especially when set on several objects that are supposed to fit perfectly with each other. @since 5.3.0
- **cursorOverStyle** (`undefined | string`) — A named mouse cursor style to show when hovering this element. Click here for more info
- **dateFormatter** (`DateFormatter | undefined`) — An instance of DateFormatter that should be used instead of global formatter object. Click here for more info
- **disabled** (`undefined | false | true`) — Indicates if element is disabled.
- **draggable** (`undefined | false | true`) — If set to true, user will be able to drag this element. It will also disable default drag events over the area of this element.
- **durationFormatter** (`DurationFormatter | undefined`) — An instance of DurationFormatter that should be used instead of global formatter object. Click here for more info
- **dx** (`undefined | number`) — Horizontal shift in pixels. Can be negative to shift leftward.
- **dy** (`undefined | number`) — Vertical shift in pixels. Can be negative to shift upward.
- **exportable** (`undefined | false | true`) — If set to false this element will not appear in exported snapshots of the chart.
- **focusable** (`undefined | false | true`) — Can element be focused, i.e. selected using TAB key. Click here for more info
- **focusableGroup** (`string | number`) — An identifier by which to group common elements into focusable groups. If set, only the first element in he group will be focusable via TAB key. When it is selected, the rest of the elements in the same group can be selected using arrow keys. It allows users to TAB-through chart elements quickly without the need to TAB into each and every element. It's up to implementer of the charts to provide meaningful ariaLabel to the element, which advertises this capability and provides adequate instructions. Click here for more info @since 5.0.6
- **forceHidden** (`undefined | false | true`) — If set to true the element will be hidden regardless of visible or even if show() is called.
- **forceInactive** (`undefined | false | true`) — If set to true the element will be inactive - absolutely oblivious to all interactions, even if there are related events set, or the interactive: true is set. @since 5.0.21
- **height** (`number | Percent | null`) — Element's absolute height in pixels (numeric value) or relative height to parent (Percent);
- **hoverOnFocus** (`undefined | false | true`) — Simulate hover on an element when it gains focus, including changing hover appearance and displaying a tooltip if application. Click here for more info
- **hue** (`undefined | number`) — Rotate HUE colors in degrees. Range of values: 0 to 360. IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **interactive** (`undefined | false | true`) — Should this element accept user interaction events?
- **invert** (`undefined | number`) — Invert colors. Range of values: 0 (no changes) to 1 (completely inverted colors). IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **isMeasured** (`undefined | false | true`) — If set to false element will not be measured and cannot participate in layout schemes.
- **layer** (`undefined | number`) — Numeric layer to put element in. Elements with higher number will appear in front of the ones with lower numer. If not set, will inherit layer from its ascendants.
- **layerMargin** (`IMargin`) — Margins for the layer. Can be used to make the layer larger/or smaller than default chart size. @since @5.2.39
- **marginBottom** (`undefined | number`) — Bottom margin in pixels.
- **marginLeft** (`undefined | number`) — Left margin in pixels.
- **marginRight** (`undefined | number`) — Right margin in pixels.
- **marginTop** (`undefined | number`) — Top margin in pixels.
- **maxHeight** (`number | null`) — Maximum allowed height in pixels.
- **maxWidth** (`number | null`) — Maximum allowed width in pixels.
- **minHeight** (`number | null`) — Minimum allowed height in pixels.
- **minWidth** (`number | null`) — Minimum allowed width in pixels.
- **numberFormatter** (`NumberFormatter | undefined`) — An instance of NumberFormatter that should be used instead of global formatter object. Click here for more info
- **opacity** (`undefined | number`) — Opacity. 0 - fully transparent; 1 - fully opaque.
- **position** (`"absolute" | "relative"`) — Positioning of the element. "absolute" means element will not participate in parent layout scheme, and will be positioned solely accoridng its x and y settings.
- **role** (`Role`) — Element's role. Click here for more info
- **rotation** (`undefined | number`) — Rotation in degrees.
- **saturate** (`undefined | number`) — Modify saturation. Range of values in pixels: 0 to X. 0 - grayscale 1 - no changes >1 - more saturated IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **scale** (`undefined | number`) — Scale. Setting to a value less than 1 will shrink object.
- **sepia** (`undefined | number`) — Apply sepia filter. Range of values: 0 (no changes) to 1 (complete sepia). IMPORTANT: This setting is not supported in Safari browsers. Click here for more info @since 5.5.0
- **showTooltipOn** (`"hover" | "always" | "click"`) — Default "hover" Defines when tooltip is shown over the element. Available options: "hover" (default) - tooltip is shown when element is hovered by a pointer or touched. It is hidden as soon as element is not hovered anymore, or touch occurs outside it. "always" - a tooltip will always be shown over the element, without any interactions. Please note that if you need to show tooltips for multiple elements at the same time, you need to explicitly create a Tooltip instance and set element's tooltip setting with it. '"click"' - a tooltip will only appear when target element is clicked/tapped. Tooltip will hide when clicking anywhere else on the page. Click here for more info @since 5.0.16
- **tabindexOrder** (`undefined | number`) — An internal order by which focusable elements will be selected within the chart. Click here for more info
- **templateField** (`undefined | string`) — Allows binding element's settings to data. Click here for more info
- **toggleKey** (`"disabled" | "active" | "none" | undefined`) — If set, element will toggle specified boolean setting between true and false when clicked/touched.
- **tooltip** (`Tooltip`) — Tooltip instance.
- **tooltipHTML** (`undefined | string`) — HTML content to show in a tooltip when hovered. @since 5.2.11
- **tooltipPosition** (`"fixed" | "pointer"`) — Tooltip position.
- **tooltipText** (`undefined | string`) — Text to show in a tooltip when hovered.
- **tooltipX** (`number | Percent`) — Tooltip pointer X coordinate relative to the element itself.
- **tooltipY** (`number | Percent`) — Tooltip pointer Y coordinate relative to the element itself.
- **visible** (`undefined | false | true`) — Is element visible?
- **wheelable** (`undefined | false | true`) — If set to true, mouse wheel events will be triggered over the element. It will also disable page scrolling using mouse wheel when pointer is over the element.
- **width** (`number | Percent | null`) — Element's absolute width in pixels (numeric value) or relative width to parent (Percent);
- **x** (`number | Percent | null`) — X position relative to parent.

